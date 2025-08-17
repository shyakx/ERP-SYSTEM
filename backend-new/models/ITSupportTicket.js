const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ITSupportTicket = sequelize.define('ITSupportTicket', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  ticket_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  requester_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  assigned_to: {
    type: DataTypes.UUID,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  priority: {
    type: DataTypes.STRING(50),
    defaultValue: 'medium'
  },
  subject: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'open'
  },
  resolution: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  resolved_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'it_support_tickets',
  timestamps: true
});

module.exports = ITSupportTicket; 