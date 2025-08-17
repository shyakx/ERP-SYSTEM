const { sequelize } = require('./config/database');
const Department = require('./models/Department');
const User = require('./models/User');
const Employee = require('./models/Employee');

const seedEmployees = async () => {
  try {
    console.log('👥 Starting to seed employees across all departments...');

    // Get existing departments
    const departments = await Department.findAll();
    const users = await User.findAll();

    console.log(`📋 Found ${departments.length} departments`);
    console.log(`👤 Found ${users.length} users`);

    // Create comprehensive employee data with real Rwandan names
    const employees = [
      // HR Department (3 employees)
      {
        user_id: users.find(u => u.email === 'admin@dicel.co.rw')?.id,
        employee_number: 'EMP001',
        department_id: departments.find(d => d.code === 'HR')?.id,
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
        },
        status: 'active'
      },
      {
        user_id: users.find(u => u.email === 'hr.manager@dicel.co.rw')?.id,
        employee_number: 'EMP002',
        department_id: departments.find(d => d.code === 'HR')?.id,
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
        },
        status: 'active'
      },
      {
        employee_number: 'EMP003',
        department_id: departments.find(d => d.code === 'HR')?.id,
        position: 'HR Assistant',
        hire_date: '2021-02-15',
        salary: 1800000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'Jean Pierre Nshimiyimana',
          phone: '+250 788 123 017',
          relationship: 'Father'
        },
        bank_details: {
          bank_name: 'Bank of Kigali',
          account_number: '1122334455',
          account_type: 'Savings'
        },
        tax_info: {
          tin: '111222333',
          tax_category: 'Employee'
        },
        status: 'active'
      },

      // Finance Department (4 employees)
      {
        user_id: users.find(u => u.email === 'finance.manager@dicel.co.rw')?.id,
        employee_number: 'EMP004',
        department_id: departments.find(d => d.code === 'FIN')?.id,
        position: 'Finance Manager',
        hire_date: '2020-02-15',
        salary: 4000000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'Grace Rugamba',
          phone: '+250 788 123 006',
          relationship: 'Spouse'
        },
        bank_details: {
          bank_name: 'Ecobank Rwanda',
          account_number: '2233445566',
          account_type: 'Current'
        },
        tax_info: {
          tin: '222333444',
          tax_category: 'Employee'
        },
        status: 'active'
      },
      {
        employee_number: 'EMP005',
        department_id: departments.find(d => d.code === 'FIN')?.id,
        position: 'Senior Accountant',
        hire_date: '2020-06-01',
        salary: 2800000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'Alice Mukamana',
          phone: '+250 788 123 018',
          relationship: 'Spouse'
        },
        bank_details: {
          bank_name: 'Bank of Kigali',
          account_number: '3344556677',
          account_type: 'Savings'
        },
        tax_info: {
          tin: '333444555',
          tax_category: 'Employee'
        },
        status: 'active'
      },
      {
        employee_number: 'EMP006',
        department_id: departments.find(d => d.code === 'FIN')?.id,
        position: 'Junior Accountant',
        hire_date: '2021-03-15',
        salary: 2200000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'David Niyonsenga',
          phone: '+250 788 123 019',
          relationship: 'Brother'
        },
        bank_details: {
          bank_name: 'Ecobank Rwanda',
          account_number: '4455667788',
          account_type: 'Current'
        },
        tax_info: {
          tin: '444555666',
          tax_category: 'Employee'
        },
        status: 'active'
      },
      {
        employee_number: 'EMP007',
        department_id: departments.find(d => d.code === 'FIN')?.id,
        position: 'Payroll Specialist',
        hire_date: '2021-08-01',
        salary: 2000000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'Sarah Uwimana',
          phone: '+250 788 123 020',
          relationship: 'Sister'
        },
        bank_details: {
          bank_name: 'Bank of Kigali',
          account_number: '5566778899',
          account_type: 'Savings'
        },
        tax_info: {
          tin: '555666777',
          tax_category: 'Employee'
        },
        status: 'active'
      },

      // IT Department (3 employees)
      {
        user_id: users.find(u => u.email === 'it.manager@dicel.co.rw')?.id,
        employee_number: 'EMP008',
        department_id: departments.find(d => d.code === 'IT')?.id,
        position: 'IT Manager',
        hire_date: '2020-04-01',
        salary: 3800000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'Alice Niyonsenga',
          phone: '+250 788 123 008',
          relationship: 'Spouse'
        },
        bank_details: {
          bank_name: 'Bank of Kigali',
          account_number: '6677889900',
          account_type: 'Current'
        },
        tax_info: {
          tin: '666777888',
          tax_category: 'Employee'
        },
        status: 'active'
      },
      {
        employee_number: 'EMP009',
        department_id: departments.find(d => d.code === 'IT')?.id,
        position: 'System Administrator',
        hire_date: '2020-07-01',
        salary: 3200000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'Patrick Gasana',
          phone: '+250 788 123 021',
          relationship: 'Father'
        },
        bank_details: {
          bank_name: 'Ecobank Rwanda',
          account_number: '7788990011',
          account_type: 'Savings'
        },
        tax_info: {
          tin: '777888999',
          tax_category: 'Employee'
        },
        status: 'active'
      },
      {
        employee_number: 'EMP010',
        department_id: departments.find(d => d.code === 'IT')?.id,
        position: 'IT Support Specialist',
        hire_date: '2021-01-15',
        salary: 2500000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'Marie Claire Kabera',
          phone: '+250 788 123 022',
          relationship: 'Spouse'
        },
        bank_details: {
          bank_name: 'Bank of Kigali',
          account_number: '8899001122',
          account_type: 'Current'
        },
        tax_info: {
          tin: '888999000',
          tax_category: 'Employee'
        },
        status: 'active'
      },

      // Security Department (3 employees)
      {
        user_id: users.find(u => u.email === 'security.manager@dicel.co.rw')?.id,
        employee_number: 'EMP011',
        department_id: departments.find(d => d.code === 'SEC')?.id,
        position: 'Security Manager',
        hire_date: '2020-05-01',
        salary: 3200000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'Rose Mugisha',
          phone: '+250 788 123 010',
          relationship: 'Spouse'
        },
        bank_details: {
          bank_name: 'Bank of Kigali',
          account_number: '9900112233',
          account_type: 'Savings'
        },
        tax_info: {
          tin: '999000111',
          tax_category: 'Employee'
        },
        status: 'active'
      },
      {
        employee_number: 'EMP012',
        department_id: departments.find(d => d.code === 'SEC')?.id,
        position: 'Senior Security Guard',
        hire_date: '2020-08-01',
        salary: 1800000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'Jean Bosco Nshimiyimana',
          phone: '+250 788 123 023',
          relationship: 'Brother'
        },
        bank_details: {
          bank_name: 'Ecobank Rwanda',
          account_number: '0011223344',
          account_type: 'Current'
        },
        tax_info: {
          tin: '000111222',
          tax_category: 'Employee'
        },
        status: 'active'
      },
      {
        employee_number: 'EMP013',
        department_id: departments.find(d => d.code === 'SEC')?.id,
        position: 'Security Guard',
        hire_date: '2021-04-01',
        salary: 1500000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'Emmanuel Ndayisaba',
          phone: '+250 788 123 024',
          relationship: 'Father'
        },
        bank_details: {
          bank_name: 'Bank of Kigali',
          account_number: '1122334455',
          account_type: 'Savings'
        },
        tax_info: {
          tin: '111222333',
          tax_category: 'Employee'
        },
        status: 'active'
      },

      // Operations Department (3 employees)
      {
        user_id: users.find(u => u.email === 'operations.manager@dicel.co.rw')?.id,
        employee_number: 'EMP014',
        department_id: departments.find(d => d.code === 'OPS')?.id,
        position: 'Operations Manager',
        hire_date: '2020-06-01',
        salary: 3600000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'John Mukamana',
          phone: '+250 788 123 012',
          relationship: 'Spouse'
        },
        bank_details: {
          bank_name: 'Ecobank Rwanda',
          account_number: '2233445566',
          account_type: 'Current'
        },
        tax_info: {
          tin: '222333444',
          tax_category: 'Employee'
        },
        status: 'active'
      },
      {
        employee_number: 'EMP015',
        department_id: departments.find(d => d.code === 'OPS')?.id,
        position: 'Inventory Specialist',
        hire_date: '2020-09-01',
        salary: 2200000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'Claudine Uwimana',
          phone: '+250 788 123 025',
          relationship: 'Sister'
        },
        bank_details: {
          bank_name: 'Bank of Kigali',
          account_number: '3344556677',
          account_type: 'Savings'
        },
        tax_info: {
          tin: '333444555',
          tax_category: 'Employee'
        },
        status: 'active'
      },
      {
        employee_number: 'EMP016',
        department_id: departments.find(d => d.code === 'OPS')?.id,
        position: 'Warehouse Assistant',
        hire_date: '2021-02-01',
        salary: 1600000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'Pierre Niyonsenga',
          phone: '+250 788 123 026',
          relationship: 'Brother'
        },
        bank_details: {
          bank_name: 'Ecobank Rwanda',
          account_number: '4455667788',
          account_type: 'Current'
        },
        tax_info: {
          tin: '444555666',
          tax_category: 'Employee'
        },
        status: 'active'
      },

      // Sales & Marketing Department (3 employees)
      {
        user_id: users.find(u => u.email === 'sales.manager@dicel.co.rw')?.id,
        employee_number: 'EMP017',
        department_id: departments.find(d => d.code === 'SALES')?.id,
        position: 'Sales Manager',
        hire_date: '2020-07-01',
        salary: 3400000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'Sarah Habyarimana',
          phone: '+250 788 123 014',
          relationship: 'Spouse'
        },
        bank_details: {
          bank_name: 'Bank of Kigali',
          account_number: '5566778899',
          account_type: 'Savings'
        },
        tax_info: {
          tin: '555666777',
          tax_category: 'Employee'
        },
        status: 'active'
      },
      {
        employee_number: 'EMP018',
        department_id: departments.find(d => d.code === 'SALES')?.id,
        position: 'Sales Representative',
        hire_date: '2020-10-01',
        salary: 2400000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'Ange Uwase',
          phone: '+250 788 123 027',
          relationship: 'Spouse'
        },
        bank_details: {
          bank_name: 'Ecobank Rwanda',
          account_number: '6677889900',
          account_type: 'Current'
        },
        tax_info: {
          tin: '666777888',
          tax_category: 'Employee'
        },
        status: 'active'
      },
      {
        employee_number: 'EMP019',
        department_id: departments.find(d => d.code === 'SALES')?.id,
        position: 'Marketing Specialist',
        hire_date: '2021-01-01',
        salary: 2600000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'Eric Rugamba',
          phone: '+250 788 123 028',
          relationship: 'Brother'
        },
        bank_details: {
          bank_name: 'Bank of Kigali',
          account_number: '7788990011',
          account_type: 'Savings'
        },
        tax_info: {
          tin: '777888999',
          tax_category: 'Employee'
        },
        status: 'active'
      },

      // Risk Management Department (2 employees)
      {
        user_id: users.find(u => u.email === 'risk.manager@dicel.co.rw')?.id,
        employee_number: 'EMP020',
        department_id: departments.find(d => d.code === 'RISK')?.id,
        position: 'Risk Manager',
        hire_date: '2020-08-01',
        salary: 3300000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'Paul Uwase',
          phone: '+250 788 123 016',
          relationship: 'Spouse'
        },
        bank_details: {
          bank_name: 'Ecobank Rwanda',
          account_number: '8899001122',
          account_type: 'Current'
        },
        tax_info: {
          tin: '888999000',
          tax_category: 'Employee'
        },
        status: 'active'
      },
      {
        employee_number: 'EMP021',
        department_id: departments.find(d => d.code === 'RISK')?.id,
        position: 'Compliance Officer',
        hire_date: '2021-03-01',
        salary: 2800000,
        salary_currency: 'RWF',
        employment_type: 'full-time',
        work_location: 'Kigali Headquarters',
        emergency_contact: {
          name: 'Marie Uwimana',
          phone: '+250 788 123 029',
          relationship: 'Sister'
        },
        bank_details: {
          bank_name: 'Bank of Kigali',
          account_number: '9900112233',
          account_type: 'Savings'
        },
        tax_info: {
          tin: '999000111',
          tax_category: 'Employee'
        },
        status: 'active'
      }
    ];

    // Clear existing employees (optional - comment out if you want to keep existing)
    console.log('🗑️ Clearing existing employees...');
    await Employee.destroy({ where: {} });

    // Create all employees
    console.log('👥 Creating employees...');
    const createdEmployees = await Employee.bulkCreate(employees);

    console.log('✅ Employees seeded successfully!');
    console.log('');
    console.log('📊 Employee Distribution by Department:');
    console.log('   - HR Department: 3 employees (EMP001-EMP003)');
    console.log('   - Finance Department: 4 employees (EMP004-EMP007)');
    console.log('   - IT Department: 3 employees (EMP008-EMP010)');
    console.log('   - Security Department: 3 employees (EMP011-EMP013)');
    console.log('   - Operations Department: 3 employees (EMP014-EMP016)');
    console.log('   - Sales & Marketing Department: 3 employees (EMP017-EMP019)');
    console.log('   - Risk Management Department: 2 employees (EMP020-EMP021)');
    console.log('');
    console.log(`📈 Total Employees Created: ${createdEmployees.length}`);
    console.log('🎯 All employees have proper EMP001, EMP002, etc. IDs');
    console.log('🇷🇼 All employees have real Rwandan names');

    await sequelize.close();
    console.log('🔌 Database connection closed.');

  } catch (error) {
    console.error('❌ Error seeding employees:', error);
    process.exit(1);
  }
};

// Run the seed
seedEmployees(); 