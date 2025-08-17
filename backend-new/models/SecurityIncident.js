const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SecurityIncident = sequelize.define('SecurityIncident', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  incident_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  incident_type: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  reported_by: {
    type: DataTypes.UUID,
    allowNull: true
  },
  reported_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  incident_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  severity: {
    type: DataTypes.STRING(50),
    defaultValue: 'medium'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  actions_taken: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'open'
  },
  resolved_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'security_incidents',
  timestamps: true
});

module.exports = SecurityIncident; 