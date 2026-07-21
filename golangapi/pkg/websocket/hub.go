package websocket

import (
	"context"
	"encoding/json"
	"sync"

	"icmongolang/internal/modules/queue"
	"icmongolang/pkg/logger"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

// Hub ดูแล client และ topic subscriptions (ใช้ Redis queue)
type Hub struct {
	clients map[string]*Client
	topics  map[string]map[string]bool // topic -> clientID -> bool
	rooms   map[string]map[string]bool // room -> clientID -> bool
	mu      sync.RWMutex
	queue   queue.Queue
	log     logger.Logger
	ctx     context.Context
	cancel  context.CancelFunc
	wg      sync.WaitGroup
}

func NewHub(q queue.Queue, log logger.Logger) *Hub {
	ctx, cancel := context.WithCancel(context.Background())
	return &Hub{
		clients: make(map[string]*Client),
		topics:  make(map[string]map[string]bool),
		rooms:   make(map[string]map[string]bool),
		queue:   q,
		log:     log,
		ctx:     ctx,
		cancel:  cancel,
	}
}

func (h *Hub) Run() {
	// ไม่มี loop หลัก, การ subscribe จะเกิดขึ้นเมื่อมี client subscribe topic แรก
}

// AddClient creates a new client, registers it, and optionally joins a room.
// This is the preferred way to add a client from the WebSocket handler.
func (h *Hub) AddClient(conn *websocket.Conn, userID, room string) *Client {
	client := NewClient(generateClientID(), userID, conn, h)
	h.Register(client)
	if room != "" {
		h.JoinRoom(client, room)
	}
	return client
}

// generateClientID creates a unique client identifier.
func generateClientID() string {
	return uuid.New().String()
}

// Register adds a client
func (h *Hub) Register(client *Client) {
	h.mu.Lock()
	defer h.mu.Unlock()
	h.clients[client.ID] = client
}

// Unregister removes client and cleans subscriptions
func (h *Hub) Unregister(client *Client) {
	h.mu.Lock()
	defer h.mu.Unlock()
	// remove from topics
	for topic := range client.Topics {
		if clients, ok := h.topics[topic]; ok {
			delete(clients, client.ID)
			if len(clients) == 0 {
				delete(h.topics, topic)
			}
		}
	}
	// remove from rooms
	for room := range client.Rooms {
		if roomClients, ok := h.rooms[room]; ok {
			delete(roomClients, client.ID)
			if len(roomClients) == 0 {
				delete(h.rooms, room)
			}
		}
	}
	delete(h.clients, client.ID)
	close(client.Send)
}

// Subscribe client to a topic (และเริ่ม queue subscriber ถ้ายังไม่มี)
func (h *Hub) Subscribe(client *Client, topic string) error {
	h.mu.Lock()
	defer h.mu.Unlock()
	if h.topics[topic] == nil {
		h.topics[topic] = make(map[string]bool)
		// เริ่ม subscriber สำหรับ topic นี้ (ทำเพียงครั้งเดียว)
		go h.subscribeQueueTopic(topic)
	}
	h.topics[topic][client.ID] = true
	client.Topics[topic] = true
	return nil
}

// Unsubscribe client from topic
func (h *Hub) Unsubscribe(client *Client, topic string) error {
	h.mu.Lock()
	defer h.mu.Unlock()
	if clients, ok := h.topics[topic]; ok {
		delete(clients, client.ID)
		if len(clients) == 0 {
			delete(h.topics, topic)
		}
	}
	delete(client.Topics, topic)
	return nil
}

// JoinRoom adds client to a room
func (h *Hub) JoinRoom(client *Client, room string) {
	h.mu.Lock()
	defer h.mu.Unlock()
	if h.rooms[room] == nil {
		h.rooms[room] = make(map[string]bool)
	}
	h.rooms[room][client.ID] = true
	client.Rooms[room] = true
}

// LeaveRoom removes client from room
func (h *Hub) LeaveRoom(client *Client, room string) {
	h.mu.Lock()
	defer h.mu.Unlock()
	if clients, ok := h.rooms[room]; ok {
		delete(clients, client.ID)
		if len(clients) == 0 {
			delete(h.rooms, room)
		}
	}
	delete(client.Rooms, room)
}

// BroadcastToRoom sends event/data to all clients in room
func (h *Hub) BroadcastToRoom(room, event string, data interface{}) {
	h.mu.RLock()
	clientsMap := h.rooms[room]
	var clientIDs []string
	for cid := range clientsMap {
		clientIDs = append(clientIDs, cid)
	}
	h.mu.RUnlock()

	payload := map[string]interface{}{
		"event": event,
		"data":  data,
	}
	msgBytes, _ := json.Marshal(payload)

	for _, cid := range clientIDs {
		h.mu.RLock()
		client := h.clients[cid]
		h.mu.RUnlock()
		if client != nil {
			select {
			case client.Send <- msgBytes:
			default:
				// drop
			}
		}
	}
}

// BroadcastMessage ส่ง event/data ไปยังทุก client (ทั่วโลก)
func (h *Hub) BroadcastMessage(event string, data interface{}) {
	payload := map[string]interface{}{
		"event": event,
		"data":  data,
	}
	msgBytes, _ := json.Marshal(payload)
	h.mu.RLock()
	clients := make([]*Client, 0, len(h.clients))
	for _, c := range h.clients {
		clients = append(clients, c)
	}
	h.mu.RUnlock()
	for _, client := range clients {
		select {
		case client.Send <- msgBytes:
		default:
		}
	}
}

// GetRooms returns list of active room names
func (h *Hub) GetRooms() []string {
	h.mu.RLock()
	defer h.mu.RUnlock()
	rooms := make([]string, 0, len(h.rooms))
	for room := range h.rooms {
		rooms = append(rooms, room)
	}
	return rooms
}

// GetClientsInRoom returns count
func (h *Hub) GetClientsInRoom(room string) int {
	h.mu.RLock()
	defer h.mu.RUnlock()
	return len(h.rooms[room])
}

// subscribeQueueTopic เริ่ม subscriber ของ queue
func (h *Hub) subscribeQueueTopic(topic string) {
	handler := func(ctx context.Context, msg *queue.Message) error {
		// ส่ง payload ไปยังทุก client ที่ subscribe topic นี้
		h.BroadcastToRoom(topic, "message", json.RawMessage(msg.Payload))
		return nil
	}
	if err := h.queue.Subscribe(h.ctx, topic, handler); err != nil {
		h.log.Errorf("Failed to subscribe to queue topic %s: %v", topic, err)
	}
}

// PublishMessage publishes a message to queue and optionally saves to DB
func (h *Hub) PublishMessage(ctx context.Context, topic string, payload []byte, senderID string) error {
	return h.queue.Publish(ctx, topic, json.RawMessage(payload))
}

// Shutdown
func (h *Hub) Shutdown() {
	h.cancel()
	h.queue.Close()
}
