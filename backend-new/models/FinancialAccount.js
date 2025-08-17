const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const FinancialAccount = sequelize.define('FinancialAccount', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  account_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  account_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  account_type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'RWF'
  },
  balance: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'financial_accounts',
  timestamps: true
});

module.exports = FinancialAccount; 