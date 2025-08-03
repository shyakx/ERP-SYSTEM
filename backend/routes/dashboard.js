import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import { User, Document, ChatMessage } from '../models/associations.js';
import { Op } from 'sequelize';

const router = express.Router();

router.use(authenticateToken);

router.get('/stats', async (req, res) => {
  try {
    const stats = {};

    if (req.user.role === 'admin') {
      // Admin dashboard stats
      stats.totalUsers = await User.count();
      stats.totalDocuments = await Document.count();
      stats.totalChatMessages = await ChatMessage.count();
      stats.activeUsers = await User.count({ where: { isActive: true } });
      
      // Recent activity
      stats.recentDocuments = await Document.count({
        where: {
          createdAt: {
            [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      });
    } else {
      // User dashboard stats
      stats.myDocuments = await Document.count({ where: { userId: req.user.id } });
      stats.myChatMessages = await ChatMessage.count({ where: { userId: req.user.id } });
      stats.publicDocuments = await Document.count({ where: { isPublic: true } });
    }

    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get dashboard stats',
      error: error.message
    });
  }
});

export default router;