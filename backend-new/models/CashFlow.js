const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const CashFlow = sequelize.define('CashFlow', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  flow_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  flow_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['operating', 'investing', 'financing']]
    }
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  subcategory: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'RWF'
  },
  flow_direction: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['inflow', 'outflow']]
    }
  },
  payment_method: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      isIn: [['cash', 'bank_transfer', 'check', 'credit_card', 'mobile_money', 'other']]
    }
  },
  reference_number: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  bank_account_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'financial_accounts',
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
  supplier_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'suppliers',
      key: 'id'
    }
  },
  employee_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'employees',
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
  project_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  invoice_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'invoices',
      key: 'id'
    }
  },
  expense_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'expenses',
      key: 'id'
    }
  },
  transaction_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'transactions',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'completed',
    validate: {
      isIn: [['pending', 'completed', 'cancelled', 'reversed']]
    }
  },
  reconciliation_status: {
    type: DataTypes.STRING(20),
    defaultValue: 'not_reconciled',
    validate: {
      isIn: [['not_reconciled', 'reconciled', 'discrepancy']]
    }
  },
  reconciliation_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  reconciled_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
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
  tableName: 'cash_flows',
  timestamps: true
});

module.exports = CashFlow; 