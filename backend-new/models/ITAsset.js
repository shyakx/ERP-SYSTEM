const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ITAsset = sequelize.define('ITAsset', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  asset_tag: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  asset_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  asset_type: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  manufacturer: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  model: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  serial_number: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  purchase_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  purchase_cost: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  assigned_to: {
    type: DataTypes.UUID,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'active'
  },
  warranty_expiry: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  last_maintenance: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  next_maintenance: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'it_assets',
  timestamps: true
});

module.exports = ITAsset; 