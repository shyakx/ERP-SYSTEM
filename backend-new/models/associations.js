const User = require('./User');
const Employee = require('./Employee');
const Department = require('./Department');

// Define associations
const defineAssociations = () => {
  // User - Employee association (One-to-One)
  User.hasOne(Employee, { 
    foreignKey: 'user_id', 
    as: 'employee' 
  });
  Employee.belongsTo(User, { 
    foreignKey: 'user_id', 
    as: 'user' 
  });

  // Department - Employee association (One-to-Many)
  Department.hasMany(Employee, { 
    foreignKey: 'department_id', 
    as: 'employees' 
  });
  Employee.belongsTo(Department, { 
    foreignKey: 'department_id', 
    as: 'department' 
  });

  // Department - User association (One-to-Many) for managers
  Department.belongsTo(User, { 
    foreignKey: 'manager_id', 
    as: 'manager' 
  });
  User.hasMany(Department, { 
    foreignKey: 'manager_id', 
    as: 'managedDepartments' 
  });

  console.log('✅ Model associations defined successfully');
};

module.exports = { defineAssociations }; 