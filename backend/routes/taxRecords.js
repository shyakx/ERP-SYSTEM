import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllTaxRecords,
  getTaxRecordById,
  createTaxRecord,
  updateTaxRecord,
  deleteTaxRecord,
  getTaxRecordStats,
  testGetAllTaxRecords
} from '../controllers/taxController.js';

const router = express.Router();

router.get('/test', testGetAllTaxRecords);
router.get('/test/stats', async (req, res) => {
  try {
    const { TaxRecord } = await import('../models/associations.js');
    const taxRecords = await TaxRecord.count({ where: { isActive: true } });
    const filed = await TaxRecord.count({ where: { isActive: true, status: 'filed' } });
    const pending = await TaxRecord.count({ where: { isActive: true, status: 'pending' } });
    const overdue = await TaxRecord.count({ where: { isActive: true, status: 'overdue' } });
    
    res.json({
      total: taxRecords,
      filed,
      pending,
      overdue
    });
  } catch (error) {
    console.error('Error fetching tax record stats:', error);
    res.status(500).json({ error: 'Failed to fetch tax record stats' });
  }
});

// Get all tax records with pagination and filtering (requires authentication)
router.get('/', authenticateToken, getAllTaxRecords);

// Get tax record statistics (requires authentication)
router.get('/stats', authenticateToken, getTaxRecordStats);

// Get tax record by ID with detailed information (requires authentication)
router.get('/:id', authenticateToken, getTaxRecordById);

// Create new tax record (requires authentication)
router.post('/', authenticateToken, createTaxRecord);

// Update tax record (requires authentication)
router.put('/:id', authenticateToken, updateTaxRecord);

// Delete tax record (requires authentication)
router.delete('/:id', authenticateToken, deleteTaxRecord);

export default router; 