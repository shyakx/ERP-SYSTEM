import { Project, User, Department, Task } from '../models/associations.js';
import { Op } from 'sequelize';
import { sequelize } from '../config/database.js';

// Get all projects with filtering and pagination
export const getAllProjects = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      status = 'all',
      priority = 'all',
      departmentId = null
    } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { code: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { clientName: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (status !== 'all') {
      whereClause.status = status;
    }

    if (priority !== 'all') {
      whereClause.priority = priority;
    }

    if (departmentId) {
      whereClause.departmentId = departmentId;
    }

    const projects = await Project.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['id', 'name', 'code', 'color']
        },
        {
          model: User,
          as: 'manager',
          attributes: ['id', 'firstName', 'lastName', 'email', 'profileImage']
        },
        {
          model: Task,
          as: 'tasks',
          attributes: ['id', 'status', 'progress'],
          required: false
        }
      ],
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(*) FROM tasks 
              WHERE tasks.project_id = "Project".id 
              AND tasks.is_active = true
            )`),
            'taskCount'
          ],
          [
            sequelize.literal(`(
              SELECT COUNT(*) FROM tasks 
              WHERE tasks.project_id = "Project".id 
              AND tasks.status = 'completed'
              AND tasks.is_active = true
            )`),
            'completedTaskCount'
          ]
        ]
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: projects.rows,
      pagination: {
        total: projects.count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(projects.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
      error: error.message
    });
  }
};

// Get project by ID with detailed information
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id, {
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['id', 'name', 'code', 'color', 'icon']
        },
        {
          model: User,
          as: 'manager',
          attributes: ['id', 'firstName', 'lastName', 'email', 'profileImage', 'phone']
        },
        {
          model: Task,
          as: 'tasks',
          include: [
            {
              model: User,
              as: 'assignedUser',
              attributes: ['id', 'firstName', 'lastName', 'email', 'profileImage']
            }
          ],
          where: { isActive: true },
          order: [['createdAt', 'DESC']]
        }
      ]
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Calculate project statistics
    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter(t => t.status === 'completed').length;
    const inProgressTasks = project.tasks.filter(t => t.status === 'in-progress').length;
    const overdueTasks = project.tasks.filter(t => t.isOverdue()).length;
    const averageProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    res.json({
      success: true,
      data: {
        ...project.toJSON(),
        statistics: {
          totalTasks,
          completedTasks,
          inProgressTasks,
          overdueTasks,
          averageProgress
        }
      }
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project',
      error: error.message
    });
  }
};

// Create new project
export const createProject = async (req, res) => {
  try {
    const {
      name,
      code,
      description,
      status,
      priority,
      startDate,
      endDate,
      budget,
      departmentId,
      managerId,
      clientName,
      clientEmail,
      tags
    } = req.body;

    // Check if project code already exists
    const existingProject = await Project.findOne({
      where: { code }
    });

    if (existingProject) {
      return res.status(400).json({
        success: false,
        message: 'Project code already exists'
      });
    }

    const project = await Project.create({
      name,
      code,
      description,
      status,
      priority,
      startDate,
      endDate,
      budget,
      departmentId,
      managerId,
      clientName,
      clientEmail,
      tags: tags || []
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error: error.message
    });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if code is being changed and if it already exists
    if (updateData.code && updateData.code !== project.code) {
      const existingProject = await Project.findOne({
        where: { code: updateData.code }
      });

      if (existingProject) {
        return res.status(400).json({
          success: false,
          message: 'Project code already exists'
        });
      }
    }

    await project.update(updateData);

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project',
      error: error.message
    });
  }
};

// Delete project (soft delete)
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if project has active tasks
    const activeTasks = await Task.count({
      where: {
        projectId: id,
        isActive: true
      }
    });

    if (activeTasks > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete project with active tasks'
      });
    }

    await project.update({ isActive: false });

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project',
      error: error.message
    });
  }
};

// Get project statistics
export const getProjectStats = async (req, res) => {
  try {
    const stats = await Project.findAll({
      attributes: [
        'id',
        'name',
        'status',
        'priority',
        'progress',
        'budget',
        'actualCost',
        'startDate',
        'endDate',
        [
          sequelize.literal(`(
            SELECT COUNT(*) FROM tasks 
            WHERE tasks.project_id = "Project".id 
            AND tasks.is_active = true
          )`),
          'taskCount'
        ],
        [
          sequelize.literal(`(
            SELECT COUNT(*) FROM tasks 
            WHERE tasks.project_id = "Project".id 
            AND tasks.status = 'completed'
            AND tasks.is_active = true
          )`),
          'completedTaskCount'
        ]
      ],
      where: { isActive: true },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching project stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project statistics',
      error: error.message
    });
  }
};

// Get projects by department
export const getProjectsByDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const { page = 1, limit = 10, status = 'all' } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {
      departmentId,
      isActive: true
    };

    if (status !== 'all') {
      whereClause.status = status;
    }

    const projects = await Project.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'manager',
          attributes: ['id', 'firstName', 'lastName', 'email', 'profileImage']
        },
        {
          model: Task,
          as: 'tasks',
          attributes: ['id', 'status', 'progress'],
          required: false
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: projects.rows,
      pagination: {
        total: projects.count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(projects.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching department projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch department projects',
      error: error.message
    });
  }
}; 