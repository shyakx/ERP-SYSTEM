const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const NetworkDevice = sequelize.define('NetworkDevice', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  device_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  device_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['router', 'switch', 'firewall', 'access_point', 'modem', 'server', 'workstation', 'printer', 'scanner', 'other']]
    }
  },
  model: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  manufacturer: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  serial_number: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  mac_address: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  ip_address: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  subnet_mask: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  gateway: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  dns_servers: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  room: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  rack_position: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  purchase_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  warranty_expiry: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  last_maintenance: {
    type: DataTypes.DATE,
    allowNull: true
  },
  next_maintenance: {
    type: DataTypes.DATE,
    allowNull: true
  },
  firmware_version: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  operating_system: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  os_version: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  cpu: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  memory: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  storage: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  network_speed: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  power_consumption: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  critical_level: {
    type: DataTypes.STRING(20),
    defaultValue: 'medium',
    validate: {
      isIn: [['low', 'medium', 'high', 'critical']]
    }
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'active',
    validate: {
      isIn: [['active', 'inactive', 'maintenance', 'faulty', 'decommissioned']]
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
  assigned_to: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  responsible_person: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  vendor_contact: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  support_contract: {
    type: DataTypes.STRING(200),
    allowNull: true
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
  tableName: 'network_devices',
  timestamps: true
});

module.exports = NetworkDevice; 