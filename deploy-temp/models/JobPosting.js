import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const JobPosting = sequelize.define('JobPosting', {
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
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('Full-time', 'Part-time', 'Contract', 'Internship'),
    allowNull: false
  },
  salary: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Active', 'Closed', 'Draft'),
    allowNull: false,
    defaultValue: 'Active'
  },
  applications: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  postedDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  deadline: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  requirements: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  responsibilities: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  benefits: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: true
  },
  education: {
    type: DataTypes.STRING,
    allowNull: true
  },
  skills: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'job_postings',
  indexes: [
    {
      fields: ['title']
    },
    {
      fields: ['department']
    },
    {
      fields: ['status']
    },
    {
      fields: ['posted_date']
    },
    {
      fields: ['deadline']
    }
  ]
}); 