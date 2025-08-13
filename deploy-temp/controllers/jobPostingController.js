import { JobPosting, Candidate } from '../models/associations.js';
import { Op } from 'sequelize';
import { sequelize } from '../config/database.js';

// Get all job postings with filtering and pagination
export const getAllJobPostings = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      status = 'all',
      department = 'all'
    } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { department: { [Op.iLike]: `%${search}%` } },
        { location: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (status !== 'all') {
      whereClause.status = status;
    }

    if (department !== 'all') {
      whereClause.department = department;
    }

    const jobPostings = await JobPosting.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Candidate,
          as: 'jobCandidates',
          attributes: ['id', 'name', 'status', 'appliedDate'],
          where: { isActive: true },
          required: false
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['postedDate', 'DESC']]
    });

    res.json({
      jobPostings: jobPostings.rows,
      total: jobPostings.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(jobPostings.count / limit)
    });
  } catch (error) {
    console.error('Error fetching job postings:', error);
    res.status(500).json({ error: 'Failed to fetch job postings' });
  }
};

// Get job posting by ID
export const getJobPostingById = async (req, res) => {
  try {
    const { id } = req.params;

    const jobPosting = await JobPosting.findOne({
      where: { id, isActive: true },
      include: [
        {
          model: Candidate,
          as: 'jobCandidates',
          where: { isActive: true },
          required: false
        }
      ]
    });

    if (!jobPosting) {
      return res.status(404).json({ error: 'Job posting not found' });
    }

    res.json(jobPosting);
  } catch (error) {
    console.error('Error fetching job posting:', error);
    res.status(500).json({ error: 'Failed to fetch job posting' });
  }
};

// Create new job posting
export const createJobPosting = async (req, res) => {
  try {
    const jobPostingData = req.body;

    const jobPosting = await JobPosting.create(jobPostingData);

    res.status(201).json({
      message: 'Job posting created successfully',
      jobPosting
    });
  } catch (error) {
    console.error('Error creating job posting:', error);
    res.status(500).json({ error: 'Failed to create job posting' });
  }
};

// Update job posting
export const updateJobPosting = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const jobPosting = await JobPosting.findOne({
      where: { id, isActive: true }
    });

    if (!jobPosting) {
      return res.status(404).json({ error: 'Job posting not found' });
    }

    await jobPosting.update(updateData);

    res.json({
      message: 'Job posting updated successfully',
      jobPosting
    });
  } catch (error) {
    console.error('Error updating job posting:', error);
    res.status(500).json({ error: 'Failed to update job posting' });
  }
};

// Delete job posting (soft delete)
export const deleteJobPosting = async (req, res) => {
  try {
    const { id } = req.params;

    const jobPosting = await JobPosting.findOne({
      where: { id, isActive: true }
    });

    if (!jobPosting) {
      return res.status(404).json({ error: 'Job posting not found' });
    }

    await jobPosting.update({ isActive: false });

    res.json({ message: 'Job posting deleted successfully' });
  } catch (error) {
    console.error('Error deleting job posting:', error);
    res.status(500).json({ error: 'Failed to delete job posting' });
  }
};

// Get job posting statistics
export const getJobPostingStats = async (req, res) => {
  try {
    const totalJobPostings = await JobPosting.count({ where: { isActive: true } });
    const activeJobPostings = await JobPosting.count({ where: { status: 'Active', isActive: true } });
    const closedJobPostings = await JobPosting.count({ where: { status: 'Closed', isActive: true } });
    const totalApplications = await Candidate.count({ where: { isActive: true } });

    const departmentStats = await JobPosting.findAll({
      attributes: [
        'department',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { isActive: true },
      group: ['department']
    });

    const recentJobPostings = await JobPosting.findAll({
      where: { isActive: true },
      order: [['postedDate', 'DESC']],
      limit: 5
    });

    res.json({
      totalJobPostings,
      activeJobPostings,
      closedJobPostings,
      totalApplications,
      departmentStats,
      recentJobPostings
    });
  } catch (error) {
    console.error('Error fetching job posting stats:', error);
    res.status(500).json({ error: 'Failed to fetch job posting statistics' });
  }
}; 