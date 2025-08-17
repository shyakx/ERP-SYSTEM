const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PayrollRecord = sequelize.define('PayrollRecord', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  employee_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'employees',
      key: 'id'
    }
  },
  pay_period_start: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  pay_period_end: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  pay_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  basic_salary: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  allowances: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  deductions: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  overtime_pay: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0
  },
  bonus: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0
  },
  gross_pay: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  net_pay: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  tax_amount: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0
  },
  social_security: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0
  },
  health_insurance: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0
  },
  working_days: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  absent_days: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  leave_days: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'processed', 'paid', 'cancelled']]
    }
  },
  payment_method: {
    type: DataTypes.STRING(50),
    defaultValue: 'bank_transfer'
  },
  bank_reference: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  processed_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  processed_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'payroll_records',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['employee_id', 'pay_period_start', 'pay_period_end']
    }
  ]
});

module.exports = PayrollRecord; 