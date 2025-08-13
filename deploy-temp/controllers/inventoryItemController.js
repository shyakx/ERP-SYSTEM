import { InventoryItem, User } from '../models/associations.js';
import { Op } from 'sequelize';

// Get all inventory items with pagination and filtering
export const getAllInventoryItems = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, status, search } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };
    if (category) whereClause.category = category;
    if (status) whereClause.status = status;
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { itemCode: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows: items } = await InventoryItem.findAndCountAll({
      where: whereClause,
      include: [
        { model: User, as: 'itemCreator', attributes: ['firstName', 'lastName', 'email'] }
      ],
      order: [['name', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      items,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching inventory items:', error);
    res.status(500).json({ error: 'Failed to fetch inventory items' });
  }
};

// Test endpoint for development
export const testGetAllInventoryItems = async (req, res) => {
  try {
    console.log('🔍 testGetAllInventoryItems called');
    
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    console.log('📊 Querying InventoryItem model...');
    
    const { count, rows: items } = await InventoryItem.findAndCountAll({
      order: [['name', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    console.log(`📊 Found ${count} inventory items in database`);
    console.log(`📊 Items data length:`, items.length);

    res.json({
      items: items,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('❌ Error fetching inventory items:', error);
    res.json({
      items: [],
      total: 0,
      totalPages: 0,
      currentPage: 1
    });
  }
};

// Get inventory item by ID
export const getInventoryItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await InventoryItem.findOne({
      where: { id, isActive: true },
      include: [
        { model: User, as: 'itemCreator', attributes: ['firstName', 'lastName', 'email'] }
      ]
    });

    if (!item) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }

    res.json(item);
  } catch (error) {
    console.error('Error fetching inventory item:', error);
    res.status(500).json({ error: 'Failed to fetch inventory item' });
  }
};

// Create new inventory item
export const createInventoryItem = async (req, res) => {
  try {
    const itemData = {
      ...req.body,
      createdBy: req.user.id
    };

    const item = await InventoryItem.create(itemData);
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating inventory item:', error);
    res.status(500).json({ error: 'Failed to create inventory item' });
  }
};

// Update inventory item
export const updateInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await InventoryItem.findOne({ where: { id, isActive: true } });

    if (!item) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }

    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error('Error updating inventory item:', error);
    res.status(500).json({ error: 'Failed to update inventory item' });
  }
};

// Delete inventory item
export const deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await InventoryItem.findOne({ where: { id, isActive: true } });

    if (!item) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }

    await item.update({ isActive: false });
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    res.status(500).json({ error: 'Failed to delete inventory item' });
  }
};

// Get inventory item statistics
export const getInventoryItemStats = async (req, res) => {
  try {
    const items = await InventoryItem.findAll({ where: { isActive: true } });

    const stats = {
      total: items.length,
      totalValue: items.reduce((sum, item) => sum + parseFloat(item.totalValue), 0),
      lowStock: items.filter(item => item.currentStock <= item.minimumStock).length,
      outOfStock: items.filter(item => item.currentStock === 0).length,
      active: items.filter(item => item.status === 'active').length,
      inactive: items.filter(item => item.status === 'inactive').length
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching inventory item stats:', error);
    res.status(500).json({ error: 'Failed to fetch inventory item statistics' });
  }
}; 