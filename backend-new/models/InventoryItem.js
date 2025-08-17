const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const InventoryItem = sequelize.define('InventoryItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  item_code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  item_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  unit_of_measure: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  current_stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  minimum_stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  maximum_stock: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  unit_cost: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  supplier_id: {
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
  }
}, {
  tableName: 'inventory_items',
  timestamps: true
});

module.exports = InventoryItem; 