const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const InventoryTransaction = sequelize.define('InventoryTransaction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  item_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'inventory_items',
      key: 'id'
    }
  },
  transaction_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['in', 'out', 'transfer', 'adjustment', 'return', 'damage', 'expiry']]
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unit_cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  total_cost: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  reference_number: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  reference_type: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      isIn: [['purchase_order', 'sales_order', 'transfer_order', 'adjustment', 'return', 'other']]
    }
  },
  from_location: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  to_location: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  from_warehouse: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  to_warehouse: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  supplier_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'suppliers',
      key: 'id'
    }
  },
  client_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'clients',
      key: 'id'
    }
  },
  transaction_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  expiry_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  batch_number: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  serial_number: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  reason: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'completed',
    validate: {
      isIn: [['pending', 'completed', 'cancelled', 'reversed']]
    }
  },
  created_by: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  approved_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  approved_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'inventory_transactions',
  timestamps: true
});

module.exports = InventoryTransaction; 