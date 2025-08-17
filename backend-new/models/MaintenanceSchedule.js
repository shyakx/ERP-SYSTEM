const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MaintenanceSchedule = sequelize.define('MaintenanceSchedule', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  maintenance_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['preventive', 'corrective', 'emergency', 'upgrade', 'inspection', 'cleaning']]
    }
  },
  asset_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['it_asset', 'network_device', 'system', 'infrastructure', 'other']]
    }
  },
  asset_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  scheduled_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  scheduled_time: {
    type: DataTypes.TIME,
    allowNull: true
  },
  estimated_duration: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  actual_start_time: {
    type: DataTypes.DATE,
    allowNull: true
  },
  actual_end_time: {
    type: DataTypes.DATE,
    allowNull: true
  },
  actual_duration: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  frequency: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      isIn: [['daily', 'weekly', 'monthly', 'quarterly', 'annually', 'on_demand']]
    }
  },
  priority: {
    type: DataTypes.STRING(20),
    defaultValue: 'medium',
    validate: {
      isIn: [['low', 'medium', 'high', 'critical']]
    }
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'scheduled',
    validate: {
      isIn: [['scheduled', 'in_progress', 'completed', 'cancelled', 'overdue']]
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
  vendor_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'suppliers',
      key: 'id'
    }
  },
  location: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  required_parts: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  estimated_cost: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  actual_cost: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  work_performed: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  issues_found: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  recommendations: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  next_maintenance_date: {
    type: DataTypes.DATEONLY,
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
  },
  completed_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  completed_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'maintenance_schedules',
  timestamps: true
});

module.exports = MaintenanceSchedule; 