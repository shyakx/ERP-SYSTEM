const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SecurityGuard = sequelize.define('SecurityGuard', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: true,
    unique: true
  },
  guard_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  license_number: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  license_expiry: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  training_certifications: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  assigned_location: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  shift_preference: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  emergency_contact: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'active'
  }
}, {
  tableName: 'security_guards',
  timestamps: true
});

module.exports = SecurityGuard; 