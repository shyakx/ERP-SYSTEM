import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import { Op } from 'sequelize';

const router = express.Router();

// Test endpoints for development (no authentication required)
router.get('/test', async (req, res) => {
  try {
    const { Benefit } = await import('../models/associations.js');
    const { page = 1, limit = 10, search = '', type = 'all', status = 'all' } = req.query;
    
    const offset = (page - 1) * limit;
    const whereClause = {};
    
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    if (type !== 'all') {
      whereClause.type = type;
    }
    
    if (status !== 'all') {
      whereClause.status = status;
    }
    
    const benefits = await Benefit.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      items: benefits.rows,
      total: benefits.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(benefits.count / limit)
    });
  } catch (error) {
    console.error('Error fetching benefits:', error);
    res.status(500).json({ error: 'Failed to fetch benefits' });
  }
});

router.get('/test/stats', async (req, res) => {
  try {
    const { Benefit } = await import('../models/associations.js');
    const totalBenefits = await Benefit.count({ where: { isActive: true } });
    const activeBenefits = await Benefit.count({ where: { isActive: true, status: 'Active' } });
    const totalCost = await Benefit.sum('monthlyCost', { where: { isActive: true, status: 'Active' } });
    const avgEnrollment = await Benefit.sequelize.query(
      'SELECT AVG(enrollment_rate) as avg_rate FROM benefits WHERE is_active = true',
      { type: Benefit.sequelize.QueryTypes.SELECT }
    );
    
    res.json({
      total: totalBenefits,
      active: activeBenefits,
      totalCost: totalCost || 0,
      avgEnrollment: avgEnrollment[0]?.avg_rate || 0
    });
  } catch (error) {
    console.error('Error fetching benefit stats:', error);
    res.status(500).json({ error: 'Failed to fetch benefit stats' });
  }
});

// Get all benefits with pagination and filtering (requires authentication)
router.get('/', authenticateToken, async (req, res) => {
  // Implementation for authenticated endpoint
});

// Get benefit statistics (requires authentication)
router.get('/stats', authenticateToken, async (req, res) => {
  // Implementation for authenticated endpoint
});

// Get benefit by ID (requires authentication)
router.get('/:id', authenticateToken, async (req, res) => {
  // Implementation for authenticated endpoint
});

// Create new benefit (requires authentication)
router.post('/', authenticateToken, async (req, res) => {
  // Implementation for authenticated endpoint
});

// Update benefit (requires authentication)
router.put('/:id', authenticateToken, async (req, res) => {
  // Implementation for authenticated endpoint
});

// Delete benefit (requires authentication)
router.delete('/:id', authenticateToken, async (req, res) => {
  // Implementation for authenticated endpoint
});

export default router; 