-- =====================================================
-- ERP Dicel Security Company - Database Setup Script
-- HR System Tables and Sample Data
-- =====================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_attendance_employee_date ON attendance(employee_id, date);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);

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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP,
    paid_at TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_payroll_employee ON payroll(employee_id);
CREATE INDEX IF NOT EXISTS idx_payroll_period ON payroll(period);
CREATE INDEX IF NOT EXISTS idx_payroll_status ON payroll(status);

-- =====================================================
-- 3. SHIFTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS shifts (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(10) NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    location VARCHAR(100) NOT NULL,
    client_name VARCHAR(100),
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'missed', 'cancelled')),
    notes TEXT,
    total_hours DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_shifts_employee ON shifts(employee_id);
CREATE INDEX IF NOT EXISTS idx_shifts_date ON shifts(date);
CREATE INDEX IF NOT EXISTS idx_shifts_status ON shifts(status);

-- =====================================================
-- 4. LEAVE REQUESTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS leave_requests (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(10) NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    leave_type VARCHAR(30) NOT NULL CHECK (leave_type IN ('annual', 'sick', 'personal', 'maternity', 'paternity', 'bereavement', 'other')),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_days DECIMAL(5,2) NOT NULL,
    reason TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
    approved_by VARCHAR(10) REFERENCES employees(id),
    approved_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leave_employee ON leave_requests(employee_id);
CREATE INDEX IF NOT EXISTS idx_leave_status ON leave_requests(status);
CREATE INDEX IF NOT EXISTS idx_leave_dates ON leave_requests(start_date, end_date);

-- =====================================================
-- 5. PERFORMANCE REVIEWS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS performance_reviews (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(10) NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    review_period VARCHAR(50) NOT NULL,
    reviewer_id VARCHAR(10) NOT NULL REFERENCES employees(id),
    review_date DATE NOT NULL,
    overall_rating INTEGER CHECK (overall_rating >= 1 AND overall_rating <= 5),
    attendance_rating INTEGER CHECK (attendance_rating >= 1 AND attendance_rating <= 5),
    performance_rating INTEGER CHECK (performance_rating >= 1 AND performance_rating <= 5),
    teamwork_rating INTEGER CHECK (teamwork_rating >= 1 AND teamwork_rating <= 5),
    communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
    strengths TEXT,
    areas_for_improvement TEXT,
    goals TEXT,
    comments TEXT,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'reviewed', 'approved')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_performance_employee ON performance_reviews(employee_id);
CREATE INDEX IF NOT EXISTS idx_performance_reviewer ON performance_reviews(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_performance_period ON performance_reviews(review_period);

-- =====================================================
-- SAMPLE DATA INSERTION
-- =====================================================

-- =====================================================
-- 1. ATTENDANCE SAMPLE DATA
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
-- 2. PAYROLL SAMPLE DATA
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
-- 3. SHIFTS SAMPLE DATA
-- =====================================================

INSERT INTO shifts (employee_id, date, start_time, end_time, location, client_name, status, notes, total_hours) VALUES
('DIC001', '2024-07-10', '08:00:00', '16:00:00', 'Downtown Office Building', 'ABC Corporation', 'completed', 'Regular security shift', 8.00),
('DIC002', '2024-07-10', '16:00:00', '00:00:00', 'Shopping Mall', 'Mall Security', 'in_progress', 'Night shift in progress', 8.00),
('DIC003', '2024-07-10', '00:00:00', '08:00:00', 'Industrial Complex', 'Industrial Security', 'completed', 'Night shift completed', 8.00),
('DIC004', '2024-07-10', '09:00:00', '17:00:00', 'Corporate Headquarters', 'Corporate Security', 'scheduled', 'Regular shift', 8.00),
('DIC005', '2024-07-10', '08:00:00', '16:00:00', 'Event Center', 'Event Security', 'missed', 'Employee called in sick', 0.00),
('DIC001', '2024-07-11', '08:00:00', '16:00:00', 'Downtown Office Building', 'ABC Corporation', 'scheduled', 'Regular security shift', 8.00),
('DIC002', '2024-07-11', '16:00:00', '00:00:00', 'Shopping Mall', 'Mall Security', 'scheduled', 'Night shift', 8.00),
('DIC003', '2024-07-11', '00:00:00', '08:00:00', 'Industrial Complex', 'Industrial Security', 'scheduled', 'Night shift', 8.00),
('DIC004', '2024-07-11', '09:00:00', '17:00:00', 'Corporate Headquarters', 'Corporate Security', 'scheduled', 'Regular shift', 8.00),
('DIC005', '2024-07-11', '08:00:00', '16:00:00', 'Event Center', 'Event Security', 'scheduled', 'Regular shift', 8.00);

-- =====================================================
-- 4. LEAVE REQUESTS SAMPLE DATA
-- =====================================================

INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, total_days, reason, status, approved_by, approved_at, notes) VALUES
('DIC001', 'annual', '2024-08-01', '2024-08-05', 5.00, 'Family vacation', 'approved', 'DIC002', '2024-07-05 10:30:00', 'Approved for family vacation'),
('DIC003', 'sick', '2024-07-08', '2024-07-09', 2.00, 'Medical appointment', 'approved', 'DIC002', '2024-07-07 14:20:00', 'Medical leave approved'),
('DIC005', 'personal', '2024-07-15', '2024-07-15', 1.00, 'Personal emergency', 'pending', NULL, NULL, 'Awaiting approval'),
('DIC002', 'annual', '2024-09-01', '2024-09-03', 3.00, 'Short break', 'approved', 'DIC004', '2024-07-10 09:15:00', 'Short vacation approved'),
('DIC004', 'sick', '2024-07-12', '2024-07-12', 1.00, 'Not feeling well', 'approved', 'DIC002', '2024-07-11 16:45:00', 'Sick leave approved'),
('DIC006', 'annual', '2024-08-15', '2024-08-20', 6.00, 'Summer vacation', 'pending', NULL, NULL, 'Awaiting manager approval'),
('DIC007', 'personal', '2024-07-20', '2024-07-20', 1.00, 'Doctor appointment', 'approved', 'DIC002', '2024-07-18 11:30:00', 'Medical appointment approved'),
('DIC008', 'sick', '2024-07-14', '2024-07-16', 3.00, 'Flu symptoms', 'approved', 'DIC002', '2024-07-13 08:20:00', 'Sick leave for flu'),
('DIC009', 'annual', '2024-10-01', '2024-10-05', 5.00, 'Fall vacation', 'pending', NULL, NULL, 'Awaiting approval'),
('DIC010', 'personal', '2024-07-25', '2024-07-25', 1.00, 'Family event', 'approved', 'DIC002', '2024-07-22 15:10:00', 'Personal leave approved');

-- =====================================================
-- 5. PERFORMANCE REVIEWS SAMPLE DATA
-- =====================================================

INSERT INTO performance_reviews (employee_id, review_period, reviewer_id, review_date, overall_rating, attendance_rating, performance_rating, teamwork_rating, communication_rating, strengths, areas_for_improvement, goals, comments, status) VALUES
('DIC001', 'Q2 2024', 'DIC002', '2024-06-30', 4, 5, 4, 4, 3, 'Excellent attendance, good security awareness, reliable', 'Communication skills could be improved', 'Improve communication with team members, complete security training', 'Good performance overall, needs to work on communication', 'approved'),
('DIC002', 'Q2 2024', 'DIC004', '2024-06-30', 5, 5, 5, 5, 5, 'Outstanding leadership, excellent communication, great team player', 'None identified', 'Continue leadership development, mentor junior staff', 'Exceptional performance, natural leader', 'approved'),
('DIC003', 'Q2 2024', 'DIC002', '2024-06-30', 3, 4, 3, 3, 2, 'Good technical skills, reliable worker', 'Communication and teamwork need improvement', 'Improve communication skills, participate more in team activities', 'Average performance, needs improvement in soft skills', 'approved'),
('DIC004', 'Q2 2024', 'DIC002', '2024-06-30', 4, 4, 4, 4, 4, 'Good all-around performance, reliable', 'Could take more initiative', 'Take on more responsibilities, lead small projects', 'Good performance, ready for more challenges', 'approved'),
('DIC005', 'Q2 2024', 'DIC002', '2024-06-30', 2, 2, 3, 2, 2, 'Some technical skills present', 'Attendance issues, poor communication, needs improvement in all areas', 'Improve attendance, work on communication, complete required training', 'Needs significant improvement', 'approved'),
('DIC006', 'Q2 2024', 'DIC002', '2024-06-30', 4, 5, 4, 4, 4, 'Excellent attendance, good work ethic, reliable', 'Could improve technical skills', 'Complete advanced training, take on more complex tasks', 'Good performance, shows potential', 'approved'),
('DIC007', 'Q2 2024', 'DIC004', '2024-06-30', 5, 5, 5, 5, 5, 'Outstanding performance in all areas, natural leader', 'None identified', 'Continue excellent work, mentor others', 'Exceptional employee, valuable asset', 'approved'),
('DIC008', 'Q2 2024', 'DIC002', '2024-06-30', 3, 4, 3, 3, 3, 'Good attendance, basic skills adequate', 'Needs improvement in performance and teamwork', 'Improve performance, work better with team', 'Average performance, needs improvement', 'approved'),
('DIC009', 'Q2 2024', 'DIC004', '2024-06-30', 4, 4, 4, 4, 4, 'Good performance, reliable, good team player', 'Could take more initiative', 'Take on leadership roles, mentor junior staff', 'Good performance, ready for advancement', 'approved'),
('DIC010', 'Q2 2024', 'DIC002', '2024-06-30', 3, 4, 3, 3, 3, 'Good attendance, willing to learn', 'Needs improvement in performance and communication', 'Improve performance, work on communication skills', 'Average performance, shows potential', 'approved');

-- =====================================================
-- UPDATE TRIGGERS FOR UPDATED_AT TIMESTAMPS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_attendance_updated_at BEFORE UPDATE ON attendance FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_shifts_updated_at BEFORE UPDATE ON shifts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leave_requests_updated_at BEFORE UPDATE ON leave_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_performance_reviews_updated_at BEFORE UPDATE ON performance_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check table counts
SELECT 'attendance' as table_name, COUNT(*) as record_count FROM attendance
UNION ALL
SELECT 'payroll', COUNT(*) FROM payroll
UNION ALL
SELECT 'shifts', COUNT(*) FROM shifts
UNION ALL
SELECT 'leave_requests', COUNT(*) FROM leave_requests
UNION ALL
SELECT 'performance_reviews', COUNT(*) FROM performance_reviews;

-- Check attendance for today
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

-- Check today's shifts
SELECT e.name, s.date, s.start_time, s.end_time, s.location, s.status
FROM shifts s
JOIN employees e ON s.employee_id = e.id
WHERE s.date = CURRENT_DATE
ORDER BY s.start_time;

-- =====================================================
-- SCRIPT COMPLETED SUCCESSFULLY
-- =====================================================

-- Display completion message
SELECT 'Database setup completed successfully!' as status; 