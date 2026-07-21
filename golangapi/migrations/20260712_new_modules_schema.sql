/*
 * ============================================================================
 * Migration: New Business Modules Schema
 * Version: 20260712
 * Description: Creates all tables for Purchase Order, Payment, Document, Email,
 *              Batch, I18n, WOS, Job, Customer, Quotation, Auth modules.
 * ============================================================================
 */

-- ============================================================================
-- Auth Module — Refresh Tokens
-- ============================================================================
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    token VARCHAR(512) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    revoked BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);

-- ============================================================================
-- Job Module (t_job, t_job_service, t_job_part_sales, etc.)
-- ============================================================================

-- Main job card table
CREATE TABLE IF NOT EXISTS t_job (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_no VARCHAR(20) UNIQUE NOT NULL,
    customer_id UUID NOT NULL,
    car_id UUID NOT NULL,
    mechanic_id UUID NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'OPEN',
    start_date TIMESTAMP NOT NULL DEFAULT NOW(),
    end_date TIMESTAMP,
    symptom TEXT,
    diagnosis_note TEXT,
    mileage INTEGER,
    estimated_cost DECIMAL(15,2),
    actual_cost DECIMAL(15,2),
    priority VARCHAR(20) DEFAULT 'NORMAL',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    deleted BOOLEAN DEFAULT FALSE,
    user_id UUID NOT NULL,
    whitelabel_id UUID NOT NULL
);
CREATE INDEX idx_t_job_customer ON t_job(customer_id);
CREATE INDEX idx_t_job_car ON t_job(car_id);
CREATE INDEX idx_t_job_mechanic ON t_job(mechanic_id);
CREATE INDEX idx_t_job_status ON t_job(status);
CREATE INDEX idx_t_job_whitelabel ON t_job(whitelabel_id);
CREATE INDEX idx_t_job_deleted ON t_job(deleted);
CREATE INDEX idx_t_job_created ON t_job(created_at);

-- Job services
CREATE TABLE IF NOT EXISTS t_job_service (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES t_job(id) ON DELETE CASCADE,
    service_id UUID NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(15,2) NOT NULL,
    discount DECIMAL(15,2) DEFAULT 0,
    note TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP,
    user_id UUID NOT NULL,
    whitelabel_id UUID NOT NULL
);
CREATE INDEX idx_t_job_service_job ON t_job_service(job_id);

-- Job part sales
CREATE TABLE IF NOT EXISTS t_job_part_sales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES t_job(id) ON DELETE CASCADE,
    part_id UUID NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(15,2) NOT NULL,
    discount DECIMAL(15,2) DEFAULT 0,
    note TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP,
    user_id UUID NOT NULL,
    whitelabel_id UUID NOT NULL
);
CREATE INDEX idx_t_job_part_sales_job ON t_job_part_sales(job_id);

-- Job symptoms
CREATE TABLE IF NOT EXISTS t_job_service_car_symptom (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES t_job(id) ON DELETE CASCADE,
    symptom_code VARCHAR(20),
    symptom_description TEXT NOT NULL,
    severity VARCHAR(20) DEFAULT 'MEDIUM',
    reported_by VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id UUID NOT NULL,
    whitelabel_id UUID NOT NULL
);
CREATE INDEX idx_t_job_symptom_job ON t_job_service_car_symptom(job_id);

-- Job diagnostic trouble codes
CREATE TABLE IF NOT EXISTS t_job_diag_trouble_code (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES t_job(id) ON DELETE CASCADE,
    trouble_code VARCHAR(20) NOT NULL,
    description TEXT,
    system VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id UUID NOT NULL,
    whitelabel_id UUID NOT NULL
);
CREATE INDEX idx_t_job_diag_code_job ON t_job_diag_trouble_code(job_id);

