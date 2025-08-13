import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const PayrollRecord = sequelize.define('PayrollRecord', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  employeeId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  month: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  basicSalary: {
    type: DataTypes.STRING,
    allowNull: false
  },
  allowances: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deductions: {
    type: DataTypes.STRING,
    allowNull: false
  },
  netSalary: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Paid', 'Pending', 'Processing', 'Failed'),
    allowNull: false,
    defaultValue: 'Pending'
  },
  paymentDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bank: {
    type: DataTypes.STRING,
    allowNull: true
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  overtime: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bonuses: {
    type: DataTypes.STRING,
    allowNull: true
  },
  taxes: {
    type: DataTypes.STRING,
    allowNull: true
  },
  insurance: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'payroll_records',
  indexes: [
    {
      fields: ['employee_id']
    },
    {
      fields: ['month']
    },
    {
      fields: ['year']
    },
    {
      fields: ['status']
    },
    {
      fields: ['payment_date']
    },
    {
      fields: ['department']
    }
  ]
}); 