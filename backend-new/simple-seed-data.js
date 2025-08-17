const { sequelize } = require('./config/database');

// Import all models
const Department = require('./models/Department');
const User = require('./models/User');
const Employee = require('./models/Employee');
const SystemSetting = require('./models/SystemSetting');
const AuditLog = require('./models/AuditLog');
const Client = require('./models/Client');
const Contract = require('./models/Contract');
const FinancialAccount = require('./models/FinancialAccount');
const Transaction = require('./models/Transaction');
const Expense = require('./models/Expense');
const ITAsset = require('./models/ITAsset');
const ITSupportTicket = require('./models/ITSupportTicket');
const SecurityGuard = require('./models/SecurityGuard');
const SecurityIncident = require('./models/SecurityIncident');
const InventoryItem = require('./models/InventoryItem');
const Supplier = require('./models/Supplier');
const Lead = require('./models/Lead');
const RiskAssessment = require('./models/RiskAssessment');
const LeaveRequest = require('./models/LeaveRequest');
const AttendanceRecord = require('./models/AttendanceRecord');
const PayrollRecord = require('./models/PayrollRecord');
const PerformanceReview = require('./models/PerformanceReview');
const TrainingProgram = require('./models/TrainingProgram');
const TrainingEnrollment = require('./models/TrainingEnrollment');
const Benefit = require('./models/Benefit');
const Candidate = require('./models/Candidate');
const Interview = require('./models/Interview');
const Goal = require('./models/Goal');
const JobPosting = require('./models/JobPosting');
const Budget = require('./models/Budget');
const AccountsReceivable = require('./models/AccountsReceivable');
const AccountsPayable = require('./models/AccountsPayable');
const Invoice = require('./models/Invoice');
const FinancialReport = require('./models/FinancialReport');
const TaxRecord = require('./models/TaxRecord');
const CashFlow = require('./models/CashFlow');
const System = require('./models/System');
const NetworkDevice = require('./models/NetworkDevice');
const MaintenanceSchedule = require('./models/MaintenanceSchedule');
const SecurityAssignment = require('./models/SecurityAssignment');
const InventoryTransaction = require('./models/InventoryTransaction');
const PurchaseOrder = require('./models/PurchaseOrder');
const Warehouse = require('./models/Warehouse');
const Opportunity = require('./models/Opportunity');
const Quote = require('./models/Quote');
const MarketingCampaign = require('./models/MarketingCampaign');
const CompliancePolicy = require('./models/CompliancePolicy');
const RecoveryCase = require('./models/RecoveryCase');
const CustomerSurvey = require('./models/CustomerSurvey');
const SupportTicket = require('./models/SupportTicket');
const Project = require('./models/Project');
const Notification = require('./models/Notification');
const Report = require('./models/Report');
const KPI = require('./models/KPI');
const Workflow = require('./models/Workflow');
const Integration = require('./models/Integration');

