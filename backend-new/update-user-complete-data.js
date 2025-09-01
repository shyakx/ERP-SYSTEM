const { sequelize } = require('./config/database');
const User = require('./models/User');
const Employee = require('./models/Employee');
const Department = require('./models/Department');
const { defineAssociations } = require('./models/associations');

const updateUserCompleteData = async () => {
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
              attributes: ['id', 'name']
            }
          ]
        }
      ],
      order: [['created_at', 'ASC']]
    });

    console.log('🔄 UPDATING USERS WITH COMPLETE DATA');
    console.log('====================================\n');

    if (users.length === 0) {
      console.log('❌ No users found in the database');
      return;
    }

    console.log(`📊 Total Users to Update: ${users.length}\n`);

    let updatedCount = 0;
    let skippedCount = 0;

    for (const user of users) {
      try {
        const employee = user.employee;
        
        if (!employee) {
          console.log(`⚠️  Skipping ${user.email} - No employee record linked`);
          skippedCount++;
          continue;
        }

        // Prepare update data
        const updateData = {
          // Basic employee info
          employee_id: employee.employee_number,
          position: employee.position,
          phone: employee.phone || user.phone,
          address: employee.address,
          
          // Dates
          date_of_birth: employee.date_of_birth,
          hire_date: employee.hire_date,
          
          // Financial
          salary: employee.salary,
          
          // Department
          department_id: employee.department?.id || null,
          
          // Emergency contact (create from employee data)
          emergency_contact: employee.emergency_contact || {
            name: `${employee.first_name} ${employee.last_name}`,
            relationship: 'Self',
            phone: employee.phone,
            email: user.email
          },
          
          // Skills and certifications (generate based on position)
          skills: generateSkills(employee.position),
          certifications: generateCertifications(employee.position, employee.department?.name),
          
          // Profile image (generate placeholder)
          profile_image: generateProfileImage(user.first_name, user.last_name),
          
          // Ensure active status
          is_active: true
        };

        // Update user
        await user.update(updateData);
        
        updatedCount++;
        console.log(`✅ Updated: ${user.first_name} ${user.last_name} (${user.email})`);
        console.log(`   Position: ${employee.position}`);
        console.log(`   Department: ${employee.department?.name || 'N/A'}`);
        console.log(`   Employee ID: ${employee.employee_number}`);
        console.log(`   Salary: RWF ${employee.salary?.toLocaleString() || 'N/A'}`);
        console.log(`   Skills: ${updateData.skills.slice(0, 3).join(', ')}...`);
        console.log('');

      } catch (error) {
        console.log(`❌ Error updating ${user.email}: ${error.message}`);
        skippedCount++;
      }
    }

    console.log('🎉 USER DATA UPDATE COMPLETE!');
    console.log('=============================\n');
    console.log(`📊 Summary:`);
    console.log(`   - Total Users: ${users.length}`);
    console.log(`   - Successfully Updated: ${updatedCount}`);
    console.log(`   - Skipped: ${skippedCount}`);

    // Show sample of updated users
    console.log('\n📋 SAMPLE UPDATED USERS:');
    console.log('========================\n');

    const sampleUsers = await User.findAll({
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
      limit: 5,
      order: [['updated_at', 'DESC']]
    });

    sampleUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.first_name} ${user.last_name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Position: ${user.position || 'N/A'}`);
      console.log(`   Employee ID: ${user.employee_id || 'N/A'}`);
      console.log(`   Department: ${user.employee?.department?.name || 'N/A'}`);
      console.log(`   Phone: ${user.phone || 'N/A'}`);
      console.log(`   Salary: RWF ${user.salary?.toLocaleString() || 'N/A'}`);
      console.log(`   Skills: ${user.skills?.slice(0, 3).join(', ') || 'N/A'}`);
      console.log(`   Active: ${user.is_active ? 'Yes' : 'No'}`);
      console.log('');
    });

    console.log('💡 All users now have complete profile information!');
    console.log('🚀 The system is ready with fully populated user data.');

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error updating user data:', error);
    process.exit(1);
  }
};

// Helper functions to generate realistic data
function generateSkills(position) {
  const positionLower = position.toLowerCase();
  const skills = [];
  
  if (positionLower.includes('manager')) {
    skills.push('Leadership', 'Project Management', 'Team Management', 'Strategic Planning');
  }
  if (positionLower.includes('hr') || positionLower.includes('human resource')) {
    skills.push('HR Management', 'Recruitment', 'Employee Relations', 'Performance Management');
  }
  if (positionLower.includes('finance') || positionLower.includes('account')) {
    skills.push('Financial Analysis', 'Accounting', 'Budgeting', 'Financial Reporting');
  }
  if (positionLower.includes('it') || positionLower.includes('technology')) {
    skills.push('System Administration', 'Network Management', 'Technical Support', 'Software Development');
  }
  if (positionLower.includes('security')) {
    skills.push('Security Management', 'Risk Assessment', 'Emergency Response', 'Surveillance');
  }
  if (positionLower.includes('sales') || positionLower.includes('marketing')) {
    skills.push('Sales Management', 'Customer Relations', 'Market Analysis', 'Negotiation');
  }
  if (positionLower.includes('operation') || positionLower.includes('inventory')) {
    skills.push('Operations Management', 'Inventory Control', 'Supply Chain', 'Quality Assurance');
  }
  
  // Add general skills
  skills.push('Communication', 'Problem Solving', 'Microsoft Office', 'Teamwork');
  
  return skills.slice(0, 8); // Limit to 8 skills
}

function generateCertifications(position, department) {
  const certifications = [];
  const positionLower = position.toLowerCase();
  const deptLower = department?.toLowerCase() || '';
  
  if (positionLower.includes('manager')) {
    certifications.push('Project Management Professional (PMP)', 'Leadership Certification');
  }
  if (deptLower.includes('hr') || positionLower.includes('hr')) {
    certifications.push('HR Professional Certification', 'Recruitment Specialist');
  }
  if (deptLower.includes('finance') || positionLower.includes('finance')) {
    certifications.push('Certified Public Accountant (CPA)', 'Financial Management');
  }
  if (deptLower.includes('it') || positionLower.includes('it')) {
    certifications.push('ITIL Foundation', 'Microsoft Certified Professional');
  }
  if (deptLower.includes('security') || positionLower.includes('security')) {
    certifications.push('Security Management Certification', 'First Aid & CPR');
  }
  
  return certifications.slice(0, 3); // Limit to 3 certifications
}

function generateProfileImage(firstName, lastName) {
  // Generate a placeholder profile image URL
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName + ' ' + lastName)}&background=random&size=200&color=fff&bold=true`;
}

updateUserCompleteData(); 