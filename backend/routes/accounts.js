import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountStats,
  testGetAllAccounts
} from '../controllers/accountController.js';

const router = express.Router();

// Test endpoints for development (no authentication required)
router.get('/test', testGetAllAccounts);
router.get('/test/stats', async (req, res) => {
  try {
    const { Account } = await import('../models/associations.js');
    const accounts = await Account.findAll({ where: { isActive: true } });

    const stats = {
      total: accounts.length,
      totalBalance: accounts.reduce((sum, a) => sum + parseFloat(a.currentBalance), 0),
      bank: accounts.filter(a => a.type === 'bank').length,
      cash: accounts.filter(a => a.type === 'cash').length,
      receivable: accounts.filter(a => a.type === 'receivable').length,
      payable: accounts.filter(a => a.type === 'payable').length,
      active: accounts.filter(a => a.status === 'active').length,
      inactive: accounts.filter(a => a.status === 'inactive').length
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching account stats:', error);
    res.status(500).json({ error: 'Failed to fetch account stats' });
  }
});

// Authenticated routes
router.get('/', authenticateToken, getAllAccounts);
router.get('/stats', authenticateToken, getAccountStats);
router.get('/:id', authenticateToken, getAccountById);
router.post('/', authenticateToken, createAccount);
router.put('/:id', authenticateToken, updateAccount);
router.delete('/:id', authenticateToken, deleteAccount);

export default router; 