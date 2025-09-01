const { sequelize } = require('./config/database');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const setUserPasswords = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.\n');

    // Get all users
    const users = await User.findAll({
      order: [['created_at', 'ASC']]
    });

    console.log('🔐 SETTING PASSWORDS FOR ALL USERS');
    console.log('===================================\n');

    if (users.length === 0) {
      console.log('❌ No users found in the database');
      return;
    }

    // Update passwords for each user
    for (const user of users) {
      // Create a simple password based on their role
      let password;
      switch (user.role) {
        case 'admin':
          password = 'admin123';
          break;
        case 'hr':
          password = 'hr123';
          break;
        case 'finance':
          password = 'finance123';
          break;
        case 'it':
          password = 'it123';
          break;
        case 'security':
          password = 'security123';
          break;
        case 'inventory':
          password = 'inventory123';
          break;
        case 'sales':
          password = 'sales123';
          break;
        case 'risk':
          password = 'risk123';
          break;
        case 'employee':
          password = 'employee123';
          break;
        default:
          password = 'password123';
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Update user password
      await user.update({ password_hash: hashedPassword });
      
      console.log(`✅ ${user.first_name} ${user.last_name} (${user.email})`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Password: ${password}`);
      console.log('');
    }

    console.log('🎉 ALL USER PASSWORDS HAVE BEEN SET!');
    console.log('=====================================\n');

    console.log('🔐 COMPLETE LOGIN CREDENTIALS:');
    console.log('==============================\n');

    users.forEach((user, index) => {
      let password;
      switch (user.role) {
        case 'admin': password = 'admin123'; break;
        case 'hr': password = 'hr123'; break;
        case 'finance': password = 'finance123'; break;
        case 'it': password = 'it123'; break;
        case 'security': password = 'security123'; break;
        case 'inventory': password = 'inventory123'; break;
        case 'sales': password = 'sales123'; break;
        case 'risk': password = 'risk123'; break;
        case 'employee': password = 'employee123'; break;
        default: password = 'password123';
      }

      console.log(`${index + 1}. ${user.email}`);
      console.log(`   Password: ${password}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Name: ${user.first_name} ${user.last_name}`);
      console.log('');
    });

    console.log('💡 You can now use any of these accounts to login to your DICEL ERP system!');
    console.log('🚀 Test different user roles to see role-based access control in action.');

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error setting passwords:', error);
    process.exit(1);
  }
};

setUserPasswords(); 