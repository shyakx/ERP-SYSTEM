-- =============================
-- DICEL Security Company ERP
-- Finance, Payroll, Invoicing, Expenses, Payslips Seed Data
-- =============================

-- 1. CLIENTS
INSERT INTO clients (client_code, company_name, contact_person, email, phone, address, city, country, status)
VALUES
('CLI001', 'Rwanda Development Board', 'John Doe', 'info@rdb.gov.rw', '+250 788 123 456', 'KN 4 Ave, Kigali', 'Kigali', 'Rwanda', 'active'),
('CLI002', 'Kigali City Council', 'Jane Smith', 'info@kigalicouncil.gov.rw', '+250 788 234 567', 'KG 123 St, Kigali', 'Kigali', 'Rwanda', 'active'),
('CLI003', 'Rwanda National Bank', 'Peter Jones', 'info@rnbrwanda.rw', '+250 788 345 678', 'KG 456 Ave, Kigali', 'Kigali', 'Rwanda', 'active'),
('CLI004', 'Rwanda Tourism Board', 'Alice Brown', 'info@rwandatourism.gov.rw', '+250 788 456 789', 'KG 789 Blvd, Kigali', 'Kigali', 'Rwanda', 'active'),
('CLI005', 'Rwanda Revenue Authority', 'Bob Wilson', 'info@rra.gov.rw', '+250 788 567 890', 'KG 012 Rd, Kigali', 'Kigali', 'Rwanda', 'active')
ON CONFLICT (client_code) DO NOTHING;

-- 2. INVOICES
INSERT INTO invoices (invoice_number, client_id, issue_date, due_date, subtotal, tax_amount, total_amount, paid_amount, balance_amount, status, payment_terms, notes)
SELECT 'INV-001', c.id, '2024-06-01'::DATE, '2024-06-30'::DATE, 1200000, 216000, 1416000, 0, 1200000, 'draft', 'Net 30', 'Initial invoice for RDB' FROM clients c WHERE c.client_code = 'CLI001'
UNION ALL
SELECT 'INV-002', c.id, '2024-06-05'::DATE, '2024-07-05'::DATE, 500000, 90000, 590000, 0, 500000, 'sent', 'Net 30', 'Invoice for Kigali City Council' FROM clients c WHERE c.client_code = 'CLI002'
UNION ALL
SELECT 'INV-003', c.id, '2024-06-10'::DATE, '2024-07-10'::DATE, 2000000, 360000, 2360000, 1000000, 1000000, 'paid', 'Net 30', 'Invoice for Rwanda National Bank' FROM clients c WHERE c.client_code = 'CLI003'
UNION ALL
SELECT 'INV-004', c.id, '2024-06-15'::DATE, '2024-07-15'::DATE, 800000, 144000, 944000, 800000, 0, 'paid', 'Net 30', 'Invoice for Rwanda Tourism Board' FROM clients c WHERE c.client_code = 'CLI004'
UNION ALL
SELECT 'INV-005', c.id, '2024-06-20'::DATE, '2024-07-20'::DATE, 1500000, 270000, 1770000, 0, 1500000, 'overdue', 'Net 30', 'Invoice for Rwanda Revenue Authority' FROM clients c WHERE c.client_code = 'CLI005'
ON CONFLICT (invoice_number) DO NOTHING;

-- 3. PAYMENTS
INSERT INTO payments (payment_number, invoice_id, client_id, payment_date, amount, payment_method, reference_number, status, notes)
SELECT 'PAY-001', i.id, c.id, '2024-06-10'::DATE, 1200000, 'bank_transfer', 'REF-001', 'completed', 'Payment for INV-001' FROM invoices i JOIN clients c ON c.client_code = 'CLI001' WHERE i.invoice_number = 'INV-001'
UNION ALL
SELECT 'PAY-002', i.id, c.id, '2024-06-12'::DATE, 500000, 'cash', 'REF-002', 'completed', 'Payment for INV-002' FROM invoices i JOIN clients c ON c.client_code = 'CLI002' WHERE i.invoice_number = 'INV-002'
UNION ALL
SELECT 'PAY-003', i.id, c.id, '2024-06-15'::DATE, 1000000, 'bank_transfer', 'REF-003', 'completed', 'Partial payment for INV-003' FROM invoices i JOIN clients c ON c.client_code = 'CLI003' WHERE i.invoice_number = 'INV-003'
ON CONFLICT (payment_number) DO NOTHING;

-- 4. EXPENSES
INSERT INTO expenses (expense_number, category, subcategory, description, amount, expense_date, vendor_name, vendor_contact, payment_method, status, notes)
VALUES
('EXP-001', 'Office Supplies', 'Stationery', 'Office supplies for Kigali HQ', 120000, '2024-06-01', 'Rwanda Office Mart', '+250 788 123 456', 'bank_transfer', 'approved', 'Bulk purchase for Q2'),
('EXP-002', 'Transportation', 'Fuel', 'Fuel for company vehicles', 80000, '2024-06-03', 'Kobil Rwanda', '+250 788 234 567', 'cash', 'pending', NULL),
('EXP-003', 'Equipment', 'Maintenance', 'Printer maintenance', 50000, '2024-06-05', 'Tech Solutions Rwanda', '+250 788 345 678', 'bank_transfer', 'approved', NULL),
('EXP-004', 'Utilities', 'Electricity', 'Electricity bill for May', 150000, '2024-06-07', 'REG Rwanda', '+250 788 456 789', 'bank_transfer', 'paid', NULL),
('EXP-005', 'Utilities', 'Internet', 'Internet subscription', 90000, '2024-06-10', 'MTN Rwanda', '+250 788 567 890', 'bank_transfer', 'approved', NULL),
('EXP-006', 'Insurance', 'Health', 'Insurance premium', 200000, '2024-06-12', 'Radiant Insurance', '+250 788 678 901', 'bank_transfer', 'pending', NULL),
('EXP-007', 'Transportation', 'Taxi', 'Taxi for client meeting', 25000, '2024-06-14', 'Yego Cabs', '+250 788 789 012', 'cash', 'rejected', NULL),
('EXP-008', 'Utilities', 'Water', 'Water bill for May', 40000, '2024-06-16', 'WASAC Rwanda', '+250 788 890 123', 'bank_transfer', 'approved', NULL),
('EXP-009', 'Office Supplies', 'Cleaning', 'Office cleaning services', 60000, '2024-06-18', 'CleanPro Rwanda', '+250 788 901 234', 'cash', 'pending', NULL),
('EXP-010', 'Equipment', 'Electronics', 'Laptop purchase for new staff', 800000, '2024-06-20', 'Rwanda Tech Store', '+250 788 012 345', 'bank_transfer', 'approved', NULL)
ON CONFLICT (expense_number) DO NOTHING;

-- 5. PAYROLL (example, adjust employee_id as needed)
-- You may need to insert employees first or use existing employee IDs
-- Example:
-- INSERT INTO payroll (employee_id, period, base_salary, hours_worked, overtime_hours, overtime_rate, deductions, bonuses, gross_pay, net_pay, status, payment_method, notes)
-- VALUES ('DIC001', '2024-06', 270000, 176, 10, 0, 20000, 60000, 360000, 320000, 'paid', 'Bank Transfer', NULL);

-- 6. PAYSLIPS (if you have a payslips table, use similar structure)
-- Example:
-- INSERT INTO payslips (...columns...) VALUES (...);

-- Add more as needed for your schema. 