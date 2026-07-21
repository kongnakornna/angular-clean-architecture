package http

import (
	"net/http"
	"time"

	"icmongolang/config"
	reportmodule "icmongolang/internal/modules/report"
	"icmongolang/pkg/httpErrors"
	"icmongolang/pkg/logger"
	"icmongolang/pkg/report"
	"icmongolang/pkg/responses"

	"github.com/go-chi/render"
)

type reportHandler struct {
	cfg    *config.Config
	logger logger.Logger
}

func CreateReportHandler(cfg *config.Config, logger logger.Logger) reportmodule.Handlers {
	return &reportHandler{cfg: cfg, logger: logger}
}

func pdfError(w http.ResponseWriter, r *http.Request, log logger.Logger, msg string, err error) {
	log.Errorf("%s: %v", msg, err)
	render.Render(w, r, responses.CreateErrorResponse(httpErrors.ErrInternalServer(err)))
}

// DailySalesPDF godoc
// @Summary Generate Daily Sales Report PDF
// @Description Generate daily sales report PDF.
// @Tags Reports
// @Produce application/pdf
// @Param date query string false "Date (YYYY-MM-DD)"
// @Success 200 {file} byte "PDF file"
// @Failure 500 {object} responses.ErrorResponse
// @Router /reports/daily-sales/pdf [get]
func (h *reportHandler) DailySalesPDF() func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		dateStr := r.URL.Query().Get("date")
		reportDate := time.Now()
		if dateStr != "" {
			parsed, err := time.Parse("2006-01-02", dateStr)
			if err == nil {
				reportDate = parsed
			}
		}

		data := report.DailySalesData{
			Company:     rptCompany(),
			Date:        reportDate,
			Sales:       []report.DailySaleRow{},
			TotalRev:    0,
			TotalCost:   0,
			TotalProfit: 0,
			Summary:     report.DailySalesSummary{},
		}

		pdf, err := report.GeneratePDF(r.Context(), report.TplDailySales, data)
		if err != nil {
			pdfError(w, r, h.logger, "Failed to generate daily sales PDF", err)
			return
		}

		w.Header().Set("Content-Type", "application/pdf")
		w.Header().Set("Content-Disposition", "inline; filename=daily_sales_"+reportDate.Format("20060102")+".pdf")
		w.Write(pdf)
	}
}

// InventorySummaryPDF godoc
// @Summary Generate Inventory Summary Report PDF
// @Description Generate inventory summary report PDF.
// @Tags Reports
// @Produce application/pdf
// @Success 200 {file} byte "PDF file"
// @Failure 500 {object} responses.ErrorResponse
// @Router /reports/inventory-summary/pdf [get]
func (h *reportHandler) InventorySummaryPDF() func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		data := report.InventorySummaryData{
			Company:   rptCompany(),
			Date:      time.Now(),
			Items:     []report.InventoryItem{},
			TotalValue: 0,
			TotalQty:   0,
		}

		pdf, err := report.GeneratePDF(r.Context(), report.TplInventorySum, data)
		if err != nil {
			pdfError(w, r, h.logger, "Failed to generate inventory summary PDF", err)
			return
		}

		w.Header().Set("Content-Type", "application/pdf")
		w.Header().Set("Content-Disposition", "inline; filename=inventory_summary.pdf")
		w.Write(pdf)
	}
}

// CustomerListPDF godoc
// @Summary Generate Customer List Report PDF
// @Description Generate customer list report PDF.
// @Tags Reports
// @Produce application/pdf
// @Success 200 {file} byte "PDF file"
// @Failure 500 {object} responses.ErrorResponse
// @Router /reports/customer-list/pdf [get]
func (h *reportHandler) CustomerListPDF() func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		data := report.CustomerListData{
			Company:    rptCompany(),
			Date:       time.Now(),
			Customers:  []report.CustomerListItem{},
			TotalCount: 0,
		}

		pdf, err := report.GeneratePDF(r.Context(), report.TplCustomerList, data)
		if err != nil {
			pdfError(w, r, h.logger, "Failed to generate customer list PDF", err)
			return
		}

		w.Header().Set("Content-Type", "application/pdf")
		w.Header().Set("Content-Disposition", "inline; filename=customer_list.pdf")
		w.Write(pdf)
	}
}

