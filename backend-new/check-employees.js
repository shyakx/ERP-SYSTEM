const { sequelize } = require('./config/database');
const User = require('./models/User');
const Employee = require('./models/Employee');
const Department = require('./models/Department');
const { defineAssociations } = require('./models/associations');

const checkEmployees = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Define associations
    defineAssociations();

    // Check employees table
    const empCount = await Employee.count();
    console.log(`👥 Total Employees: ${empCount}`);

    if (empCount > 0) {
      const employees = await Employee.findAll({ 
        include: [
          {
            model: Department,
            as: 'department',
            attributes: ['name']
          },
          {
            model: User,
            as: 'user',
            attributes: ['email', 'role']
          }
        ],
        limit: 10 
      });
      
      console.log('\n📋 Sample Employees:');
      employees.forEach((emp, index) => {
        console.log(`${index + 1}. ${emp.first_name} ${emp.last_name}`);
        console.log(`   Employee #: ${emp.employee_number}`);
        console.log(`   Position: ${emp.position}`);
        console.log(`   Department: ${emp.department?.name || 'N/A'}`);
        console.log(`   Salary: RWF ${emp.salary?.toLocaleString() || 'N/A'}`);
        console.log(`   Status: ${emp.status || 'Active'}`);
        console.log(`   User Email: ${emp.user?.email || 'N/A'}`);
        console.log('');
      });
    } else {
      console.log('❌ No employees found in the database');
      console.log('💡 You may need to run the employee seeding script');
    }

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error checking employees:', error);
    process.exit(1);
  }
};

checkEmployees(); 