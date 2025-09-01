const { sequelize } = require('./config/database');
const User = require('./models/User');

const listUsersSimple = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.\n');

    // Get all users
    const users = await User.findAll({
      order: [['created_at', 'ASC']]
    });

    console.log('👥 ALL USERS IN DICEL ERP DATABASE');
    console.log('=====================================\n');

    if (users.length === 0) {
      console.log('❌ No users found in the database');
      return;
    }

    console.log(`📊 Total Users: ${users.length}\n`);

    users.forEach((user, index) => {
      console.log(`${index + 1}. 👤 ${user.first_name} ${user.last_name}`);
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   👨‍💼 Role: ${user.role}`);
      console.log(`   📱 Phone: ${user.phone || 'N/A'}`);
      console.log(`   ✅ Active: ${user.is_active ? 'Yes' : 'No'}`);
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
    console.error('❌ Error listing users:', error);
    process.exit(1);
  }
};

listUsersSimple(); 