import { Department, User, Project, Asset } from '../models/associations.js';
import { Op } from 'sequelize';
import { sequelize } from '../config/database.js';

// Get all departments with statistics
export const getAllDepartments = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = 'all' } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { code: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (status !== 'all') {
      whereClause.isActive = status === 'active';
    }

    const departments = await Department.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'manager',
          attributes: ['id', 'firstName', 'lastName', 'email', 'profileImage']
        },
        {
          model: User,
          as: 'users',
          attributes: ['id'],
          where: { isActive: true },
          required: false
        },
        {
          model: Project,
          as: 'projects',
          attributes: ['id', 'status'],
          required: false
        }
      ],
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(*) FROM users 
              WHERE users.department_id = "Department".id 
              AND users.is_active = true
            )`),
            'employeeCount'
          ],
          [
            sequelize.literal(`(
              SELECT COUNT(*) FROM projects 
              WHERE projects.department_id = "Department".id 
              AND projects.is_active = true
            )`),
            'projectCount'
          ]
        ]
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: departments.rows,
      pagination: {
        total: departments.count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(departments.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch departments',
      error: error.message
    });
  }
};

// Get department by ID with detailed information
export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findByPk(id, {
      include: [
        {
          model: User,
          as: 'manager',
          attributes: ['id', 'firstName', 'lastName', 'email', 'profileImage', 'phone']
        },
        {
          model: User,
          as: 'users',
          attributes: ['id', 'firstName', 'lastName', 'email', 'position', 'profileImage', 'isActive'],
          where: { isActive: true }
        },
        {
          model: Project,
          as: 'projects',
          attributes: ['id', 'name', 'status', 'progress', 'startDate', 'endDate'],
          where: { isActive: true }
        },
        {
          model: Asset,
          as: 'assets',
          attributes: ['id', 'name', 'status', 'condition', 'category'],
          where: { isActive: true }
        }
      ]
    });

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    // Calculate additional statistics
    const employeeCount = department.users.length;
    const activeProjects = department.projects.filter(p => p.status === 'active').length;
    const totalBudget = department.projects.reduce((sum, p) => sum + parseFloat(p.budget || 0), 0);
    const totalAssets = department.assets.length;

    res.json({
      success: true,
      data: {
        ...department.toJSON(),
        statistics: {
          employeeCount,
          activeProjects,
          totalBudget,
          totalAssets
        }
      }
    });
  } catch (error) {
    console.error('Error fetching department:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch department',
      error: error.message
    });
  }
};

// Create new department
export const createDepartment = async (req, res) => {
  try {
    const {
      name,
      code,
      description,
      managerId,
      budget,
      location,
      contactEmail,
      contactPhone,
      color,
      icon
    } = req.body;

    // Check if department code already exists
    const existingDepartment = await Department.findOne({
      where: { code }
    });

    if (existingDepartment) {
      return res.status(400).json({
        success: false,
        message: 'Department code already exists'
      });
    }

    const department = await Department.create({
      name,
      code,
      description,
      managerId,
      budget,
      location,
      contactEmail,
      contactPhone,
      color,
      icon
    });

    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: department
    });
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create department',
      error: error.message
    });
  }
};

// Update department
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    // Check if code is being changed and if it already exists
    if (updateData.code && updateData.code !== department.code) {
      const existingDepartment = await Department.findOne({
        where: { code: updateData.code }
      });

      if (existingDepartment) {
        return res.status(400).json({
          success: false,
          message: 'Department code already exists'
        });
      }
    }

    await department.update(updateData);

    res.json({
      success: true,
      message: 'Department updated successfully',
      data: department
    });
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update department',
      error: error.message
    });
  }
};

// Delete department (soft delete)
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    // Check if department has active users
    const activeUsers = await User.count({
      where: {
        departmentId: id,
        isActive: true
      }
    });

    if (activeUsers > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete department with active users'
      });
    }

    await department.update({ isActive: false });

    res.json({
      success: true,
      message: 'Department deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete department',
      error: error.message
    });
  }
};

// Get department statistics
export const getDepartmentStats = async (req, res) => {
  try {
    const stats = await Department.findAll({
      attributes: [
        'id',
        'name',
        'code',
        'budget',
        [
          sequelize.literal(`(
            SELECT COUNT(*) FROM users 
            WHERE users.department_id = "Department".id 
            AND users.is_active = true
          )`),
          'employeeCount'
        ],
        [
          sequelize.literal(`(
            SELECT COUNT(*) FROM projects 
            WHERE projects.department_id = "Department".id 
            AND projects.is_active = true
          )`),
          'projectCount'
        ],
        [
          sequelize.literal(`(
            SELECT COUNT(*) FROM assets 
            WHERE assets.department_id = "Department".id 
            AND assets.is_active = true
          )`),
          'assetCount'
        ]
      ],
      where: { isActive: true },
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching department stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch department statistics',
      error: error.message
    });
  }
};

// Get department employees
export const getDepartmentEmployees = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10, search = '', status = 'all' } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {
      departmentId: id,
      isActive: true
    };

    if (search) {
      whereClause[Op.or] = [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { position: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (status !== 'all') {
      whereClause.isActive = status === 'active';
    }

    const employees = await User.findAndCountAll({
      where: whereClause,
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'position',
        'role',
        'phone',
        'profileImage',
        'hireDate',
        'isActive',
        'lastLogin'
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['firstName', 'ASC']]
    });

    res.json({
      success: true,
      data: employees.rows,
      pagination: {
        total: employees.count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(employees.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching department employees:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch department employees',
      error: error.message
    });
  }
}; 