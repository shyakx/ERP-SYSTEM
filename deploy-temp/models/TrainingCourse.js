import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const TrainingCourse = sequelize.define('TrainingCourse', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false
  },
  instructor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  enrolled: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('Active', 'Completed', 'Cancelled', 'Scheduled'),
    allowNull: false,
    defaultValue: 'Active'
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  cost: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  modules: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  objectives: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  prerequisites: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  materials: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'training_courses',
  indexes: [
    {
      fields: ['title']
    },
    {
      fields: ['department']
    },
    {
      fields: ['instructor']
    },
    {
      fields: ['status']
    },
    {
      fields: ['start_date']
    },
    {
      fields: ['end_date']
    }
  ]
}); 