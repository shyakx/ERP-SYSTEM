import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Account = sequelize.define('Account', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  accountNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('bank', 'cash', 'receivable', 'payable', 'revenue', 'expense', 'asset', 'liability', 'equity'),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bankName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bankBranch: {
    type: DataTypes.STRING,
    allowNull: true
  },
  swiftCode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  iban: {
    type: DataTypes.STRING,
    allowNull: true
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'RWF'
  },
  openingBalance: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  currentBalance: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  creditLimit: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true
  },
  interestRate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  accountHolder: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contactPerson: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'suspended', 'closed'),
    defaultValue: 'active'
  },
  isReconciled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  lastReconciledDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: (account) => {
      if (!account.accountNumber) {
        const date = new Date();
        const year = date.getFullYear();
        const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
        account.accountNumber = `ACC-${year}-${random}`;
      }
    }
  }
});

export default Account; 