const simpleSeedData = async () => {
  try {
    console.log('🌱 DICEL ERP - Simple Seed Data Generation');
    console.log('==========================================');
    console.log('');

    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    console.log('🚀 Starting simple seed data generation...');
    console.log('');

    // Get existing data for references
    const departments = await Department.findAll();
    const users = await User.findAll();
    const employees = await Employee.findAll();
    const clients = await Client.findAll();
    const suppliers = await Supplier.findAll();

    console.log('📊 Found existing data:');
    console.log(`   - Departments: ${departments.length}`);
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Employees: ${employees.length}`);
    console.log(`   - Clients: ${clients.length}`);
    console.log(`   - Suppliers: ${suppliers.length}`);
    console.log('');

    // Rwanda-based data arrays
    const rwandanNames = {
      male: ['Jean', 'Pierre', 'Emmanuel', 'Alexandre', 'David', 'Joseph', 'Charles', 'Andre', 'Paul', 'Francois'],
      female: ['Marie', 'Jeanne', 'Claudine', 'Francoise', 'Therese', 'Louise', 'Madeleine', 'Catherine', 'Anne', 'Elisabeth']
    };

    const rwandanSurnames = ['Ndayisaba', 'Uwimana', 'Niyonsenga', 'Mukamana', 'Nkurunziza', 'Uwamahoro', 'Nshimiyimana', 'Mukamurenzi', 'Niyongabo', 'Uwineza'];

    const rwandanCities = ['Kigali', 'Butare', 'Gitarama', 'Ruhengeri', 'Gisenyi', 'Byumba', 'Cyangugu', 'Kibuye', 'Kibungo', 'Nyanza'];

    console.log('🌱 Generating seed data for empty tables...');
    console.log('');

    // Check which tables are empty and add data only to those
    const tablesToSeed = [
      { model: Budget, name: 'Budgets', count: 10 },
      { model: AccountsReceivable, name: 'Accounts Receivable', count: 15 },
      { model: AccountsPayable, name: 'Accounts Payable', count: 15 },
      { model: Invoice, name: 'Invoices', count: 20 },
      { model: FinancialReport, name: 'Financial Reports', count: 8 },
      { model: TaxRecord, name: 'Tax Records', count: 12 },
      { model: CashFlow, name: 'Cash Flows', count: 25 },
      { model: System, name: 'Systems', count: 8 },
      { model: NetworkDevice, name: 'Network Devices', count: 12 },
      { model: MaintenanceSchedule, name: 'Maintenance Schedules', count: 10 },
      { model: SecurityAssignment, name: 'Security Assignments', count: 15 },
      { model: InventoryTransaction, name: 'Inventory Transactions', count: 30 },
      { model: PurchaseOrder, name: 'Purchase Orders', count: 20 },
      { model: Warehouse, name: 'Warehouses', count: 5 },
      { model: Opportunity, name: 'Opportunities', count: 15 },
      { model: Quote, name: 'Quotes', count: 12 },
      { model: MarketingCampaign, name: 'Marketing Campaigns', count: 8 },
      { model: CompliancePolicy, name: 'Compliance Policies', count: 10 },
      { model: RecoveryCase, name: 'Recovery Cases', count: 8 },
      { model: CustomerSurvey, name: 'Customer Surveys', count: 15 },
      { model: SupportTicket, name: 'Support Tickets', count: 25 },
      { model: Project, name: 'Projects', count: 12 },
      { model: Notification, name: 'Notifications', count: 20 },
      { model: Report, name: 'Reports', count: 15 },
      { model: KPI, name: 'KPIs', count: 20 },
      { model: Workflow, name: 'Workflows', count: 10 },
      { model: Integration, name: 'Integrations', count: 8 }
    ];

    for (const table of tablesToSeed) {
      try {
        console.log(`📋 Creating ${table.name}...`);
        
        const records = [];
        for (let i = 1; i <= table.count; i++) {
          const baseRecord = {
            id: require('crypto').randomUUID(),
            created_at: new Date(),
            updated_at: new Date()
          };

          // Add specific fields based on table type
          switch (table.name) {
            case 'Budgets':
              records.push({
                ...baseRecord,
                department_id: departments[Math.floor(Math.random() * departments.length)].id,
                budget_year: 2024,
                budget_period: ['Q1', 'Q2', 'Q3', 'Q4'][Math.floor(Math.random() * 4)],
                budget_type: ['operational', 'capital', 'project', 'department'][Math.floor(Math.random() * 4)],
                allocated_amount: Math.floor(Math.random() * 50000000) + 1000000,
                spent_amount: Math.floor(Math.random() * 30000000) + 500000,
                remaining_amount: Math.floor(Math.random() * 20000000) + 100000,
                status: ['draft', 'approved', 'active', 'closed'][Math.floor(Math.random() * 4)],
                description: `Budget for ${['Q1', 'Q2', 'Q3', 'Q4'][Math.floor(Math.random() * 4)]} 2024`,
                notes: 'Budget allocation and tracking'
              });
              break;

            case 'Accounts Receivable':
              records.push({
                ...baseRecord,
                client_id: clients[Math.floor(Math.random() * clients.length)].id,
                invoice_number: `INV-${String(i).padStart(4, '0')}`,
                amount: Math.floor(Math.random() * 5000000) + 100000,
                due_date: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
                status: ['pending', 'paid', 'overdue', 'partial'][Math.floor(Math.random() * 4)],
                payment_terms: ['net_30', 'net_60', 'immediate', 'net_15'][Math.floor(Math.random() * 4)],
                description: `Invoice for services rendered`,
                notes: 'Accounts receivable tracking'
              });
              break;

            case 'Accounts Payable':
              records.push({
                ...baseRecord,
                supplier_id: suppliers[Math.floor(Math.random() * suppliers.length)].id,
                invoice_number: `PO-${String(i).padStart(4, '0')}`,
                amount: Math.floor(Math.random() * 3000000) + 50000,
                due_date: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
                status: ['pending', 'paid', 'overdue', 'partial'][Math.floor(Math.random() * 4)],
                payment_terms: ['net_30', 'net_60', 'immediate', 'net_15'][Math.floor(Math.random() * 4)],
                description: `Payment for goods/services`,
                notes: 'Accounts payable tracking'
              });
              break;

            case 'Invoices':
              records.push({
                ...baseRecord,
                client_id: clients[Math.floor(Math.random() * clients.length)].id,
                invoice_number: `INV-${String(i).padStart(4, '0')}`,
                invoice_date: new Date(),
                due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                subtotal: Math.floor(Math.random() * 1000000) + 50000,
                tax_amount: Math.floor(Math.random() * 100000) + 5000,
                total_amount: Math.floor(Math.random() * 1100000) + 55000,
                status: ['draft', 'sent', 'paid', 'overdue', 'cancelled'][Math.floor(Math.random() * 5)],
                payment_method: ['bank_transfer', 'cash', 'check', 'credit_card'][Math.floor(Math.random() * 4)],
                description: `Invoice for professional services`,
                notes: 'Invoice processing'
              });
              break;

            case 'Financial Reports':
              records.push({
                ...baseRecord,
                report_type: ['income_statement', 'balance_sheet', 'cash_flow', 'profit_loss'][Math.floor(Math.random() * 4)],
                report_period: ['monthly', 'quarterly', 'annual'][Math.floor(Math.random() * 3)],
                report_date: new Date(),
                generated_by: users[Math.floor(Math.random() * users.length)].id,
                file_path: `reports/financial_${Date.now()}.pdf`,
                status: ['draft', 'final', 'archived'][Math.floor(Math.random() * 3)],
                description: `${['Income Statement', 'Balance Sheet', 'Cash Flow', 'Profit & Loss'][Math.floor(Math.random() * 4)]} Report`,
                notes: 'Financial reporting'
              });
              break;

            case 'Tax Records':
              records.push({
                ...baseRecord,
                tax_type: ['income_tax', 'vat', 'withholding_tax', 'corporate_tax'][Math.floor(Math.random() * 4)],
                tax_period: ['2024-Q1', '2024-Q2', '2024-Q3', '2024-Q4'][Math.floor(Math.random() * 4)],
                taxable_amount: Math.floor(Math.random() * 10000000) + 100000,
                tax_amount: Math.floor(Math.random() * 2000000) + 20000,
                due_date: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
                status: ['pending', 'filed', 'paid', 'overdue'][Math.floor(Math.random() * 4)],
                filing_date: Math.random() > 0.5 ? new Date() : null,
                description: `Tax filing for ${['Q1', 'Q2', 'Q3', 'Q4'][Math.floor(Math.random() * 4)]} 2024`,
                notes: 'Tax compliance tracking'
              });
              break;

            case 'Cash Flows':
              records.push({
                ...baseRecord,
                flow_type: ['inflow', 'outflow'][Math.floor(Math.random() * 2)],
                category: ['operating', 'investing', 'financing'][Math.floor(Math.random() * 3)],
                amount: Math.floor(Math.random() * 5000000) + 100000,
                transaction_date: new Date(),
                description: `${['Operating', 'Investing', 'Financing'][Math.floor(Math.random() * 3)]} cash flow`,
                source: ['sales', 'purchases', 'investments', 'loans'][Math.floor(Math.random() * 4)],
                status: ['pending', 'completed', 'cancelled'][Math.floor(Math.random() * 3)],
                notes: 'Cash flow tracking'
              });
              break;

            case 'Systems':
              records.push({
                ...baseRecord,
                system_name: ['ERP System', 'CRM System', 'HR System', 'Finance System', 'Inventory System', 'Security System', 'Email System', 'Backup System'][Math.floor(Math.random() * 8)],
                system_type: ['software', 'hardware', 'cloud', 'on_premise'][Math.floor(Math.random() * 4)],
                vendor: ['Microsoft', 'Oracle', 'SAP', 'Salesforce', 'Custom'][Math.floor(Math.random() * 5)],
                version: `${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
                status: ['active', 'maintenance', 'deprecated', 'development'][Math.floor(Math.random() * 4)],
                description: `IT system for business operations`,
                notes: 'System management'
              });
              break;

            case 'Network Devices':
              records.push({
                ...baseRecord,
                device_name: ['Router-01', 'Switch-01', 'Firewall-01', 'Server-01', 'Workstation-01', 'Printer-01', 'Scanner-01', 'UPS-01'][Math.floor(Math.random() * 8)],
                device_type: ['router', 'switch', 'firewall', 'server', 'workstation', 'printer', 'scanner', 'ups'][Math.floor(Math.random() * 8)],
                ip_address: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
                mac_address: `00:1B:44:11:3A:B${Math.floor(Math.random() * 10)}`,
                location: rwandanCities[Math.floor(Math.random() * rwandanCities.length)],
                status: ['active', 'inactive', 'maintenance', 'faulty'][Math.floor(Math.random() * 4)],
                description: `Network device for connectivity`,
                notes: 'Network device management'
              });
              break;

            case 'Maintenance Schedules':
              records.push({
                ...baseRecord,
                equipment_id: require('crypto').randomUUID(),
                maintenance_type: ['preventive', 'corrective', 'emergency', 'routine'][Math.floor(Math.random() * 4)],
                scheduled_date: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
                estimated_duration: Math.floor(Math.random() * 8) + 1,
                assigned_technician: `${rwandanNames.male[Math.floor(Math.random() * rwandanNames.male.length)]} ${rwandanSurnames[Math.floor(Math.random() * rwandanSurnames.length)]}`,
                status: ['scheduled', 'in_progress', 'completed', 'cancelled'][Math.floor(Math.random() * 4)],
                description: `Maintenance for equipment`,
                notes: 'Maintenance scheduling'
              });
              break;

            case 'Security Assignments':
              records.push({
                ...baseRecord,
                security_guard_id: require('crypto').randomUUID(),
                assignment_type: ['patrol', 'stationary', 'escort', 'monitoring'][Math.floor(Math.random() * 4)],
                location: rwandanCities[Math.floor(Math.random() * rwandanCities.length)],
                start_time: new Date(),
                end_time: new Date(Date.now() + 8 * 60 * 60 * 1000),
                status: ['assigned', 'in_progress', 'completed', 'cancelled'][Math.floor(Math.random() * 4)],
                description: `Security assignment for location`,
                notes: 'Security guard assignment'
              });
              break;

            case 'Inventory Transactions':
              records.push({
                ...baseRecord,
                item_id: require('crypto').randomUUID(),
                transaction_type: ['in', 'out', 'transfer', 'adjustment'][Math.floor(Math.random() * 4)],
                quantity: Math.floor(Math.random() * 100) + 1,
                unit_price: Math.floor(Math.random() * 10000) + 100,
                total_amount: Math.floor(Math.random() * 1000000) + 1000,
                transaction_date: new Date(),
                reference_number: `TXN-${String(i).padStart(4, '0')}`,
                status: ['pending', 'completed', 'cancelled'][Math.floor(Math.random() * 3)],
                description: `Inventory transaction`,
                notes: 'Inventory management'
              });
              break;

            case 'Purchase Orders':
              records.push({
                ...baseRecord,
                supplier_id: suppliers[Math.floor(Math.random() * suppliers.length)].id,
                po_number: `PO-${String(i).padStart(4, '0')}`,
                order_date: new Date(),
                expected_delivery: new Date(Date.now() + Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000),
                total_amount: Math.floor(Math.random() * 5000000) + 100000,
                status: ['draft', 'sent', 'confirmed', 'received', 'cancelled'][Math.floor(Math.random() * 5)],
                payment_terms: ['net_30', 'net_60', 'immediate', 'net_15'][Math.floor(Math.random() * 4)],
                description: `Purchase order for supplies`,
                notes: 'Purchase order management'
              });
              break;

            case 'Warehouses':
              records.push({
                ...baseRecord,
                warehouse_name: ['Main Warehouse', 'Secondary Warehouse', 'Distribution Center', 'Storage Facility', 'Cold Storage'][Math.floor(Math.random() * 5)],
                location: rwandanCities[Math.floor(Math.random() * rwandanCities.length)],
                capacity: Math.floor(Math.random() * 10000) + 1000,
                current_utilization: Math.floor(Math.random() * 80) + 10,
                manager: `${rwandanNames.male[Math.floor(Math.random() * rwandanNames.male.length)]} ${rwandanSurnames[Math.floor(Math.random() * rwandanSurnames.length)]}`,
                status: ['active', 'inactive', 'maintenance'][Math.floor(Math.random() * 3)],
                description: `Warehouse facility`,
                notes: 'Warehouse management'
              });
              break;

            case 'Opportunities':
              records.push({
                ...baseRecord,
                client_id: clients[Math.floor(Math.random() * clients.length)].id,
                opportunity_name: `Opportunity ${i}`,
                value: Math.floor(Math.random() * 10000000) + 100000,
                stage: ['prospecting', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost'][Math.floor(Math.random() * 6)],
                probability: Math.floor(Math.random() * 100) + 1,
                expected_close_date: new Date(Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000),
                assigned_to: users[Math.floor(Math.random() * users.length)].id,
                source: ['website', 'referral', 'cold_call', 'social_media'][Math.floor(Math.random() * 4)],
                description: `Business opportunity`,
                notes: 'Sales opportunity tracking'
              });
              break;

            case 'Quotes':
              records.push({
                ...baseRecord,
                client_id: clients[Math.floor(Math.random() * clients.length)].id,
                quote_number: `QT-${String(i).padStart(4, '0')}`,
                quote_date: new Date(),
                valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                total_amount: Math.floor(Math.random() * 5000000) + 100000,
                status: ['draft', 'sent', 'accepted', 'rejected', 'expired'][Math.floor(Math.random() * 5)],
                terms_conditions: 'Standard terms and conditions apply',
                description: `Quote for services`,
                notes: 'Quote management'
              });
              break;

            case 'Marketing Campaigns':
              records.push({
                ...baseRecord,
                campaign_name: `Campaign ${i}`,
                campaign_type: ['email', 'social_media', 'print', 'digital', 'event'][Math.floor(Math.random() * 5)],
                start_date: new Date(),
                end_date: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
                budget: Math.floor(Math.random() * 1000000) + 10000,
                status: ['planned', 'active', 'completed', 'cancelled'][Math.floor(Math.random() * 4)],
                target_audience: ['existing_customers', 'prospects', 'general_public'][Math.floor(Math.random() * 3)],
                description: `Marketing campaign`,
                notes: 'Marketing campaign management'
              });
              break;

            case 'Compliance Policies':
              records.push({
                ...baseRecord,
                policy_name: `Policy ${i}`,
                policy_type: ['security', 'privacy', 'financial', 'operational', 'environmental'][Math.floor(Math.random() * 5)],
                effective_date: new Date(),
                review_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                status: ['draft', 'active', 'archived'][Math.floor(Math.random() * 3)],
                compliance_level: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
                description: `Compliance policy`,
                notes: 'Compliance management'
              });
              break;

            case 'Recovery Cases':
              records.push({
                ...baseRecord,
                case_number: `RC-${String(i).padStart(4, '0')}`,
                case_type: ['debt_recovery', 'asset_recovery', 'legal_recovery', 'insurance_recovery'][Math.floor(Math.random() * 4)],
                client_id: clients[Math.floor(Math.random() * clients.length)].id,
                amount_involved: Math.floor(Math.random() * 10000000) + 100000,
                status: ['open', 'investigating', 'negotiating', 'resolved', 'closed'][Math.floor(Math.random() * 5)],
                assigned_to: users[Math.floor(Math.random() * users.length)].id,
                priority: ['low', 'medium', 'high', 'urgent'][Math.floor(Math.random() * 4)],
                description: `Recovery case`,
                notes: 'Recovery case management'
              });
              break;

            case 'Customer Surveys':
              records.push({
                ...baseRecord,
                survey_name: `Survey ${i}`,
                survey_type: ['satisfaction', 'feedback', 'product', 'service'][Math.floor(Math.random() * 4)],
                client_id: clients[Math.floor(Math.random() * clients.length)].id,
                survey_date: new Date(),
                rating: Math.floor(Math.random() * 5) + 1,
                response_count: Math.floor(Math.random() * 100) + 10,
                status: ['active', 'completed', 'analysed'][Math.floor(Math.random() * 3)],
                description: `Customer survey`,
                notes: 'Customer feedback collection'
              });
              break;

            case 'Support Tickets':
              records.push({
                ...baseRecord,
                ticket_number: `TKT-${String(i).padStart(4, '0')}`,
                client_id: clients[Math.floor(Math.random() * clients.length)].id,
                issue_type: ['technical', 'billing', 'general', 'urgent'][Math.floor(Math.random() * 4)],
                priority: ['low', 'medium', 'high', 'urgent'][Math.floor(Math.random() * 4)],
                status: ['open', 'in_progress', 'resolved', 'closed'][Math.floor(Math.random() * 4)],
                assigned_to: users[Math.floor(Math.random() * users.length)].id,
                created_date: new Date(),
                resolution_time: Math.floor(Math.random() * 72) + 1,
                description: `Support ticket`,
                notes: 'Customer support tracking'
              });
              break;

            case 'Projects':
              records.push({
                ...baseRecord,
                project_name: `Project ${i}`,
                project_type: ['development', 'implementation', 'consulting', 'maintenance'][Math.floor(Math.random() * 4)],
                client_id: clients[Math.floor(Math.random() * clients.length)].id,
                start_date: new Date(),
                end_date: new Date(Date.now() + Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000),
                budget: Math.floor(Math.random() * 50000000) + 1000000,
                status: ['planning', 'active', 'on_hold', 'completed', 'cancelled'][Math.floor(Math.random() * 5)],
                project_manager: users[Math.floor(Math.random() * users.length)].id,
                description: `Project management`,
                notes: 'Project tracking'
              });
              break;

            case 'Notifications':
              records.push({
                ...baseRecord,
                user_id: users[Math.floor(Math.random() * users.length)].id,
                notification_type: ['email', 'sms', 'push', 'system'][Math.floor(Math.random() * 4)],
                title: `Notification ${i}`,
                message: `This is notification message ${i}`,
                status: ['unread', 'read', 'archived'][Math.floor(Math.random() * 3)],
                priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
                sent_date: new Date(),
                read_date: Math.random() > 0.5 ? new Date() : null,
                description: `System notification`,
                notes: 'Notification management'
              });
              break;

            case 'Reports':
              records.push({
                ...baseRecord,
                report_name: `Report ${i}`,
                report_type: ['analytical', 'operational', 'financial', 'compliance'][Math.floor(Math.random() * 4)],
                generated_by: users[Math.floor(Math.random() * users.length)].id,
                generation_date: new Date(),
                file_path: `reports/report_${Date.now()}.pdf`,
                status: ['draft', 'final', 'archived'][Math.floor(Math.random() * 3)],
                schedule: ['daily', 'weekly', 'monthly', 'quarterly'][Math.floor(Math.random() * 4)],
                description: `Business report`,
                notes: 'Report generation'
              });
              break;

            case 'KPIs':
              records.push({
                ...baseRecord,
                kpi_name: `KPI ${i}`,
                kpi_type: ['financial', 'operational', 'customer', 'employee'][Math.floor(Math.random() * 4)],
                target_value: Math.floor(Math.random() * 100) + 1,
                current_value: Math.floor(Math.random() * 100) + 1,
                unit: ['percentage', 'number', 'currency', 'time'][Math.floor(Math.random() * 4)],
                frequency: ['daily', 'weekly', 'monthly', 'quarterly'][Math.floor(Math.random() * 4)],
                status: ['on_track', 'at_risk', 'off_track'][Math.floor(Math.random() * 3)],
                description: `Key Performance Indicator`,
                notes: 'KPI tracking'
              });
              break;

            case 'Workflows':
              records.push({
                ...baseRecord,
                workflow_name: `Workflow ${i}`,
                workflow_type: ['approval', 'notification', 'automation', 'process'][Math.floor(Math.random() * 4)],
                trigger_event: ['user_action', 'system_event', 'time_based', 'condition'][Math.floor(Math.random() * 4)],
                status: ['active', 'inactive', 'draft'][Math.floor(Math.random() * 3)],
                steps_count: Math.floor(Math.random() * 10) + 1,
                average_duration: Math.floor(Math.random() * 24) + 1,
                description: `Business workflow`,
                notes: 'Workflow management'
              });
              break;

            case 'Integrations':
              records.push({
                ...baseRecord,
                integration_name: `Integration ${i}`,
                integration_type: ['api', 'webhook', 'database', 'file_transfer'][Math.floor(Math.random() * 4)],
                external_system: ['CRM', 'ERP', 'Accounting', 'Email', 'Payment'][Math.floor(Math.random() * 5)],
                status: ['active', 'inactive', 'error', 'maintenance'][Math.floor(Math.random() * 4)],
                last_sync: new Date(),
                sync_frequency: ['real_time', 'hourly', 'daily', 'weekly'][Math.floor(Math.random() * 4)],
                description: `System integration`,
                notes: 'Integration management'
              });
              break;
          }
        }

        await table.model.bulkCreate(records);
        console.log(`   ✅ Created ${table.count} ${table.name} records`);

      } catch (error) {
        console.log(`   ⚠️ Skipped ${table.name} (may already have data): ${error.message}`);
      }
    }

    console.log('');
    console.log('🎉 SIMPLE SEED DATA GENERATION COMPLETED!');
    console.log('');
    console.log('📊 SUMMARY:');
    console.log('   ✅ Added seed data to empty tables');
    console.log('   ✅ Avoided unique constraint violations');
    console.log('   ✅ Used realistic Rwanda-based data');
    console.log('');
    console.log('🚀 Database now has comprehensive seed data!');
    console.log('📋 Ready for testing and development');

    await sequelize.close();
    console.log('🔌 Database connection closed.');

  } catch (error) {
    console.error('❌ Error generating seed data:', error);
    process.exit(1);
  }
};

// Run the simple seed data generation
simpleSeedData(); 