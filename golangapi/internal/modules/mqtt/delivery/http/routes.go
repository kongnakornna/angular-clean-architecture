package http

import (
	"sync"

	"icmongolang/internal/middleware"

	"github.com/go-chi/chi/v5"
)

var once sync.Once

func MapMQTTRoutes(router chi.Router, h *MQTTHandler, mw *middleware.MiddlewareManager) {
	once.Do(func() {
		if router == nil {
			panic("MapMQTTRoutes: router is nil")
		}
		if h == nil {
			panic("MapMQTTRoutes: handler is nil")
		}
		if mw == nil {
			panic("MapMQTTRoutes: middleware manager is nil")
		}

		router.Route("/mqtt", func(r chi.Router) {
			r.Use(mw.RateLimit())
			r.Get("/subscriptions", h.Subscriptions)
			r.Get("/status", h.Status)
			r.Get("/gettopicdata", h.GetTopicData)
			r.Get("/devicecontrol", h.DeviceControl)

			verifier := mw.Verifier(true)
			authenticator := mw.Authenticator()
			currentUser := mw.CurrentUser()
			activeUser := mw.ActiveUser()

			if verifier == nil || authenticator == nil || currentUser == nil || activeUser == nil {
				panic("MapMQTTRoutes: one or more middleware functions returned nil")
			}

			r.Group(func(r chi.Router) {
				r.Use(verifier, authenticator, currentUser, activeUser)

				r.Post("/publish", h.Publish)
				r.Post("/subscribe", h.Subscribe)
				r.Post("/unsubscribe", h.Unsubscribe)
			})
		})
	})
}

/*
    curl -H "Authorization: Bearer <token>" "http://localhost:5000/api/mqtt/devicecontrol?topic=BAACTW02/CONTROL&message=ON"
	{
		"statuscode": 200,
		"code": 200,
		"topic_control": "BAACTW02/CONTROL",
		"topic_data": "BAACTW02/DATA",
		"message_sent": "ON",
		"payload": "25.5,60,1013",
		"data": ["25.5", "60", "1013"],
		"status": 1,
		"status_msg": "ON",
		"timestamp": "2026-06-08T18:30:00+07:00",
		"message": "Control sent to BAACTW02/CONTROL, response received",
		"message_th": "ส่งคำสั่งไปยัง BAACTW02/CONTROL และได้รับข้อมูลตอบกลับ",
		"from": "mqtt",
		"fetch_duration_ms": 245
	}
*/
