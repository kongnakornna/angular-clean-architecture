# Shared Module

โมดูลรวม components, pipes, directives, และ route guards ที่สามารถใช้ซ้ำได้ทั่วทั้งแอปพลิเคชัน

## โครงสร้างโฟลเดอร์

```
shared/
├── components/
│   ├── buttons/
│   │   └── primary-button.component.ts   # PrimaryButtonComponent
│   ├── modals/
│   │   └── confirm-modal.component.ts    # ConfirmModalComponent
│   └── toast/
│       └── toast.component.ts            # ToastComponent
├── directives/
│   └── click-outside.directive.ts        # ClickOutsideDirective
├── guards/
│   ├── auth.guard.ts                     # AuthGuard
│   └── permission.guard.ts               # PermissionGuard
├── pipes/
│   ├── translate.pipe.ts                 # TranslatePipe
│   ├── status-label.pipe.ts              # StatusLabelPipe
│   └── file-size.pipe.ts                 # FileSizePipe
├── services/
│   └── toast.service.ts                  # ToastService
├── shared.module.ts
└── README.md
```

## Components

### PrimaryButtonComponent

ปุ่มหลักของระบบ รองรับการปรับแต่งผ่าน `@Input()` properties

### ConfirmModalComponent

Modal ยืนยันการกระทำ ใช้สำหรับการลบหรือการกระทำที่ต้องยืนยันก่อนดำเนินการ

### ToastComponent

แสดงข้อความแจ้งเตือนแบบชั่วคราว (toast notification) ทำงานร่วมกับ `ToastService`

## Services

### ToastService

Service สำหรับจัดการการแสดงผล toast notification:
- ใช้ `BehaviorSubject<Toast>` เพื่อส่งสถานะการแสดงผล
- รองรับ ToastType: `warning`, `success`, `info`, `error`
- Method `show({ title, message?, type? })` - แสดง toast
- Method `close()` - ปิด toast
- Auto-close หลังจาก 5 วินาที

## Pipes

### TranslatePipe

Pipe สำหรับแปลงข้อความหลายภาษา (`{{ 'app.name' | translate }}`) ยังอยู่ในระหว่างการพัฒนา (`TODO: integrate with i18n module`)

### StatusLabelPipe

Pipe สำหรับแปลง status string เป็น label ภาษาไทย ใช้ `Helpers.getStatusLabel()` จาก Core Module

| Status value | Label |
|---|---|
| `pending` | รอดำเนินการ |
| `assigned` | มอบหมายแล้ว |
| `in_progress` | กำลังดำเนินการ |
| `completed` | เสร็จสิ้น |
| `approved` | อนุมัติแล้ว |
| `rejected` | ปฏิเสธ |

### FileSizePipe

Pipe สำหรับแปลงขนาดไฟล์เป็นรูปแบบที่อ่านง่าย (Bytes, KB, MB, GB) ใช้ `Formatters.fileSize()` จาก Core Module

## Directives

### ClickOutsideDirective

Directive สำหรับตรวจจับการคลิกนอก element:
- Selector: `[clickOutside]`
- Output event: `clickOutside`
- ใช้ `@HostListener('document:click')` ตรวจสอบว่าคลิกนอก element หรือไม่
- เหมาะสำหรับปิด dropdown, modal, popup เมื่อคลิกภายนอก

## Guards

### AuthGuard

Route guard สำหรับตรวจสอบสถานะการล็อกอิน:
- อ่าน `access_token` จาก `localStorage` ด้วย `APP_CONSTANTS.TOKEN_KEY`
- ถ้ามี token → ผ่าน (`return true`)
- ถ้าไม่มี token → redirect ไป `/login`

### PermissionGuard

Route guard สำหรับตรวจสอบสิทธิ์การเข้าถึง:
- อ่าน permission ที่ต้องการจาก `route.data['permission']`
- ถ้าไม่มีการกำหนด permission → ผ่าน
- ถ้ามี → ตรวจสอบสิทธิ์ (ยังเป็น TODO: คืน `true` เสมอ)
- ถ้าไม่มีสิทธิ์ → redirect ไป `/dashboard`

## การ register

Components, pipes, directives ทั้งหมดถูกประกาศใน `SharedModule` และ export ออกไปให้ module อื่นใช้งาน:

```typescript
declarations: [
  PrimaryButtonComponent, ConfirmModalComponent, ToastComponent,
  TranslatePipe, StatusLabelPipe, FileSizePipe,
  ClickOutsideDirective,
],
exports: [
  PrimaryButtonComponent, ConfirmModalComponent, ToastComponent,
  TranslatePipe, StatusLabelPipe, FileSizePipe,
  ClickOutsideDirective,
]
```

## Dependencies

- `CommonModule` - directives พื้นฐานของ Angular
- `RouterModule` - สำหรับ routerLink ใน components
- `TablerIconsModule` - ไอคอนจาก angular-tabler-icons
- Core Module - ใช้ `APP_CONSTANTS`, `Helpers`, `Formatters`
