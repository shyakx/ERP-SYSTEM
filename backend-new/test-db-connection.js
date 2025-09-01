const { sequelize } = require('./config/database');
const User = require('./models/User');
const Employee = require('./models/Employee');
const Department = require('./models/Department');

const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Test Users
    const userCount = await User.count();
    console.log(`👥 Total Users: ${userCount}`);
    
    if (userCount > 0) {
      const users = await User.findAll({ limit: 3 });
      console.log('📋 Sample Users:');
      users.forEach(user => {
        console.log(`   - ${user.first_name} ${user.last_name} (${user.email}) - Role: ${user.role}`);
      });
    }

    // Test Departments
    const deptCount = await Department.count();
    console.log(`🏢 Total Departments: ${deptCount}`);
    
    if (deptCount > 0) {
      const departments = await Department.findAll({ limit: 5 });
      console.log('📋 Sample Departments:');
      departments.forEach(dept => {
        console.log(`   - ${dept.name}`);
      });
    }

    // Test Employees
    const empCount = await Employee.count();
    console.log(`👨‍💼 Total Employees: ${empCount}`);
    
    if (empCount > 0) {
      const employees = await Employee.findAll({ 
        include: [
          {
            model: Department,
            as: 'department',
            attributes: ['name']
          }
        ],
        limit: 5 
      });
      console.log('📋 Sample Employees:');
      employees.forEach(emp => {
        console.log(`   - ${emp.first_name} ${emp.last_name} (${emp.employee_number}) - ${emp.position} - ${emp.department?.name || 'No Department'}`);
      });
    }

    console.log('\n🎯 Database Status:');
    console.log(`   - Users: ${userCount > 0 ? '✅ Has data' : '❌ No data'}`);
    console.log(`   - Departments: ${deptCount > 0 ? '✅ Has data' : '❌ No data'}`);
    console.log(`   - Employees: ${empCount > 0 ? '✅ Has data' : '❌ No data'}`);

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error testing database:', error);
    process.exit(1);
  }
};

testDatabaseConnection(); 