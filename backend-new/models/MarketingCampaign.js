const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MarketingCampaign = sequelize.define('MarketingCampaign', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  campaign_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  campaign_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['email', 'social_media', 'digital_ads', 'print', 'event', 'webinar', 'content', 'other']]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  objective: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  target_audience: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  budget: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'RWF'
  },
  actual_spent: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'planned',
    validate: {
      isIn: [['planned', 'active', 'paused', 'completed', 'cancelled']]
    }
  },
  priority: {
    type: DataTypes.STRING(20),
    defaultValue: 'medium',
    validate: {
      isIn: [['low', 'medium', 'high', 'urgent']]
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
  manager: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  channels: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  key_messages: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  call_to_action: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  landing_page_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  tracking_code: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  impressions: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  clicks: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  conversions: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  conversion_rate: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  },
  cost_per_click: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  cost_per_conversion: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  roi: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  },
  leads_generated: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  sales_generated: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  revenue_generated: {
    type: DataTypes.DECIMAL(12, 2),
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
  lessons_learned: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  next_steps: {
    type: DataTypes.TEXT,
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
  tableName: 'marketing_campaigns',
  timestamps: true
});

module.exports = MarketingCampaign; 