import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import { sendMessage, getChatHistory, chatValidation } from '../controllers/chatController.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/', chatValidation, sendMessage);
router.get('/history', getChatHistory);

export default router;