-- Job status history
CREATE TABLE IF NOT EXISTS t_job_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES t_job(id) ON DELETE CASCADE,
    from_status VARCHAR(30),
    to_status VARCHAR(30) NOT NULL,
    changed_by UUID NOT NULL,
    changed_at TIMESTAMP NOT NULL DEFAULT NOW(),
    reason TEXT,
    whitelabel_id UUID NOT NULL
);
CREATE INDEX idx_t_job_status_history_job ON t_job_status_history(job_id);
CREATE INDEX idx_t_job_status_history_changed ON t_job_status_history(changed_at);

-- ============================================================================
-- Customer Module (m_customer, m_car, m_car_service_history)
-- ============================================================================

-- Customer master
CREATE TABLE IF NOT EXISTS m_customer (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_code VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    display_name VARCHAR(200),
    customer_type VARCHAR(20) NOT NULL DEFAULT 'INDIVIDUAL',
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    tax_id VARCHAR(20),
    email VARCHAR(100),
    phone_number VARCHAR(20) NOT NULL,
    secondary_phone VARCHAR(20),
    address TEXT,
    province VARCHAR(100),
    city VARCHAR(100),
    district VARCHAR(100),
    postal_code VARCHAR(10),
    country VARCHAR(50) DEFAULT 'Thailand',
    contact_person VARCHAR(100),
    contact_phone VARCHAR(20),
    notes TEXT,
    last_visit_date TIMESTAMP,
    total_visit_count INTEGER DEFAULT 0,
    total_spent DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    deleted BOOLEAN DEFAULT FALSE,
    user_id UUID NOT NULL,
    whitelabel_id UUID NOT NULL
);
CREATE INDEX idx_m_customer_phone ON m_customer(phone_number);
CREATE INDEX idx_m_customer_email ON m_customer(email);
CREATE INDEX idx_m_customer_code ON m_customer(customer_code);
CREATE INDEX idx_m_customer_status ON m_customer(status);
CREATE INDEX idx_m_customer_whitelabel ON m_customer(whitelabel_id);
CREATE INDEX idx_m_customer_deleted ON m_customer(deleted);

-- Car/Vehicle master
CREATE TABLE IF NOT EXISTS m_car (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES m_customer(id) ON DELETE CASCADE,
    license_plate VARCHAR(20) UNIQUE NOT NULL,
    province VARCHAR(50),
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(100) NOT NULL,
    sub_model VARCHAR(100),
    year INTEGER,
    color VARCHAR(30),
    engine_number VARCHAR(50),
    chassis_number VARCHAR(50),
    fuel_type VARCHAR(20),
    transmission_type VARCHAR(20),
    engine_cc INTEGER,
    seating_capacity INTEGER,
    mileage INTEGER DEFAULT 0,
    last_service_date TIMESTAMP,
    next_service_mileage INTEGER,
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    deleted BOOLEAN DEFAULT FALSE,
    user_id UUID NOT NULL,
    whitelabel_id UUID NOT NULL
);
CREATE INDEX idx_m_car_customer ON m_car(customer_id);
CREATE INDEX idx_m_car_license_plate ON m_car(license_plate);
CREATE INDEX idx_m_car_brand ON m_car(brand);
CREATE INDEX idx_m_car_whitelabel ON m_car(whitelabel_id);
CREATE INDEX idx_m_car_deleted ON m_car(deleted);

-- Car service history
CREATE TABLE IF NOT EXISTS m_car_service_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id UUID NOT NULL REFERENCES m_car(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES t_job(id) ON DELETE CASCADE,
    service_date TIMESTAMP NOT NULL,
    service_type VARCHAR(50),
    description TEXT,
    total_cost DECIMAL(15,2),
    mileage_at_service INTEGER,
    mechanic_name VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    whitelabel_id UUID NOT NULL
);
CREATE INDEX idx_m_car_service_history_car ON m_car_service_history(car_id);
CREATE INDEX idx_m_car_service_history_date ON m_car_service_history(service_date);

