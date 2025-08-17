const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  expense_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  department_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  expense_category: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'RWF'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  vendor: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  expense_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  receipt_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'pending'
  },
  approved_by: {
    type: DataTypes.UUID,
    allowNull: true
  },
  approved_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  created_by: {
    type: DataTypes.UUID,
    allowNull: true
  }
}, {
  tableName: 'expenses',
  timestamps: true
});

module.exports = Expense; 