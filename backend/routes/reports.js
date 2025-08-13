import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import { Report } from '../models/associations.js';
import { Op } from 'sequelize';

const router = express.Router();

// Test endpoints for development (no authentication required)
router.get('/test', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = "",
      type = "all",
      status = "all",
      period = "all"
    } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { generatedBy: { [Op.iLike]: `%${search}%` } },
        { department: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (type !== 'all') {
      whereClause.type = type;
    }

    if (status !== 'all') {
      whereClause.status = status;
    }

    if (period !== 'all') {
      whereClause.period = { [Op.iLike]: `%${period}%` };
    }

    const reports = await Report.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['generatedDate', 'DESC']]
    });

    res.json({
      items: reports.rows,
      total: reports.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(reports.count / limit)
    });
  } catch (error) {
    console.error('Error fetching reports data:', error);
    res.status(500).json({ error: 'Failed to fetch reports data' });
  }
});

router.get('/test/stats', async (req, res) => {
  try {
    const total = await Report.count({ where: { isActive: true } });
    const generated = await Report.count({ where: { isActive: true, status: 'Generated' } });
    const pending = await Report.count({ where: { isActive: true, status: 'Pending' } });
    const inProgress = await Report.count({ where: { isActive: true, status: 'In Progress' } });
    const failed = await Report.count({ where: { isActive: true, status: 'Failed' } });
    
    // Get most downloaded report
    const mostDownloaded = await Report.findOne({
      where: { isActive: true },
      order: [['downloadCount', 'DESC']],
      attributes: ['title', 'downloadCount']
    });

    res.json({
      total,
      generated,
      pending,
      inProgress,
      failed,
      mostDownloaded: mostDownloaded ? {
        title: mostDownloaded.title,
        downloads: mostDownloaded.downloadCount
      } : null
    });
  } catch (error) {
    console.error('Error fetching reports stats:', error);
    res.status(500).json({ error: 'Failed to fetch reports stats' });
  }
});

// Protected routes (require authentication)
router.get('/', authenticateToken, async (req, res) => {
  // Implementation for authenticated users
});

router.post('/', authenticateToken, async (req, res) => {
  // Implementation for creating reports
});

router.put('/:id', authenticateToken, async (req, res) => {
  // Implementation for updating reports
});

router.delete('/:id', authenticateToken, async (req, res) => {
  // Implementation for deleting reports
});

export default router; 