-- ============================================================================
-- Quotation Module (t_quotation, t_quotation_part, t_quotation_service, etc.)
-- ============================================================================

CREATE TABLE IF NOT EXISTS t_quotation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quotation_no VARCHAR(20) UNIQUE NOT NULL,
    job_id UUID NOT NULL REFERENCES t_job(id) ON DELETE RESTRICT,
    customer_id UUID NOT NULL REFERENCES m_customer(id) ON DELETE RESTRICT,
    quotation_date TIMESTAMP NOT NULL DEFAULT NOW(),
    expiry_date TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    subtotal DECIMAL(15,2) NOT NULL DEFAULT 0,
    tax_rate DECIMAL(5,2) DEFAULT 7.00,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    discount_type VARCHAR(20),
    discount_value DECIMAL(15,2) DEFAULT 0,
    total DECIMAL(15,2) NOT NULL DEFAULT 0,
    amount_in_words_th TEXT,
    amount_in_words_en TEXT,
    currency VARCHAR(10) DEFAULT 'THB',
    exchange_rate DECIMAL(10,4) DEFAULT 1.0000,
    notes TEXT,
    terms_and_conditions TEXT,
    approved_by UUID,
    approved_at TIMESTAMP,
    rejected_reason TEXT,
    converted_to_po BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    deleted BOOLEAN DEFAULT FALSE,
    user_id UUID NOT NULL,
    whitelabel_id UUID NOT NULL
);
CREATE INDEX idx_t_quotation_job ON t_quotation(job_id);
CREATE INDEX idx_t_quotation_customer ON t_quotation(customer_id);
CREATE INDEX idx_t_quotation_status ON t_quotation(status);
CREATE INDEX idx_t_quotation_date ON t_quotation(quotation_date);
CREATE INDEX idx_t_quotation_whitelabel ON t_quotation(whitelabel_id);
CREATE INDEX idx_t_quotation_deleted ON t_quotation(deleted);

-- Quotation parts
CREATE TABLE IF NOT EXISTS t_quotation_part (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quotation_id UUID NOT NULL REFERENCES t_quotation(id) ON DELETE CASCADE,
    part_id UUID NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(15,2) NOT NULL,
    discount DECIMAL(15,2) DEFAULT 0,
    note TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP,
    user_id UUID NOT NULL,
    whitelabel_id UUID NOT NULL
);
CREATE INDEX idx_t_quotation_part_quotation ON t_quotation_part(quotation_id);
CREATE INDEX idx_t_quotation_part_part ON t_quotation_part(part_id);

-- Quotation services
CREATE TABLE IF NOT EXISTS t_quotation_service (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quotation_id UUID NOT NULL REFERENCES t_quotation(id) ON DELETE CASCADE,
    service_id UUID NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(15,2) NOT NULL,
    discount DECIMAL(15,2) DEFAULT 0,
    note TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP,
    user_id UUID NOT NULL,
    whitelabel_id UUID NOT NULL
);
CREATE INDEX idx_t_quotation_service_quotation ON t_quotation_service(quotation_id);
CREATE INDEX idx_t_quotation_service_service ON t_quotation_service(service_id);

-- Quotation status history
CREATE TABLE IF NOT EXISTS t_quotation_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quotation_id UUID NOT NULL REFERENCES t_quotation(id) ON DELETE CASCADE,
    from_status VARCHAR(20),
    to_status VARCHAR(20) NOT NULL,
    changed_by UUID NOT NULL,
    changed_at TIMESTAMP NOT NULL DEFAULT NOW(),
    reason TEXT,
    whitelabel_id UUID NOT NULL
);
CREATE INDEX idx_t_quotation_status_history_quotation ON t_quotation_status_history(quotation_id);
CREATE INDEX idx_t_quotation_status_history_changed ON t_quotation_status_history(changed_at);

-- ============================================================================
-- Purchase Order Module (t_po_header, t_po_detail, t_po_status_history)
-- ============================================================================

