import express from 'express';
import { authenticateToken, requireRole } from '../middlewares/auth.js';
import { User } from '../models/User.js';

const router = express.Router();

router.use(authenticateToken);

// Get all users (admin only)
router.get('/', requireRole(['admin']), async (req, res) => {
  try {
    const users = await User.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: { users }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get users',
      error: error.message
    });
  }
});

export default router;