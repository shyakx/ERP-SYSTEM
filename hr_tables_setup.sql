-- =====================================================
-- HR Tables Setup - Essential Tables Only
-- Run this in pgAdmin to create the necessary tables
-- =====================================================

-- =====================================================
-- 1. ATTENDANCE TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS attendance (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(10) NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    clock_in TIME,
    clock_out TIME,
    total_hours DECIMAL(5,2),
    status VARCHAR(20) DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'early_departure', 'on_leave')),
    location VARCHAR(100) DEFAULT 'Main Office',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 2. PAYROLL TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS payroll (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(10) NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    period VARCHAR(50) NOT NULL,
    base_salary DECIMAL(10,2) NOT NULL,
    hours_worked DECIMAL(5,2) NOT NULL,
    hourly_rate DECIMAL(8,2) NOT NULL,
    overtime_hours DECIMAL(5,2) DEFAULT 0,
    overtime_rate DECIMAL(8,2) DEFAULT 0,
    deductions DECIMAL(10,2) DEFAULT 0,
    bonuses DECIMAL(10,2) DEFAULT 0,
    gross_pay DECIMAL(10,2) NOT NULL,
    net_pay DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'paid', 'cancelled')),
    payment_date DATE,
    payment_method VARCHAR(20) DEFAULT 'direct_deposit' CHECK (payment_method IN ('direct_deposit', 'check', 'cash')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- SAMPLE DATA FOR ATTENDANCE
-- =====================================================

INSERT INTO attendance (employee_id, date, clock_in, clock_out, total_hours, status, location, notes) VALUES
('DIC001', '2024-07-10', '08:00:00', '16:00:00', 8.00, 'present', 'Downtown Office Building', 'Regular shift'),
('DIC002', '2024-07-10', '08:05:00', '16:00:00', 7.92, 'late', 'Shopping Mall', '5 minutes late due to traffic'),
('DIC003', '2024-07-10', '00:00:00', NULL, NULL, 'present', 'Industrial Complex', 'Night shift in progress'),
('DIC004', '2024-07-10', '09:00:00', '17:00:00', 8.00, 'present', 'Corporate Headquarters', 'Regular shift'),
('DIC005', '2024-07-10', NULL, NULL, NULL, 'absent', 'Event Center', 'Called in sick'),
('DIC001', '2024-07-09', '08:00:00', '16:00:00', 8.00, 'present', 'Downtown Office Building', 'Regular shift'),
('DIC002', '2024-07-09', '08:00:00', '16:00:00', 8.00, 'present', 'Shopping Mall', 'Regular shift'),
('DIC003', '2024-07-09', '00:00:00', '08:00:00', 8.00, 'present', 'Industrial Complex', 'Night shift completed'),
('DIC004', '2024-07-09', '09:00:00', '17:00:00', 8.00, 'present', 'Corporate Headquarters', 'Regular shift'),
('DIC005', '2024-07-09', '08:00:00', '16:00:00', 8.00, 'present', 'Event Center', 'Regular shift');

-- =====================================================
-- SAMPLE DATA FOR PAYROLL
-- =====================================================

INSERT INTO payroll (employee_id, period, base_salary, hours_worked, hourly_rate, overtime_hours, overtime_rate, deductions, bonuses, gross_pay, net_pay, status, payment_method, notes) VALUES
('DIC001', '2024-07-01 to 2024-07-15', 45000.00, 80.00, 25.00, 8.00, 37.50, 1200.00, 500.00, 3200.00, 2000.00, 'paid', 'direct_deposit', 'Regular bi-weekly payment'),
('DIC002', '2024-07-01 to 2024-07-15', 65000.00, 80.00, 30.00, 12.00, 45.00, 1800.00, 800.00, 4800.00, 3000.00, 'paid', 'direct_deposit', 'Supervisor bonus included'),
('DIC003', '2024-07-01 to 2024-07-15', 42000.00, 72.00, 28.00, 0.00, 42.00, 1100.00, 0.00, 2800.00, 1700.00, 'processed', 'direct_deposit', 'Reduced hours due to leave'),
('DIC004', '2024-07-01 to 2024-07-15', 48000.00, 80.00, 32.00, 4.00, 48.00, 1400.00, 300.00, 3500.00, 2100.00, 'pending', 'direct_deposit', 'Pending approval'),
('DIC005', '2024-07-01 to 2024-07-15', 52000.00, 80.00, 35.00, 6.00, 52.50, 1600.00, 600.00, 4100.00, 2500.00, 'pending', 'check', 'New employee first payment'),
('DIC006', '2024-07-01 to 2024-07-15', 38000.00, 80.00, 22.00, 0.00, 33.00, 900.00, 200.00, 2200.00, 1300.00, 'paid', 'direct_deposit', 'Regular payment'),
('DIC007', '2024-07-01 to 2024-07-15', 55000.00, 80.00, 33.00, 10.00, 49.50, 1500.00, 700.00, 4300.00, 2800.00, 'paid', 'direct_deposit', 'Manager bonus included'),
('DIC008', '2024-07-01 to 2024-07-15', 40000.00, 80.00, 24.00, 2.00, 36.00, 1000.00, 100.00, 2400.00, 1500.00, 'processed', 'direct_deposit', 'Regular payment'),
('DIC009', '2024-07-01 to 2024-07-15', 60000.00, 80.00, 35.00, 8.00, 52.50, 1800.00, 900.00, 4600.00, 3100.00, 'paid', 'direct_deposit', 'Senior position bonus'),
('DIC010', '2024-07-01 to 2024-07-15', 35000.00, 80.00, 20.00, 0.00, 30.00, 800.00, 0.00, 2000.00, 1200.00, 'paid', 'direct_deposit', 'Entry level position');

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check if tables were created successfully
SELECT 'attendance' as table_name, COUNT(*) as record_count FROM attendance
UNION ALL
SELECT 'payroll', COUNT(*) FROM payroll;

-- Check today's attendance
SELECT e.name, a.date, a.clock_in, a.clock_out, a.status, a.location
FROM attendance a
JOIN employees e ON a.employee_id = e.id
WHERE a.date = CURRENT_DATE
ORDER BY a.clock_in;

-- Check pending payroll
SELECT e.name, p.period, p.net_pay, p.status
FROM payroll p
JOIN employees e ON p.employee_id = e.id
WHERE p.status = 'pending'
ORDER BY p.created_at;

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================

SELECT 'HR tables created successfully!' as status; 