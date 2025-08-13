import { TaxRecord, User } from '../models/associations.js';
import { Op } from 'sequelize';

// Get all tax records with pagination and filtering
export const getAllTaxRecords = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, status, search } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };
    if (type) whereClause.type = type;
    if (status) whereClause.status = status;
    if (search) {
      whereClause[Op.or] = [
        { taxNumber: { [Op.iLike]: `%${search}%` } },
        { referenceNumber: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows: taxRecords } = await TaxRecord.findAndCountAll({
      where: whereClause,
      order: [['dueDate', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      taxRecords,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching tax records:', error);
    res.status(500).json({ error: 'Failed to fetch tax records' });
  }
};

// Test endpoint for development
export const testGetAllTaxRecords = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: taxRecords } = await TaxRecord.findAndCountAll({
      where: { isActive: true },
      order: [['dueDate', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      items: taxRecords,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching tax records:', error);
    res.status(500).json({ error: 'Failed to fetch tax records' });
  }
};

// Get tax record by ID
export const getTaxRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const taxRecord = await TaxRecord.findOne({
      where: { id, isActive: true }
    });

    if (!taxRecord) {
      return res.status(404).json({ error: 'Tax record not found' });
    }

    res.json(taxRecord);
  } catch (error) {
    console.error('Error fetching tax record:', error);
    res.status(500).json({ error: 'Failed to fetch tax record' });
  }
};

// Create new tax record
export const createTaxRecord = async (req, res) => {
  try {
    const taxRecordData = {
      ...req.body,
      createdBy: req.user.id
    };

    const taxRecord = await TaxRecord.create(taxRecordData);
    res.status(201).json(taxRecord);
  } catch (error) {
    console.error('Error creating tax record:', error);
    res.status(500).json({ error: 'Failed to create tax record' });
  }
};

// Update tax record
export const updateTaxRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const taxRecord = await TaxRecord.findOne({ where: { id, isActive: true } });

    if (!taxRecord) {
      return res.status(404).json({ error: 'Tax record not found' });
    }

    await taxRecord.update(req.body);
    res.json(taxRecord);
  } catch (error) {
    console.error('Error updating tax record:', error);
    res.status(500).json({ error: 'Failed to update tax record' });
  }
};

// Delete tax record
export const deleteTaxRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const taxRecord = await TaxRecord.findOne({ where: { id, isActive: true } });

    if (!taxRecord) {
      return res.status(404).json({ error: 'Tax record not found' });
    }

    await taxRecord.update({ isActive: false });
    res.json({ message: 'Tax record deleted successfully' });
  } catch (error) {
    console.error('Error deleting tax record:', error);
    res.status(500).json({ error: 'Failed to delete tax record' });
  }
};

// Get tax record statistics
export const getTaxRecordStats = async (req, res) => {
  try {
    const taxRecords = await TaxRecord.findAll({ where: { isActive: true } });

    const stats = {
      total: taxRecords.length,
      totalTaxAmount: taxRecords.reduce((sum, t) => sum + parseFloat(t.taxAmount), 0),
      filed: taxRecords.filter(t => t.status === 'filed').length,
      pending: taxRecords.filter(t => t.status === 'pending').length,
      overdue: taxRecords.filter(t => t.status === 'overdue').length,
      paid: taxRecords.filter(t => t.status === 'paid').length,
      byType: {
        income_tax: taxRecords.filter(t => t.type === 'income_tax').length,
        vat: taxRecords.filter(t => t.type === 'vat').length,
        corporate_tax: taxRecords.filter(t => t.type === 'corporate_tax').length,
        payroll_tax: taxRecords.filter(t => t.type === 'payroll_tax').length
      }
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching tax record stats:', error);
    res.status(500).json({ error: 'Failed to fetch tax record statistics' });
  }
}; 