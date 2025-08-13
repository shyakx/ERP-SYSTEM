import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
  getVendorStats,
  testGetAllVendors
} from '../controllers/vendorController.js';

const router = express.Router();

// Test endpoints for development (no authentication required)
router.get('/test', testGetAllVendors);
router.get('/test/stats', async (req, res) => {
  try {
    const { Vendor } = await import('../models/associations.js');
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
    res.status(500).json({ error: 'Failed to fetch vendor stats' });
  }
});

// Authenticated routes
router.get('/', authenticateToken, getAllVendors);
router.get('/stats', authenticateToken, getVendorStats);
router.get('/:id', authenticateToken, getVendorById);
router.post('/', authenticateToken, createVendor);
router.put('/:id', authenticateToken, updateVendor);
router.delete('/:id', authenticateToken, deleteVendor);

export default router; 