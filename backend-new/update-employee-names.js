const { sequelize } = require('./config/database');
const Employee = require('./models/Employee');

const updateEmployeeNames = async () => {
  try {
    console.log('👥 Updating employee names with real Rwandan names...');

    // Get all employees
    const employees = await Employee.findAll();
    console.log(`📋 Found ${employees.length} employees to update`);

    // Real Rwandan names for all employees
    const employeeNames = [
      // HR Department (3 employees)
      { empId: 'EMP001', firstName: 'Jean', lastName: 'Ndayisaba' },
      { empId: 'EMP002', firstName: 'Claudine', lastName: 'Uwimana' },
      { empId: 'EMP003', firstName: 'Grace', lastName: 'Nshimiyimana' },

      // Finance Department (4 employees)
      { empId: 'EMP004', firstName: 'Emmanuel', lastName: 'Rugamba' },
      { empId: 'EMP005', firstName: 'Alice', lastName: 'Mukamana' },
      { empId: 'EMP006', firstName: 'David', lastName: 'Niyonsenga' },
      { empId: 'EMP007', firstName: 'Sarah', lastName: 'Uwimana' },

      // IT Department (3 employees)
      { empId: 'EMP008', firstName: 'Eric', lastName: 'Niyonsenga' },
      { empId: 'EMP009', firstName: 'Patrick', lastName: 'Gasana' },
      { empId: 'EMP010', firstName: 'Marie Claire', lastName: 'Kabera' },

      // Security Department (3 employees)
      { empId: 'EMP011', firstName: 'Patrick', lastName: 'Mugisha' },
      { empId: 'EMP012', firstName: 'Jean Bosco', lastName: 'Nshimiyimana' },
      { empId: 'EMP013', firstName: 'Emmanuel', lastName: 'Ndayisaba' },

      // Operations Department (3 employees)
      { empId: 'EMP014', firstName: 'Marie', lastName: 'Mukamana' },
      { empId: 'EMP015', firstName: 'Claudine', lastName: 'Uwimana' },
      { empId: 'EMP016', firstName: 'Pierre', lastName: 'Niyonsenga' },

      // Sales & Marketing Department (3 employees)
      { empId: 'EMP017', firstName: 'David', lastName: 'Habyarimana' },
      { empId: 'EMP018', firstName: 'Ange', lastName: 'Uwase' },
      { empId: 'EMP019', firstName: 'Eric', lastName: 'Rugamba' },

      // Risk Management Department (2 employees)
      { empId: 'EMP020', firstName: 'Ange', lastName: 'Uwase' },
      { empId: 'EMP021', firstName: 'Marie', lastName: 'Uwimana' }
    ];

    // Update each employee with their real name
    for (const nameData of employeeNames) {
      const employee = employees.find(emp => emp.employee_number === nameData.empId);
      if (employee) {
        await employee.update({
          first_name: nameData.firstName,
          last_name: nameData.lastName
        });
        console.log(`✅ Updated ${nameData.empId}: ${nameData.firstName} ${nameData.lastName}`);
      }
    }

    console.log('');
    console.log('🎯 Employee Names Updated:');
    console.log('🇷🇼 All employees now have real Rwandan names');
    console.log('');
    console.log('📊 Updated Employee List:');
    console.log('   EMP001: Jean Ndayisaba (CEO)');
    console.log('   EMP002: Claudine Uwimana (HR Manager)');
    console.log('   EMP003: Grace Nshimiyimana (HR Assistant)');
    console.log('   EMP004: Emmanuel Rugamba (Finance Manager)');
    console.log('   EMP005: Alice Mukamana (Senior Accountant)');
    console.log('   EMP006: David Niyonsenga (Junior Accountant)');
    console.log('   EMP007: Sarah Uwimana (Payroll Specialist)');
    console.log('   EMP008: Eric Niyonsenga (IT Manager)');
    console.log('   EMP009: Patrick Gasana (System Administrator)');
    console.log('   EMP010: Marie Claire Kabera (IT Support Specialist)');
    console.log('   EMP011: Patrick Mugisha (Security Manager)');
    console.log('   EMP012: Jean Bosco Nshimiyimana (Senior Security Guard)');
    console.log('   EMP013: Emmanuel Ndayisaba (Security Guard)');
    console.log('   EMP014: Marie Mukamana (Operations Manager)');
    console.log('   EMP015: Claudine Uwimana (Inventory Specialist)');
    console.log('   EMP016: Pierre Niyonsenga (Warehouse Assistant)');
    console.log('   EMP017: David Habyarimana (Sales Manager)');
    console.log('   EMP018: Ange Uwase (Sales Representative)');
    console.log('   EMP019: Eric Rugamba (Marketing Specialist)');
    console.log('   EMP020: Ange Uwase (Risk Manager)');
    console.log('   EMP021: Marie Uwimana (Compliance Officer)');

    await sequelize.close();
    console.log('🔌 Database connection closed.');

  } catch (error) {
    console.error('❌ Error updating employee names:', error);
    process.exit(1);
  }
};

// Run the update
updateEmployeeNames(); 