CREATE TABLE IF NOT EXISTS t_po_header (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    po_no VARCHAR(20) UNIQUE NOT NULL,
    supplier_id UUID,
    supplier_name VARCHAR(255),
    status VARCHAR(30) NOT NULL DEFAULT 'DRAFT',
    notes TEXT,
    shipping_address TEXT,
    expected_delivery_date TIMESTAMP,
    received_date TIMESTAMP,
    total_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    discount_amount DECIMAL(15,2) DEFAULT 0,
    net_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'THB',
    exchange_rate DECIMAL(10,4) DEFAULT 1.0000,
    quotation_id UUID,
    job_id UUID,
    approved_by UUID,
    approved_at TIMESTAMP,
    cancelled_reason TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    deleted BOOLEAN DEFAULT FALSE,
    user_id UUID NOT NULL,
    whitelabel_id UUID NOT NULL
);
CREATE INDEX idx_t_po_header_supplier ON t_po_header(supplier_id);
CREATE INDEX idx_t_po_header_status ON t_po_header(status);
CREATE INDEX idx_t_po_header_quotation ON t_po_header(quotation_id);
CREATE INDEX idx_t_po_header_job ON t_po_header(job_id);
CREATE INDEX idx_t_po_header_whitelabel ON t_po_header(whitelabel_id);
CREATE INDEX idx_t_po_header_deleted ON t_po_header(deleted);

-- PO detail lines
CREATE TABLE IF NOT EXISTS t_po_detail (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    po_header_id UUID NOT NULL REFERENCES t_po_header(id) ON DELETE CASCADE,
    part_id UUID,
    part_code VARCHAR(50),
    part_name VARCHAR(255),
    quantity INTEGER NOT NULL DEFAULT 1,
    received_quantity INTEGER NOT NULL DEFAULT 0,
    unit_price DECIMAL(15,2) NOT NULL,
    total_price DECIMAL(15,2) NOT NULL,
    discount DECIMAL(15,2) DEFAULT 0,
    net_price DECIMAL(15,2) NOT NULL DEFAULT 0,
    note TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP,
    user_id UUID NOT NULL,
    whitelabel_id UUID NOT NULL
);
CREATE INDEX idx_t_po_detail_header ON t_po_detail(po_header_id);
CREATE INDEX idx_t_po_detail_part ON t_po_detail(part_id);

-- PO status history
CREATE TABLE IF NOT EXISTS t_po_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    po_header_id UUID NOT NULL REFERENCES t_po_header(id) ON DELETE CASCADE,
    from_status VARCHAR(30),
    to_status VARCHAR(30) NOT NULL,
    changed_by UUID NOT NULL,
    changed_at TIMESTAMP NOT NULL DEFAULT NOW(),
    reason TEXT,
    whitelabel_id UUID NOT NULL
);
CREATE INDEX idx_t_po_status_history_po ON t_po_status_history(po_header_id);
CREATE INDEX idx_t_po_status_history_changed ON t_po_status_history(changed_at);

-- ============================================================================
-- Payment Module (t_payment, t_receipt, t_payment_history, etc.)
-- ============================================================================

CREATE TABLE IF NOT EXISTS t_payment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_no VARCHAR(20) UNIQUE NOT NULL,
    invoice_id UUID,
    job_id UUID,
    customer_id UUID NOT NULL,
    payment_date TIMESTAMP NOT NULL DEFAULT NOW(),
    payment_method VARCHAR(50) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'COMPLETED',
    reference_no VARCHAR(100),
    notes TEXT,
    refund_amount DECIMAL(15,2) DEFAULT 0,
    refund_reason TEXT,
    refunded_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP,
    user_id UUID NOT NULL,
    whitelabel_id UUID NOT NULL
);
CREATE INDEX idx_t_payment_invoice ON t_payment(invoice_id);
CREATE INDEX idx_t_payment_job ON t_payment(job_id);
CREATE INDEX idx_t_payment_customer ON t_payment(customer_id);
CREATE INDEX idx_t_payment_status ON t_payment(status);
CREATE INDEX idx_t_payment_whitelabel ON t_payment(whitelabel_id);

