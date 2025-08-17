const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Opportunity = sequelize.define('Opportunity', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  opportunity_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  client_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'clients',
      key: 'id'
    }
  },
  lead_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'leads',
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
  opportunity_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['new_business', 'existing_business', 'renewal', 'upsell', 'cross_sell']]
    }
  },
  stage: {
    type: DataTypes.STRING(50),
    defaultValue: 'prospecting',
    validate: {
      isIn: [['prospecting', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost']]
    }
  },
  probability: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  expected_revenue: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  actual_revenue: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'RWF'
  },
  expected_close_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  actual_close_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  source: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      isIn: [['website', 'referral', 'cold_call', 'email', 'social_media', 'advertisement', 'other']]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  requirements: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  solution: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  competitors: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  next_action: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  next_action_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  loss_reason: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  win_reason: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  tags: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  custom_fields: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'active',
    validate: {
      isIn: [['active', 'won', 'lost', 'cancelled']]
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
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'opportunities',
  timestamps: true
});

module.exports = Opportunity; 