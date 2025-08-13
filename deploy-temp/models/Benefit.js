import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Benefit = sequelize.define('Benefit', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('Medical', 'Insurance', 'Pension', 'Allowance'),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  coverage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cost: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Active', 'Pending', 'Inactive'),
    defaultValue: 'Active'
  },
  enrollmentDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  employeeCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalCost: {
    type: DataTypes.STRING,
    allowNull: false
  },
  coveragePercentage: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  monthlyCost: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  enrollmentRate: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'benefits',
  timestamps: true
});

export default Benefit; 