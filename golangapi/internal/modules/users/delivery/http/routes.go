package http

import (
	"icmongolang/internal/middleware"
	"icmongolang/internal/modules/users"

	"github.com/go-chi/chi/v5"
)

func MapUserRoute(router *chi.Mux, h users.Handlers, mw *middleware.MiddlewareManager) {
	// Public
	router.Post("/register", h.Register())
	router.Post("/users", h.Create())
	// Public routes (no auth)
	router.Post("/signin", h.SignInEmail())
	router.Post("/login", h.SignInUsername())
	// Protected
	router.Route("/user", func(r chi.Router) {
		r.Use(mw.Verifier(true))
		r.Use(mw.Authenticator())
		r.Use(mw.CurrentUser())
		r.Use(mw.ActiveUser())

		r.Get("/me", h.Me())
		r.Put("/me", h.UpdateMe())
		r.Patch("/me/updatepass", h.UpdatePasswordMe())

		// Admin
		r.Group(func(admin chi.Router) {
			admin.Use(mw.SuperUser())
			admin.Get("/", h.GetMulti())
			admin.Post("/", h.Create())
			admin.Patch("/{id}/role", h.UpdateRole())
		})

		r.Route("/{id}", func(r chi.Router) {
			r.Get("/", h.Get())
			r.Group(func(write chi.Router) {
				write.Use(mw.SuperUser())
				write.Delete("/", h.Delete())
				write.Put("/", h.Update())
				write.Patch("/updatepass", h.UpdatePassword())
				write.Get("/logoutall", h.LogoutAllAdmin())
			})
		})
	})
}
