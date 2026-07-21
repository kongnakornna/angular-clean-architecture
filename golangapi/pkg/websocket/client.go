package websocket

import (
	"github.com/gorilla/websocket"
)

type Client struct {
	ID     string
	UserID string
	Conn   *websocket.Conn
	Send   chan []byte
	Hub    *Hub
	Topics map[string]bool
	Rooms  map[string]bool
}

func NewClient(id, userID string, conn *websocket.Conn, hub *Hub) *Client {
	return &Client{
		ID:     id,
		UserID: userID,
		Conn:   conn,
		Send:   make(chan []byte, 256),
		Hub:    hub,
		Topics: make(map[string]bool),
		Rooms:  make(map[string]bool),
	}
}

// WritePump sends messages from Send channel to websocket
func (c *Client) WritePump() {
	defer c.Conn.Close()
	for {
		select {
		case message, ok := <-c.Send:
			if !ok {
				c.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			if err := c.Conn.WriteMessage(websocket.TextMessage, message); err != nil {
				return
			}
		}
	}
}

// SendMessage is a helper to send a message directly
func (c *Client) SendMessage(data []byte) {
	select {
	case c.Send <- data:
	default:
	}
}
