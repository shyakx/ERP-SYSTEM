import { Vendor, Bill, Transaction, User } from '../models/associations.js';
import { Op } from 'sequelize';

// Get all vendors with pagination and filtering
export const getAllVendors = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, status, search } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };
    if (category) whereClause.category = category;
    if (status) whereClause.status = status;
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { companyName: { [Op.iLike]: `%${search}%` } },
        { vendorCode: { [Op.iLike]: `%${search}%` } },
        { contactPerson: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows: vendors } = await Vendor.findAndCountAll({
      where: whereClause,
      include: [
        { model: User, as: 'vendorCreator', attributes: ['name'] }
      ],
      order: [['name', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      vendors,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ error: 'Failed to fetch vendors' });
  }
};

// Test endpoint for development
export const testGetAllVendors = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: vendors } = await Vendor.findAndCountAll({
      where: { isActive: true },
      order: [['name', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      items: vendors,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.json({
      items: [],
      total: 0,
      totalPages: 0,
      currentPage: 1
    });
  }
};

// Get vendor by ID
export const getVendorById = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findOne({
      where: { id, isActive: true },
      include: [
        { model: User, as: 'vendorCreator' },
        { model: Bill, as: 'vendorBills', limit: 10, order: [['issueDate', 'DESC']] },
        { model: Transaction, as: 'vendorTransactions', limit: 10, order: [['transactionDate', 'DESC']] }
      ]
    });

    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    res.json(vendor);
  } catch (error) {
    console.error('Error fetching vendor:', error);
    res.status(500).json({ error: 'Failed to fetch vendor' });
  }
};

// Create new vendor
export const createVendor = async (req, res) => {
  try {
    const vendorData = {
      ...req.body,
      createdBy: req.user.id
    };

    const vendor = await Vendor.create(vendorData);
    res.status(201).json(vendor);
  } catch (error) {
    console.error('Error creating vendor:', error);
    res.status(500).json({ error: 'Failed to create vendor' });
  }
};

// Update vendor
export const updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findOne({ where: { id, isActive: true } });

    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    await vendor.update(req.body);
    res.json(vendor);
  } catch (error) {
    console.error('Error updating vendor:', error);
    res.status(500).json({ error: 'Failed to update vendor' });
  }
};

// Delete vendor
export const deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.findOne({ where: { id, isActive: true } });

    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    await vendor.update({ isActive: false });
    res.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    console.error('Error deleting vendor:', error);
    res.status(500).json({ error: 'Failed to delete vendor' });
  }
};

// Get vendor statistics
export const getVendorStats = async (req, res) => {
  try {
    const vendors = await Vendor.findAll({ where: { isActive: true } });

    const stats = {
      total: vendors.length,
      totalBalance: vendors.reduce((sum, v) => sum + parseFloat(v.currentBalance), 0),
      active: vendors.filter(v => v.status === 'active').length,
      inactive: vendors.filter(v => v.status === 'inactive').length,
      suspended: vendors.filter(v => v.status === 'suspended').length,
      blacklisted: vendors.filter(v => v.status === 'blacklisted').length,
      byCategory: {}
    };

    // Group by category
    vendors.forEach(vendor => {
      const category = vendor.category;
      if (!stats.byCategory[category]) {
        stats.byCategory[category] = {
          count: 0,
          balance: 0
        };
      }
      stats.byCategory[category].count++;
      stats.byCategory[category].balance += parseFloat(vendor.currentBalance);
    });

    res.json(stats);
  } catch (error) {
    console.error('Error fetching vendor stats:', error);
    res.status(500).json({ error: 'Failed to fetch vendor statistics' });
  }
}; 