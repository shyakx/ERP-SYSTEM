import { PerformanceReview, Employee } from '../models/associations.js';
import { Op } from 'sequelize';
import { sequelize } from '../config/database.js';

// Get all performance reviews with filtering and pagination
export const getAllPerformanceReviews = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status = 'all',
      department = 'all',
      employeeId = null
    } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };

    if (status !== 'all') {
      whereClause.status = status;
    }

    if (department !== 'all') {
      whereClause.department = department;
    }

    if (employeeId) {
      whereClause.employeeId = employeeId;
    }

    const performanceReviews = await PerformanceReview.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Employee,
          as: 'reviewEmployee',
          attributes: ['employeeId', 'position', 'department', 'phone', 'email']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['reviewDate', 'DESC']]
    });

    res.json({
      performanceReviews: performanceReviews.rows,
      total: performanceReviews.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(performanceReviews.count / limit)
    });
  } catch (error) {
    console.error('Error fetching performance reviews:', error);
    res.status(500).json({ error: 'Failed to fetch performance reviews' });
  }
};

// Get performance review by ID
export const getPerformanceReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const performanceReview = await PerformanceReview.findOne({
      where: { id, isActive: true },
      include: [
        {
          model: Employee,
          as: 'reviewEmployee',
          attributes: ['employeeId', 'position', 'department', 'phone', 'email']
        }
      ]
    });

    if (!performanceReview) {
      return res.status(404).json({ error: 'Performance review not found' });
    }

    res.json(performanceReview);
  } catch (error) {
    console.error('Error fetching performance review:', error);
    res.status(500).json({ error: 'Failed to fetch performance review' });
  }
};

// Create new performance review
export const createPerformanceReview = async (req, res) => {
  try {
    const reviewData = req.body;

    const performanceReview = await PerformanceReview.create(reviewData);

    res.status(201).json({
      message: 'Performance review created successfully',
      performanceReview
    });
  } catch (error) {
    console.error('Error creating performance review:', error);
    res.status(500).json({ error: 'Failed to create performance review' });
  }
};

// Update performance review
export const updatePerformanceReview = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const performanceReview = await PerformanceReview.findOne({
      where: { id, isActive: true }
    });

    if (!performanceReview) {
      return res.status(404).json({ error: 'Performance review not found' });
    }

    await performanceReview.update(updateData);

    res.json({
      message: 'Performance review updated successfully',
      performanceReview
    });
  } catch (error) {
    console.error('Error updating performance review:', error);
    res.status(500).json({ error: 'Failed to update performance review' });
  }
};

// Delete performance review (soft delete)
export const deletePerformanceReview = async (req, res) => {
  try {
    const { id } = req.params;

    const performanceReview = await PerformanceReview.findOne({
      where: { id, isActive: true }
    });

    if (!performanceReview) {
      return res.status(404).json({ error: 'Performance review not found' });
    }

    await performanceReview.update({ isActive: false });

    res.json({ message: 'Performance review deleted successfully' });
  } catch (error) {
    console.error('Error deleting performance review:', error);
    res.status(500).json({ error: 'Failed to delete performance review' });
  }
};

// Get performance statistics
export const getPerformanceStats = async (req, res) => {
  try {
    const totalReviews = await PerformanceReview.count({ where: { isActive: true } });
    const completedReviews = await PerformanceReview.count({ where: { status: 'Completed', isActive: true } });
    const inProgressReviews = await PerformanceReview.count({ where: { status: 'In Progress', isActive: true } });
    const pendingReviews = await PerformanceReview.count({ where: { status: 'Pending', isActive: true } });

    const averageRating = await PerformanceReview.findOne({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']
      ],
      where: { isActive: true }
    });

    const departmentStats = await PerformanceReview.findAll({
      attributes: [
        'department',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating']
      ],
      where: { isActive: true },
      group: ['department']
    });

    res.json({
      totalReviews,
      completedReviews,
      inProgressReviews,
      pendingReviews,
      averageRating: averageRating?.dataValues?.averageRating || 0,
      departmentStats
    });
  } catch (error) {
    console.error('Error fetching performance stats:', error);
    res.status(500).json({ error: 'Failed to fetch performance statistics' });
  }
}; 