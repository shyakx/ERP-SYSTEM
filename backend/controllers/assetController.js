import { Asset, User, Department } from '../models/associations.js';
import { Op } from 'sequelize';
import { sequelize } from '../config/database.js';

// Get all assets with filtering and pagination
export const getAllAssets = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      status = 'all',
      category = 'all',
      departmentId = null
    } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { code: { [Op.iLike]: `%${search}%` } },
        { serialNumber: { [Op.iLike]: `%${search}%` } },
        { brand: { [Op.iLike]: `%${search}%` } },
        { model: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (status !== 'all') {
      whereClause.status = status;
    }

    if (category !== 'all') {
      whereClause.category = category;
    }

    if (departmentId) {
      whereClause.departmentId = departmentId;
    }

    const assets = await Asset.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['id', 'name', 'code', 'color']
        },
        {
          model: User,
          as: 'assignedUser',
          attributes: ['id', 'firstName', 'lastName', 'email', 'profileImage']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: assets.rows,
      pagination: {
        total: assets.count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(assets.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch assets',
      error: error.message
    });
  }
};

// Get asset by ID with detailed information
export const getAssetById = async (req, res) => {
  try {
    const { id } = req.params;

    const asset = await Asset.findByPk(id, {
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['id', 'name', 'code', 'color', 'icon']
        },
        {
          model: User,
          as: 'assignedUser',
          attributes: ['id', 'firstName', 'lastName', 'email', 'profileImage', 'phone']
        }
      ]
    });

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found'
      });
    }

    // Calculate additional asset information
    const age = asset.getAge();
    const depreciation = asset.getDepreciation();
    const warrantyValid = asset.isWarrantyValid();
    const maintenanceDue = asset.isMaintenanceDue();
    const daysUntilMaintenance = asset.getDaysUntilMaintenance();

    res.json({
      success: true,
      data: {
        ...asset.toJSON(),
        calculated: {
          age,
          depreciation,
          warrantyValid,
          maintenanceDue,
          daysUntilMaintenance
        }
      }
    });
  } catch (error) {
    console.error('Error fetching asset:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch asset',
      error: error.message
    });
  }
};

// Create new asset
export const createAsset = async (req, res) => {
  try {
    const {
      name,
      code,
      category,
      type,
      brand,
      model,
      serialNumber,
      description,
      purchaseDate,
      purchasePrice,
      currentValue,
      location,
      departmentId,
      assignedTo,
      status,
      condition,
      warrantyExpiry,
      lastMaintenance,
      nextMaintenance,
      supplier,
      supplierContact,
      images,
      documents,
      tags
    } = req.body;

    // Check if asset code already exists
    const existingAsset = await Asset.findOne({
      where: { code }
    });

    if (existingAsset) {
      return res.status(400).json({
        success: false,
        message: 'Asset code already exists'
      });
    }

    // Check if serial number already exists
    if (serialNumber) {
      const existingSerial = await Asset.findOne({
        where: { serialNumber }
      });

      if (existingSerial) {
        return res.status(400).json({
          success: false,
          message: 'Serial number already exists'
        });
      }
    }

    const asset = await Asset.create({
      name,
      code,
      category,
      type,
      brand,
      model,
      serialNumber,
      description,
      purchaseDate,
      purchasePrice,
      currentValue,
      location,
      departmentId,
      assignedTo,
      status,
      condition,
      warrantyExpiry,
      lastMaintenance,
      nextMaintenance,
      supplier,
      supplierContact,
      images: images || [],
      documents: documents || [],
      tags: tags || []
    });

    res.status(201).json({
      success: true,
      message: 'Asset created successfully',
      data: asset
    });
  } catch (error) {
    console.error('Error creating asset:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create asset',
      error: error.message
    });
  }
};

