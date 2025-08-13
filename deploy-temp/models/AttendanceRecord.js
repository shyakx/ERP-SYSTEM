import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const AttendanceRecord = sequelize.define('AttendanceRecord', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  employeeId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  checkIn: {
    type: DataTypes.TIME,
    allowNull: true
  },
  checkOut: {
    type: DataTypes.TIME,
    allowNull: true
  },
  totalHours: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Present', 'Absent', 'Late', 'On Leave', 'Half Day'),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  overtime: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lateMinutes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'attendance_records',
  indexes: [
    {
      fields: ['employee_id']
    },
    {
      fields: ['date']
    },
    {
      fields: ['status']
    },
    {
      fields: ['department']
    },
    {
      fields: ['check_in']
    },
    {
      fields: ['check_out']
    }
  ]
}); 