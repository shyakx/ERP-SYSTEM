const { sequelize } = require('./config/database');
const User = require('./models/User');
const Employee = require('./models/Employee');
const Department = require('./models/Department');
const { defineAssociations } = require('./models/associations');

const analyzeUsers = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.\n');

    // Define associations
    defineAssociations();

    console.log('🔍 ANALYZING USER DATABASE');
    console.log('==========================\n');

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
      order: [['email', 'ASC']]
    });

    console.log(`📊 Total Users: ${allUsers.length}\n`);

    // Group by email to find duplicates
    const emailGroups = {};
    allUsers.forEach(user => {
      if (!emailGroups[user.email]) {
        emailGroups[user.email] = [];
      }
      emailGroups[user.email].push(user);
    });

    // Show all users with details
    console.log('📋 ALL USERS IN DATABASE:');
    console.log('========================\n');

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
      console.log(`   ID: ${user.id}`);
      console.log(`   Password: ${password}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Name: ${user.first_name} ${user.last_name}`);
      console.log(`   Position: ${user.position || 'N/A'}`);
      console.log(`   Employee ID: ${user.employee_id || 'N/A'}`);
      console.log(`   Department: ${user.employee?.department?.name || 'N/A'}`);
      console.log(`   Phone: ${user.phone || 'N/A'}`);
      console.log(`   Salary: RWF ${user.salary?.toLocaleString() || 'N/A'}`);
      console.log(`   Employee Linked: ${user.employee ? 'Yes' : 'No'}`);
      console.log(`   Active: ${user.is_active ? 'Yes' : 'No'}`);
      console.log(`   Created: ${user.created_at ? user.created_at.toLocaleDateString() : 'N/A'}`);
      console.log('');
    });

    // Check for duplicates
    const duplicates = Object.entries(emailGroups).filter(([email, users]) => users.length > 1);
    
    if (duplicates.length > 0) {
      console.log('🚨 DUPLICATE EMAILS FOUND:');
      console.log('==========================\n');
      
      duplicates.forEach(([email, users]) => {
        console.log(`📧 Email: ${email}`);
        console.log(`   Found ${users.length} accounts:`);
        users.forEach((user, index) => {
          console.log(`   ${index + 1}. ID: ${user.id} | Name: ${user.first_name} ${user.last_name} | Role: ${user.role} | Employee: ${user.employee ? 'Yes' : 'No'}`);
        });
        console.log('');
      });
    } else {
      console.log('✅ No duplicate emails found');
    }

    // Check for users without employee records
    const usersWithoutEmployee = allUsers.filter(user => !user.employee);
    
    if (usersWithoutEmployee.length > 0) {
      console.log('⚠️  USERS WITHOUT EMPLOYEE RECORDS:');
      console.log('==================================\n');
      
      usersWithoutEmployee.forEach(user => {
        console.log(`📧 ${user.email}`);
        console.log(`   Name: ${user.first_name} ${user.last_name}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Created: ${user.created_at ? user.created_at.toLocaleDateString() : 'N/A'}`);
        console.log('');
      });
    }

    // Check for employees without user records
    const allEmployees = await Employee.findAll({
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['name']
        }
      ]
    });

    const employeesWithoutUser = allEmployees.filter(emp => !emp.user_id);
    
    if (employeesWithoutUser.length > 0) {
      console.log('⚠️  EMPLOYEES WITHOUT USER RECORDS:');
      console.log('===================================\n');
      
      employeesWithoutUser.forEach(emp => {
        console.log(`👤 ${emp.first_name} ${emp.last_name}`);
        console.log(`   Employee ID: ${emp.employee_number}`);
        console.log(`   Position: ${emp.position}`);
        console.log(`   Department: ${emp.department?.name || 'N/A'}`);
        console.log(`   Email: ${emp.email || 'N/A'}`);
        console.log('');
      });
    }

    // Summary statistics
    console.log('📊 SUMMARY STATISTICS:');
    console.log('======================\n');
    console.log(`Total Users: ${allUsers.length}`);
    console.log(`Users with Employee Records: ${allUsers.filter(u => u.employee).length}`);
    console.log(`Users without Employee Records: ${usersWithoutEmployee.length}`);
    console.log(`Total Employees: ${allEmployees.length}`);
    console.log(`Employees with User Records: ${allEmployees.filter(e => e.user_id).length}`);
    console.log(`Employees without User Records: ${employeesWithoutUser.length}`);
    console.log(`Duplicate Emails: ${duplicates.length}`);

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error analyzing users:', error);
    process.exit(1);
  }
};

analyzeUsers(); 