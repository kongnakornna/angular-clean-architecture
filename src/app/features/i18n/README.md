# i18n / Translation Module

โมดูลรองรับหลายภาษา (Internationalization) สำหรับแอปพลิเคชัน ปัจจุบันรองรับภาษาไทย (`th`) และอังกฤษ (`en`)

## โครงสร้างโฟลเดอร์

```
i18n/
├── domain/
│   ├── entities/
│   │   └── translation.entity.ts        # Translation interface, SupportedLanguage type
│   └── repositories/
│       └── translation.repository.ts    # ITranslationRepository interface
├── data/
│   ├── datasources/
│   │   └── translation-local.datasource.ts  # TranslationLocalDataSource
│   └── repositories/
│       └── translation.repository.impl.ts   # TranslationRepositoryImpl
├── presentation/                        # (พร้อมใช้งานในอนาคต)
└── README.md
```

## Domain Layer

### Entities

**`translation.entity.ts`**
```typescript
export interface Translation {
  key: string;       // เช่น 'app.name', 'nav.dashboard'
  value: string;     // ข้อความที่แปลแล้ว
  language: string;  // รหัสภาษา
}

export type SupportedLanguage = 'th' | 'en';
```

### Repository Interface

**`ITranslationRepository`** - กำหนดสัญญาสำหรับการเข้าถึงข้อมูลการแปลภาษา:
| Method | Parameters | Return | Description |
|---|---|---|---|
| `getTranslations` | `lang: SupportedLanguage` | `Observable<Translation[]>` | ดึงรายการข้อความแปลทั้งหมด |
| `setLanguage` | `lang: SupportedLanguage` | `void` | ตั้งค่าภาษาที่ใช้งาน |
| `getCurrentLanguage` | - | `SupportedLanguage` | อ่านภาษาปัจจุบัน |
| `getAvailableLanguages` | - | `SupportedLanguage[]` | รายการภาษาที่รองรับ |

## Data Layer

### Datasource

**`TranslationLocalDataSource`** - แหล่งข้อมูลแปลภาษาที่เก็บไว้ในโค้ด (local):
- เก็บ translations ใน object `Record<string, Record<string, string>>`
- แบ่งตามภาษา (th, en)
- Method `getTranslations(lang)` - แปลง object เป็น `Translation[]` array

### Repository Implementation

**`TranslationRepositoryImpl`** - implement `ITranslationRepository`:
- ใช้ `TranslationLocalDataSource` เป็นแหล่งข้อมูล
- อ่าน/เขียนภาษาปัจจุบันลง `localStorage` ด้วย key `APP_CONSTANTS.LANGUAGE_KEY`
- ค่าเริ่มต้น: `'th'`

## Presentation Layer

พร้อมสำหรับการเพิ่ม components สำหรับ:
- Language switcher dropdown
- UI สำหรับการจัดการ translations

## API Endpoints (สำหรับเชื่อมต่อ backend)

โมดูลนี้ถูกออกแบบให้สามารถเปลี่ยนจาก local datasource ไปใช้ API จริงได้ โดย implement `ITranslationRepository` ใหม่:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/languages` | ดึงรายการภาษาที่รองรับทั้งหมด |
| GET | `/api/v1/languages/messages/{languageCode}` | ดึงข้อความแปลตามรหัสภาษา |
| POST | `/api/v1/languages/switch` | สลับภาษาที่ใช้งาน |
| GET | `/api/v1/translations` | ดึงรายการ translations ทั้งหมด |
| POST | `/api/v1/translations` | สร้าง translation ใหม่ |
| PUT | `/api/v1/translations/{id}` | อัปเดต translation |
| DELETE | `/api/v1/translations/{id}` | ลบ translation |
| POST | `/api/v1/translations/bulk-import` | นำเข้า translations แบบ bulk |

## DI Registration

Repository ถูก register ผ่าน `REPOSITORY_PROVIDERS` ใน Core Module:

```typescript
// core/di/providers.ts
{ provide: TRANSLATION_REPOSITORY, useClass: TranslationRepositoryImpl }
```

## การเชื่อมต่อกับ TranslatePipe

`TranslatePipe` ใน `SharedModule` มี TODO ให้เชื่อมต่อกับ i18n module เมื่อพร้อม:

```typescript
@Pipe({ name: 'translate' })
export class TranslatePipe implements PipeTransform {
  transform(value: string): string {
    // TODO: integrate with i18n module
    return value;
  }
}
```

## ข้อความที่รองรับปัจจุบัน

| Category | ภาษาไทย | English |
|---|---|---|
| app.name | BizAdmin | BizAdmin |
| nav.* | เมนูนำทางภาษาไทย | Navigation in English |
| common.* | บันทึก, ยกเลิก, ลบ, ฯลฯ | Save, Cancel, Delete, etc. |
| login.* | เข้าสู่ระบบ, อีเมล, ฯลฯ | Login, Email, etc. |
| dashboard.* | แดชบอร์ด, งานทั้งหมด, ฯลฯ | Dashboard, Total Jobs, etc. |
