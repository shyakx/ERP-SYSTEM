import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const LeaveType = sequelize.define('LeaveType', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  daysAllocated: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  daysUsed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  daysRemaining: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'leave_types',
  indexes: [
    {
      fields: ['name']
    },
    {
      fields: ['is_active']
    }
  ]
}); 