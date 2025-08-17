const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Warehouse = sequelize.define('Warehouse', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  warehouse_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  warehouse_code: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  warehouse_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['main', 'branch', 'distribution', 'cold_storage', 'hazardous', 'other']]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  postal_code: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  contact_person: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  contact_email: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contact_phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  total_area: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  area_unit: {
    type: DataTypes.STRING(20),
    defaultValue: 'sq_meters',
    validate: {
      isIn: [['sq_meters', 'sq_feet', 'acres']]
    }
  },
  storage_capacity: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  capacity_unit: {
    type: DataTypes.STRING(20),
    defaultValue: 'cubic_meters',
    validate: {
      isIn: [['cubic_meters', 'cubic_feet', 'pallets', 'units']]
    }
  },
  temperature_range: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  humidity_range: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  security_level: {
    type: DataTypes.STRING(20),
    defaultValue: 'standard',
    validate: {
      isIn: [['basic', 'standard', 'high', 'maximum']]
    }
  },
  operating_hours: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  manager_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  department_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'departments',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'active',
    validate: {
      isIn: [['active', 'inactive', 'maintenance', 'closed']]
    }
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_by: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'warehouses',
  timestamps: true
});

module.exports = Warehouse; 