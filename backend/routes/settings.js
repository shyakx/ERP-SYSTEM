import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import { Setting } from '../models/associations.js';
import { Op } from 'sequelize';

const router = express.Router();

// Test endpoints for development (no authentication required)
router.get('/test', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = "",
      category = "all",
      type = "all"
    } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { value: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (category !== 'all') {
      whereClause.category = category;
    }

    if (type !== 'all') {
      whereClause.type = type;
    }

    const settings = await Setting.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['category', 'ASC'], ['name', 'ASC']]
    });

    res.json({
      items: settings.rows,
      total: settings.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(settings.count / limit)
    });
  } catch (error) {
    console.error('Error fetching settings data:', error);
    res.status(500).json({ error: 'Failed to fetch settings data' });
  }
});

router.get('/test/stats', async (req, res) => {
  try {
    const total = await Setting.count({ where: { isActive: true } });
    const enabled = await Setting.count({ where: { isActive: true, isEnabled: true } });
    const disabled = await Setting.count({ where: { isActive: true, isEnabled: false } });
    
    // Get categories count
    const categories = await Setting.findAll({
      where: { isActive: true },
      attributes: ['category'],
      group: ['category']
    });

    // Get types count
    const types = await Setting.findAll({
      where: { isActive: true },
      attributes: ['type'],
      group: ['type']
    });

    res.json({
      total,
      enabled,
      disabled,
      categories: categories.length,
      types: types.length
    });
  } catch (error) {
    console.error('Error fetching settings stats:', error);
    res.status(500).json({ error: 'Failed to fetch settings stats' });
  }
});

// Protected routes (require authentication)
router.get('/', authenticateToken, async (req, res) => {
  // Implementation for authenticated users
});

router.post('/', authenticateToken, async (req, res) => {
  // Implementation for creating settings
});

router.put('/:id', authenticateToken, async (req, res) => {
  // Implementation for updating settings
});

router.delete('/:id', authenticateToken, async (req, res) => {
  // Implementation for deleting settings
});

export default router; 