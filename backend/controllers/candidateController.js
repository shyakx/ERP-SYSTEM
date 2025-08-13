import { Candidate, JobPosting } from '../models/associations.js';
import { Op } from 'sequelize';
import { sequelize } from '../config/database.js';

// Get all candidates with filtering and pagination
export const getAllCandidates = async (req, res) => {
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
        { name: { [Op.iLike]: `%${search}%` } },
        { position: { [Op.iLike]: `%${search}%` } },
        { department: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (status !== 'all') {
      whereClause.status = status;
    }

    if (department !== 'all') {
      whereClause.department = department;
    }

    const candidates = await Candidate.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: JobPosting,
          as: 'jobPosting',
          attributes: ['title', 'department', 'location', 'salary']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['appliedDate', 'DESC']]
    });

    res.json({
      candidates: candidates.rows,
      total: candidates.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(candidates.count / limit)
    });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
};

// Get candidate by ID
export const getCandidateById = async (req, res) => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findOne({
      where: { id, isActive: true },
      include: [
        {
          model: JobPosting,
          as: 'jobPosting',
          attributes: ['title', 'department', 'location', 'salary', 'description']
        }
      ]
    });

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.json(candidate);
  } catch (error) {
    console.error('Error fetching candidate:', error);
    res.status(500).json({ error: 'Failed to fetch candidate' });
  }
};

// Create new candidate
export const createCandidate = async (req, res) => {
  try {
    const candidateData = req.body;

    const candidate = await Candidate.create(candidateData);

    res.status(201).json({
      message: 'Candidate created successfully',
      candidate
    });
  } catch (error) {
    console.error('Error creating candidate:', error);
    res.status(500).json({ error: 'Failed to create candidate' });
  }
};

// Update candidate
export const updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const candidate = await Candidate.findOne({
      where: { id, isActive: true }
    });

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    await candidate.update(updateData);

    res.json({
      message: 'Candidate updated successfully',
      candidate
    });
  } catch (error) {
    console.error('Error updating candidate:', error);
    res.status(500).json({ error: 'Failed to update candidate' });
  }
};

// Delete candidate (soft delete)
export const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findOne({
      where: { id, isActive: true }
    });

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    await candidate.update({ isActive: false });

    res.json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    console.error('Error deleting candidate:', error);
    res.status(500).json({ error: 'Failed to delete candidate' });
  }
};

// Update candidate status
export const updateCandidateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, interviewDate, interviewNotes } = req.body;

    const candidate = await Candidate.findOne({
      where: { id, isActive: true }
    });

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    const updateData = { status };
    if (interviewDate) updateData.interviewDate = interviewDate;
    if (interviewNotes) updateData.interviewNotes = interviewNotes;

    await candidate.update(updateData);

    res.json({
      message: 'Candidate status updated successfully',
      candidate
    });
  } catch (error) {
    console.error('Error updating candidate status:', error);
    res.status(500).json({ error: 'Failed to update candidate status' });
  }
};

// Get candidate statistics
export const getCandidateStats = async (req, res) => {
  try {
    const totalCandidates = await Candidate.count({ where: { isActive: true } });
    const appliedCandidates = await Candidate.count({ where: { status: 'Applied', isActive: true } });
    const shortlistedCandidates = await Candidate.count({ where: { status: 'Shortlisted', isActive: true } });
    const interviewedCandidates = await Candidate.count({ where: { status: 'Interviewed', isActive: true } });
    const hiredCandidates = await Candidate.count({ where: { status: 'Hired', isActive: true } });
    const rejectedCandidates = await Candidate.count({ where: { status: 'Rejected', isActive: true } });

    const statusStats = await Candidate.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { isActive: true },
      group: ['status']
    });

    const departmentStats = await Candidate.findAll({
      attributes: [
        'department',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { isActive: true },
      group: ['department']
    });

    res.json({
      totalCandidates,
      appliedCandidates,
      shortlistedCandidates,
      interviewedCandidates,
      hiredCandidates,
      rejectedCandidates,
      statusStats,
      departmentStats
    });
  } catch (error) {
    console.error('Error fetching candidate stats:', error);
    res.status(500).json({ error: 'Failed to fetch candidate statistics' });
  }
}; 