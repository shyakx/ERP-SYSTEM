const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TaxRecord = sequelize.define('TaxRecord', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  tax_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['income_tax', 'vat', 'withholding_tax', 'corporate_tax', 'property_tax', 'customs_duty', 'other']]
    }
  },
  tax_period: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['monthly', 'quarterly', 'annually']]
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
  due_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  taxable_amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  tax_rate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  tax_amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'RWF'
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'calculated', 'filed', 'paid', 'overdue', 'audited']]
    }
  },
  filing_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  payment_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  payment_reference: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  payment_method: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  late_fee: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  interest_penalty: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  total_amount_paid: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  tax_authority: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  tax_office: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  tax_identification_number: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  filing_number: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  acknowledgment_number: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  audit_status: {
    type: DataTypes.STRING(20),
    defaultValue: 'not_audited',
    validate: {
      isIn: [['not_audited', 'under_audit', 'audit_completed', 'audit_findings']]
    }
  },
  audit_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  audit_notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  supporting_documents: {
    type: DataTypes.JSONB,
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
  filed_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  paid_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'tax_records',
  timestamps: true
});

module.exports = TaxRecord; 