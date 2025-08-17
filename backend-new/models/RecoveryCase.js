const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const RecoveryCase = sequelize.define('RecoveryCase', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  case_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  case_title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  case_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['debt_recovery', 'asset_recovery', 'insurance_claim', 'legal_action', 'investigation', 'other']]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  client_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'clients',
      key: 'id'
    }
  },
  debtor_name: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  debtor_contact: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  amount_owed: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'RWF'
  },
  due_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  days_overdue: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  priority: {
    type: DataTypes.STRING(20),
    defaultValue: 'medium',
    validate: {
      isIn: [['low', 'medium', 'high', 'urgent']]
    }
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'open',
    validate: {
      isIn: [['open', 'investigation', 'negotiation', 'legal_action', 'settled', 'closed', 'written_off']]
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
  supervisor_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  legal_counsel: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  court_case_number: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  court_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  settlement_amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true
  },
  settlement_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  recovery_percentage: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  },
  last_contact_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  next_action_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  next_action: {
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
  },
  closed_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  closed_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'recovery_cases',
  timestamps: true
});

module.exports = RecoveryCase; 