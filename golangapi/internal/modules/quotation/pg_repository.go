package quotation

import (
	"context"

	"icmongolang/internal"
	"icmongolang/internal/models"
)

type QuotationPgRepository interface {
	internal.PgRepository[models.Quotation]
	Count(ctx context.Context) (int64, error)
}
