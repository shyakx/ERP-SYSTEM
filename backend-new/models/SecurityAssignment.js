const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SecurityAssignment = sequelize.define('SecurityAssignment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  security_guard_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'security_guards',
      key: 'id'
    }
  },
  assignment_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['patrol', 'gate', 'monitoring', 'event', 'escort', 'investigation']]
    }
  },
  location: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  assignment_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  shift_type: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['morning', 'afternoon', 'night', 'full_day']]
    }
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'assigned',
    validate: {
      isIn: [['assigned', 'in_progress', 'completed', 'cancelled', 'no_show']]
    }
  },
  supervisor_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  equipment_assigned: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  special_instructions: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  check_in_time: {
    type: DataTypes.TIME,
    allowNull: true
  },
  check_out_time: {
    type: DataTypes.TIME,
    allowNull: true
  },
  actual_hours: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: true
  },
  incidents_reported: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  performance_rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5
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
  tableName: 'security_assignments',
  timestamps: true
});

module.exports = SecurityAssignment; 