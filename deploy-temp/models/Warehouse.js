import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Warehouse = sequelize.define('Warehouse', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  warehouseCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true
  },
  postalCode: {
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
  manager: {
    type: DataTypes.STRING,
    allowNull: true
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Total capacity in square meters'
  },
  usedCapacity: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    comment: 'Used capacity in square meters'
  },
  temperature: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    comment: 'Temperature in Celsius'
  },
  humidity: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    comment: 'Humidity percentage'
  },
  securityLevel: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'maximum'),
    defaultValue: 'medium'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'maintenance', 'closed'),
    defaultValue: 'active'
  },
  operatingHours: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Operating hours for each day'
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
    beforeCreate: (warehouse) => {
      if (!warehouse.warehouseCode) {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        warehouse.warehouseCode = `WH-${year}${month}-${random}`;
      }
    }
  }
});

export default Warehouse; 