import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllBills,
  getBillById,
  createBill,
  updateBill,
  deleteBill,
  getBillStats,
  testGetAllBills,
  testBillsSimple
} from '../controllers/billController.js';

const router = express.Router();

// Simple test route
router.get('/simple-test', (req, res) => {
  res.json({ message: 'Bills route is working!', timestamp: new Date().toISOString() });
});

// Test endpoints for development (no authentication required) - MUST COME BEFORE /:id
router.get('/test', testGetAllBills);
router.get('/test-simple', testBillsSimple);
router.get('/test/stats', async (req, res) => {
  try {
    const { Bill } = await import('../models/associations.js');
    const bills = await Bill.count({ where: { isActive: true } });
    const paid = await Bill.count({ where: { isActive: true, status: 'paid' } });
    const pending = await Bill.count({ where: { isActive: true, status: 'pending' } });
    const overdue = await Bill.count({ where: { isActive: true, status: 'overdue' } });
    
    res.json({
      total: bills,
      paid,
      pending,
      overdue
    });
  } catch (error) {
    console.error('Error fetching bill stats:', error);
    res.status(500).json({ error: 'Failed to fetch bill stats' });
  }
});

// Get all bills with pagination and filtering (requires authentication)
router.get('/', authenticateToken, getAllBills);

// Get bill statistics (requires authentication)
router.get('/stats', authenticateToken, getBillStats);

// Get bill by ID with detailed information (requires authentication) - MUST COME LAST
router.get('/:id', authenticateToken, getBillById);

// Create new bill (requires authentication)
router.post('/', authenticateToken, createBill);

// Update bill (requires authentication)
router.put('/:id', authenticateToken, updateBill);

// Delete bill (requires authentication)
router.delete('/:id', authenticateToken, deleteBill);

export default router; 