-- =====================================================
-- FINANCE DEPARTMENT TABLES SETUP
-- DICEL Security Company ERP System
-- Run this in pgAdmin to create the necessary finance tables
-- =====================================================

-- =====================================================
-- 1. CLIENTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    client_code VARCHAR(20) UNIQUE NOT NULL,
    company_name VARCHAR(200) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Rwanda',
    tax_id VARCHAR(50),
    registration_number VARCHAR(50),
    contract_start_date DATE,
    contract_end_date DATE,
    contract_value DECIMAL(15,2),
    payment_terms VARCHAR(50) DEFAULT 'Net 30',
    credit_limit DECIMAL(15,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'terminated')),
    notes TEXT,
    created_by VARCHAR(10) REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 2. INVOICES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS invoices (
    id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    subtotal DECIMAL(15,2) NOT NULL,
    tax_rate DECIMAL(5,2) DEFAULT 18.00,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    discount_amount DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) NOT NULL,
    paid_amount DECIMAL(15,2) DEFAULT 0,
    balance_amount DECIMAL(15,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled', 'partially_paid')),
    payment_terms VARCHAR(50) DEFAULT 'Net 30',
    notes TEXT,
    terms_conditions TEXT,
    created_by VARCHAR(10) REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 3. INVOICE_ITEMS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS invoice_items (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_price DECIMAL(15,2) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    tax_rate DECIMAL(5,2) DEFAULT 18.00,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) NOT NULL,
    service_period_start DATE,
    service_period_end DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 4. PAYMENTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    payment_number VARCHAR(50) UNIQUE NOT NULL,
    invoice_id INTEGER REFERENCES invoices(id) ON DELETE RESTRICT,
    client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
    payment_date DATE NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('bank_transfer', 'cash', 'check', 'credit_card', 'mobile_money', 'other')),
    reference_number VARCHAR(100),
    bank_name VARCHAR(100),
    account_number VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    notes TEXT,
    received_by VARCHAR(10) REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 5. EXPENSES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    expense_number VARCHAR(50) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    description TEXT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    expense_date DATE NOT NULL,
    vendor_name VARCHAR(200),
    vendor_contact VARCHAR(100),
    payment_method VARCHAR(50) DEFAULT 'bank_transfer' CHECK (payment_method IN ('bank_transfer', 'cash', 'check', 'credit_card', 'mobile_money')),
    reference_number VARCHAR(100),
    receipt_url VARCHAR(500),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'paid')),
    approved_by VARCHAR(10) REFERENCES employees(id),
    approved_at TIMESTAMP,
    submitted_by VARCHAR(10) REFERENCES employees(id),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 6. BUDGETS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS budgets (
    id SERIAL PRIMARY KEY,
    budget_name VARCHAR(200) NOT NULL,
    budget_year INTEGER NOT NULL,
    budget_month INTEGER CHECK (budget_month >= 1 AND budget_month <= 12),
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    allocated_amount DECIMAL(15,2) NOT NULL,
    spent_amount DECIMAL(15,2) DEFAULT 0,
    remaining_amount DECIMAL(15,2) GENERATED ALWAYS AS (allocated_amount - spent_amount) STORED,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'completed')),
    created_by VARCHAR(10) REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 7. BANK_ACCOUNTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS bank_accounts (
    id SERIAL PRIMARY KEY,
    account_name VARCHAR(200) NOT NULL,
    account_number VARCHAR(50) UNIQUE NOT NULL,
    bank_name VARCHAR(200) NOT NULL,
    branch_name VARCHAR(200),
    account_type VARCHAR(50) NOT NULL CHECK (account_type IN ('savings', 'checking', 'business', 'investment')),
    currency VARCHAR(10) DEFAULT 'RWF',
    opening_balance DECIMAL(15,2) DEFAULT 0,
    current_balance DECIMAL(15,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'closed')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 8. BANK_TRANSACTIONS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS bank_transactions (
    id SERIAL PRIMARY KEY,
    transaction_number VARCHAR(50) UNIQUE NOT NULL,
    bank_account_id INTEGER NOT NULL REFERENCES bank_accounts(id) ON DELETE RESTRICT,
    transaction_date DATE NOT NULL,
    description TEXT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('deposit', 'withdrawal', 'transfer_in', 'transfer_out')),
    reference_number VARCHAR(100),
    related_invoice_id INTEGER REFERENCES invoices(id),
    related_payment_id INTEGER REFERENCES payments(id),
    related_expense_id INTEGER REFERENCES expenses(id),
    balance_after DECIMAL(15,2),
    notes TEXT,
    created_by VARCHAR(10) REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 9. TAX_RECORDS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS tax_records (
    id SERIAL PRIMARY KEY,
    tax_period VARCHAR(20) NOT NULL,
    tax_type VARCHAR(50) NOT NULL CHECK (tax_type IN ('VAT', 'income_tax', 'withholding_tax', 'corporate_tax')),
    taxable_amount DECIMAL(15,2) NOT NULL,
    tax_rate DECIMAL(5,2) NOT NULL,
    tax_amount DECIMAL(15,2) NOT NULL,
    due_date DATE NOT NULL,
    payment_date DATE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'filed')),
    reference_number VARCHAR(100),
    notes TEXT,
    filed_by VARCHAR(10) REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 10. FINANCIAL_REPORTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS financial_reports (
    id SERIAL PRIMARY KEY,
    report_name VARCHAR(200) NOT NULL,
    report_type VARCHAR(50) NOT NULL CHECK (report_type IN ('income_statement', 'balance_sheet', 'cash_flow', 'profit_loss', 'budget_variance', 'custom')),
    report_period VARCHAR(20) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    file_url VARCHAR(500),
    file_size INTEGER,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'final', 'archived')),
    generated_by VARCHAR(10) REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 11. RECURRING_INVOICES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS recurring_invoices (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
    description TEXT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    frequency VARCHAR(20) NOT NULL CHECK (frequency IN ('weekly', 'monthly', 'quarterly', 'yearly')),
    start_date DATE NOT NULL,
    end_date DATE,
    next_invoice_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled')),
    created_by VARCHAR(10) REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 12. CREDIT_NOTES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS credit_notes (
    id SERIAL PRIMARY KEY,
    credit_note_number VARCHAR(50) UNIQUE NOT NULL,
    invoice_id INTEGER REFERENCES invoices(id) ON DELETE RESTRICT,
    client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
    issue_date DATE NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'issued', 'applied', 'cancelled')),
    applied_to_invoice_id INTEGER REFERENCES invoices(id),
    notes TEXT,
    created_by VARCHAR(10) REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Clients indexes
