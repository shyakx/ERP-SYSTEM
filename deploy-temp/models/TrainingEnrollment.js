import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const TrainingEnrollment = sequelize.define('TrainingEnrollment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  employeeId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Enrolled', 'Completed', 'Dropped', 'In Progress'),
    allowNull: false,
    defaultValue: 'Enrolled'
  },
  enrollmentDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  completionDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: true
  },
  certificate: {
    type: DataTypes.STRING,
    allowNull: true
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  attendance: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  totalSessions: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'training_enrollments',
  indexes: [
    {
      fields: ['employee_id']
    },
    {
      fields: ['course_id']
    },
    {
      fields: ['status']
    },
    {
      fields: ['enrollment_date']
    },
    {
      fields: ['completion_date']
    }
  ]
}); 