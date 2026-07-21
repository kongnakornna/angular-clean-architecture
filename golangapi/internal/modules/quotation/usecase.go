package quotation

import (
	"context"

	"icmongolang/internal"
	"icmongolang/internal/models"
)

type QuotationUseCaseI interface {
	internal.UseCaseI[models.Quotation]
	Count(ctx context.Context) (int64, error)
}
