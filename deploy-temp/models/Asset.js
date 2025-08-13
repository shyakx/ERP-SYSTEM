import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Asset = sequelize.define('Asset', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 200]
    }
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [2, 50]
    }
  },
  category: {
    type: DataTypes.ENUM('equipment', 'furniture', 'vehicle', 'technology', 'security', 'other'),
    allowNull: false,
    defaultValue: 'other'
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: true
  },
  model: {
    type: DataTypes.STRING,
    allowNull: true
  },
  serialNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  purchaseDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  purchasePrice: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
    defaultValue: 0
  },
  currentValue: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
    defaultValue: 0
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  departmentId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  assignedTo: {
    type: DataTypes.UUID,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('available', 'assigned', 'maintenance', 'retired', 'lost', 'damaged'),
    allowNull: false,
    defaultValue: 'available'
  },
  condition: {
    type: DataTypes.ENUM('excellent', 'good', 'fair', 'poor', 'critical'),
    allowNull: false,
    defaultValue: 'good'
  },
  warrantyExpiry: {
    type: DataTypes.DATE,
    allowNull: true
  },
  lastMaintenance: {
    type: DataTypes.DATE,
    allowNull: true
  },
  nextMaintenance: {
    type: DataTypes.DATE,
    allowNull: true
  },
  supplier: {
    type: DataTypes.STRING,
    allowNull: true
  },
  supplierContact: {
    type: DataTypes.STRING,
    allowNull: true
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  documents: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'assets',
  timestamps: true
});

// Instance methods
Asset.prototype.getAge = function() {
  if (!this.purchaseDate) return null;
  const today = new Date();
  const purchaseDate = new Date(this.purchaseDate);
  const diffTime = today - purchaseDate;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

Asset.prototype.getDepreciation = function() {
  if (!this.purchasePrice || !this.currentValue) return 0;
  return ((this.purchasePrice - this.currentValue) / this.purchasePrice) * 100;
};

Asset.prototype.isWarrantyValid = function() {
  if (!this.warrantyExpiry) return false;
  return new Date() < new Date(this.warrantyExpiry);
};

Asset.prototype.isMaintenanceDue = function() {
  if (!this.nextMaintenance) return false;
  return new Date() >= new Date(this.nextMaintenance);
};

Asset.prototype.getDaysUntilMaintenance = function() {
  if (!this.nextMaintenance) return null;
  const today = new Date();
  const maintenanceDate = new Date(this.nextMaintenance);
  const diffTime = maintenanceDate - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

Asset.prototype.toJSON = function() {
  const values = { ...this.get() };
  return values;
}; 