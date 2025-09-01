const { sequelize } = require('./config/database');
const User = require('./models/User');

const simpleCleanup = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.\n');

    console.log('🧹 SIMPLE USER CLEANUP');
    console.log('======================\n');

    // Get all users
    const allUsers = await User.findAll({
      order: [['email', 'ASC']]
    });

    console.log(`📊 Total Users: ${allUsers.length}\n`);

    // List of emails to keep (essential users)
    const keepEmails = [
      'admin@dicel.co.rw',
      'admin@dicel.com',
      'hr.manager@dicel.co.rw',
      'finance.manager@dicel.co.rw',
      'it.manager@dicel.co.rw',
      'security.manager@dicel.co.rw',
      'operations.manager@dicel.co.rw',
      'sales.manager@dicel.co.rw',
      'risk.manager@dicel.co.rw'
    ];

    console.log('🗑️  DELETING NON-ESSENTIAL USERS:\n');

    let deletedCount = 0;
    for (const user of allUsers) {
      if (!keepEmails.includes(user.email)) {
        console.log(`🗑️  Deleting: ${user.email}`);
        console.log(`   Name: ${user.first_name} ${user.last_name}`);
        console.log(`   Role: ${user.role}`);
        
        try {
          await user.destroy();
          deletedCount++;
          console.log(`   ✅ Deleted successfully`);
        } catch (error) {
          console.log(`   ❌ Error: ${error.message}`);
        }
        console.log('');
      }
    }

    // Show final users
    const finalUsers = await User.findAll({
      order: [['email', 'ASC']]
    });

    console.log('🎉 CLEANUP COMPLETE!');
    console.log('====================\n');
    console.log(`📊 Final Users: ${finalUsers.length}\n`);

    finalUsers.forEach((user, index) => {
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
        default: password = 'employee123';
      }

      console.log(`${index + 1}. ${user.email}`);
      console.log(`   Password: ${password}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Name: ${user.first_name} ${user.last_name}`);
      console.log('');
    });

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
};

simpleCleanup(); 