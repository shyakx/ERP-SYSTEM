import { Bill, Vendor, User } from '../models/associations.js';
import { Op } from 'sequelize';

// Get all bills with pagination and filtering
export const getAllBills = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };
    if (status) whereClause.status = status;
    if (search) {
      whereClause[Op.or] = [
        { billNumber: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows: bills } = await Bill.findAndCountAll({
      where: whereClause,
      include: [
        { model: Vendor, as: 'vendor', attributes: ['name', 'vendorCode'] }
      ],
      order: [['billDate', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      bills,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching bills:', error);
    res.status(500).json({ error: 'Failed to fetch bills' });
  }
};

// Test endpoint for development
export const testGetAllBills = async (req, res) => {
  try {
    console.log('🔍 testGetAllBills called');
    
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    console.log('📊 Querying Bill model...');
    
    // First, let's check if Bill model is defined
    console.log('📊 Bill model:', typeof Bill);
    
    const { count, rows: bills } = await Bill.findAndCountAll({
      order: [['issueDate', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    console.log(`📊 Found ${count} bills in database`);
    console.log(`📊 Bills data length:`, bills.length);

    res.json({
      items: bills,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('❌ Error fetching bills:', error);
    res.json({
      items: [],
      total: 0,
      totalPages: 0,
      currentPage: 1
    });
  }
};

// New test function
export const testBillsSimple = async (req, res) => {
  try {
    console.log('🔍 testBillsSimple called');
    
    // Simple query without any conditions
    const bills = await Bill.findAll({ limit: 10 });
    
    console.log(`📊 Found ${bills.length} bills`);
    
    res.json({
      items: bills,
      total: bills.length,
      totalPages: 1,
      currentPage: 1
    });
  } catch (error) {
    console.error('❌ Error in testBillsSimple:', error);
    res.json({
      items: [],
      total: 0,
      totalPages: 0,
      currentPage: 1
    });
  }
};

// Get bill by ID
export const getBillById = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findOne({
      where: { id, isActive: true },
      include: [
        { model: Vendor, as: 'vendor' }
      ]
    });

    if (!bill) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    res.json(bill);
  } catch (error) {
    console.error('Error fetching bill:', error);
    res.status(500).json({ error: 'Failed to fetch bill' });
  }
};

// Create new bill
export const createBill = async (req, res) => {
  try {
    const billData = {
      ...req.body,
      createdBy: req.user.id
    };

    const bill = await Bill.create(billData);
    res.status(201).json(bill);
  } catch (error) {
    console.error('Error creating bill:', error);
    res.status(500).json({ error: 'Failed to create bill' });
  }
};

// Update bill
export const updateBill = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findOne({ where: { id, isActive: true } });

    if (!bill) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    await bill.update(req.body);
    res.json(bill);
  } catch (error) {
    console.error('Error updating bill:', error);
    res.status(500).json({ error: 'Failed to update bill' });
  }
};

// Delete bill
export const deleteBill = async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findOne({ where: { id, isActive: true } });

    if (!bill) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    await bill.update({ isActive: false });
    res.json({ message: 'Bill deleted successfully' });
  } catch (error) {
    console.error('Error deleting bill:', error);
    res.status(500).json({ error: 'Failed to delete bill' });
  }
};

// Get bill statistics
export const getBillStats = async (req, res) => {
  try {
    const bills = await Bill.findAll({ where: { isActive: true } });

    const stats = {
      total: bills.length,
      totalAmount: bills.reduce((sum, b) => sum + parseFloat(b.totalAmount), 0),
      paid: bills.filter(b => b.status === 'paid').length,
      pending: bills.filter(b => b.status === 'pending').length,
      overdue: bills.filter(b => b.status === 'overdue').length,
      draft: bills.filter(b => b.status === 'draft').length
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching bill stats:', error);
    res.status(500).json({ error: 'Failed to fetch bill statistics' });
  }
}; 