// InvoicePDF godoc
// @Summary Generate Invoice PDF from quotation
// @Description Generate invoice PDF from a quotation or job.
// @Tags Reports
// @Produce application/pdf
// @Param source query string false "Source ID (quotation or job ID)"
// @Success 200 {file} byte "PDF file"
// @Failure 500 {object} responses.ErrorResponse
// @Router /reports/invoice/pdf [get]
func (h *reportHandler) InvoicePDF() func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		data := report.InvoiceData{
			Company:    rptCompany(),
			InvoiceNo:  "INV-2026-001",
			Date:       time.Now(),
			DueDate:    time.Now().AddDate(0, 0, 30),
			CustomerName: "ลูกค้า",
			Items:      []report.InvoiceItem{},
		}

		pdf, err := report.GeneratePDF(r.Context(), report.TplInvoice, data)
		if err != nil {
			pdfError(w, r, h.logger, "Failed to generate invoice PDF", err)
			return
		}

		w.Header().Set("Content-Type", "application/pdf")
		w.Header().Set("Content-Disposition", "inline; filename=invoice.pdf")
		w.Write(pdf)
	}
}

// CreditNotePDF godoc
// @Summary Generate Credit Note PDF
// @Description Generate credit note PDF.
// @Tags Reports
// @Produce application/pdf
// @Success 200 {file} byte "PDF file"
// @Failure 500 {object} responses.ErrorResponse
// @Router /reports/credit-note/pdf [get]
func (h *reportHandler) CreditNotePDF() func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		data := report.CreditNoteData{
			Company:      rptCompany(),
			CreditNoteNo: "CN-2026-001",
			Date:         time.Now(),
			CustomerName: "ลูกค้า",
			InvoiceNo:    "INV-2026-001",
			Items:        []report.CreditNoteItem{},
		}

		pdf, err := report.GeneratePDF(r.Context(), report.TplCreditNote, data)
		if err != nil {
			pdfError(w, r, h.logger, "Failed to generate credit note PDF", err)
			return
		}

		w.Header().Set("Content-Type", "application/pdf")
		w.Header().Set("Content-Disposition", "inline; filename=credit_note.pdf")
		w.Write(pdf)
	}
}

// DebitNotePDF godoc
// @Summary Generate Debit Note PDF
// @Description Generate debit note PDF.
// @Tags Reports
// @Produce application/pdf
// @Success 200 {file} byte "PDF file"
// @Failure 500 {object} responses.ErrorResponse
// @Router /reports/debit-note/pdf [get]
func (h *reportHandler) DebitNotePDF() func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		data := report.DebitNoteData{
			Company:     rptCompany(),
			DebitNoteNo: "DN-2026-001",
			Date:        time.Now(),
			CustomerName: "ลูกค้า",
			InvoiceNo:   "INV-2026-001",
			Items:       []report.DebitNoteItem{},
		}

		pdf, err := report.GeneratePDF(r.Context(), report.TplDebitNote, data)
		if err != nil {
			pdfError(w, r, h.logger, "Failed to generate debit note PDF", err)
			return
		}

		w.Header().Set("Content-Type", "application/pdf")
		w.Header().Set("Content-Disposition", "inline; filename=debit_note.pdf")
		w.Write(pdf)
	}
}

func rptCompany() report.CompanyInfo {
	return report.CompanyInfo{
		Name:    "ICMON Auto Repair",
		Address: "123/4 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
		Phone:   "02-123-4567",
		TaxID:   "0123456789012",
	}
}
