const { sequelize } = require('./config/database');
const User = require('./models/User');
const Employee = require('./models/Employee');
const Department = require('./models/Department');
const { defineAssociations } = require('./models/associations');

const cleanupDuplicateUsers = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.\n');

    // Define associations
    defineAssociations();

    console.log('🧹 CLEANING UP DUPLICATE USERS');
    console.log('==============================\n');

    // Get all users
    const allUsers = await User.findAll({
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

    console.log(`📊 Total Users Found: ${allUsers.length}\n`);

    // Group users by email to find duplicates
    const userGroups = {};
    allUsers.forEach(user => {
      if (!userGroups[user.email]) {
        userGroups[user.email] = [];
      }
      userGroups[user.email].push(user);
    });

    // Find duplicates
    const duplicates = Object.entries(userGroups).filter(([email, users]) => users.length > 1);
    
    if (duplicates.length === 0) {
      console.log('✅ No duplicate users found!');
      return;
    }

    console.log(`🔍 Found ${duplicates.length} email addresses with duplicates:\n`);

    let totalDeleted = 0;

    for (const [email, users] of duplicates) {
      console.log(`📧 Email: ${email}`);
      console.log(`   Found ${users.length} duplicate accounts:`);
      
      // Sort users by priority (employee-linked first, then by creation date)
      users.sort((a, b) => {
        // Priority 1: Has employee record
        if (a.employee && !b.employee) return -1;
        if (!a.employee && b.employee) return 1;
        
        // Priority 2: Has more complete data
        const aCompleteness = getDataCompleteness(a);
        const bCompleteness = getDataCompleteness(b);
        if (aCompleteness !== bCompleteness) return bCompleteness - aCompleteness;
        
        // Priority 3: Earlier creation date
        return new Date(a.created_at) - new Date(b.created_at);
      });

      // Keep the first (best) user, delete the rest
      const userToKeep = users[0];
      const usersToDelete = users.slice(1);

      console.log(`   ✅ Keeping: ${userToKeep.first_name} ${userToKeep.last_name} (ID: ${userToKeep.id})`);
      console.log(`      Role: ${userToKeep.role}`);
      console.log(`      Employee Linked: ${userToKeep.employee ? 'Yes' : 'No'}`);
      console.log(`      Data Completeness: ${getDataCompleteness(userToKeep)}%`);

      for (const userToDelete of usersToDelete) {
        console.log(`   🗑️  Deleting: ${userToDelete.first_name} ${userToDelete.last_name} (ID: ${userToDelete.id})`);
        console.log(`      Role: ${userToDelete.role}`);
        console.log(`      Employee Linked: ${userToDelete.employee ? 'Yes' : 'No'}`);
        
        try {
          await userToDelete.destroy();
          totalDeleted++;
        } catch (error) {
          console.log(`      ❌ Error deleting: ${error.message}`);
        }
      }
      console.log('');
    }

    // Show final clean user list
    console.log('🎉 DUPLICATE CLEANUP COMPLETE!');
    console.log('==============================\n');
    console.log(`📊 Summary:`);
    console.log(`   - Original Users: ${allUsers.length}`);
    console.log(`   - Duplicates Removed: ${totalDeleted}`);
    console.log(`   - Final Users: ${allUsers.length - totalDeleted}`);

    // Show final clean user list
    const finalUsers = await User.findAll({
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
      order: [['email', 'ASC']]
    });

    console.log('\n📋 FINAL CLEAN USER LIST:');
    console.log('========================\n');

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
      console.log(`   Position: ${user.position || 'N/A'}`);
      console.log(`   Department: ${user.employee?.department?.name || 'N/A'}`);
      console.log(`   Employee ID: ${user.employee_id || 'N/A'}`);
      console.log(`   Active: ${user.is_active ? 'Yes' : 'No'}`);
      console.log('');
    });

    console.log('💡 Duplicate users have been removed!');
    console.log('🚀 Your user database is now clean and unique.');

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error cleaning up duplicates:', error);
    process.exit(1);
  }
};

// Helper function to calculate data completeness percentage
function getDataCompleteness(user) {
  const fields = [
    'first_name', 'last_name', 'email', 'role', 'phone', 'address',
    'date_of_birth', 'hire_date', 'salary', 'department_id', 'employee_id',
    'position', 'emergency_contact', 'skills', 'certifications', 'profile_image'
  ];
  
  let filledFields = 0;
  fields.forEach(field => {
    if (user[field] && user[field] !== null && user[field] !== '') {
      filledFields++;
    }
  });
  
  return Math.round((filledFields / fields.length) * 100);
}

cleanupDuplicateUsers(); 