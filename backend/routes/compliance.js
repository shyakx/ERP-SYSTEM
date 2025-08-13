import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import { Compliance } from '../models/associations.js';
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
      status = "all",
      priority = "all"
    } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { assignedTo: { [Op.iLike]: `%${search}%` } },
        { department: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (category !== 'all') {
      whereClause.category = category;
    }

    if (status !== 'all') {
      whereClause.status = status;
    }

    if (priority !== 'all') {
      whereClause.priority = priority;
    }

    const compliance = await Compliance.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['dueDate', 'ASC']]
    });

    res.json({
      items: compliance.rows,
      total: compliance.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(compliance.count / limit)
    });
  } catch (error) {
    console.error('Error fetching compliance data:', error);
    res.status(500).json({ error: 'Failed to fetch compliance data' });
  }
});

router.get('/test/stats', async (req, res) => {
  try {
    const total = await Compliance.count({ where: { isActive: true } });
    const active = await Compliance.count({ where: { isActive: true, status: 'Active' } });
    const pending = await Compliance.count({ where: { isActive: true, status: 'Pending' } });
    const completed = await Compliance.count({ where: { isActive: true, status: 'Completed' } });
    const overdue = await Compliance.count({ 
      where: { 
        isActive: true, 
        dueDate: { [Op.lt]: new Date() },
        status: { [Op.ne]: 'Completed' }
      } 
    });

    res.json({
      total,
      active,
      pending,
      completed,
      overdue
    });
  } catch (error) {
    console.error('Error fetching compliance stats:', error);
    res.status(500).json({ error: 'Failed to fetch compliance stats' });
  }
});

// Protected routes (require authentication)
router.get('/', authenticateToken, async (req, res) => {
  // Implementation for authenticated users
});

router.post('/', authenticateToken, async (req, res) => {
  // Implementation for creating compliance items
});

router.put('/:id', authenticateToken, async (req, res) => {
  // Implementation for updating compliance items
});

router.delete('/:id', authenticateToken, async (req, res) => {
  // Implementation for deleting compliance items
});

export default router; 