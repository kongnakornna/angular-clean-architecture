/*
 * ============================================================================
 * Seed Data for New Business Modules
 * Version: 20260712
 * Description: Demo/seed data for all new modules.
 * ============================================================================
 */

-- ============================================================================
-- Seed: Email Config
-- ============================================================================
INSERT INTO email_config (smtp_host, smtp_port, smtp_user, smtp_pass, from_email, from_name, is_active)
VALUES ('smtp.gmail.com', 587, 'noreply@example.com', 'app_password', 'noreply@example.com', 'ICMON System', true)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- Seed: I18n Translations (Thai + English)
-- ============================================================================
INSERT INTO m_translation (locale, key, value) VALUES
('th', 'common.save', 'บันทึก'),
('th', 'common.cancel', 'ยกเลิก'),
('th', 'common.delete', 'ลบ'),
('th', 'common.search', 'ค้นหา'),
('th', 'common.print', 'พิมพ์'),
('th', 'common.export', 'ส่งออก'),
('th', 'common.status', 'สถานะ'),
('th', 'common.created_at', 'วันที่สร้าง'),
('th', 'common.updated_at', 'วันที่แก้ไข'),
('th', 'job.title', 'ใบงานซ่อม'),
('th', 'job.create', 'สร้างใบงาน'),
('th', 'job.edit', 'แก้ไขใบงาน'),
('th', 'job.status.open', 'เปิดใบงาน'),
('th', 'job.status.in_progress', 'กำลังดำเนินการ'),
('th', 'job.status.repair_done', 'ซ่อมเสร็จ'),
('th', 'job.status.closed', 'ปิดงาน'),
('th', 'job.status.cancelled', 'ยกเลิก'),
('th', 'customer.title', 'ข้อมูลลูกค้า'),
('th', 'customer.create', 'เพิ่มลูกค้า'),
('th', 'customer.edit', 'แก้ไขลูกค้า'),
('th', 'car.title', 'ข้อมูลรถยนต์'),
('th', 'car.create', 'เพิ่มรถยนต์'),
('th', 'quotation.title', 'ใบเสนอราคา'),
('th', 'quotation.create', 'สร้างใบเสนอราคา'),
('th', 'quotation.approve', 'อนุมัติ'),
('th', 'quotation.reject', 'ปฏิเสธ'),
('th', 'payment.title', 'การชำระเงิน'),
('th', 'receipt.title', 'ใบเสร็จรับเงิน'),
('th', 'po.title', 'ใบสั่งซื้อ'),
('th', 'po.create', 'สร้างใบสั่งซื้อ'),
('th', 'po.receive', 'รับสินค้า'),
('th', 'dashboard.title', 'แดชบอร์ด'),
('en', 'common.save', 'Save'),
('en', 'common.cancel', 'Cancel'),
('en', 'common.delete', 'Delete'),
('en', 'common.search', 'Search'),
('en', 'common.print', 'Print'),
('en', 'common.export', 'Export'),
('en', 'common.status', 'Status'),
('en', 'common.created_at', 'Created At'),
('en', 'common.updated_at', 'Updated At'),
('en', 'job.title', 'Job Card'),
('en', 'job.create', 'Create Job'),
('en', 'job.edit', 'Edit Job'),
('en', 'job.status.open', 'Open'),
('en', 'job.status.in_progress', 'In Progress'),
('en', 'job.status.repair_done', 'Repair Done'),
('en', 'job.status.closed', 'Closed'),
('en', 'job.status.cancelled', 'Cancelled'),
('en', 'customer.title', 'Customer'),
('en', 'customer.create', 'Add Customer'),
('en', 'customer.edit', 'Edit Customer'),
('en', 'car.title', 'Vehicle'),
('en', 'car.create', 'Add Vehicle'),
('en', 'quotation.title', 'Quotation'),
('en', 'quotation.create', 'Create Quotation'),
('en', 'quotation.approve', 'Approve'),
('en', 'quotation.reject', 'Reject'),
('en', 'payment.title', 'Payment'),
('en', 'receipt.title', 'Receipt'),
('en', 'po.title', 'Purchase Order'),
('en', 'po.create', 'Create PO'),
('en', 'po.receive', 'Receive Goods'),
('en', 'dashboard.title', 'Dashboard')
ON CONFLICT (locale, key) DO NOTHING;

