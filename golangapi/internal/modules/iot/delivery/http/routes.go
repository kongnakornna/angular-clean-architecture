package http

import (
	"icmongolang/internal/middleware"

	"github.com/go-chi/chi/v5"
)

func MapMQTT3Routes(router chi.Router, h *MQTT3Handler, mw *middleware.MiddlewareManager) {
	if router == nil {
		panic("MapMQTTRoutes: router is nil")
	}
	if h == nil {
		panic("MapMQTTRoutes: handler is nil")
	}
	if mw == nil {
		panic("MapMQTTRoutes: middleware manager is nil")
	}
	router.Route("/iot", func(r chi.Router) {
		// Apply rate limiting to all IoT endpoints
		r.Use(mw.RateLimit())

		// Public routes (existing)
		r.Get("/topic", h.GetTopicData)
		r.Get("/topicdevicechart", h.GetTopicDataDeviceChart)
		r.Get("/controls", h.DeviceControls)
		r.Get("/monitordevicegroup", h.GetMonitorDeviceGroup)
		r.Get("/monitordevicechart", h.GetMonitorDeviceChart)
		r.Get("/device", h.GetDeviceList)
		r.Get("/devicebuckets", h.GetDeviceBuckets)
		r.Get("/sensercharts", h.GetSenserCharts)
		r.Get("/locationdevice", h.GetDeviceByLocation)
		r.Get("/devicesensercharts", h.GetDeviceSenserCharts)
		r.Get("/alarmdevicestatus", h.GetAlarmDeviceStatus)
		r.Get("/alarmdevicestatuscontrol", h.GetAlarmDeviceStatusControl)

		// New public routes for device status/config and data
		r.Get("/devicestatus", h.GetDeviceStatus)
		r.Get("/deviceconfig", h.GetDeviceConfig)
		r.Get("/deviceiotdata", h.ListIotData)
		r.Get("/devicestats", h.GetDeviceStats)
		r.Get("/devicedataexport", h.ExportData)

		// Authenticated routes
		r.Group(func(r chi.Router) {
			r.Use(mw.Verifier(true))
			r.Use(mw.Authenticator())
			r.Use(mw.CurrentUser())
			r.Use(mw.ActiveUser())
			r.Post("/control", h.DeviceControl)

			// Protected new routes
			r.Put("/devicestatus", h.UpdateDeviceStatus)
			r.Put("/updatedeviceconfig", h.UpdateDeviceConfig)
			r.Delete("/devicedatacleanup", h.CleanupOldData)
		})
	})
}
