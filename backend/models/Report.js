import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('Performance', 'Payroll', 'Attendance', 'Training', 'Benefits', 'Compliance'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Generated', 'Pending', 'In Progress', 'Failed'),
    defaultValue: 'Pending'
  },
  generatedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  period: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false
  },
  generatedBy: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileSize: {
    type: DataTypes.STRING,
    allowNull: true
  },
  downloadCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High', 'Critical'),
    defaultValue: 'Medium'
  },
  format: {
    type: DataTypes.ENUM('PDF', 'Excel', 'CSV', 'Word'),
    defaultValue: 'PDF'
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
  tableName: 'reports'
});

export default Report; 