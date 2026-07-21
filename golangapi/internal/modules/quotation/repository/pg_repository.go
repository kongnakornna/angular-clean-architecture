package repository

import (
	"context"

	"icmongolang/internal/modules/quotation"
	"icmongolang/internal/models"
	"icmongolang/internal/repository"

	"gorm.io/gorm"
)

type QuotationPgRepo struct {
	repository.PgRepo[models.Quotation]
}

func CreateQuotationPgRepository(db *gorm.DB) quotation.QuotationPgRepository {
	return &QuotationPgRepo{
		PgRepo: repository.CreatePgRepo[models.Quotation](db),
	}
}

func (r *QuotationPgRepo) Count(ctx context.Context) (int64, error) {
	var count int64
	err := r.DB.WithContext(ctx).Model(&models.Quotation{}).Count(&count).Error
	return count, err
}
