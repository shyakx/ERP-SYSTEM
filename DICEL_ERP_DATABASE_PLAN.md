# 🗄️ DICEL ERP - PostgreSQL Database Plan

## 📋 **Database Overview**

**Database Name:** `dicel_erp_db`  
**Engine:** PostgreSQL 15+  
**ORM:** Sequelize 6.x  
**Connection:** Local development with production migration path

---

## 🏗️ **Database Schema Design**

### **1. CORE TABLES (System Foundation)**

#### **1.1 Users Table**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN (
    'admin', 'hr', 'finance', 'it', 'security', 'compliance', 
    'inventory', 'client', 'sales', 'cx', 'risk', 'recovery', 'employee'
  )),
  department_id UUID REFERENCES departments(id),
  employee_id VARCHAR(50) UNIQUE,
  position VARCHAR(100),
  phone VARCHAR(20),
  address TEXT,
  date_of_birth DATE,
  hire_date DATE,
  salary DECIMAL(12,2),
  emergency_contact JSONB,
  skills TEXT[],
  certifications TEXT[],
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  profile_image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **1.2 Departments Table**
```sql
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  code VARCHAR(10) UNIQUE NOT NULL,
  description TEXT,
  manager_id UUID REFERENCES users(id),
  budget DECIMAL(15,2),
  location VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **1.3 System Settings Table**
```sql
CREATE TABLE system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type VARCHAR(50) DEFAULT 'string',
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **1.4 Audit Logs Table**
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(100),
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### **2. HR DEPARTMENT TABLES**

#### **2.1 Employees Table**
```sql
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) UNIQUE,
  employee_number VARCHAR(20) UNIQUE NOT NULL,
  department_id UUID REFERENCES departments(id),
  position VARCHAR(100) NOT NULL,
  hire_date DATE NOT NULL,
  termination_date DATE,
  salary DECIMAL(12,2) NOT NULL,
  salary_currency VARCHAR(3) DEFAULT 'RWF',
  employment_type VARCHAR(50) DEFAULT 'full-time',
  work_location VARCHAR(255),
  supervisor_id UUID REFERENCES employees(id),
  emergency_contact JSONB,
  bank_details JSONB,
  tax_info JSONB,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **2.2 Job Postings Table**
```sql
CREATE TABLE job_postings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  department_id UUID REFERENCES departments(id),
  description TEXT NOT NULL,
  requirements TEXT,
  salary_range_min DECIMAL(12,2),
  salary_range_max DECIMAL(12,2),
  location VARCHAR(255),
  employment_type VARCHAR(50),
  status VARCHAR(50) DEFAULT 'open',
  posted_date DATE DEFAULT CURRENT_DATE,
  closing_date DATE,
  max_applications INTEGER,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **2.3 Candidates Table**
```sql
CREATE TABLE candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_posting_id UUID REFERENCES job_postings(id),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  resume_url VARCHAR(255),
  cover_letter TEXT,
  experience_years INTEGER,
  education_level VARCHAR(100),
  skills TEXT[],
  status VARCHAR(50) DEFAULT 'applied',
  interview_date TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **2.4 Training Programs Table**
```sql
CREATE TABLE training_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  instructor VARCHAR(255),
  duration_hours INTEGER,
  cost DECIMAL(10,2),
  max_participants INTEGER,
  location VARCHAR(255),
  start_date DATE,
  end_date DATE,
  status VARCHAR(50) DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **2.5 Training Enrollments Table**
```sql
CREATE TABLE training_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  training_program_id UUID REFERENCES training_programs(id),
  employee_id UUID REFERENCES employees(id),
  enrollment_date DATE DEFAULT CURRENT_DATE,
  completion_date DATE,
  grade VARCHAR(10),
  certificate_url VARCHAR(255),
  status VARCHAR(50) DEFAULT 'enrolled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **2.6 Leave Requests Table**
```sql
CREATE TABLE leave_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id),
  leave_type VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days_requested INTEGER NOT NULL,
  reason TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  approved_by UUID REFERENCES users(id),
  approved_date TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **2.7 Attendance Records Table**
