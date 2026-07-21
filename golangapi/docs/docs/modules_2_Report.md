Updated todo list

Read [](file:///c%3A/github/javaspringdddclean/docs/modules_2.md#1-1), lines 1 to 200

Read [](file:///c%3A/github/javaspringdddclean/docs/modules_2.md#200-200), lines 200 to 500

Read [](file:///c%3A/github/javaspringdddclean/docs/modules_2.md#500-500), lines 500 to 740

Let me check the shared application layer first: 

Read [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/_shared/application)

Good. Now I'll create all files for the `job` module. Starting with domain, then infrastructure, then application, then presentation: 

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/domain/enums/JobStatus.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/domain/valueobjects/JobNumber.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/domain/valueobjects/Mileage.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/domain/TJob.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/domain/TJobService.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/domain/TJobPartSales.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/domain/TJobServiceCarSymptom.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/domain/TJobDiagTroubleCode.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/domain/TJobStatusHistory.java)

Created 7 todos

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/infrastructure/entity/JobEntity.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/infrastructure/entity/JobServiceEntity.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/infrastructure/entity/JobPartSalesEntity.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/infrastructure/entity/JobSymptomEntity.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/infrastructure/entity/JobDiagCodeEntity.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/infrastructure/entity/JobStatusHistoryEntity.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/infrastructure/repository/JobRepository.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/infrastructure/repository/JobServiceRepository.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/infrastructure/repository/JobPartSalesRepository.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/infrastructure/repository/JobSymptomRepository.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/infrastructure/repository/JobDiagCodeRepository.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/infrastructure/repository/JobStatusHistoryRepository.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/infrastructure/repository/impl/JobRepositoryImpl.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/infrastructure/repository/impl/JobServiceRepositoryImpl.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/infrastructure/repository/impl/JobPartSalesRepositoryImpl.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/infrastructure/mapper/JobMapper.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/infrastructure/mapper/JobServiceMapper.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/infrastructure/mapper/JobPartSalesMapper.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/infrastructure/cache/JobCacheService.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/infrastructure/cache/JobStatusCacheService.java)

Starting: *Implement application layer services* (2/7)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/presentation/dto/request/JobCreateRequestDTO.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/presentation/dto/request/JobUpdateRequestDTO.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/presentation/dto/request/JobStatusChangeRequestDTO.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/presentation/dto/request/JobServiceRequestDTO.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/presentation/dto/request/JobPartRequestDTO.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/presentation/dto/response/JobResponseDTO.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/presentation/dto/response/JobDetailResponseDTO.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/presentation/dto/response/JobStatusHistoryDTO.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/presentation/dto/response/JobServiceResponseDTO.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/presentation/dto/response/JobPartResponseDTO.java)

Now create the service interfaces, impls, use cases, controllers, and validator:  

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/application/interfaces/JobService.java)

 

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/application/interfaces/JobStatusService.java)

 

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/application/interfaces/JobPartSaleService.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/application/impl/JobServiceImpl.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/application/impl/JobStatusServiceImpl.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/application/impl/JobPartSaleServiceImpl.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/application/usecase/CreateJobUseCase.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/application/usecase/UpdateJobUseCase.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/application/usecase/GetJobUseCase.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/application/usecase/DeleteJobUseCase.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/application/usecase/ChangeJobStatusUseCase.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/application/usecase/AddJobServiceUseCase.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/application/usecase/AddJobPartUseCase.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/application/usecase/ListJobsByStatusUseCase.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/presentation/controller/JobController.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/presentation/controller/JobServiceController.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/presentation/controller/JobPartController.java)

Created [](file:///c%3A/github/javaspringdddclean/src/main/java/com/icmon/module/job/presentation/validator/JobValidator.java)

Finally, the DB migration file:    

Created [](file:///c%3A/github/javaspringdddclean/src/main/resources/db/migration/V2__job_card_schema.sql)

Updated todo list

สร้าง `module/job` เสร็จสมบูรณ์แล้ว สรุปสิ่งที่ทำ:

---

## สร้าง `module/job` (modules_2.md) เสร็จสมบูรณ์

โครงสร้างที่สร้างตาม spec ใช้ package `com.icmon.module.job`:

| Layer | ไฟล์ที่สร้าง |
|---|---|
| **domain/** | `TJob`, `TJobService`, `TJobPartSales`, `TJobServiceCarSymptom`, `TJobDiagTroubleCode`, `TJobStatusHistory` |
| **domain/enums/** | `JobStatus` (14 สถานะ) |
| **domain/valueobjects/** | `JobNumber`, `Mileage` |
| **infrastructure/entity/** | 6 entities (`JobEntity`, `JobServiceEntity`, `JobPartSalesEntity`, `JobSymptomEntity`, `JobDiagCodeEntity`, `JobStatusHistoryEntity`) |
| **infrastructure/repository/** | 6 JPA repositories + 3 impl wrappers |
| **infrastructure/mapper/** | `JobMapper`, `JobServiceMapper`, `JobPartSalesMapper` |
| **infrastructure/cache/** | `JobCacheService` (`@Cacheable`/`@CachePut`/`@CacheEvict`), `JobStatusCacheService` |
| **application/interfaces/** | `JobService`, `JobStatusService`, `JobPartSaleService` |
| **application/impl/** | `JobServiceImpl`, `JobStatusServiceImpl`, `JobPartSaleServiceImpl` |
| **application/usecase/** | 8 use cases |
| **presentation/controller/** | `JobController` (10 endpoints + Rate Limit), `JobServiceController`, `JobPartController` |
| **presentation/dto/** | 5 request DTOs + 5 response DTOs |
| **presentation/validator/** | `JobValidator` |
| **db/migration/** | V2__job_card_schema.sql (6 ตาราง + Auto-generate job_no Trigger) |

Made changes.