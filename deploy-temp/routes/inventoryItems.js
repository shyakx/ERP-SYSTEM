import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllInventoryItems,
  getInventoryItemById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getInventoryItemStats,
  testGetAllInventoryItems
} from '../controllers/inventoryItemController.js';

const router = express.Router();

// Test endpoints for development (no authentication required)
router.get('/test', testGetAllInventoryItems);
router.get('/test/stats', async (req, res) => {
  try {
    const { InventoryItem } = await import('../models/associations.js');
    const items = await InventoryItem.count({ where: { isActive: true } });
    const lowStock = await InventoryItem.count({ 
      where: { 
        isActive: true,
        currentStock: { [require('sequelize').Op.lte]: require('sequelize').col('minimumStock') }
      } 
    });
    const outOfStock = await InventoryItem.count({ where: { isActive: true, currentStock: 0 } });
    const active = await InventoryItem.count({ where: { isActive: true, status: 'active' } });
    
    res.json({
      total: items,
      lowStock,
      outOfStock,
      active
    });
  } catch (error) {
    console.error('Error fetching inventory item stats:', error);
    res.status(500).json({ error: 'Failed to fetch inventory item stats' });
  }
});

// Get all inventory items with pagination and filtering (requires authentication)
router.get('/', authenticateToken, getAllInventoryItems);

// Get inventory item statistics (requires authentication)
router.get('/stats', authenticateToken, getInventoryItemStats);

// Get inventory item by ID with detailed information (requires authentication)
router.get('/:id', authenticateToken, getInventoryItemById);

// Create new inventory item (requires authentication)
router.post('/', authenticateToken, createInventoryItem);

// Update inventory item (requires authentication)
router.put('/:id', authenticateToken, updateInventoryItem);

// Delete inventory item (requires authentication)
router.delete('/:id', authenticateToken, deleteInventoryItem);

export default router; 