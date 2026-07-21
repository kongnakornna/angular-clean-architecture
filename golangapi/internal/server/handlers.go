package server

import (
	"net/http"
	"time"

	"icmongolang/config"
	alarmHttp "icmongolang/internal/modules/alarm/delivery/http"
	"icmongolang/internal/modules/alarm/repository"
	alarmUsecase "icmongolang/internal/modules/alarm/usecase"
	authHttp "icmongolang/internal/modules/auth/delivery/http"
	authPgRepo "icmongolang/internal/modules/auth/repository"
	authUsecase "icmongolang/internal/modules/auth/usecase"
	batchHttp "icmongolang/internal/modules/batch/delivery/http"
	batchPgRepo "icmongolang/internal/modules/batch/repository"
	batchUsecase "icmongolang/internal/modules/batch/usecase"
	customerHttp "icmongolang/internal/modules/customer/delivery/http"
	customerPgRepo "icmongolang/internal/modules/customer/repository"
	customerUsecase "icmongolang/internal/modules/customer/usecase"
	dashboardHttp "icmongolang/internal/modules/dashboard/delivery/http"
	dashboardRepo "icmongolang/internal/modules/dashboard/repository"
	dashboardUsecase "icmongolang/internal/modules/dashboard/usecase"
	documentHttp "icmongolang/internal/modules/document/delivery/http"
	documentRepo "icmongolang/internal/modules/document/repository"
	documentUsecase "icmongolang/internal/modules/document/usecase"
	emailHttp "icmongolang/internal/modules/email/delivery/http"
	emailPgRepo "icmongolang/internal/modules/email/repository"
	emailUsecase "icmongolang/internal/modules/email/usecase"
	i18nHttp "icmongolang/internal/modules/i18n/delivery/http"
	i18nPgRepo "icmongolang/internal/modules/i18n/repository"
	i18nUsecase "icmongolang/internal/modules/i18n/usecase"
	influxHttp "icmongolang/internal/modules/influxdb/delivery/http"
	influxUsecase "icmongolang/internal/modules/influxdb/usecase"
	iotHttp "icmongolang/internal/modules/iot/delivery/http"
	iotRepo "icmongolang/internal/modules/iot/repository"
	iotUsecase "icmongolang/internal/modules/iot/usecase"
	itemHttp "icmongolang/internal/modules/items/delivery/http"
	itemRepository "icmongolang/internal/modules/items/repository"
	itemUseCase "icmongolang/internal/modules/items/usecase"
	jobHttp "icmongolang/internal/modules/job/delivery/http"
	jobPgRepo "icmongolang/internal/modules/job/repository"
	jobUsecase "icmongolang/internal/modules/job/usecase"
	apiMiddleware "icmongolang/internal/middleware"
	mqttHttp "icmongolang/internal/modules/mqtt/delivery/http"
	mqttUsecase "icmongolang/internal/modules/mqtt/usecase"
	paymentHttp "icmongolang/internal/modules/payment/delivery/http"
	paymentPgRepo "icmongolang/internal/modules/payment/repository"
	paymentUsecase "icmongolang/internal/modules/payment/usecase"
	purchaseorderHttp "icmongolang/internal/modules/purchaseorder/delivery/http"
	purchaseorderRepo "icmongolang/internal/modules/purchaseorder/repository"
	purchaseorderUsecase "icmongolang/internal/modules/purchaseorder/usecase"
	quotationHttp "icmongolang/internal/modules/quotation/delivery/http"
	quotationPgRepo "icmongolang/internal/modules/quotation/repository"
	quotationUsecase "icmongolang/internal/modules/quotation/usecase"
	queue "icmongolang/internal/modules/queue"
	userHttp "icmongolang/internal/modules/users/delivery/http"
	userDistributor "icmongolang/internal/modules/users/distributor"
	userRepository "icmongolang/internal/modules/users/repository"
	userUseCase "icmongolang/internal/modules/users/usecase"
	wosHttp "icmongolang/internal/modules/wos/delivery/http"
	wosPgRepo "icmongolang/internal/modules/wos/repository"
	wosUsecase "icmongolang/internal/modules/wos/usecase"
	wsdelivery "icmongolang/internal/modules/websocket/delivery/ws"
	redisDb "icmongolang/pkg/db/redis"
	"icmongolang/pkg/influxdb"
	"icmongolang/pkg/logger"
	"icmongolang/pkg/mqtt"
	"icmongolang/pkg/websocket"

	_ "icmongolang/docs"
	httpSwagger "icmongolang/pkg/http-swagger"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/render"
	"github.com/hibiken/asynq"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
)

