const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AttendanceRecord = sequelize.define('AttendanceRecord', {
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
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  check_in_time: {
    type: DataTypes.TIME,
    allowNull: true
  },
  check_out_time: {
    type: DataTypes.TIME,
    allowNull: true
  },
  total_hours: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'present',
    validate: {
      isIn: [['present', 'absent', 'late', 'half-day', 'leave', 'holiday']]
    }
  },
  work_location: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  overtime_hours: {
    type: DataTypes.DECIMAL(4, 2),
    defaultValue: 0
  },
  break_time: {
    type: DataTypes.DECIMAL(4, 2),
    defaultValue: 0
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  verified_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  verification_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'attendance_records',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['employee_id', 'date']
    }
  ]
});

module.exports = AttendanceRecord; 