-- Receipt
CREATE TABLE IF NOT EXISTS t_receipt (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    receipt_no VARCHAR(20) UNIQUE NOT NULL,
    payment_id UUID NOT NULL REFERENCES t_payment(id) ON DELETE CASCADE,
    receipt_date TIMESTAMP NOT NULL DEFAULT NOW(),
    amount DECIMAL(15,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    cancelled_reason TEXT,
    cancelled_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP,
    user_id UUID NOT NULL,
    whitelabel_id UUID NOT NULL
);
CREATE INDEX idx_t_receipt_payment ON t_receipt(payment_id);

-- Payment history
CREATE TABLE IF NOT EXISTS t_payment_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID NOT NULL REFERENCES t_payment(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL,
    previous_amount DECIMAL(15,2) DEFAULT 0,
    new_amount DECIMAL(15,2) NOT NULL,
    change_type VARCHAR(20) NOT NULL,
    changed_by UUID NOT NULL,
    changed_at TIMESTAMP NOT NULL DEFAULT NOW(),
    reason TEXT,
    whitelabel_id UUID NOT NULL
);
CREATE INDEX idx_t_payment_history_payment ON t_payment_history(payment_id);
CREATE INDEX idx_t_payment_history_customer ON t_payment_history(customer_id);

-- Outstanding balance
CREATE TABLE IF NOT EXISTS t_outstanding_balance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL,
    invoice_id UUID,
    original_amount DECIMAL(15,2) NOT NULL,
    paid_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    outstanding_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    due_date TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'OUTSTANDING',
    last_payment_date TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP,
    whitelabel_id UUID NOT NULL
);
CREATE INDEX idx_t_outstanding_customer ON t_outstanding_balance(customer_id);
CREATE INDEX idx_t_outstanding_status ON t_outstanding_balance(status);

-- ============================================================================
-- Document Module
-- ============================================================================

