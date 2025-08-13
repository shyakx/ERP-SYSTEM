import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerStats,
  testGetAllCustomers
} from '../controllers/customerController.js';

const router = express.Router();

// Test endpoints for development (no authentication required)
router.get('/test', testGetAllCustomers);
router.get('/test/stats', async (req, res) => {
  try {
    const { Customer } = await import('../models/associations.js');
    const customers = await Customer.findAll({ where: { isActive: true } });

    const stats = {
      total: customers.length,
      totalBalance: customers.reduce((sum, c) => sum + parseFloat(c.currentBalance), 0),
      individual: customers.filter(c => c.type === 'individual').length,
      business: customers.filter(c => c.type === 'business').length,
      government: customers.filter(c => c.type === 'government').length,
      nonProfit: customers.filter(c => c.type === 'non_profit').length,
      active: customers.filter(c => c.status === 'active').length,
      inactive: customers.filter(c => c.status === 'inactive').length,
      suspended: customers.filter(c => c.status === 'suspended').length,
      blacklisted: customers.filter(c => c.status === 'blacklisted').length,
      byCategory: {}
    };

    // Group by category
    customers.forEach(customer => {
      const category = customer.category;
      if (!stats.byCategory[category]) {
        stats.byCategory[category] = {
          count: 0,
          balance: 0
        };
      }
      stats.byCategory[category].count++;
      stats.byCategory[category].balance += parseFloat(customer.currentBalance);
    });

    res.json(stats);
  } catch (error) {
    console.error('Error fetching customer stats:', error);
    res.status(500).json({ error: 'Failed to fetch customer stats' });
  }
});

// Authenticated routes
router.get('/', authenticateToken, getAllCustomers);
router.get('/stats', authenticateToken, getCustomerStats);
router.get('/:id', authenticateToken, getCustomerById);
router.post('/', authenticateToken, createCustomer);
router.put('/:id', authenticateToken, updateCustomer);
router.delete('/:id', authenticateToken, deleteCustomer);

export default router; 