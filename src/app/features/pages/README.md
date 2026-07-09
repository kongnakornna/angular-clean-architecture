# Pages Module — หน้าสาธิต

โมดูลรวบรวมหน้าสาธิต (UI Demo Pages) สำหรับแสดงตัวอย่างการใช้งาน component และ layout ต่าง ๆ ในระบบ

## โครงสร้างโฟลเดอร์

```
pages/presentation/
└── pages/
    ├── activity/         # หน้ากิจกรรม
    ├── alerts/           # หน้าแจ้งเตือน/alert
    ├── blank/            # หน้าว่างเปล่า
    ├── buttons/          # ตัวอย่างปุ่ม
    ├── cards/            # ตัวอย่างการ์ด
    ├── charts/           # ตัวอย่างกราฟ
    ├── chat/             # หน้าสนทนา
    ├── email-inbox/      # หน้ากล่องจดหมาย
    ├── empty/            # หน้าว่าง
    ├── faq/              # คำถามที่พบบ่อย
    ├── form-elements/    # ตัวอย่างฟอร์ม
    ├── gallery/          # แกลเลอรีรูปภาพ
    ├── icons/            # ตัวอย่างไอคอน
    ├── invoice/          # ตัวอย่างใบแจ้งหนี้
    ├── logs/             # ตัวอย่างบันทึกระบบ
    ├── maps/             # ตัวอย่างแผนที่
    ├── modals/           # ตัวอย่าง modal
    ├── pricing/          # หน้าราคา
    ├── profile/          # หน้าโปรไฟล์
    ├── search-results/   # หน้าผลการค้นหา
    ├── settings/         # หน้าตั้งค่า
    ├── tables/           # ตัวอย่างตาราง
    ├── tasks/            # หน้างาน
    ├── typography/       # ตัวอย่างตัวอักษร
    └── users/            # หน้ารายชื่อผู้ใช้
```

## รายละเอียด

เป็นโมดูลที่ใช้ร่วมกับธีม Tabler สำหรับแสดงตัวอย่าง UI component ต่าง ๆ และใช้เป็น template สำหรับพัฒนา feature ใหม่ในอนาคต

| Component | Tabler Page Reference | Description |
|-----------|----------------------|-------------|
| ActivityComponent | `pages/activity.html` | ฟีดกิจกรรม |
| AlertsComponent | `pages/alerts.html` | ระบบแจ้งเตือน |
| CardsComponent | `cards.html` | การ์ดประเภทต่าง ๆ |
| ChartsComponent | `charts.html` | กราฟด้วย ApexCharts |
| ChatComponent | `pages/chat.html` | หน้าสนทนา |
| FormElementsComponent | `forms/form-elements.html` | ตัวอย่างฟอร์ม |
| InvoiceComponent | `pages/invoice.html` | หน้าแสดงใบแจ้งหนี้ |
| PricingComponent | `pages/pricing.html` | หน้าราคา |