```sql
CREATE TABLE attendance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id),
  date DATE NOT NULL,
  check_in TIMESTAMP,
  check_out TIMESTAMP,
  total_hours DECIMAL(4,2),
  status VARCHAR(50) DEFAULT 'present',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **2.8 Performance Reviews Table**
```sql
CREATE TABLE performance_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id),
  reviewer_id UUID REFERENCES users(id),
  review_period_start DATE,
  review_period_end DATE,
  review_date DATE DEFAULT CURRENT_DATE,
  overall_rating INTEGER CHECK (overall_rating >= 1 AND overall_rating <= 5),
  goals_achieved TEXT,
  areas_improvement TEXT,
  next_goals TEXT,
  recommendations TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **2.9 Payroll Records Table**
```sql
CREATE TABLE payroll_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES employees(id),
  pay_period_start DATE NOT NULL,
  pay_period_end DATE NOT NULL,
  basic_salary DECIMAL(12,2) NOT NULL,
  allowances DECIMAL(12,2) DEFAULT 0,
  deductions DECIMAL(12,2) DEFAULT 0,
  net_salary DECIMAL(12,2) NOT NULL,
  payment_date DATE,
  payment_method VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### **3. FINANCE DEPARTMENT TABLES**

#### **3.1 Financial Accounts Table**
```sql
CREATE TABLE financial_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_number VARCHAR(50) UNIQUE NOT NULL,
  account_name VARCHAR(255) NOT NULL,
  account_type VARCHAR(50) NOT NULL,
  currency VARCHAR(3) DEFAULT 'RWF',
  balance DECIMAL(15,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **3.2 Transactions Table**
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_number VARCHAR(50) UNIQUE NOT NULL,
  account_id UUID REFERENCES financial_accounts(id),
  transaction_type VARCHAR(50) NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'RWF',
  description TEXT,
  reference_number VARCHAR(100),
  transaction_date DATE NOT NULL,
  posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'posted',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **3.3 Budgets Table**
```sql
CREATE TABLE budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id UUID REFERENCES departments(id),
  fiscal_year INTEGER NOT NULL,
  budget_category VARCHAR(100) NOT NULL,
  allocated_amount DECIMAL(15,2) NOT NULL,
  spent_amount DECIMAL(15,2) DEFAULT 0,
  remaining_amount DECIMAL(15,2) GENERATED ALWAYS AS (allocated_amount - spent_amount) STORED,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **3.4 Expenses Table**
```sql
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expense_number VARCHAR(50) UNIQUE NOT NULL,
  department_id UUID REFERENCES departments(id),
  expense_category VARCHAR(100) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'RWF',
  description TEXT,
  vendor VARCHAR(255),
  expense_date DATE NOT NULL,
  receipt_url VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  approved_by UUID REFERENCES users(id),
  approved_date TIMESTAMP,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **3.5 Invoices Table**
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  client_id UUID REFERENCES clients(id),
  invoice_date DATE NOT NULL,
  due_date DATE NOT NULL,
  subtotal DECIMAL(12,2) NOT NULL,
  tax_amount DECIMAL(12,2) DEFAULT 0,
  total_amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'RWF',
  status VARCHAR(50) DEFAULT 'draft',
  paid_date DATE,
  payment_method VARCHAR(50),
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **3.6 Invoice Items Table**
```sql
CREATE TABLE invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES invoices(id),
  description VARCHAR(255) NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  unit_price DECIMAL(12,2) NOT NULL,
  total_price DECIMAL(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### **4. IT DEPARTMENT TABLES**

#### **4.1 IT Assets Table**
```sql
CREATE TABLE it_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_tag VARCHAR(50) UNIQUE NOT NULL,
  asset_name VARCHAR(255) NOT NULL,
  asset_type VARCHAR(100) NOT NULL,
  manufacturer VARCHAR(255),
  model VARCHAR(255),
  serial_number VARCHAR(255),
  purchase_date DATE,
  purchase_cost DECIMAL(12,2),
  assigned_to UUID REFERENCES users(id),
  location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active',
  warranty_expiry DATE,
  last_maintenance DATE,
  next_maintenance DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **4.2 IT Support Tickets Table**
```sql
CREATE TABLE it_support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number VARCHAR(50) UNIQUE NOT NULL,
  requester_id UUID REFERENCES users(id),
  assigned_to UUID REFERENCES users(id),
  category VARCHAR(100) NOT NULL,
  priority VARCHAR(50) DEFAULT 'medium',
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'open',
  resolution TEXT,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **4.3 System Monitoring Table**
```sql
CREATE TABLE system_monitoring (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  system_name VARCHAR(255) NOT NULL,
  metric_name VARCHAR(100) NOT NULL,
  metric_value DECIMAL(10,2) NOT NULL,
  metric_unit VARCHAR(50),
  threshold_warning DECIMAL(10,2),
  threshold_critical DECIMAL(10,2),
  status VARCHAR(50) DEFAULT 'normal',
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### **5. SECURITY DEPARTMENT TABLES**

#### **5.1 Security Guards Table**
```sql
CREATE TABLE security_guards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) UNIQUE,
  guard_number VARCHAR(50) UNIQUE NOT NULL,
  license_number VARCHAR(100),
  license_expiry DATE,
  training_certifications TEXT[],
  assigned_location VARCHAR(255),
  shift_preference VARCHAR(50),
  emergency_contact JSONB,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **5.2 Security Assignments Table**
```sql
CREATE TABLE security_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guard_id UUID REFERENCES security_guards(id),
  location VARCHAR(255) NOT NULL,
  shift_start TIMESTAMP NOT NULL,
  shift_end TIMESTAMP NOT NULL,
  assignment_type VARCHAR(50) DEFAULT 'patrol',
  status VARCHAR(50) DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **5.3 Security Incidents Table**
```sql
CREATE TABLE security_incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_number VARCHAR(50) UNIQUE NOT NULL,
  incident_type VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  reported_by UUID REFERENCES users(id),
  reported_date TIMESTAMP NOT NULL,
  incident_date TIMESTAMP,
  severity VARCHAR(50) DEFAULT 'medium',
  description TEXT NOT NULL,
  actions_taken TEXT,
  status VARCHAR(50) DEFAULT 'open',
  resolved_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **5.4 Patrol Routes Table**
```sql
CREATE TABLE patrol_routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_name VARCHAR(255) NOT NULL,
  description TEXT,
  checkpoints JSONB,
  estimated_duration INTEGER, -- in minutes
  frequency VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **5.5 Patrol Logs Table**
```sql
CREATE TABLE patrol_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guard_id UUID REFERENCES security_guards(id),
  route_id UUID REFERENCES patrol_routes(id),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  checkpoints_completed JSONB,
  incidents_reported JSONB,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'in_progress',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### **6. INVENTORY/OPERATIONS TABLES**

#### **6.1 Inventory Items Table**
```sql
CREATE TABLE inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_code VARCHAR(50) UNIQUE NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  unit_of_measure VARCHAR(50),
  current_stock INTEGER DEFAULT 0,
  minimum_stock INTEGER DEFAULT 0,
  maximum_stock INTEGER,
  unit_cost DECIMAL(12,2),
  supplier_id UUID REFERENCES suppliers(id),
  location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **6.2 Inventory Transactions Table**
```sql
CREATE TABLE inventory_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES inventory_items(id),
  transaction_type VARCHAR(50) NOT NULL, -- 'in', 'out', 'adjustment'
  quantity INTEGER NOT NULL,
  unit_cost DECIMAL(12,2),
  total_cost DECIMAL(12,2),
  reference_number VARCHAR(100),
  reference_type VARCHAR(50), -- 'purchase', 'sale', 'transfer', 'adjustment'
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **6.3 Suppliers Table**
```sql
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_code VARCHAR(50) UNIQUE NOT NULL,
  supplier_name VARCHAR(255) NOT NULL,
  contact_person VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  tax_number VARCHAR(100),
  payment_terms VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **6.4 Purchase Orders Table**
```sql
CREATE TABLE purchase_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  po_number VARCHAR(50) UNIQUE NOT NULL,
  supplier_id UUID REFERENCES suppliers(id),
  order_date DATE NOT NULL,
  expected_delivery DATE,
  total_amount DECIMAL(12,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  approved_by UUID REFERENCES users(id),
  approved_date TIMESTAMP,
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### **7. CLIENT MANAGEMENT TABLES**

#### **7.1 Clients Table**
```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_code VARCHAR(50) UNIQUE NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  contact_person VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  tax_number VARCHAR(100),
  industry VARCHAR(100),
  client_type VARCHAR(50),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **7.2 Contracts Table**
```sql
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_number VARCHAR(50) UNIQUE NOT NULL,
  client_id UUID REFERENCES clients(id),
  contract_type VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  total_value DECIMAL(15,2),
  currency VARCHAR(3) DEFAULT 'RWF',
  status VARCHAR(50) DEFAULT 'active',
  terms TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **7.3 Client Support Tickets Table**
```sql
CREATE TABLE client_support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number VARCHAR(50) UNIQUE NOT NULL,
  client_id UUID REFERENCES clients(id),
  assigned_to UUID REFERENCES users(id),
  category VARCHAR(100) NOT NULL,
  priority VARCHAR(50) DEFAULT 'medium',
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'open',
  resolution TEXT,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### **8. SALES & MARKETING TABLES**

#### **8.1 Leads Table**
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_number VARCHAR(50) UNIQUE NOT NULL,
  company_name VARCHAR(255),
  contact_person VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  source VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new',
  assigned_to UUID REFERENCES users(id),
  estimated_value DECIMAL(12,2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **8.2 Opportunities Table**
```sql
CREATE TABLE opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_number VARCHAR(50) UNIQUE NOT NULL,
  lead_id UUID REFERENCES leads(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  stage VARCHAR(50) DEFAULT 'prospecting',
  probability INTEGER CHECK (probability >= 0 AND probability <= 100),
  estimated_value DECIMAL(12,2),
  expected_close_date DATE,
  assigned_to UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **8.3 Marketing Campaigns Table**
```sql
CREATE TABLE marketing_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_name VARCHAR(255) NOT NULL,
  campaign_type VARCHAR(100) NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  budget DECIMAL(12,2),
  status VARCHAR(50) DEFAULT 'planned',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### **9. CUSTOMER EXPERIENCE TABLES**

#### **9.1 Customer Feedback Table**
```sql
CREATE TABLE customer_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  feedback_type VARCHAR(50) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  feedback_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(50) DEFAULT 'received',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **9.2 Customer Surveys Table**
```sql
CREATE TABLE customer_surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_name VARCHAR(255) NOT NULL,
  description TEXT,
  questions JSONB,
  start_date DATE,
  end_date DATE,
  status VARCHAR(50) DEFAULT 'draft',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### **10. RISK MANAGEMENT TABLES**

#### **10.1 Risk Assessments Table**
```sql
CREATE TABLE risk_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_number VARCHAR(50) UNIQUE NOT NULL,
  risk_category VARCHAR(100) NOT NULL,
  risk_description TEXT NOT NULL,
  likelihood INTEGER CHECK (likelihood >= 1 AND likelihood <= 5),
  impact INTEGER CHECK (impact >= 1 AND impact <= 5),
  risk_score INTEGER GENERATED ALWAYS AS (likelihood * impact) STORED,
  mitigation_measures TEXT,
  assigned_to UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'open',
  assessment_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **10.2 Risk Incidents Table**
```sql
CREATE TABLE risk_incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_number VARCHAR(50) UNIQUE NOT NULL,
  risk_assessment_id UUID REFERENCES risk_assessments(id),
  incident_type VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  severity VARCHAR(50) DEFAULT 'medium',
  reported_date TIMESTAMP NOT NULL,
  incident_date TIMESTAMP,
  status VARCHAR(50) DEFAULT 'open',
  resolution TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### **11. RECOVERY DEPARTMENT TABLES**

#### **11.1 Recovery Cases Table**
```sql
CREATE TABLE recovery_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_number VARCHAR(50) UNIQUE NOT NULL,
  case_type VARCHAR(100) NOT NULL,
  client_id UUID REFERENCES clients(id),
  description TEXT NOT NULL,
  amount_involved DECIMAL(15,2),
  assigned_to UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'open',
  priority VARCHAR(50) DEFAULT 'medium',
  start_date DATE DEFAULT CURRENT_DATE,
  target_completion_date DATE,
  actual_completion_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **11.2 Recovery Documents Table**
```sql
CREATE TABLE recovery_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES recovery_cases(id),
  document_type VARCHAR(100) NOT NULL,
  document_name VARCHAR(255) NOT NULL,
  file_url VARCHAR(255),
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### **12. COMPLIANCE TABLES**

#### **12.1 Compliance Policies Table**
```sql
CREATE TABLE compliance_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_number VARCHAR(50) UNIQUE NOT NULL,
  policy_name VARCHAR(255) NOT NULL,
  policy_category VARCHAR(100) NOT NULL,
  description TEXT,
  policy_content TEXT,
  version VARCHAR(20),
  effective_date DATE,
  review_date DATE,
  status VARCHAR(50) DEFAULT 'draft',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **12.2 Compliance Audits Table**
```sql
CREATE TABLE compliance_audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_number VARCHAR(50) UNIQUE NOT NULL,
  audit_type VARCHAR(100) NOT NULL,
  audit_scope TEXT,
  auditor UUID REFERENCES users(id),
  audit_date DATE,
  findings TEXT,
  recommendations TEXT,
  status VARCHAR(50) DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔗 **Key Relationships & Indexes**

### **Primary Indexes:**
```sql
-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_department_id ON users(department_id);

-- Employees
CREATE INDEX idx_employees_employee_number ON employees(employee_number);
CREATE INDEX idx_employees_department_id ON employees(department_id);
CREATE INDEX idx_employees_status ON employees(status);

-- Transactions
CREATE INDEX idx_transactions_account_id ON transactions(account_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_transactions_type ON transactions(transaction_type);

-- Inventory
CREATE INDEX idx_inventory_items_code ON inventory_items(item_code);
CREATE INDEX idx_inventory_items_category ON inventory_items(category);
CREATE INDEX idx_inventory_transactions_item_id ON inventory_transactions(item_id);

-- Security
CREATE INDEX idx_security_guards_guard_number ON security_guards(guard_number);
CREATE INDEX idx_security_incidents_date ON security_incidents(incident_date);

-- Clients
CREATE INDEX idx_clients_code ON clients(client_code);
CREATE INDEX idx_clients_status ON clients(status);

-- Leads & Opportunities
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_opportunities_stage ON opportunities(stage);
```

### **Foreign Key Constraints:**
```sql
-- All foreign keys are defined in the table creation scripts above
-- Additional constraints for data integrity
ALTER TABLE employees ADD CONSTRAINT fk_employees_user UNIQUE(user_id);
ALTER TABLE security_guards ADD CONSTRAINT fk_security_guards_user UNIQUE(user_id);
```

---

## 📊 **Database Statistics**

### **Table Count:** 35+ tables
### **Estimated Size:** 2-5 GB for medium business
### **Performance:** Optimized for ERP workloads
### **Scalability:** Horizontal scaling ready

---

## 🚀 **Implementation Plan**

### **Phase 1: Core Setup**
1. Create database and user
2. Install Sequelize CLI
3. Set up database configuration
4. Create core tables (Users, Departments, System Settings)

### **Phase 2: HR Module**
1. Employees, Job Postings, Candidates
2. Training, Leave, Attendance
3. Performance, Payroll

### **Phase 3: Finance Module**
1. Accounts, Transactions, Budgets
2. Expenses, Invoices

### **Phase 4: Operations Module**
1. IT Assets, Support Tickets
2. Security Guards, Incidents
3. Inventory, Suppliers

### **Phase 5: Business Module**
1. Clients, Contracts
2. Leads, Opportunities
3. Customer Feedback

### **Phase 6: Compliance & Risk**
1. Risk Assessments, Incidents
2. Recovery Cases
3. Compliance Policies, Audits

---

## 🔧 **Next Steps**

1. **Database Creation:** Set up PostgreSQL database
2. **Sequelize Configuration:** Configure connection and models
3. **Migration Scripts:** Create database migrations
4. **Seed Data:** Add initial data for testing
5. **API Integration:** Update backend to use database
6. **Testing:** Verify all functionality with real data

**Ready to proceed with PostgreSQL implementation! 🎯** 