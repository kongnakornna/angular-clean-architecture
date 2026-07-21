package http

import (
	"encoding/json"
	"net/http"
	"strconv"

	"icmongolang/internal/modules/websocket/usecase"
	"icmongolang/pkg/logger"
	"icmongolang/pkg/websocket"

	"github.com/gorilla/mux"
)

type WsRestHandler struct {
	hub     *websocket.Hub
	usecase usecase.WSUsecase
	logger  logger.Logger
}

func NewWsRestHandler(hub *websocket.Hub, uc usecase.WSUsecase, log logger.Logger) *WsRestHandler {
	return &WsRestHandler{hub: hub, usecase: uc, logger: log}
}

// SendMessage via REST
func (h *WsRestHandler) SendMessage(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Room  string      `json:"room"`
		Event string      `json:"event"`
		Data  interface{} `json:"data"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request", http.StatusBadRequest)
		return
	}
	if req.Room == "" || req.Event == "" {
		http.Error(w, "room and event are required", http.StatusBadRequest)
		return
	}
	h.hub.BroadcastToRoom(req.Room, req.Event, req.Data)
	go h.usecase.SaveMessage(r.Context(), req.Room, []byte{}, "api") // หรือจะบันทึกเพิ่มเติม
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "sent"})
}

// GetMessages history
func (h *WsRestHandler) GetMessages(w http.ResponseWriter, r *http.Request) {
	room := r.URL.Query().Get("room")
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	if limit <= 0 {
		limit = 20
	}
	messages, err := h.usecase.GetTopicHistory(r.Context(), room, limit)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(messages)
}

// GetRooms
func (h *WsRestHandler) GetRooms(w http.ResponseWriter, r *http.Request) {
	rooms := h.hub.GetRooms()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"rooms": rooms,
		"count": len(rooms),
	})
}

// GetRoomStats
func (h *WsRestHandler) GetRoomStats(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	room := vars["room"]
	if room == "" {
		http.Error(w, "room required", http.StatusBadRequest)
		return
	}
	count := h.hub.GetClientsInRoom(room)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"room":    room,
		"clients": count,
	})
}