-- ============================================================================
-- Seed: Demo Customers
-- ============================================================================
INSERT INTO m_customer (id, customer_code, full_name, display_name, customer_type, status, email, phone_number, address, province, city, user_id, whitelabel_id)
VALUES
('a1000000-0000-0000-0000-000000000001', 'CUST-2026-0001', 'สมชาย ใจดี', 'คุณสมชาย', 'INDIVIDUAL', 'ACTIVE', 'somchai@email.com', '0812345678', '123 ถนนสุขุมวิท', 'กรุงเทพฯ', 'วัฒนา', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda'),
('a1000000-0000-0000-0000-000000000002', 'CUST-2026-0002', 'บริษัท ขนส่งไทย จำกัด', 'ขนส่งไทย', 'CORPORATE', 'ACTIVE', 'info@transport-thai.com', '029998877', '456 ถนนพหลโยธิน', 'กรุงเทพฯ', 'จตุจักร', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda'),
('a1000000-0000-0000-0000-000000000003', 'CUST-2026-0003', 'มานะ มีทรัพย์', 'คุณมานะ', 'INDIVIDUAL', 'ACTIVE', 'manah@email.com', '0876543210', '789 ถนนรามคำแหง', 'กรุงเทพฯ', 'บางกะปิ', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- Seed: Demo Cars
-- ============================================================================
INSERT INTO m_car (id, customer_id, license_plate, province, brand, model, year, color, fuel_type, transmission_type, mileage, user_id, whitelabel_id)
VALUES
('b2000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'กพ1234', 'กรุงเทพฯ', 'Toyota', 'Camry', 2020, 'ขาว', 'GASOLINE', 'AUTOMATIC', 45000, '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda'),
('b2000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'ขท5678', 'กรุงเทพฯ', 'Honda', 'City', 2022, 'แดง', 'GASOLINE', 'CVT', 15000, '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda'),
('b2000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000002', 'งช9101', 'กรุงเทพฯ', 'Isuzu', 'D-Max', 2021, 'เงิน', 'DIESEL', 'AUTOMATIC', 85000, '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda'),
('b2000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000003', 'ศม2345', 'กรุงเทพฯ', 'Mitsubishi', 'Triton', 2023, 'ดำ', 'DIESEL', 'AUTOMATIC', 22000, '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- Seed: Demo Jobs
-- ============================================================================
INSERT INTO t_job (id, job_no, customer_id, car_id, mechanic_id, status, start_date, symptom, diagnosis_note, mileage, priority, user_id, whitelabel_id)
VALUES
('c3000000-0000-0000-0000-000000000001', 'JOB-2026-0001', 'a1000000-0000-0000-0000-000000000001', 'b2000000-0000-0000-0000-000000000001', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', 'IN_PROGRESS', NOW() - INTERVAL '2 days', 'เครื่องสั่นเวลาเร่งเครื่อง', 'พบหัวเทียนหมดอายุ ต้องเปลี่ยน', 45000, 'NORMAL', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda'),
('c3000000-0000-0000-0000-000000000002', 'JOB-2026-0002', 'a1000000-0000-0000-0000-000000000001', 'b2000000-0000-0000-0000-000000000002', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', 'OPEN', NOW() - INTERVAL '1 day', 'เสียงเบรกดังเอี๊ยด', NULL, 15000, 'URGENT', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda'),
('c3000000-0000-0000-0000-000000000003', 'JOB-2026-0003', 'a1000000-0000-0000-0000-000000000003', 'b2000000-0000-0000-0000-000000000004', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', 'REPAIR_DONE', NOW() - INTERVAL '5 days', 'เปลี่ยนถ่ายน้ำมันเครื่อง + ไส้กรอง', 'เปลี่ยนน้ำมันเครื่อง Mobil 1 5W30 + กรองเครื่องแท้', 22000, 'NORMAL', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- Seed: Demo Job Services
-- ============================================================================
INSERT INTO t_job_service (id, job_id, service_id, quantity, unit_price, discount, note, user_id, whitelabel_id)
VALUES
('d4000000-0000-0000-0000-000000000001', 'c3000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 1, 500.00, 0, 'เปลี่ยนหัวเทียน', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda'),
('d4000000-0000-0000-0000-000000000002', 'c3000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 1, 200.00, 0, 'ตรวจเช็คระบบจุดระเบิด', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda'),
('d4000000-0000-0000-0000-000000000003', 'c3000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 1, 300.00, 0, 'เปลี่ยนถ่ายน้ำมันเครื่อง', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda'),
('d4000000-0000-0000-0000-000000000004', 'c3000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000004', 1, 150.00, 0, 'เปลี่ยนไส้กรองเครื่อง', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- Seed: Demo Job Parts
-- ============================================================================
INSERT INTO t_job_part_sales (id, job_id, part_id, quantity, unit_price, discount, note, user_id, whitelabel_id)
VALUES
('e5000000-0000-0000-0000-000000000001', 'c3000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000011', 4, 150.00, 0, 'หัวเทียน NGK Iridium', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda'),
('e5000000-0000-0000-0000-000000000002', 'c3000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000012', 1, 850.00, 0, 'น้ำมันเครื่อง Mobil 5W30 4L', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda'),
('e5000000-0000-0000-0000-000000000003', 'c3000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000013', 1, 250.00, 0, 'ไส้กรองเครื่องแท้ Honda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- Seed: Demo Quotations
-- ============================================================================
INSERT INTO t_quotation (id, quotation_no, job_id, customer_id, quotation_date, expiry_date, status, subtotal, tax_rate, tax_amount, total, user_id, whitelabel_id)
VALUES
('f6000000-0000-0000-0000-000000000001', 'QT-2026-0001', 'c3000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', NOW(), NOW() + INTERVAL '7 days', 'DRAFT', 1100.00, 7.00, 77.00, 1177.00, '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda'),
('f6000000-0000-0000-0000-000000000002', 'QT-2026-0002', 'c3000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000003', NOW(), NOW() + INTERVAL '7 days', 'APPROVED', 1550.00, 7.00, 108.50, 1658.50, '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- Seed: Demo Quotation Parts
-- ============================================================================
INSERT INTO t_quotation_part (id, quotation_id, part_id, quantity, unit_price, discount, note, user_id, whitelabel_id)
VALUES
('g7000000-0000-0000-0000-000000000001', 'f6000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000011', 4, 150.00, 0, 'หัวเทียน NGK Iridium', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- Seed: Demo Quotation Services
-- ============================================================================
INSERT INTO t_quotation_service (id, quotation_id, service_id, quantity, unit_price, discount, note, user_id, whitelabel_id)
VALUES
('h8000000-0000-0000-0000-000000000001', 'f6000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 1, 500.00, 0, 'ค่าแรงเปลี่ยนหัวเทียน', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda'),
('h8000000-0000-0000-0000-000000000002', 'f6000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 1, 200.00, 0, 'ค่าแรงตรวจเช็คระบบ', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- Seed: Demo Purchase Orders
-- ============================================================================
INSERT INTO t_po_header (id, po_no, supplier_name, status, expected_delivery_date, total_amount, net_amount, user_id, whitelabel_id)
VALUES
('i9000000-0000-0000-0000-000000000001', 'PO-2026-0001', 'บริษัท อะไหล่ไทย จำกัด', 'SENT', NOW() + INTERVAL '3 days', 600.00, 600.00, '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda')
ON CONFLICT DO NOTHING;

INSERT INTO t_po_detail (id, po_header_id, part_name, quantity, unit_price, total_price, net_price, user_id, whitelabel_id)
VALUES
('j0000000-0000-0000-0000-000000000001', 'i9000000-0000-0000-0000-000000000001', 'หัวเทียน NGK Iridium', 4, 150.00, 600.00, 600.00, '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- Seed: Demo Payments
-- ============================================================================
INSERT INTO t_payment (id, payment_no, customer_id, payment_date, payment_method, amount, status, user_id, whitelabel_id)
VALUES
('k1000000-0000-0000-0000-000000000001', 'PAY-2026-0001', 'a1000000-0000-0000-0000-000000000003', NOW(), 'CASH', 1658.50, 'COMPLETED', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda')
ON CONFLICT DO NOTHING;

INSERT INTO t_receipt (id, receipt_no, payment_id, receipt_date, amount, status, user_id, whitelabel_id)
VALUES
('l2000000-0000-0000-0000-000000000001', 'REC-2026-0001', 'k1000000-0000-0000-0000-000000000001', NOW(), 1658.50, 'ACTIVE', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda', '6b049b5e-88c8-4b1f-9a3b-8f8d30e68fda')
ON CONFLICT DO NOTHING;
