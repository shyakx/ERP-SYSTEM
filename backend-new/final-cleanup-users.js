const { sequelize } = require('./config/database');
const User = require('./models/User');
const Employee = require('./models/Employee');
const Department = require('./models/Department');
const { defineAssociations } = require('./models/associations');

const finalCleanupUsers = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.\n');

    // Define associations
    defineAssociations();

    console.log('🧹 FINAL USER DATABASE CLEANUP');
    console.log('==============================\n');

    // Get all users and employees
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

    const allEmployees = await Employee.findAll({
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['name']
        }
      ]
    });

    console.log(`📊 Initial State:`);
    console.log(`   - Total Users: ${allUsers.length}`);
    console.log(`   - Total Employees: ${allEmployees.length}`);
    console.log(`   - Users with Employee Records: ${allUsers.filter(u => u.employee).length}`);
    console.log(`   - Employees with User Records: ${allEmployees.filter(e => e.user_id).length}\n`);

    // List of users to delete (redundant or problematic)
    const usersToDelete = [
      // Remove manager accounts that don't have employee links
      'finance.manager@dicel.co.rw',
      'hr.manager@dicel.co.rw', 
      'it.manager@dicel.co.rw',
      'operations.manager@dicel.co.rw',
      'sales.manager@dicel.co.rw',
      'security.manager@dicel.co.rw',
      
      // Remove test accounts
      'testuser1755421012581@example.com',
      'testuser1755421066412@example.com',
      'testuser1755421181404@example.com',
      
      // Remove redundant employee accounts (keep the ones with employee links)
      'jean.ndayisaba@dicel.co.rw',      // Keep admin@dicel.co.rw instead
      'claudine.uwimana@dicel.co.rw',    // Keep hr.manager@dicel.co.rw instead
      'grace.nshimiyimana@dicel.co.rw',  // Keep the one with employee link
      'emmanuel.rugamba@dicel.co.rw',    // Keep finance.manager@dicel.co.rw instead
      'alice.mukamana@dicel.co.rw',      // Keep the one with employee link
      'david.niyonsenga@dicel.co.rw',    // Keep the one with employee link
      'sarah.uwimana@dicel.co.rw',       // Keep the one with employee link
      'david.habyarimana@dicel.co.rw',   // Keep sales.manager@dicel.co.rw instead
      'eric.niyonsenga@dicel.co.rw',     // Keep it.manager@dicel.co.rw instead
      'patrick.mugisha@dicel.co.rw',     // Keep security.manager@dicel.co.rw instead
      'marie.mukamana@dicel.co.rw',      // Keep operations.manager@dicel.co.rw instead
      'ange.uwase@dicel.co.rw',          // Keep risk.manager@dicel.co.rw instead
      'eric.rugamba@dicel.co.rw',        // Keep the one with employee link
      'marie.uwimana@dicel.co.rw',       // Keep the one with employee link
      'marieclaire.kabera@dicel.co.rw',  // Keep the one with employee link
      'jeanbosco.nshimiyimana@dicel.co.rw', // Keep the one with employee link
      'emmanuel.ndayisaba@dicel.co.rw',  // Keep the one with employee link
      'pierre.niyonsenga@dicel.co.rw',   // Keep the one with employee link
      'patrick.gasana@dicel.co.rw'       // Keep the one with employee link
    ];

    console.log('🗑️  DELETING REDUNDANT USERS:');
    console.log('============================\n');

    let deletedCount = 0;
    for (const email of usersToDelete) {
      const user = allUsers.find(u => u.email === email);
      if (user) {
        console.log(`🗑️  Deleting: ${user.email}`);
        console.log(`   Name: ${user.first_name} ${user.last_name}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Employee Linked: ${user.employee ? 'Yes' : 'No'}`);
        
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

    // Create user for the remaining employee without user record
    const employeeWithoutUser = allEmployees.find(emp => !emp.user_id);
    if (employeeWithoutUser) {
      console.log('👤 CREATING USER FOR REMAINING EMPLOYEE:');
      console.log('========================================\n');
      
      console.log(`Creating user for: ${employeeWithoutUser.first_name} ${employeeWithoutUser.last_name}`);
      console.log(`Employee ID: ${employeeWithoutUser.employee_number}`);
      console.log(`Position: ${employeeWithoutUser.position}`);
      console.log(`Department: ${employeeWithoutUser.department?.name || 'N/A'}`);
      
      // Generate email
      const firstName = employeeWithoutUser.first_name.toLowerCase().replace(/\s+/g, '');
      const lastName = employeeWithoutUser.last_name.toLowerCase().replace(/\s+/g, '');
      const email = `${firstName}.${lastName}@dicel.co.rw`;
      
      // Determine role
      let role = 'employee';
      if (employeeWithoutUser.department) {
        const deptName = employeeWithoutUser.department.name.toLowerCase();
        if (deptName.includes('human resource')) role = 'hr';
        else if (deptName.includes('finance')) role = 'finance';
        else if (deptName.includes('it')) role = 'it';
        else if (deptName.includes('security')) role = 'security';
        else if (deptName.includes('inventory') || deptName.includes('operation')) role = 'inventory';
        else if (deptName.includes('sales')) role = 'sales';
        else if (deptName.includes('risk')) role = 'risk';
      }
      
      // Create password
      let password;
      switch (role) {
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
      
      try {
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await User.create({
          email,
          password_hash: hashedPassword,
          first_name: employeeWithoutUser.first_name,
          last_name: employeeWithoutUser.last_name,
          role,
          phone: employeeWithoutUser.phone,
          is_active: true,
          employee_id: employeeWithoutUser.employee_number,
          position: employeeWithoutUser.position,
          department_id: employeeWithoutUser.department?.id || null,
          salary: employeeWithoutUser.salary,
          hire_date: employeeWithoutUser.hire_date,
          date_of_birth: employeeWithoutUser.date_of_birth,
          address: employeeWithoutUser.address
        });
        
        // Link employee to user
        await employeeWithoutUser.update({ user_id: newUser.id });
        
        console.log(`✅ Created user: ${email}`);
        console.log(`   Password: ${password}`);
        console.log(`   Role: ${role}`);
        console.log('');
      } catch (error) {
        console.log(`❌ Error creating user: ${error.message}`);
      }
    }

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

    console.log('🎉 FINAL CLEAN USER DATABASE:');
    console.log('============================\n');
    console.log(`📊 Final Statistics:`);
    console.log(`   - Total Users: ${finalUsers.length}`);
    console.log(`   - Users with Employee Records: ${finalUsers.filter(u => u.employee).length}`);
    console.log(`   - Users without Employee Records: ${finalUsers.filter(u => !u.employee).length}`);

    console.log('\n📋 FINAL USER LIST:');
    console.log('==================\n');

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
      console.log(`   Employee Linked: ${user.employee ? 'Yes' : 'No'}`);
      console.log(`   Active: ${user.is_active ? 'Yes' : 'No'}`);
      console.log('');
    });

    console.log('💡 User database cleanup complete!');
    console.log('🚀 Your DICEL ERP system now has a clean, unique user database.');

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
};

finalCleanupUsers(); 