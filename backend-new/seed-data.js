const { sequelize } = require('./config/database');
const Department = require('./models/Department');
const User = require('./models/User');
const SystemSetting = require('./models/SystemSetting');
const Employee = require('./models/Employee');
const Client = require('./models/Client');
const FinancialAccount = require('./models/FinancialAccount');
const Transaction = require('./models/Transaction');
const Expense = require('./models/Expense');
const ITAsset = require('./models/ITAsset');
const ITSupportTicket = require('./models/ITSupportTicket');
const SecurityGuard = require('./models/SecurityGuard');
const SecurityIncident = require('./models/SecurityIncident');
const InventoryItem = require('./models/InventoryItem');
const Supplier = require('./models/Supplier');
const Contract = require('./models/Contract');
const Lead = require('./models/Lead');
const RiskAssessment = require('./models/RiskAssessment');

const seedData = async () => {
  try {
    console.log('🌱 Starting to seed DICEL ERP database with Rwanda-based data...');

    // 1. Create Departments
    console.log('📋 Creating departments...');
    const departments = await Department.bulkCreate([
      {
        name: 'Human Resources',
        code: 'HR',
        description: 'Human Resources and Employee Management',
        budget: 50000000,
        location: 'Kigali, Rwanda',
        phone: '+250 788 123 456',
        email: 'hr@dicel.co.rw'
      },
      {
        name: 'Finance',
        code: 'FIN',
        description: 'Financial Management and Accounting',
        budget: 100000000,
        location: 'Kigali, Rwanda',
        phone: '+250 788 123 457',
        email: 'finance@dicel.co.rw'
      },
      {
        name: 'Information Technology',
        code: 'IT',
        description: 'IT Infrastructure and Support',
        budget: 75000000,
        location: 'Kigali, Rwanda',
        phone: '+250 788 123 458',
        email: 'it@dicel.co.rw'
      },
      {
        name: 'Security',
        code: 'SEC',
        description: 'Security and Safety Management',
        budget: 30000000,
        location: 'Kigali, Rwanda',
        phone: '+250 788 123 459',
        email: 'security@dicel.co.rw'
      },
      {
        name: 'Operations',
        code: 'OPS',
        description: 'Operations and Inventory Management',
        budget: 60000000,
        location: 'Kigali, Rwanda',
        phone: '+250 788 123 460',
        email: 'operations@dicel.co.rw'
      },
      {
        name: 'Sales & Marketing',
        code: 'SALES',
        description: 'Sales, Marketing and Business Development',
        budget: 40000000,
        location: 'Kigali, Rwanda',
        phone: '+250 788 123 461',
        email: 'sales@dicel.co.rw'
      },
      {
        name: 'Risk Management',
        code: 'RISK',
        description: 'Risk Assessment and Compliance',
        budget: 25000000,
        location: 'Kigali, Rwanda',
        phone: '+250 788 123 462',
        email: 'risk@dicel.co.rw'
      }
    ]);

    // 2. Create Users
    console.log('👥 Creating users...');
    const users = await User.bulkCreate([
      {
        email: 'admin@dicel.co.rw',
        password_hash: 'admin123',
        first_name: 'Jean',
        last_name: 'Ndayisaba',
        role: 'admin',
        department_id: departments[0].id,
        employee_id: 'EMP001',
        position: 'Chief Executive Officer',
        phone: '+250 788 123 001',
        address: 'KG 123 St, Kigali, Rwanda',
        date_of_birth: '1980-05-15',
        hire_date: '2020-01-15',
        salary: 5000000,
        emergency_contact: {
          name: 'Marie Ndayisaba',
          phone: '+250 788 123 002',
          relationship: 'Spouse'
        },
        skills: ['Leadership', 'Strategic Planning', 'Business Development'],
        certifications: ['MBA', 'PMP']
      },
      {
        email: 'hr.manager@dicel.co.rw',
        password_hash: 'hr123',
        first_name: 'Claudine',
        last_name: 'Uwimana',
        role: 'hr',
        department_id: departments[0].id,
        employee_id: 'EMP002',
        position: 'HR Manager',
        phone: '+250 788 123 003',
        address: 'KG 456 St, Kigali, Rwanda',
        date_of_birth: '1985-08-22',
        hire_date: '2020-03-01',
        salary: 3500000,
        emergency_contact: {
          name: 'Pierre Uwimana',
          phone: '+250 788 123 004',
          relationship: 'Spouse'
        },
        skills: ['HR Management', 'Recruitment', 'Employee Relations'],
        certifications: ['PHR', 'SHRM-CP']
      },
      {
        email: 'finance.manager@dicel.co.rw',
        password_hash: 'finance123',
        first_name: 'Emmanuel',
        last_name: 'Rugamba',
        role: 'finance',
        department_id: departments[1].id,
        employee_id: 'EMP003',
        position: 'Finance Manager',
        phone: '+250 788 123 005',
        address: 'KG 789 St, Kigali, Rwanda',
        date_of_birth: '1982-12-10',
        hire_date: '2020-02-15',
        salary: 4000000,
        emergency_contact: {
          name: 'Grace Rugamba',
          phone: '+250 788 123 006',
          relationship: 'Spouse'
        },
        skills: ['Financial Management', 'Accounting', 'Budgeting'],
        certifications: ['CPA', 'CFA']
      },
      {
        email: 'it.manager@dicel.co.rw',
        password_hash: 'it123',
        first_name: 'Eric',
        last_name: 'Niyonsenga',
        role: 'it',
        department_id: departments[2].id,
        employee_id: 'EMP004',
        position: 'IT Manager',
        phone: '+250 788 123 007',
        address: 'KG 321 St, Kigali, Rwanda',
        date_of_birth: '1988-03-25',
        hire_date: '2020-04-01',
        salary: 3800000,
        emergency_contact: {
          name: 'Alice Niyonsenga',
          phone: '+250 788 123 008',
          relationship: 'Spouse'
        },
        skills: ['System Administration', 'Network Security', 'Software Development'],
        certifications: ['CCNA', 'AWS Certified']
      },
      {
        email: 'security.manager@dicel.co.rw',
        password_hash: 'security123',
        first_name: 'Patrick',
        last_name: 'Mugisha',
        role: 'security',
        department_id: departments[3].id,
        employee_id: 'EMP005',
        position: 'Security Manager',
        phone: '+250 788 123 009',
        address: 'KG 654 St, Kigali, Rwanda',
        date_of_birth: '1983-07-18',
        hire_date: '2020-05-01',
        salary: 3200000,
        emergency_contact: {
          name: 'Rose Mugisha',
          phone: '+250 788 123 010',
          relationship: 'Spouse'
        },
        skills: ['Security Management', 'Risk Assessment', 'Crisis Management'],
        certifications: ['CSP', 'CPP']
      },
      {
        email: 'operations.manager@dicel.co.rw',
        password_hash: 'ops123',
        first_name: 'Marie',
        last_name: 'Mukamana',
        role: 'inventory',
        department_id: departments[4].id,
        employee_id: 'EMP006',
        position: 'Operations Manager',
        phone: '+250 788 123 011',
        address: 'KG 987 St, Kigali, Rwanda',
        date_of_birth: '1986-11-30',
        hire_date: '2020-06-01',
        salary: 3600000,
        emergency_contact: {
          name: 'John Mukamana',
          phone: '+250 788 123 012',
          relationship: 'Spouse'
        },
        skills: ['Operations Management', 'Supply Chain', 'Inventory Control'],
        certifications: ['CSCP', 'CPIM']
      },
      {
        email: 'sales.manager@dicel.co.rw',
        password_hash: 'sales123',
        first_name: 'David',
        last_name: 'Habyarimana',
        role: 'sales',
        department_id: departments[5].id,
        employee_id: 'EMP007',
        position: 'Sales Manager',
        phone: '+250 788 123 013',
        address: 'KG 147 St, Kigali, Rwanda',
        date_of_birth: '1987-04-12',
        hire_date: '2020-07-01',
        salary: 3400000,
        emergency_contact: {
          name: 'Sarah Habyarimana',
          phone: '+250 788 123 014',
          relationship: 'Spouse'
        },
        skills: ['Sales Management', 'Business Development', 'Customer Relations'],
        certifications: ['CSP', 'Salesforce Certified']
      },
      {
        email: 'risk.manager@dicel.co.rw',
        password_hash: 'risk123',
        first_name: 'Ange',
        last_name: 'Uwase',
        role: 'risk',
        department_id: departments[6].id,
        employee_id: 'EMP008',
        position: 'Risk Manager',
        phone: '+250 788 123 015',
        address: 'KG 258 St, Kigali, Rwanda',
        date_of_birth: '1984-09-08',
        hire_date: '2020-08-01',
        salary: 3300000,
        emergency_contact: {
          name: 'Paul Uwase',
          phone: '+250 788 123 016',
          relationship: 'Spouse'
        },
        skills: ['Risk Management', 'Compliance', 'Audit'],
        certifications: ['CRMA', 'CIA']
      }
    ]);

    // 3. Create Employees (linking to users)
    console.log('👨‍💼 Creating employees...');
    const employees = await Employee.bulkCreate([
      {
        user_id: users[0].id,
        employee_number: 'EMP001',
        department_id: departments[0].id,
        position: 'Chief Executive Officer',
        hire_date: '2020-01-15',
        salary: 5000000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'Marie Ndayisaba',
          phone: '+250 788 123 002',
          relationship: 'Spouse'
        },
        bank_details: {
          bank_name: 'Bank of Kigali',
          account_number: '1234567890',
          account_type: 'Savings'
        },
        tax_info: {
          tin: '123456789',
          tax_category: 'Employee'
        }
      },
      {
        user_id: users[1].id,
        employee_number: 'EMP002',
        department_id: departments[0].id,
        position: 'HR Manager',
        hire_date: '2020-03-01',
        salary: 3500000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'Pierre Uwimana',
          phone: '+250 788 123 004',
          relationship: 'Spouse'
        },
        bank_details: {
          bank_name: 'Ecobank Rwanda',
          account_number: '0987654321',
          account_type: 'Current'
        },
        tax_info: {
          tin: '987654321',
          tax_category: 'Employee'
        }
      }
    ]);

    // 4. Create Clients
    console.log('🏢 Creating clients...');
    const clients = await Client.bulkCreate([
      {
        client_code: 'CLI001',
        company_name: 'Rwanda Development Board',
        contact_person: 'Jean Pierre Uwimana',
        email: 'contact@rdb.rw',
        phone: '+250 788 234 001',
        address: 'KG 7 Ave, Kigali, Rwanda',
        tax_number: 'TIN001234',
        industry: 'Government',
        client_type: 'Government'
      },
      {
        client_code: 'CLI002',
        company_name: 'Kigali International Airport',
        contact_person: 'Marie Claire Niyonsenga',
        email: 'info@kia.rw',
        phone: '+250 788 234 002',
        address: 'Airport Road, Kigali, Rwanda',
        tax_number: 'TIN002345',
        industry: 'Aviation',
        client_type: 'Corporate'
      },
      {
        client_code: 'CLI003',
        company_name: 'Rwanda Energy Group',
        contact_person: 'Emmanuel Gasana',
        email: 'contact@reg.rw',
        phone: '+250 788 234 003',
        address: 'KG 9 Ave, Kigali, Rwanda',
        tax_number: 'TIN003456',
        industry: 'Energy',
        client_type: 'Corporate'
      },
      {
        client_code: 'CLI004',
        company_name: 'Bank of Kigali',
        contact_person: 'Claudine Uwimana',
        email: 'info@bk.rw',
        phone: '+250 788 234 004',
        address: 'KG 6 Ave, Kigali, Rwanda',
        tax_number: 'TIN004567',
        industry: 'Banking',
        client_type: 'Corporate'
      },
      {
        client_code: 'CLI005',
        company_name: 'Rwanda Revenue Authority',
        contact_person: 'Patrick Nshimiyimana',
        email: 'contact@rra.gov.rw',
        phone: '+250 788 234 005',
        address: 'KG 8 Ave, Kigali, Rwanda',
        tax_number: 'TIN005678',
        industry: 'Government',
        client_type: 'Government'
      }
    ]);

    // 5. Create Financial Accounts
    console.log('💰 Creating financial accounts...');
    const accounts = await FinancialAccount.bulkCreate([
      {
        account_number: 'ACC001',
        account_name: 'Main Operating Account',
        account_type: 'Current',
        currency: 'RWF',
        balance: 50000000
      },
      {
        account_number: 'ACC002',
        account_name: 'Payroll Account',
        account_type: 'Current',
        currency: 'RWF',
        balance: 25000000
      },
      {
        account_number: 'ACC003',
        account_name: 'Savings Account',
        account_type: 'Savings',
        currency: 'RWF',
        balance: 100000000
      },
      {
        account_number: 'ACC004',
        account_name: 'USD Account',
        account_type: 'Current',
        currency: 'USD',
        balance: 50000
      }
    ]);

    // 6. Create Transactions
    console.log('💳 Creating transactions...');
    await Transaction.bulkCreate([
      {
        transaction_number: 'TXN001',
        account_id: accounts[0].id,
        transaction_type: 'credit',
        amount: 10000000,
        currency: 'RWF',
        description: 'Payment from Rwanda Development Board',
        reference_number: 'INV001',
        transaction_date: '2024-01-15',
        created_by: users[2].id
      },
      {
        transaction_number: 'TXN002',
        account_id: accounts[1].id,
        transaction_type: 'debit',
        amount: 15000000,
        currency: 'RWF',
        description: 'Monthly payroll payment',
        reference_number: 'PAY001',
        transaction_date: '2024-01-31',
        created_by: users[2].id
      }
    ]);

    // 7. Create Expenses
    console.log('📊 Creating expenses...');
    await Expense.bulkCreate([
      {
        expense_number: 'EXP001',
        department_id: departments[2].id,
        expense_category: 'IT Equipment',
        amount: 2500000,
        currency: 'RWF',
        description: 'Purchase of laptops for IT department',
        vendor: 'Computer World Rwanda',
        expense_date: '2024-01-10',
        status: 'approved',
        created_by: users[3].id
      },
      {
        expense_number: 'EXP002',
        department_id: departments[0].id,
        expense_category: 'Office Supplies',
        amount: 500000,
        currency: 'RWF',
        description: 'Office furniture and supplies',
        vendor: 'Office Max Rwanda',
        expense_date: '2024-01-12',
        status: 'approved',
        created_by: users[1].id
      }
    ]);

    // 8. Create IT Assets
    console.log('💻 Creating IT assets...');
    await ITAsset.bulkCreate([
      {
        asset_tag: 'IT001',
        asset_name: 'Dell Latitude Laptop',
        asset_type: 'Laptop',
        manufacturer: 'Dell',
        model: 'Latitude 5520',
        serial_number: 'DL123456789',
        purchase_date: '2024-01-10',
        purchase_cost: 850000,
        assigned_to: users[3].id,
        location: 'IT Department, Kigali',
        status: 'active',
        warranty_expiry: '2027-01-10'
      },
      {
        asset_tag: 'IT002',
        asset_name: 'HP LaserJet Printer',
        asset_type: 'Printer',
        manufacturer: 'HP',
        model: 'LaserJet Pro M404n',
        serial_number: 'HP987654321',
        purchase_date: '2024-01-12',
        purchase_cost: 450000,
        assigned_to: users[1].id,
        location: 'HR Department, Kigali',
        status: 'active',
        warranty_expiry: '2026-01-12'
      }
    ]);

    // 9. Create IT Support Tickets
    console.log('🛠️ Creating IT support tickets...');
    await ITSupportTicket.bulkCreate([
      {
        ticket_number: 'TKT001',
        requester_id: users[1].id,
        assigned_to: users[3].id,
        category: 'Hardware',
        priority: 'medium',
        subject: 'Printer not working',
        description: 'HP LaserJet printer showing error message',
        status: 'open'
      },
      {
        ticket_number: 'TKT002',
        requester_id: users[2].id,
        assigned_to: users[3].id,
        category: 'Software',
        priority: 'high',
        subject: 'Email access issue',
        description: 'Cannot access email account',
        status: 'resolved',
        resolution: 'Password reset completed'
      }
    ]);

    // 10. Create Security Guards
    console.log('🛡️ Creating security guards...');
    await SecurityGuard.bulkCreate([
      {
        user_id: users[4].id,
        guard_number: 'SG001',
        license_number: 'SEC001234',
        license_expiry: '2025-12-31',
        training_certifications: ['Security Guard License', 'First Aid', 'Fire Safety'],
        assigned_location: 'Kigali Headquarters',
        shift_preference: 'day',
        emergency_contact: {
          name: 'Rose Mugisha',
          phone: '+250 788 123 010',
          relationship: 'Spouse'
        }
      }
    ]);

    // 11. Create Security Incidents
    console.log('🚨 Creating security incidents...');
    await SecurityIncident.bulkCreate([
      {
        incident_number: 'INC001',
        incident_type: 'Unauthorized Access',
        location: 'Main Entrance, Kigali Headquarters',
        reported_by: users[4].id,
        reported_date: new Date(),
        severity: 'low',
        description: 'Person without proper ID attempted to enter building',
        actions_taken: 'Person escorted out, security protocols reviewed',
        status: 'resolved'
      }
    ]);

    // 12. Create Inventory Items
    console.log('📦 Creating inventory items...');
    await InventoryItem.bulkCreate([
      {
        item_code: 'INV001',
        item_name: 'Office Chairs',
        category: 'Furniture',
        description: 'Ergonomic office chairs',
        unit_of_measure: 'pieces',
        current_stock: 50,
        minimum_stock: 10,
        maximum_stock: 100,
        unit_cost: 75000,
        location: 'Warehouse A, Kigali',
        status: 'active'
      },
      {
        item_code: 'INV002',
        item_name: 'A4 Paper',
        category: 'Office Supplies',
        description: 'White A4 printing paper',
        unit_of_measure: 'reams',
        current_stock: 200,
        minimum_stock: 50,
        maximum_stock: 500,
        unit_cost: 15000,
        location: 'Warehouse B, Kigali',
        status: 'active'
      }
    ]);

    // 13. Create Suppliers
    console.log('🏪 Creating suppliers...');
    await Supplier.bulkCreate([
      {
        supplier_code: 'SUP001',
        supplier_name: 'Computer World Rwanda',
        contact_person: 'John Niyonsenga',
        email: 'info@computerworld.rw',
        phone: '+250 788 345 001',
        address: 'KG 5 Ave, Kigali, Rwanda',
        tax_number: 'TIN123456',
        payment_terms: 'Net 30'
      },
      {
        supplier_code: 'SUP002',
        supplier_name: 'Office Max Rwanda',
        contact_person: 'Marie Uwimana',
        email: 'contact@officemax.rw',
        phone: '+250 788 345 002',
        address: 'KG 7 Ave, Kigali, Rwanda',
        tax_number: 'TIN234567',
        payment_terms: 'Net 15'
      }
    ]);

    // 14. Create Contracts
    console.log('📄 Creating contracts...');
    await Contract.bulkCreate([
      {
        contract_number: 'CON001',
        client_id: clients[0].id,
        contract_type: 'Service Agreement',
        start_date: '2024-01-01',
        end_date: '2024-12-31',
        total_value: 50000000,
        currency: 'RWF',
        status: 'active',
        terms: 'Annual service contract for IT support and security services'
      },
      {
        contract_number: 'CON002',
        client_id: clients[1].id,
        contract_type: 'Maintenance Contract',
        start_date: '2024-02-01',
        end_date: '2025-01-31',
        total_value: 30000000,
        currency: 'RWF',
        status: 'active',
        terms: 'Monthly maintenance and support services'
      }
    ]);

    // 15. Create Leads
    console.log('🎯 Creating leads...');
    await Lead.bulkCreate([
      {
        lead_number: 'LEAD001',
        company_name: 'Rwanda National Police',
        contact_person: 'Commissioner John Bosco Kabera',
        email: 'commissioner@police.gov.rw',
        phone: '+250 788 456 001',
        source: 'Government Tender',
        status: 'qualified',
        assigned_to: users[6].id,
        estimated_value: 75000000,
        notes: 'Interested in comprehensive security solutions'
      },
      {
        lead_number: 'LEAD002',
        company_name: 'Kigali Convention Centre',
        contact_person: 'Alice Uwimana',
        email: 'alice.uwimana@kcc.rw',
        phone: '+250 788 456 002',
        source: 'Referral',
        status: 'new',
        assigned_to: users[6].id,
        estimated_value: 45000000,
        notes: 'Looking for IT infrastructure upgrade'
      }
    ]);

    // 16. Create Risk Assessments
    console.log('⚠️ Creating risk assessments...');
    await RiskAssessment.bulkCreate([
      {
        assessment_number: 'RISK001',
        risk_category: 'Cybersecurity',
        risk_description: 'Potential data breach through unauthorized access',
        likelihood: 3,
        impact: 4,
        mitigation_measures: 'Implement multi-factor authentication, regular security audits',
        assigned_to: users[7].id,
        status: 'open'
      },
      {
        assessment_number: 'RISK002',
        risk_category: 'Operational',
        risk_description: 'Supply chain disruption due to supplier issues',
        likelihood: 2,
        impact: 3,
        mitigation_measures: 'Diversify supplier base, maintain safety stock',
        assigned_to: users[7].id,
        status: 'open'
      }
    ]);

    // 17. Create System Settings
    console.log('⚙️ Creating system settings...');
    await SystemSetting.bulkCreate([
      {
        setting_key: 'company_name',
        setting_value: 'DICEL ERP',
        setting_type: 'string',
        description: 'Company name for the system',
        is_public: true
      },
      {
        setting_key: 'company_address',
        setting_value: 'KG 123 St, Kigali, Rwanda',
        setting_type: 'string',
        description: 'Company address',
        is_public: true
      },
      {
        setting_key: 'company_phone',
        setting_value: '+250 788 123 456',
        setting_type: 'string',
        description: 'Company phone number',
        is_public: true
      },
      {
        setting_key: 'company_email',
        setting_value: 'info@dicel.co.rw',
        setting_type: 'string',
        description: 'Company email address',
        is_public: true
      },
      {
        setting_key: 'currency',
        setting_value: 'RWF',
        setting_type: 'string',
        description: 'Default currency',
        is_public: true
      },
      {
        setting_key: 'timezone',
        setting_value: 'Africa/Kigali',
        setting_type: 'string',
        description: 'System timezone',
        is_public: true
      }
    ]);

    console.log('✅ Database seeded successfully with Rwanda-based data!');
    console.log('');
    console.log('📊 Seeded Data Summary:');
    console.log('   - 7 Departments');
    console.log('   - 8 Users (with @dicel.co.rw emails)');
    console.log('   - 2 Employees');
    console.log('   - 5 Clients');
    console.log('   - 4 Financial Accounts');
    console.log('   - 2 Transactions');
    console.log('   - 2 Expenses');
    console.log('   - 2 IT Assets');
    console.log('   - 2 IT Support Tickets');
    console.log('   - 1 Security Guard');
    console.log('   - 1 Security Incident');
    console.log('   - 2 Inventory Items');
    console.log('   - 2 Suppliers');
    console.log('   - 2 Contracts');
    console.log('   - 2 Leads');
    console.log('   - 2 Risk Assessments');
    console.log('   - 6 System Settings');
    console.log('');
    console.log('🎯 Login Credentials:');
    console.log('   Admin: admin@dicel.co.rw / admin123');
    console.log('   HR: hr.manager@dicel.co.rw / hr123');
    console.log('   Finance: finance.manager@dicel.co.rw / finance123');
    console.log('   IT: it.manager@dicel.co.rw / it123');
    console.log('   Security: security.manager@dicel.co.rw / security123');
    console.log('   Operations: operations.manager@dicel.co.rw / ops123');
    console.log('   Sales: sales.manager@dicel.co.rw / sales123');
    console.log('   Risk: risk.manager@dicel.co.rw / risk123');

    await sequelize.close();
    console.log('🔌 Database connection closed.');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

// Run the seed
seedData(); 