// New creates the main application router with all dependencies.
func New(
	db *gorm.DB,
	redisClient *redis.Client,
	taskRedisClient *asynq.Client, // ✅ now typed correctly
	cfg *config.Config,
	logger logger.Logger,
	influxClient *influxdb.InfluxClient,
	mqttClient mqtt.Client,
) (*chi.Mux, error) {

	// --- 1. Repositories and UseCases ---
	userPgRepo := userRepository.CreateUserPgRepository(db)
	userRedisRepo := userRepository.CreateUserRedisRepository(redisClient)
	itemPgRepo := itemRepository.CreateItemPgRepository(db)

	userRedisTaskDistributor := userDistributor.NewUserRedisTaskDistributor(taskRedisClient, cfg, logger)

	userUC := userUseCase.CreateUserUseCaseI(userPgRepo, userRedisRepo, userRedisTaskDistributor, cfg, logger)
	itemUC := itemUseCase.CreateItemUseCaseI(itemPgRepo, cfg, logger)

	// --- New module repositories and usecases ---
	poPgRepo := purchaseorderRepo.CreatePurchaseOrderPgRepository(db)
	poUC := purchaseorderUsecase.CreatePurchaseOrderUseCaseI(poPgRepo, cfg, logger)

	paymentRepoVar := paymentPgRepo.CreatePaymentPgRepository(db)
	paymentUC := paymentUsecase.CreatePaymentUseCaseI(paymentRepoVar, cfg, logger)

	dashRepoVar := dashboardRepo.CreateDashboardPgRepository(db)
	dashUC := dashboardUsecase.CreateDashboardUseCaseI(dashRepoVar, cfg, logger)

	docRepoVar := documentRepo.CreateDocumentPgRepository(db)
	docUC := documentUsecase.CreateDocumentUseCaseI(docRepoVar, cfg, logger)

	emailRepoVar := emailPgRepo.CreateEmailPgRepository(db)
	emailUC := emailUsecase.CreateEmailUseCaseI(emailRepoVar, cfg, logger)

	batchRepoVar := batchPgRepo.CreateBatchPgRepository(db)
	batchUC := batchUsecase.CreateBatchUseCaseI(batchRepoVar, cfg, logger)

	i18nRepoVar := i18nPgRepo.CreateI18nPgRepository(db)
	i18nUC := i18nUsecase.CreateI18nUseCaseI(i18nRepoVar, cfg, logger)

	wosRepoVar := wosPgRepo.CreateWosPgRepository(db)
	wosUC := wosUsecase.CreateWosUseCaseI(wosRepoVar, cfg, logger)

	jobRepoVar := jobPgRepo.CreateJobPgRepository(db)
	jobUC := jobUsecase.CreateJobUseCaseI(jobRepoVar, cfg, logger)

	customerPgrepo := customerPgRepo.CreateCustomerPgRepository(db)
	carPgrepo := customerPgRepo.CreateCarPgRepository(db)
	customerUC := customerUsecase.CreateCustomerUseCaseI(customerPgrepo, cfg, logger)
	carUC := customerUsecase.CreateCarUseCaseI(carPgrepo, cfg, logger)

	quotationRepoVar := quotationPgRepo.CreateQuotationPgRepository(db)
	quotationUC := quotationUsecase.CreateQuotationUseCaseI(quotationRepoVar, cfg, logger)

	authPgRepoVar := authPgRepo.CreateAuthPgRepository(db)
	_ = authPgRepoVar
	authUC := authUsecase.CreateAuthUseCaseI(userUC, cfg, logger)
	_ = authUC

	// --- 2. Middleware Manager ---
	mw := apiMiddleware.CreateMiddlewareManager(cfg, logger, userUC)
	apiMiddleware.StartMetricsCollector(redisClient)

	// --- 3. Router ---
	r := chi.NewRouter()

	// --- 4. Global middlewares ---
	r.Use(middleware.Recoverer)
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.URLFormat)
	r.Use(apiMiddleware.MonitoringMiddleware)
	r.Use(middleware.Logger)
	r.Use(middleware.Timeout(time.Duration(cfg.Server.ProcessTimeout) * time.Second))
	r.Use(render.SetContentType(render.ContentTypeJSON))
	r.Use(cors.Handler(mw.Cors()))

	// --- 5. API sub-router ---
	apiRouter := chi.NewRouter()
	r.Mount("/api", apiRouter)

	// --- 6. Core handlers ---
	userHandler := userHttp.CreateUserHandler(userUC, cfg, logger)
	authHandler := authHttp.CreateAuthHandler(userUC, cfg, logger)
	itemHandler := itemHttp.CreateItemHandler(itemUC, cfg, logger)
	poHandler := purchaseorderHttp.CreatePurchaseOrderHandler(poUC, cfg, logger)
	paymentHandler := paymentHttp.CreatePaymentHandler(paymentUC, cfg, logger)
	dashHandler := dashboardHttp.CreateDashboardHandler(dashUC, cfg, logger)
	docHandler := documentHttp.CreateDocumentHandler(docUC, cfg, logger)
	emailHandler := emailHttp.CreateEmailHandler(emailUC, cfg, logger)
	batchHandler := batchHttp.CreateBatchHandler(batchUC, cfg, logger)
	i18nHandler := i18nHttp.CreateI18nHandler(i18nUC, cfg, logger)
	wosHandler := wosHttp.CreateWosHandler(wosUC, cfg, logger)
	jobHandler := jobHttp.CreateJobHandler(jobUC, cfg, logger)
	customerHandler := customerHttp.CreateCustomerHandler(customerUC, carUC, cfg, logger)
	quotationHandler := quotationHttp.CreateQuotationHandler(quotationUC, cfg, logger)

	// --- 7. InfluxDB routes (optional) ---
	if influxClient != nil {
		influxUC := influxUsecase.NewInfluxUseCase(influxClient, logger)
		influxHandler := influxHttp.CreateInfluxHandler(influxUC, logger)
		influxHttp.MapInfluxRoutes(apiRouter, influxHandler, mw)
		logger.Info("✅ InfluxDB routes registered")
	} else {
		logger.Warn("⚠️ InfluxDB client is nil – Influx routes skipped")
	}

	// --- 8. WebSocket Hub & Alarm Log ---
	wsHub := websocket.NewHub(queue.NewQueue(), logger) // ใช้ NewHub แทน New
	go wsHub.Run()
	alarmLogRepo := repository.NewAlarmLogRepository(db)

	// --- 9. Redis Cache ---
	redisCache := redisDb.NewCache(redisClient)

	// --- 10. IoT MQTT v3 routes ---
	deviceRepo := iotRepo.NewDeviceRepository(db)
	iotAlarmLogRepo := iotRepo.NewAlarmLogRepository(db)
	deviceStatusRepo := iotRepo.NewDeviceStatusRepository(db)
	deviceConfigRepo := iotRepo.NewDeviceConfigRepository(db)
	iotDataRepo := iotRepo.NewIotDataRepository(db)
	activityLogRepo := iotRepo.NewActivityLogRepository(db)

	var commandLogRepo iotRepo.CommandLogRepository   // nil
	var deviceAlertRepo iotRepo.DeviceAlertRepository // nil

	iotUC := iotUsecase.NewMQTT3UseCase(
		deviceRepo,
		iotAlarmLogRepo,
		mqttClient,
		redisClient,
		influxClient,
		logger,
		cfg,
		deviceStatusRepo,
		deviceConfigRepo,
		iotDataRepo,
		activityLogRepo,
		commandLogRepo,
		deviceAlertRepo,
	)
	iotHandler := iotHttp.NewMQTT3Handler(iotUC, logger, redisCache)
	iotHttp.MapMQTT3Routes(apiRouter, iotHandler, mw)
	logger.Info("✅ MQTT3 routes registered")

	// --- 11. MQTT (standard) routes with WebSocket, alarm log, cache, influx ---
	if mqttClient != nil && mqttClient.IsConnected() {
		mqttUC, err := mqttUsecase.NewMQTTUseCaseWithClientAndWS(
			mqttClient,
			cfg,
			logger,
			wsHub, // wsHub implements Broadcaster
			db,
			alarmLogRepo,
			influxClient,
			redisCache,
		)
		if err != nil {
			logger.Errorf("❌ Failed to create MQTT usecase: %v", err)
		} else {
			mqttHandler := mqttHttp.CreateMQTTHandler(mqttUC, logger, redisCache)
			mqttHttp.MapMQTTRoutes(apiRouter, mqttHandler, mw)
			logger.Info("✅ MQTT routes registered with WebSocket, alarm log, cache & InfluxDB")
		}
	} else {
		logger.Warn("⚠️ MQTT client not connected – MQTT routes skipped")
	}

	// --- 12. Alarm routes ---
	alarmUC := alarmUsecase.NewAlarmUseCase()
	alarmHandler := alarmHttp.NewAlarmHandler(alarmUC, logger)
	alarmHttp.MapAlarmRoutes(apiRouter, alarmHandler, mw)

	// --- 13. Auth, user, item routes ---
	authHttp.MapAuthRoute(apiRouter, authHandler, mw)
	userHttp.MapUserRoute(apiRouter, userHandler, mw)
	itemHttp.MapItemRoute(apiRouter, itemHandler, mw)

	// --- 14. New module routes ---
	purchaseorderHttp.MapPurchaseOrderRoute(apiRouter, poHandler, mw)
	paymentHttp.MapPaymentRoute(apiRouter, paymentHandler, mw)
	paymentHttp.MapReceiptRoute(apiRouter, paymentHandler, mw)
	dashboardHttp.MapDashboardRoute(r, dashHandler, mw)
	documentHttp.MapDocumentRoute(r, docHandler, mw)
	emailHttp.MapEmailRoute(r, emailHandler, mw)
	batchHttp.MapBatchRoute(r, batchHandler, mw)
	i18nHttp.MapI18nRoute(r, i18nHandler, mw)
	wosHttp.MapWosRoute(r, wosHandler, mw)
	jobHttp.MapJobRoute(apiRouter, jobHandler, mw)
	customerHttp.MapCustomerRoute(apiRouter, customerHandler, mw)
	quotationHttp.MapQuotationRoute(apiRouter, quotationHandler, mw)
	logger.Info("✅ New module routes registered")

	// --- 16. WebSocket endpoint ---
	wsHandler := wsdelivery.NewWsHandler(wsHub, nil, logger) // usecase nil (ไม่ต้องบันทึกใน API server หลัก)
	apiRouter.Get("/ws", wsHandler.ServeHTTP)

	// --- 17. Metrics ---
	r.Get("/apimetric", apiMiddleware.MetricsHandler)
	r.Get("/metrics", promhttp.Handler().ServeHTTP)

	// --- 18. Swagger ---
	r.Get("/swagger/*", httpSwagger.Handler(httpSwagger.URL("/swagger/doc.json")))

	// --- 19. Health check ---
	apiRouter.Get("/ping", func(w http.ResponseWriter, r *http.Request) {
		render.Respond(w, r, map[string]string{"status": "ok", "timestamp": time.Now().UTC().String()})
	})

	// Detailed health
	apiRouter.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		status := map[string]interface{}{
			"status": "up",
			"checks": map[string]bool{
				"database":  db != nil,
				"redis":     redisClient != nil,
				"influxdb":  influxClient != nil,
				"mqtt":      mqttClient != nil && mqttClient.IsConnected(),
				"websocket": true,
			},
		}
		render.Respond(w, r, status)
	})

	return r, nil
}
