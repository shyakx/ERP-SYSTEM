const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const FinancialReport = sequelize.define('FinancialReport', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  report_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  report_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['income_statement', 'balance_sheet', 'cash_flow', 'profit_loss', 'budget_variance', 'custom']]
    }
  },
  period_start: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  period_end: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  fiscal_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'RWF'
  },
  total_revenue: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  total_expenses: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  net_profit: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  gross_profit: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  operating_income: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  total_assets: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  total_liabilities: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  total_equity: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  cash_flow_operating: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  cash_flow_investing: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  cash_flow_financing: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  net_cash_flow: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  report_data: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  analysis: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  recommendations: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'draft',
    validate: {
      isIn: [['draft', 'reviewed', 'approved', 'published']]
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
  created_by: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  reviewed_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  reviewed_at: {
    type: DataTypes.DATE,
    allowNull: true
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
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'financial_reports',
  timestamps: true
});

module.exports = FinancialReport; 