CREATE INDEX IF NOT EXISTS idx_clients_company_name ON clients(company_name);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_contract_end_date ON clients(contract_end_date);

-- Invoices indexes
CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices(due_date);
CREATE INDEX IF NOT EXISTS idx_invoices_issue_date ON invoices(issue_date);

-- Invoice items indexes
CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice_id ON invoice_items(invoice_id);

-- Payments indexes
CREATE INDEX IF NOT EXISTS idx_payments_invoice_id ON payments(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payments_client_id ON payments(client_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_payment_date ON payments(payment_date);

-- Expenses indexes
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);
CREATE INDEX IF NOT EXISTS idx_expenses_status ON expenses(status);
CREATE INDEX IF NOT EXISTS idx_expenses_expense_date ON expenses(expense_date);

-- Budgets indexes
CREATE INDEX IF NOT EXISTS idx_budgets_year_month ON budgets(budget_year, budget_month);
CREATE INDEX IF NOT EXISTS idx_budgets_category ON budgets(category);

-- Bank transactions indexes
CREATE INDEX IF NOT EXISTS idx_bank_transactions_account_id ON bank_transactions(bank_account_id);
CREATE INDEX IF NOT EXISTS idx_bank_transactions_date ON bank_transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_bank_transactions_type ON bank_transactions(transaction_type);

-- Tax records indexes
CREATE INDEX IF NOT EXISTS idx_tax_records_period ON tax_records(tax_period);
CREATE INDEX IF NOT EXISTS idx_tax_records_type ON tax_records(tax_type);
CREATE INDEX IF NOT EXISTS idx_tax_records_status ON tax_records(status);

-- =====================================================
-- SAMPLE DATA FOR CLIENTS
-- =====================================================

INSERT INTO clients (client_code, company_name, contact_person, email, phone, address, city, tax_id, registration_number, contract_start_date, contract_end_date, contract_value, payment_terms, credit_limit, status, notes) VALUES
('CLI001', 'ABC Corporation', 'John Smith', 'john.smith@abccorp.com', '+250788123456', 'KN 4 Ave, Kigali', 'Kigali', 'TAX001234', 'REG001234', '2024-01-01', '2024-12-31', 180000.00, 'Net 30', 50000.00, 'active', 'Downtown office security services'),
('CLI002', 'Mall Security LLC', 'Sarah Johnson', 'sarah.johnson@mallsecurity.com', '+250788234567', 'KG 123 St, Kigali', 'Kigali', 'TAX002345', 'REG002345', '2024-01-01', '2024-12-31', 300000.00, 'Net 15', 75000.00, 'active', 'Shopping mall security and crowd control'),
('CLI003', 'Industrial Security Inc', 'Michael Brown', 'michael.brown@indsecurity.com', '+250788345678', 'KG 456 Ave, Kigali', 'Kigali', 'TAX003456', 'REG003456', '2024-01-01', '2024-12-31', 216000.00, 'Net 30', 60000.00, 'active', 'Factory security and night patrol'),
('CLI004', 'Tech Corp', 'Lisa Davis', 'lisa.davis@techcorp.com', '+250788456789', 'KG 789 Blvd, Kigali', 'Kigali', 'TAX004567', 'REG004567', '2024-01-01', '2024-12-31', 144000.00, 'Net 30', 40000.00, 'active', 'Reception and building access security'),
('CLI005', 'Event Security Services', 'David Wilson', 'david.wilson@eventsecurity.com', '+250788567890', 'KG 012 Rd, Kigali', 'Kigali', 'TAX005678', 'REG005678', '2024-01-01', '2024-12-31', 96000.00, 'Net 15', 25000.00, 'active', 'Event security and VIP protection')
ON CONFLICT (client_code) DO NOTHING;

-- =====================================================
-- SAMPLE DATA FOR INVOICES
-- =====================================================

INSERT INTO invoices (invoice_number, client_id, issue_date, due_date, subtotal, tax_amount, total_amount, status, payment_terms, notes) 
SELECT 
    'INV-2024-001', c.id, '2024-01-01'::DATE, '2024-01-31'::DATE, 15000.00, 2700.00, 17700.00, 'paid', 'Net 30', 'Monthly security services for downtown office'
FROM clients c WHERE c.client_code = 'CLI001'
UNION ALL
SELECT 
    'INV-2024-002', c.id, '2024-01-01'::DATE, '2024-01-31'::DATE, 25000.00, 4500.00, 29500.00, 'sent', 'Net 15', 'Monthly mall security and crowd control services'
FROM clients c WHERE c.client_code = 'CLI002'
UNION ALL
SELECT 
    'INV-2024-003', c.id, '2024-01-01'::DATE, '2024-01-31'::DATE, 18000.00, 3240.00, 21240.00, 'overdue', 'Net 30', 'Monthly factory security and night patrol services'
FROM clients c WHERE c.client_code = 'CLI003'
UNION ALL
SELECT 
    'INV-2024-004', c.id, '2024-01-01'::DATE, '2024-01-31'::DATE, 12000.00, 2160.00, 14160.00, 'draft', 'Net 30', 'Monthly reception and building access security'
FROM clients c WHERE c.client_code = 'CLI004'
UNION ALL
SELECT 
    'INV-2024-005', c.id, '2024-01-01'::DATE, '2024-01-31'::DATE, 8000.00, 1440.00, 9440.00, 'sent', 'Net 15', 'Monthly event security and VIP protection services'
FROM clients c WHERE c.client_code = 'CLI005'
ON CONFLICT (invoice_number) DO NOTHING;

-- =====================================================
-- SAMPLE DATA FOR INVOICE ITEMS
-- =====================================================

INSERT INTO invoice_items (invoice_id, description, quantity, unit_price, amount, tax_amount, total_amount, service_period_start, service_period_end)
SELECT 
    i.id, 'Security Guarding Services - January 2024', 1, 15000.00, 15000.00, 2700.00, 17700.00, '2024-01-01'::DATE, '2024-01-31'::DATE
FROM invoices i WHERE i.invoice_number = 'INV-2024-001'
UNION ALL
SELECT 
    i.id, 'Mall Security Services - January 2024', 1, 25000.00, 25000.00, 4500.00, 29500.00, '2024-01-01'::DATE, '2024-01-31'::DATE
FROM invoices i WHERE i.invoice_number = 'INV-2024-002'
UNION ALL
SELECT 
    i.id, 'Factory Security Services - January 2024', 1, 18000.00, 18000.00, 3240.00, 21240.00, '2024-01-01'::DATE, '2024-01-31'::DATE
FROM invoices i WHERE i.invoice_number = 'INV-2024-003'
UNION ALL
SELECT 
    i.id, 'Reception Security Services - January 2024', 1, 12000.00, 12000.00, 2160.00, 14160.00, '2024-01-01'::DATE, '2024-01-31'::DATE
FROM invoices i WHERE i.invoice_number = 'INV-2024-004'
UNION ALL
SELECT 
    i.id, 'Event Security Services - January 2024', 1, 8000.00, 8000.00, 1440.00, 9440.00, '2024-01-01'::DATE, '2024-01-31'::DATE
FROM invoices i WHERE i.invoice_number = 'INV-2024-005';

-- =====================================================
-- SAMPLE DATA FOR PAYMENTS
-- =====================================================

INSERT INTO payments (payment_number, invoice_id, client_id, payment_date, amount, payment_method, reference_number, status, notes)
SELECT 
    'PAY-2024-001', i.id, c.id, '2024-01-25'::DATE, 17700.00, 'bank_transfer', 'BT-2024-001', 'completed', 'Full payment received'
FROM invoices i 
JOIN clients c ON c.client_code = 'CLI001'
WHERE i.invoice_number = 'INV-2024-001'
UNION ALL
SELECT 
    'PAY-2024-002', i.id, c.id, '2024-01-28'::DATE, 29500.00, 'credit_card', 'CC-2024-002', 'completed', 'Payment processed successfully'
FROM invoices i 
JOIN clients c ON c.client_code = 'CLI002'
WHERE i.invoice_number = 'INV-2024-002'
ON CONFLICT (payment_number) DO NOTHING;

-- =====================================================
-- SAMPLE DATA FOR EXPENSES
-- =====================================================

INSERT INTO expenses (expense_number, category, subcategory, description, amount, expense_date, vendor_name, payment_method, status, notes) VALUES
('EXP-2024-001', 'Office Supplies', 'Stationery', 'Office stationery and supplies', 50000.00, '2024-01-15'::DATE, 'Office Max Rwanda', 'bank_transfer', 'approved', 'Monthly office supplies'),
('EXP-2024-002', 'Transportation', 'Fuel', 'Vehicle fuel for security patrols', 75000.00, '2024-01-20'::DATE, 'Total Energies Rwanda', 'bank_transfer', 'approved', 'Fuel for security vehicles'),
('EXP-2024-003', 'Equipment', 'Security Gear', 'Security uniforms and equipment', 120000.00, '2024-01-25'::DATE, 'Security Equipment Ltd', 'bank_transfer', 'pending', 'New security uniforms'),
('EXP-2024-004', 'Utilities', 'Electricity', 'Office electricity bill', 45000.00, '2024-01-30'::DATE, 'EWSA', 'bank_transfer', 'approved', 'Monthly electricity payment'),
('EXP-2024-005', 'Insurance', 'Liability', 'Professional liability insurance', 200000.00, '2024-01-31'::DATE, 'Rwanda Insurance Company', 'bank_transfer', 'approved', 'Annual liability insurance')
ON CONFLICT (expense_number) DO NOTHING;

-- =====================================================
-- SAMPLE DATA FOR BUDGETS
-- =====================================================

INSERT INTO budgets (budget_name, budget_year, budget_month, category, subcategory, allocated_amount, spent_amount, description) VALUES
('Office Supplies Budget 2024', 2024, 1, 'Office Supplies', 'Stationery', 100000.00, 50000.00, 'Monthly office supplies budget'),
('Transportation Budget 2024', 2024, 1, 'Transportation', 'Fuel', 150000.00, 75000.00, 'Monthly fuel budget for security vehicles'),
('Equipment Budget 2024', 2024, 1, 'Equipment', 'Security Gear', 300000.00, 120000.00, 'Monthly security equipment budget'),
('Utilities Budget 2024', 2024, 1, 'Utilities', 'Electricity', 100000.00, 45000.00, 'Monthly utilities budget'),
('Insurance Budget 2024', 2024, 1, 'Insurance', 'Liability', 500000.00, 200000.00, 'Annual insurance budget')
ON CONFLICT DO NOTHING;

-- =====================================================
-- SAMPLE DATA FOR BANK ACCOUNTS
-- =====================================================

INSERT INTO bank_accounts (account_name, account_number, bank_name, branch_name, account_type, currency, opening_balance, current_balance) VALUES
('DICEL Main Account', '1234567890', 'Bank of Kigali', 'Kigali Main Branch', 'business', 'RWF', 1000000.00, 1500000.00),
('DICEL Operations Account', '0987654321', 'Ecobank Rwanda', 'Kigali Branch', 'business', 'RWF', 500000.00, 750000.00),
('DICEL Savings Account', '1122334455', 'Bank of Kigali', 'Kigali Main Branch', 'savings', 'RWF', 2000000.00, 2500000.00)
ON CONFLICT (account_number) DO NOTHING;

-- =====================================================
-- SAMPLE DATA FOR BANK TRANSACTIONS
-- =====================================================

INSERT INTO bank_transactions (transaction_number, bank_account_id, transaction_date, description, amount, transaction_type, reference_number, balance_after)
SELECT 
    'TXN-2024-001', ba.id, '2024-01-25'::DATE, 'Payment received from ABC Corporation', 17700.00, 'deposit', 'BT-2024-001', 1517700.00
FROM bank_accounts ba WHERE ba.account_number = '1234567890'
UNION ALL
SELECT 
    'TXN-2024-002', ba.id, '2024-01-28'::DATE, 'Payment received from Mall Security LLC', 29500.00, 'deposit', 'CC-2024-002', 1547200.00
FROM bank_accounts ba WHERE ba.account_number = '1234567890'
UNION ALL
SELECT 
    'TXN-2024-003', ba.id, '2024-01-15'::DATE, 'Office supplies payment', -50000.00, 'withdrawal', 'EXP-2024-001', 1497200.00
FROM bank_accounts ba WHERE ba.account_number = '1234567890'
UNION ALL
SELECT 
    'TXN-2024-004', ba.id, '2024-01-20'::DATE, 'Fuel payment', -75000.00, 'withdrawal', 'EXP-2024-002', 1422200.00
FROM bank_accounts ba WHERE ba.account_number = '1234567890'
ON CONFLICT (transaction_number) DO NOTHING;

-- =====================================================
-- SAMPLE DATA FOR TAX RECORDS
-- =====================================================

INSERT INTO tax_records (tax_period, tax_type, taxable_amount, tax_rate, tax_amount, due_date, status, notes) VALUES
('2024-01', 'VAT', 90000.00, 18.00, 16200.00, '2024-02-20', 'paid', 'VAT for January 2024'),
('2024-01', 'income_tax', 500000.00, 30.00, 150000.00, '2024-02-15', 'paid', 'Income tax for January 2024'),
('2024-02', 'VAT', 95000.00, 18.00, 17100.00, '2024-03-20', 'pending', 'VAT for February 2024')
ON CONFLICT DO NOTHING;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check if tables were created successfully
SELECT 'clients' as table_name, COUNT(*) as record_count FROM clients
UNION ALL
SELECT 'invoices', COUNT(*) FROM invoices
UNION ALL
SELECT 'invoice_items', COUNT(*) FROM invoice_items
UNION ALL
SELECT 'payments', COUNT(*) FROM payments
UNION ALL
SELECT 'expenses', COUNT(*) FROM expenses
UNION ALL
SELECT 'budgets', COUNT(*) FROM budgets
UNION ALL
SELECT 'bank_accounts', COUNT(*) FROM bank_accounts
UNION ALL
SELECT 'bank_transactions', COUNT(*) FROM bank_transactions
UNION ALL
SELECT 'tax_records', COUNT(*) FROM tax_records;

-- Check outstanding invoices
SELECT c.company_name, i.invoice_number, i.total_amount, i.balance_amount, i.due_date
FROM invoices i
JOIN clients c ON i.client_id = c.id
WHERE i.status IN ('sent', 'overdue', 'partially_paid')
ORDER BY i.due_date;

-- Check monthly revenue
SELECT 
    DATE_TRUNC('month', i.issue_date) as month,
    SUM(i.total_amount) as total_revenue,
    SUM(i.paid_amount) as total_paid,
    SUM(i.balance_amount) as outstanding
FROM invoices i
GROUP BY DATE_TRUNC('month', i.issue_date)
ORDER BY month;

-- Check expense summary by category
SELECT 
    category,
    SUM(amount) as total_amount,
    COUNT(*) as expense_count
FROM expenses
WHERE status = 'approved'
GROUP BY category
ORDER BY total_amount DESC;

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================

SELECT 'Finance tables created successfully!' as status; 