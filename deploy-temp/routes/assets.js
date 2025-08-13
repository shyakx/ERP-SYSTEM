import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
  getAssetStats,
  getAssetsByDepartment,
  getMaintenanceDueAssets
} from '../controllers/assetController.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all assets with pagination and filtering
router.get('/', getAllAssets);

// Get asset statistics
router.get('/stats', getAssetStats);

// Get maintenance due assets
router.get('/maintenance/due', getMaintenanceDueAssets);

// Get assets by department
router.get('/department/:departmentId', getAssetsByDepartment);

// Get asset by ID with detailed information
router.get('/:id', getAssetById);

// Create new asset
router.post('/', createAsset);

// Update asset
router.put('/:id', updateAsset);

// Delete asset (soft delete)
router.delete('/:id', deleteAsset);

export default router; 