// Update asset
export const updateAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const asset = await Asset.findByPk(id);
    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found'
      });
    }

    // Check if code is being changed and if it already exists
    if (updateData.code && updateData.code !== asset.code) {
      const existingAsset = await Asset.findOne({
        where: { code: updateData.code }
      });

      if (existingAsset) {
        return res.status(400).json({
          success: false,
          message: 'Asset code already exists'
        });
      }
    }

    // Check if serial number is being changed and if it already exists
    if (updateData.serialNumber && updateData.serialNumber !== asset.serialNumber) {
      const existingSerial = await Asset.findOne({
        where: { serialNumber: updateData.serialNumber }
      });

      if (existingSerial) {
        return res.status(400).json({
          success: false,
          message: 'Serial number already exists'
        });
      }
    }

    await asset.update(updateData);

    res.json({
      success: true,
      message: 'Asset updated successfully',
      data: asset
    });
  } catch (error) {
    console.error('Error updating asset:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update asset',
      error: error.message
    });
  }
};

// Delete asset (soft delete)
export const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;

    const asset = await Asset.findByPk(id);
    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found'
      });
    }

    await asset.update({ isActive: false });

    res.json({
      success: true,
      message: 'Asset deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting asset:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete asset',
      error: error.message
    });
  }
};

// Get asset statistics
export const getAssetStats = async (req, res) => {
  try {
    const stats = await Asset.findAll({
      attributes: [
        'id',
        'name',
        'category',
        'status',
        'condition',
        'purchasePrice',
        'currentValue',
        'departmentId',
        [
          sequelize.literal(`(
            SELECT name FROM departments 
            WHERE departments.id = "Asset".department_id
          )`),
          'departmentName'
        ]
      ],
      where: { isActive: true },
      order: [['createdAt', 'DESC']]
    });

    // Calculate summary statistics
    const totalAssets = stats.length;
    const totalValue = stats.reduce((sum, asset) => sum + parseFloat(asset.currentValue || 0), 0);
    const totalPurchaseValue = stats.reduce((sum, asset) => sum + parseFloat(asset.purchasePrice || 0), 0);
    const totalDepreciation = totalPurchaseValue - totalValue;

    const categoryStats = {};
    const statusStats = {};
    const conditionStats = {};

    stats.forEach(asset => {
      // Category statistics
      categoryStats[asset.category] = (categoryStats[asset.category] || 0) + 1;
      
      // Status statistics
      statusStats[asset.status] = (statusStats[asset.status] || 0) + 1;
      
      // Condition statistics
      conditionStats[asset.condition] = (conditionStats[asset.condition] || 0) + 1;
    });

    res.json({
      success: true,
      data: {
        summary: {
          totalAssets,
          totalValue,
          totalPurchaseValue,
          totalDepreciation
        },
        categoryStats,
        statusStats,
        conditionStats,
        assets: stats
      }
    });
  } catch (error) {
    console.error('Error fetching asset stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch asset statistics',
      error: error.message
    });
  }
};

// Get assets by department
export const getAssetsByDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const { page = 1, limit = 10, status = 'all', category = 'all' } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {
      departmentId,
      isActive: true
    };

    if (status !== 'all') {
      whereClause.status = status;
    }

    if (category !== 'all') {
      whereClause.category = category;
    }

    const assets = await Asset.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'assignedUser',
          attributes: ['id', 'firstName', 'lastName', 'email', 'profileImage']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: assets.rows,
      pagination: {
        total: assets.count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(assets.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching department assets:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch department assets',
      error: error.message
    });
  }
};

// Get maintenance due assets
export const getMaintenanceDueAssets = async (req, res) => {
  try {
    const assets = await Asset.findAll({
      where: {
        isActive: true,
        nextMaintenance: {
          [Op.lte]: new Date()
        }
      },
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['id', 'name', 'code']
        },
        {
          model: User,
          as: 'assignedUser',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ],
      order: [['nextMaintenance', 'ASC']]
    });

    res.json({
      success: true,
      data: assets
    });
  } catch (error) {
    console.error('Error fetching maintenance due assets:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch maintenance due assets',
      error: error.message
    });
  }
}; 