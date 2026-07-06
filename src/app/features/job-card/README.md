# Job Card Module (โมดูลงานซ่อม)

## ภาพรวมของโมดูล

โมดูล Job Card (`JobCardModule`) ใช้สำหรับจัดการใบงานซ่อม/งานบริการในระบบ ICMON ประกอบด้วยการสร้างใบงาน การกำหนดผู้รับผิดชอบ การติดตามสถานะ การจัดการอะไหล่ และบริการต่าง ๆ

โมดูลนี้เป็น **โมดูลเดียวในโปรเจกต์ที่ใช้ NgModule แบบดั้งเดิม (traditional NgModule)** แทนที่จะใช้ standalone components

---

## โครงสร้างโฟลเดอร์

```
job-card/
├── domain/
│   ├── entities/
│   │   └── job-card.entity.ts
│   ├── repositories/
│   │   └── job-card.repository.ts
│   └── use-cases/
│       ├── list-jobs.use-case.ts
│       ├── get-job.use-case.ts
│       ├── create-job.use-case.ts
│       ├── update-job.use-case.ts
│       ├── update-job-status.use-case.ts
│       └── assign-job.use-case.ts
├── data/
│   ├── datasources/
│   │   └── job-card.api.datasource.ts
│   ├── dtos/
│   │   ├── create-job-request.dto.ts
│   │   └── job-response.dto.ts
│   └── repositories/
│       └── job-card.repository.impl.ts
├── presentation/
│   └── pages/
│       ├── job-list/
│       │   ├── job-list.component.ts
│       │   ├── job-list.component.html
│       │   └── job-list.component.spec.ts
│       ├── job-board/          (ยังไม่ได้สร้าง)
│       ├── job-create/         (ยังไม่ได้สร้าง)
│       └── job-detail/         (ยังไม่ได้สร้าง)
└── job-card.module.ts
```

### Domain Layer (ชั้นโดเมน)

| ไฟล์ | หน้าที่ |
|------|--------|
| `entities/job-card.entity.ts` | นิยาม Entity `JobCard`, `PartUsed`, `JobNote`, `Attachment` |
| `repositories/job-card.repository.ts` | Interface `IJobCardRepository` สำหรับสัญญากับ Data Layer |
| `use-cases/list-jobs.use-case.ts` | Use case สำหรับดึงรายการงานซ่อมแบบแบ่งหน้า |
| `use-cases/get-job.use-case.ts` | Use case สำหรับดึงข้อมูลงานซ่อมตาม ID |
| `use-cases/create-job.use-case.ts` | Use case สำหรับสร้างใบงานซ่อมใหม่ |
| `use-cases/update-job.use-case.ts` | Use case สำหรับอัปเดตข้อมูลงานซ่อม |
| `use-cases/update-job-status.use-case.ts` | Use case สำหรับเปลี่ยนสถานะงานซ่อม |
| `use-cases/assign-job.use-case.ts` | Use case สำหรับกำหนดผู้รับผิดชอบงานซ่อม |

### Data Layer (ชั้นข้อมูล)

| ไฟล์ | หน้าที่ |
|------|--------|
| `datasources/job-card.api.datasource.ts` | Data Source สำหรับเรียก API ด้วย HttpClient |
| `dtos/create-job-request.dto.ts` | DTO สำหรับส่งข้อมูลสร้างงานซ่อม |
| `dtos/job-response.dto.ts` | DTO สำหรับรับข้อมูลงานซ่อมจาก API |
| `repositories/job-card.repository.impl.ts` | Implement `IJobCardRepository` แปลง DTO → Entity |

### Presentation Layer (ชั้นนำเสนอ)

| ไฟล์ | หน้าที่ |
|------|--------|
| `pages/job-list/job-list.component.ts` | Component แสดงรายการงานซ่อม (standalone) |
| `pages/job-list/job-list.component.html` | เทมเพลตของ JobListComponent |

---

## API Endpoints ที่ใช้งาน

| Method | Endpoint | คำอธิบาย |
|--------|----------|----------|
| GET | `/api/v1/jobs` | ดึงรายการงานซ่อม (รองรับ pagination, filter) |
| POST | `/api/v1/jobs` | สร้างใบงานซ่อมใหม่ |
| GET | `/api/v1/jobs/{id}` | ดึงข้อมูลงานซ่อมตาม ID |
| PUT | `/api/v1/jobs/{id}` | อัปเดตข้อมูลงานซ่อม |
| DELETE | `/api/v1/jobs/{id}` | ลบงานซ่อม (soft delete) |
| PUT | `/api/v1/jobs/{id}/status` | เปลี่ยนสถานะงานซ่อม |
| GET | `/api/v1/jobs/{id}/history` | ดึงประวัติการเปลี่ยนสถานะ |
| POST | `/api/v1/jobs/{id}/parts` | เพิ่มอะไหล่ในงานซ่อม |
| POST | `/api/v1/jobs/{id}/services` | เพิ่มบริการในงานซ่อม |
| GET | `/api/v1/jobs/{jobId}/parts` | ดึงรายการอะไหล่ของงาน |
| DELETE | `/api/v1/jobs/{jobId}/parts/{partSaleId}` | ลบอะไหล่ออกจากงาน |
| POST | `/api/v1/jobs/{jobId}/services` | เพิ่มรายการบริการในงาน |
| GET | `/api/v1/jobs/report/{id}` | สร้าง PDF รายงานงานซ่อม |

---

## การใช้ NgModule และ Child Routes

โมดูลนี้เป็นโมดูลเดียวในระบบที่ยังคงใช้ **NgModule แบบดั้งเดิม** (ไม่ใช้ standalone components สำหรับโมดูล) โดยมีการประกาศ routes ใน `job-card.module.ts` ดังนี้:

```typescript
const routes: Routes = [
  { path: '', component: JobListComponent },       // /jobs
  { path: 'board', component: JobListComponent },   // /jobs/board
  { path: 'create', component: JobListComponent },  // /jobs/create
  { path: ':id', component: JobListComponent },     // /jobs/:id
  { path: 'edit/:id', component: JobListComponent },// /jobs/edit/:id
];
```

**หมายเหตุ:** ปัจจุบันทุก route ถูก map ไปยัง `JobListComponent` และ component สำหรับ `job-board`, `job-create`, และ `job-detail` ยังไม่ได้ถูกสร้างขึ้น

Route Configuration:
- `RouterModule.forChild(routes)` ใช้สำหรับ child routing
- โมดูลนี้ถูก import ใน parent routing ด้วย lazy-loading

---

## Dependency Injection

ใช้ Injection Token `JOB_CARD_REPOSITORY` จาก `core/di/tokens.ts` เพื่อ inject repository:

```typescript
export const JOB_CARD_REPOSITORY = new InjectionToken<IJobCardRepository>('job-card.repository');
```

Provider mapping อยู่ใน `core/di/providers.ts`:

```typescript
{ provide: JOB_CARD_REPOSITORY, useClass: JobCardRepositoryImpl }
```

Use cases ทั้งหมดใช้ `@Inject(JOB_CARD_REPOSITORY)` เพื่อรับ repository ผ่าน constructor