CREATE TABLE IF NOT EXISTS document (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    size BIGINT NOT NULL,
    path VARCHAR(500) NOT NULL,
    uploaded_by UUID,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- Email Module
-- ============================================================================

CREATE TABLE IF NOT EXISTS email_log (
    id SERIAL PRIMARY KEY,
    "to" VARCHAR(255) NOT NULL,
    cc VARCHAR(500),
    bcc VARCHAR(500),
    subject VARCHAR(500) NOT NULL,
    body TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    error_message TEXT,
    sent_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS email_config (
    id SERIAL PRIMARY KEY,
    smtp_host VARCHAR(255) NOT NULL,
    smtp_port INTEGER NOT NULL,
    smtp_user VARCHAR(255) NOT NULL,
    smtp_pass VARCHAR(255) NOT NULL,
    from_email VARCHAR(255) NOT NULL,
    from_name VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- Batch Module
-- ============================================================================

CREATE TABLE IF NOT EXISTS t_batch_job (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    config TEXT,
    schedule VARCHAR(100),
    total_count INTEGER DEFAULT 0,
    success_count INTEGER DEFAULT 0,
    fail_count INTEGER DEFAULT 0,
    started_at TIMESTAMP,
    finished_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_batch_job_log (
    id SERIAL PRIMARY KEY,
    job_id UUID NOT NULL REFERENCES t_batch_job(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    level VARCHAR(20) NOT NULL DEFAULT 'info',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_t_batch_job_log_job ON t_batch_job_log(job_id);

-- ============================================================================
-- I18n / Translation Module
-- ============================================================================

CREATE TABLE IF NOT EXISTS m_translation (
    id SERIAL PRIMARY KEY,
    locale VARCHAR(10) NOT NULL,
    key VARCHAR(255) NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(locale, key)
);
CREATE INDEX idx_m_translation_locale ON m_translation(locale);

-- ============================================================================
-- WOS — Web Order System Module
-- ============================================================================

CREATE TABLE IF NOT EXISTS wos_order (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    items JSONB NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- Triggers for Auto Numbering
-- ============================================================================

-- Auto-generate JOB number
CREATE OR REPLACE FUNCTION generate_job_no()
RETURNS TRIGGER AS $$
DECLARE
    year_part TEXT;
    sequence_part TEXT;
BEGIN
    year_part := TO_CHAR(NOW(), 'YYYY');
    sequence_part := LPAD(CAST((
        SELECT COALESCE(MAX(CAST(SUBSTRING(job_no FROM 9) AS INTEGER)), 0) + 1
        FROM t_job
        WHERE job_no LIKE 'JOB-' || year_part || '-%'
    ) AS TEXT), 4, '0');
    NEW.job_no := 'JOB-' || year_part || '-' || sequence_part;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_generate_job_no ON t_job;
CREATE TRIGGER trg_generate_job_no
BEFORE INSERT ON t_job
FOR EACH ROW
EXECUTE FUNCTION generate_job_no();

-- Auto-generate Customer code
CREATE OR REPLACE FUNCTION generate_customer_code()
RETURNS TRIGGER AS $$
DECLARE
    year_part TEXT;
    sequence_part TEXT;
BEGIN
    year_part := TO_CHAR(NOW(), 'YYYY');
    sequence_part := LPAD(CAST((
        SELECT COALESCE(MAX(CAST(SUBSTRING(customer_code FROM 10) AS INTEGER)), 0) + 1
        FROM m_customer
        WHERE customer_code LIKE 'CUST-' || year_part || '-%'
    ) AS TEXT), 4, '0');
    NEW.customer_code := 'CUST-' || year_part || '-' || sequence_part;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_generate_customer_code ON m_customer;
CREATE TRIGGER trg_generate_customer_code
BEFORE INSERT ON m_customer
FOR EACH ROW
EXECUTE FUNCTION generate_customer_code();

-- Auto-generate Quotation number
CREATE OR REPLACE FUNCTION generate_quotation_no()
RETURNS TRIGGER AS $$
DECLARE
    year_part TEXT;
    sequence_part TEXT;
BEGIN
    year_part := TO_CHAR(NOW(), 'YYYY');
    sequence_part := LPAD(CAST((
        SELECT COALESCE(MAX(CAST(SUBSTRING(quotation_no FROM 8) AS INTEGER)), 0) + 1
        FROM t_quotation
        WHERE quotation_no LIKE 'QT-' || year_part || '-%'
    ) AS TEXT), 4, '0');
    NEW.quotation_no := 'QT-' || year_part || '-' || sequence_part;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_generate_quotation_no ON t_quotation;
CREATE TRIGGER trg_generate_quotation_no
BEFORE INSERT ON t_quotation
FOR EACH ROW
EXECUTE FUNCTION generate_quotation_no();

-- Auto-generate PO number
CREATE OR REPLACE FUNCTION generate_po_no()
RETURNS TRIGGER AS $$
DECLARE
    year_part TEXT;
    sequence_part TEXT;
BEGIN
    year_part := TO_CHAR(NOW(), 'YYYY');
    sequence_part := LPAD(CAST((
        SELECT COALESCE(MAX(CAST(SUBSTRING(po_no FROM 6) AS INTEGER)), 0) + 1
        FROM t_po_header
        WHERE po_no LIKE 'PO-' || year_part || '-%'
    ) AS TEXT), 4, '0');
    NEW.po_no := 'PO-' || year_part || '-' || sequence_part;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_generate_po_no ON t_po_header;
CREATE TRIGGER trg_generate_po_no
BEFORE INSERT ON t_po_header
FOR EACH ROW
EXECUTE FUNCTION generate_po_no();
