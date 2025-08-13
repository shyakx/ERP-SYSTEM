import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const PerformanceReview = sequelize.define('PerformanceReview', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  employeeId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  reviewDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  nextReview: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  rating: {
    type: DataTypes.DECIMAL(3, 1),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Completed', 'In Progress', 'Pending', 'Overdue'),
    allowNull: false,
    defaultValue: 'Pending'
  },
  supervisor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  strengths: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  areas: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  salary: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bonus: {
    type: DataTypes.STRING,
    allowNull: true
  },
  goals: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  comments: {
    type: DataTypes.TEXT,
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
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'performance_reviews',
  indexes: [
    {
      fields: ['employee_id']
    },
    {
      fields: ['review_date']
    },
    {
      fields: ['status']
    },
    {
      fields: ['supervisor']
    },
    {
      fields: ['department']
    },
    {
      fields: ['rating']
    }
  ]
}); 