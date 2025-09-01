const { sequelize } = require('./config/database');
const User = require('./models/User');
const Employee = require('./models/Employee');
const Department = require('./models/Department');
const { defineAssociations } = require('./models/associations');

const showAllUsers = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.\n');

    // Define associations
    defineAssociations();

    // Get all users with their employee information
    const users = await User.findAll({
      include: [
        {
          model: Employee,
          as: 'employee',
          include: [
            {
              model: Department,
              as: 'department',
              attributes: ['name']
            }
          ]
        }
      ],
      order: [['created_at', 'ASC']]
    });

    console.log('👥 ALL USERS IN DICEL ERP DATABASE');
    console.log('=====================================\n');

    if (users.length === 0) {
      console.log('❌ No users found in the database');
      return;
    }

    users.forEach((user, index) => {
      console.log(`${index + 1}. 👤 ${user.first_name} ${user.last_name}`);
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   🔑 Password: (hashed in database)`);
      console.log(`   👨‍💼 Role: ${user.role}`);
      console.log(`   📱 Phone: ${user.phone || 'N/A'}`);
      console.log(`   ✅ Active: ${user.is_active ? 'Yes' : 'No'}`);
      
      if (user.employee) {
        console.log(`   🏢 Employee Info:`);
        console.log(`      - Employee #: ${user.employee.employee_number}`);
        console.log(`      - Position: ${user.employee.position}`);
        console.log(`      - Department: ${user.employee.department?.name || 'N/A'}`);
        console.log(`      - Salary: RWF ${user.employee.salary?.toLocaleString() || 'N/A'}`);
      } else {
        console.log(`   🏢 Employee Info: Not linked to employee record`);
      }
      
      console.log(`   📅 Created: ${user.created_at ? user.created_at.toLocaleDateString() : 'N/A'}`);
      console.log(`   🔄 Last Login: ${user.last_login ? user.last_login.toLocaleDateString() : 'Never'}`);
      console.log('');
    });

    console.log('🔐 LOGIN CREDENTIALS FOR TESTING:');
    console.log('==================================');
    console.log('You can use any of these accounts to login to the system:\n');

    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Name: ${user.first_name} ${user.last_name}`);
      console.log('');
    });

    console.log('💡 NOTE: Passwords are hashed in the database for security.');
    console.log('   For testing, you can use the test account we created:');
    console.log('   📧 Email: admin@dicel.com');
    console.log('   🔑 Password: admin123');
    console.log('   👤 Role: admin');

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error showing users:', error);
    process.exit(1);
  }
};

showAllUsers(); 