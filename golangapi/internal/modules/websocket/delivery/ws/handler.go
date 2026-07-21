package ws

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"icmongolang/internal/modules/websocket/usecase"
	"icmongolang/pkg/logger"
	pkgws "icmongolang/pkg/websocket"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

type WsHandler struct {
	hub     *pkgws.Hub
	usecase usecase.WSUsecase
	log     logger.Logger
}

func NewWsHandler(hub *pkgws.Hub, uc usecase.WSUsecase, log logger.Logger) *WsHandler {
	return &WsHandler{hub: hub, usecase: uc, log: log}
}

func (h *WsHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	token := r.URL.Query().Get("token")
	if token == "" {
		token = r.Header.Get("Authorization")
	}
	userID, err := h.usecase.Authenticate(r.Context(), token)
	if err != nil {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		h.log.Errorf("Upgrade error: %v", err)
		return
	}

	client := &pkgws.Client{
		ID:     generateClientID(),
		UserID: userID,
		Conn:   conn,
		Hub:    h.hub,
	}
	h.hub.Register(client)
	go client.WritePump()
	h.readPump(client, r.Context())
}

func (h *WsHandler) readPump(client *pkgws.Client, ctx context.Context) {
	defer func() {
		h.hub.Unregister(client)
		client.Conn.Close()
	}()

	for {
		var envelope struct {
			Type    string          `json:"type"`
			Topic   string          `json:"topic,omitempty"`
			Room    string          `json:"room,omitempty"`
			Payload json.RawMessage `json:"payload,omitempty"`
		}
		err := client.Conn.ReadJSON(&envelope)
		if err != nil {
			break
		}
		switch envelope.Type {
		case "subscribe":
			if envelope.Topic != "" {
				h.hub.Subscribe(client, envelope.Topic)
			}
		case "unsubscribe":
			if envelope.Topic != "" {
				h.hub.Unsubscribe(client, envelope.Topic)
			}
		case "join_room":
			if envelope.Room != "" {
				h.hub.JoinRoom(client, envelope.Room)
			}
		case "leave_room":
			if envelope.Room != "" {
				h.hub.LeaveRoom(client, envelope.Room)
			}
		case "message":
			if envelope.Topic == "" && envelope.Room == "" {
				// invalid
				continue
			}
			// ส่งไปยัง queue พร้อมบันทึก history
			if err := h.usecase.HandleIncomingMessage(ctx, envelope.Topic, envelope.Room, envelope.Payload, client.UserID); err != nil {
				h.log.Errorf("HandleIncomingMessage error: %v", err)
			}
		default:
			// unknown
		}
	}
}

func generateClientID() string {
	return fmt.Sprintf("client-%d", time.Now().UnixNano())
}
