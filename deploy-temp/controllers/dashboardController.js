import { User, Department, Project, Task, Asset } from '../models/associations.js';
import { Op } from 'sequelize';

// Get overall dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    // User statistics
    const totalUsers = await User.count({ where: { isActive: true } });
    const activeUsers = await User.count({ 
      where: { 
        isActive: true,
        lastLogin: {
          [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        }
      }
    });

    // Department statistics
    const totalDepartments = await Department.count({ where: { isActive: true } });
    const departmentsWithProjects = await Department.count({
      include: [{
        model: Project,
        as: 'projects',
        where: { isActive: true },
        required: true
      }]
    });

    // Project statistics
    const totalProjects = await Project.count({ where: { isActive: true } });
    const activeProjects = await Project.count({ where: { status: 'active', isActive: true } });
    const completedProjects = await Project.count({ where: { status: 'completed', isActive: true } });
    const overdueProjects = await Project.count({
      where: {
        isActive: true,
        endDate: {
          [Op.lt]: new Date()
        },
        status: {
          [Op.ne]: 'completed'
        }
      }
    });

    // Task statistics
    const totalTasks = await Task.count({ where: { isActive: true } });
    const completedTasks = await Task.count({ where: { status: 'completed', isActive: true } });
    const overdueTasks = await Task.count({
      where: {
        isActive: true,
        dueDate: {
          [Op.lt]: new Date()
        },
        status: {
          [Op.ne]: 'completed'
        }
      }
    });

    // Asset statistics
    const totalAssets = await Asset.count({ where: { isActive: true } });
    const availableAssets = await Asset.count({ where: { status: 'available', isActive: true } });
    const maintenanceDueAssets = await Asset.count({
      where: {
        isActive: true,
        nextMaintenance: {
          [Op.lte]: new Date()
        }
      }
    });

    // Financial statistics
    const totalProjectBudget = await Project.sum('budget', { where: { isActive: true } });
    const totalProjectCost = await Project.sum('actualCost', { where: { isActive: true } });
    const totalAssetValue = await Asset.sum('currentValue', { where: { isActive: true } });

    res.json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          active: activeUsers,
          percentage: totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0
        },
        departments: {
          total: totalDepartments,
          withProjects: departmentsWithProjects,
          percentage: totalDepartments > 0 ? Math.round((departmentsWithProjects / totalDepartments) * 100) : 0
        },
        projects: {
          total: totalProjects,
          active: activeProjects,
          completed: completedProjects,
          overdue: overdueProjects,
          completionRate: totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0
        },
        tasks: {
          total: totalTasks,
          completed: completedTasks,
          overdue: overdueTasks,
          completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
        },
        assets: {
          total: totalAssets,
          available: availableAssets,
          maintenanceDue: maintenanceDueAssets,
          utilizationRate: totalAssets > 0 ? Math.round(((totalAssets - availableAssets) / totalAssets) * 100) : 0
        },
        financial: {
          totalBudget: parseFloat(totalProjectBudget || 0),
          totalCost: parseFloat(totalProjectCost || 0),
          totalAssetValue: parseFloat(totalAssetValue || 0),
          budgetUtilization: totalProjectBudget > 0 ? Math.round((totalProjectCost / totalProjectBudget) * 100) : 0
        }
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error.message
    });
  }
};

// Get recent activities
export const getRecentActivities = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    // Get recent projects
    const recentProjects = await Project.findAll({
      where: { isActive: true },
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['name', 'code']
        },
        {
          model: User,
          as: 'manager',
          attributes: ['firstName', 'lastName']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit)
    });

    // Get recent tasks
    const recentTasks = await Task.findAll({
      where: { isActive: true },
      include: [
        {
          model: Project,
          as: 'project',
          attributes: ['name', 'code']
        },
        {
          model: User,
          as: 'assignedUser',
          attributes: ['firstName', 'lastName']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit)
    });

    // Get recent assets
    const recentAssets = await Asset.findAll({
      where: { isActive: true },
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['name', 'code']
        },
        {
          model: User,
          as: 'assignedUser',
          attributes: ['firstName', 'lastName']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit)
    });

    // Combine and sort activities
    const activities = [
      ...recentProjects.map(project => ({
        type: 'project',
        id: project.id,
        title: project.name,
        description: `Project ${project.status}`,
        department: project.department?.name,
        user: project.manager?.firstName + ' ' + project.manager?.lastName,
        date: project.createdAt,
        status: project.status,
        priority: project.priority
      })),
      ...recentTasks.map(task => ({
        type: 'task',
        id: task.id,
        title: task.title,
        description: `Task ${task.status}`,
        department: task.project?.name,
        user: task.assignedUser?.firstName + ' ' + task.assignedUser?.lastName,
        date: task.createdAt,
        status: task.status,
        priority: task.priority
      })),
      ...recentAssets.map(asset => ({
        type: 'asset',
        id: asset.id,
        title: asset.name,
        description: `${asset.category} asset ${asset.status}`,
        department: asset.department?.name,
        user: asset.assignedUser?.firstName + ' ' + asset.assignedUser?.lastName,
        date: asset.createdAt,
        status: asset.status,
        condition: asset.condition
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, parseInt(limit));

    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent activities',
      error: error.message
    });
  }
};

