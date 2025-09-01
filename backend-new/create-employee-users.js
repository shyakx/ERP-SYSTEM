const { sequelize } = require('./config/database');
const User = require('./models/User');
const Employee = require('./models/Employee');
const Department = require('./models/Department');
const bcrypt = require('bcryptjs');
const { defineAssociations } = require('./models/associations');

const createEmployeeUsers = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.\n');

    // Define associations
    defineAssociations();

    // Get all employees
    const employees = await Employee.findAll({
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['name']
        }
      ],
      order: [['created_at', 'ASC']]
    });

    console.log('👥 CREATING USER ACCOUNTS FOR ALL EMPLOYEES');
    console.log('============================================\n');

    if (employees.length === 0) {
      console.log('❌ No employees found in the database');
      return;
    }

    console.log(`📊 Total Employees: ${employees.length}\n`);

    let createdUsers = 0;
    let updatedUsers = 0;

    for (const employee of employees) {
      // Generate email if not exists
      let email = employee.email;
      if (!email) {
        const firstName = employee.first_name.toLowerCase().replace(/\s+/g, '');
        const lastName = employee.last_name.toLowerCase().replace(/\s+/g, '');
        email = `${firstName}.${lastName}@dicel.co.rw`;
      }

      // Check if user already exists
      let user = await User.findOne({ where: { email } });
      
      if (user) {
        // Update existing user to link with employee
        await user.update({ 
          user_id: employee.id,
          first_name: employee.first_name,
          last_name: employee.last_name,
          phone: employee.phone || user.phone,
          is_active: true
        });
        updatedUsers++;
        console.log(`🔄 Updated existing user: ${user.first_name} ${user.last_name} (${email})`);
      } else {
        // Determine role based on department and position
        let role = 'employee'; // default role
        
        if (employee.department) {
          const deptName = employee.department.name.toLowerCase();
          const position = employee.position.toLowerCase();
          
          if (deptName.includes('human resource') || position.includes('hr') || position.includes('human resource')) {
            role = 'hr';
          } else if (deptName.includes('finance') || position.includes('finance') || position.includes('account')) {
            role = 'finance';
          } else if (deptName.includes('it') || position.includes('it') || position.includes('technology')) {
            role = 'it';
          } else if (deptName.includes('security') || position.includes('security')) {
            role = 'security';
          } else if (deptName.includes('inventory') || position.includes('inventory') || position.includes('operation')) {
            role = 'inventory';
          } else if (deptName.includes('sales') || position.includes('sales') || position.includes('marketing')) {
            role = 'sales';
          } else if (deptName.includes('risk') || position.includes('risk')) {
            role = 'risk';
          } else if (position.includes('manager') || position.includes('director') || position.includes('ceo')) {
            role = 'admin';
          }
        }

        // Create password based on role
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

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        user = await User.create({
          email,
          password_hash: hashedPassword,
          first_name: employee.first_name,
          last_name: employee.last_name,
          role,
          phone: employee.phone || null,
          is_active: true
        });

        // Link employee to user
        await employee.update({ user_id: user.id });

        createdUsers++;
        console.log(`✅ Created user: ${user.first_name} ${user.last_name} (${email})`);
        console.log(`   Role: ${role}`);
        console.log(`   Password: ${password}`);
        console.log(`   Department: ${employee.department?.name || 'N/A'}`);
        console.log(`   Position: ${employee.position}`);
        console.log('');
      }
    }

    console.log('🎉 EMPLOYEE USER CREATION COMPLETE!');
    console.log('===================================\n');
    console.log(`📊 Summary:`);
    console.log(`   - Total Employees: ${employees.length}`);
    console.log(`   - New Users Created: ${createdUsers}`);
    console.log(`   - Existing Users Updated: ${updatedUsers}`);
    console.log(`   - Total Users: ${createdUsers + updatedUsers}`);

    // Show final user list
    console.log('\n🔐 FINAL USER CREDENTIALS:');
    console.log('==========================\n');

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

    allUsers.forEach((user, index) => {
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
      console.log(`   Department: ${user.employee?.department?.name || 'N/A'}`);
      console.log(`   Position: ${user.employee?.position || 'N/A'}`);
      console.log('');
    });

    console.log('💡 All employees now have user accounts and can login to their respective departmental pages!');
    console.log('🚀 The system will automatically route users to their department dashboards based on their role.');

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error creating employee users:', error);
    process.exit(1);
  }
};

createEmployeeUsers(); 