package usecase

import (
	"context"

	"icmongolang/config"
	"icmongolang/internal/modules/quotation"
	"icmongolang/internal/models"
	"icmongolang/internal/usecase"
	"icmongolang/pkg/logger"
)

type quotationUseCase struct {
	usecase.UseCase[models.Quotation]
	pgRepo quotation.QuotationPgRepository
}

func CreateQuotationUseCaseI(
	pgRepo quotation.QuotationPgRepository,
	cfg *config.Config,
	logger logger.Logger,
) quotation.QuotationUseCaseI {
	return &quotationUseCase{
		UseCase: usecase.CreateUseCase[models.Quotation](pgRepo, cfg, logger),
		pgRepo:  pgRepo,
	}
}

func (u *quotationUseCase) Count(ctx context.Context) (int64, error) {
	return u.pgRepo.Count(ctx)
}
