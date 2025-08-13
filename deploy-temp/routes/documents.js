import express from 'express';
import { upload } from '../middlewares/upload.js';
import { authenticateToken } from '../middlewares/auth.js';
import {
  uploadDocument,
  getDocuments,
  getDocument,
  deleteDocument,
  uploadValidation
} from '../controllers/documentController.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/upload', upload.single('file'), uploadValidation, uploadDocument);
router.get('/', getDocuments);
router.get('/:id', getDocument);
router.delete('/:id', deleteDocument);

export default router;