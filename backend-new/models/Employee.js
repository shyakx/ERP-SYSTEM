const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: true,
    unique: true
  },
  employee_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  department_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  position: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  hire_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  termination_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  salary: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  salary_currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'RWF'
  },
  employment_type: {
    type: DataTypes.STRING(50),
    defaultValue: 'full-time'
  },
  work_location: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  supervisor_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  emergency_contact: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  bank_details: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  tax_info: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'active'
  }
}, {
  tableName: 'employees',
  timestamps: true
});

module.exports = Employee; 