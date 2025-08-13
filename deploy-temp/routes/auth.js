import express from 'express';
import { login, testLogin, getProfile, logout } from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

// Test login for development (no authentication required)
router.post('/test-login', testLogin);

// Regular login
router.post('/login', login);

// Get user profile (requires authentication)
router.get('/profile', authenticateToken, getProfile);

// Logout
router.post('/logout', logout);

export default router;