// Get department performance analytics
export const getDepartmentAnalytics = async (req, res) => {
  try {
    const departments = await Department.findAll({
      where: { isActive: true },
      include: [
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
          attributes: ['id', 'status', 'progress', 'budget', 'actualCost'],
          where: { isActive: true },
          required: false
        },
        {
          model: Asset,
          as: 'assets',
          attributes: ['id', 'status', 'condition', 'currentValue'],
          where: { isActive: true },
          required: false
        }
      ]
    });

    const analytics = departments.map(dept => {
      const employeeCount = dept.users.length;
      const projectCount = dept.projects.length;
      const activeProjects = dept.projects.filter(p => p.status === 'active').length;
      const completedProjects = dept.projects.filter(p => p.status === 'completed').length;
      const assetCount = dept.assets.length;
      const availableAssets = dept.assets.filter(a => a.status === 'available').length;
      
      const totalBudget = dept.projects.reduce((sum, p) => sum + parseFloat(p.budget || 0), 0);
      const totalCost = dept.projects.reduce((sum, p) => sum + parseFloat(p.actualCost || 0), 0);
      const totalAssetValue = dept.assets.reduce((sum, a) => sum + parseFloat(a.currentValue || 0), 0);
      
      const averageProgress = projectCount > 0 
        ? dept.projects.reduce((sum, p) => sum + p.progress, 0) / projectCount 
        : 0;

      return {
        id: dept.id,
        name: dept.name,
        code: dept.code,
        color: dept.color,
        employeeCount,
        projectCount,
        activeProjects,
        completedProjects,
        assetCount,
        availableAssets,
        totalBudget,
        totalCost,
        totalAssetValue,
        averageProgress,
        budgetUtilization: totalBudget > 0 ? (totalCost / totalBudget) * 100 : 0,
        assetUtilization: assetCount > 0 ? ((assetCount - availableAssets) / assetCount) * 100 : 0
      };
    });

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Error fetching department analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch department analytics',
      error: error.message
    });
  }
};

// Get project performance analytics
export const getProjectAnalytics = async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    let dateFilter = {};
    if (period === 'week') {
      dateFilter = {
        [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      };
    } else if (period === 'month') {
      dateFilter = {
        [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      };
    } else if (period === 'quarter') {
      dateFilter = {
        [Op.gte]: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
      };
    }

    const projects = await Project.findAll({
      where: {
        isActive: true,
        createdAt: dateFilter
      },
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['name', 'code']
        },
        {
          model: User,
          as: 'manager',
          attributes: ['firstName', 'lastName']
        },
        {
          model: Task,
          as: 'tasks',
          attributes: ['id', 'status', 'progress'],
          where: { isActive: true },
          required: false
        }
      ]
    });

    const analytics = projects.map(project => {
      const totalTasks = project.tasks.length;
      const completedTasks = project.tasks.filter(t => t.status === 'completed').length;
      const overdueTasks = project.tasks.filter(t => t.isOverdue()).length;
      
      const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
      const budgetUtilization = project.budget > 0 ? (project.actualCost / project.budget) * 100 : 0;

      return {
        id: project.id,
        name: project.name,
        code: project.code,
        status: project.status,
        priority: project.priority,
        department: project.department?.name,
        manager: project.manager?.firstName + ' ' + project.manager?.lastName,
        progress: project.progress,
        budget: project.budget,
        actualCost: project.actualCost,
        totalTasks,
        completedTasks,
        overdueTasks,
        taskCompletionRate,
        budgetUtilization,
        startDate: project.startDate,
        endDate: project.endDate,
        isOverdue: project.isOverdue()
      };
    });

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Error fetching project analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project analytics',
      error: error.message
    });
  }
};

// Get asset analytics
export const getAssetAnalytics = async (req, res) => {
  try {
    const assets = await Asset.findAll({
      where: { isActive: true },
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['name', 'code']
        },
        {
          model: User,
          as: 'assignedUser',
          attributes: ['firstName', 'lastName']
        }
      ]
    });

    const analytics = assets.map(asset => {
      const age = asset.getAge();
      const depreciation = asset.getDepreciation();
      const warrantyValid = asset.isWarrantyValid();
      const maintenanceDue = asset.isMaintenanceDue();
      const daysUntilMaintenance = asset.getDaysUntilMaintenance();

      return {
        id: asset.id,
        name: asset.name,
        code: asset.code,
        category: asset.category,
        status: asset.status,
        condition: asset.condition,
        department: asset.department?.name,
        assignedTo: asset.assignedUser?.firstName + ' ' + asset.assignedUser?.lastName,
        purchasePrice: asset.purchasePrice,
        currentValue: asset.currentValue,
        age,
        depreciation,
        warrantyValid,
        maintenanceDue,
        daysUntilMaintenance,
        location: asset.location,
        purchaseDate: asset.purchaseDate,
        lastMaintenance: asset.lastMaintenance,
        nextMaintenance: asset.nextMaintenance
      };
    });

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Error fetching asset analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch asset analytics',
      error: error.message
    });
  }
}; 