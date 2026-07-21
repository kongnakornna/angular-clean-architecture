package http

import (
	"icmongolang/internal/middleware"
	"icmongolang/internal/modules/report"
	"icmongolang/config"

	"github.com/go-chi/chi/v5"
)

func MapReportRoute(router *chi.Mux, cfg *config.Config, h report.Handlers, mw *middleware.MiddlewareManager) {
	router.Route("/reports", func(r chi.Router) {
		r.Group(func(r chi.Router) {
			r.Use(mw.Verifier(true))
			r.Use(mw.Authenticator())
			r.Use(mw.CurrentUser())
			r.Use(mw.ActiveUser())
			r.Get("/daily-sales/pdf", h.DailySalesPDF())
			r.Get("/inventory-summary/pdf", h.InventorySummaryPDF())
			r.Get("/customer-list/pdf", h.CustomerListPDF())
			r.Get("/invoice/pdf", h.InvoicePDF())
			r.Get("/credit-note/pdf", h.CreditNotePDF())
			r.Get("/debit-note/pdf", h.DebitNotePDF())
		})
	})
}
