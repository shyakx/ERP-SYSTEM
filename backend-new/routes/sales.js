const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

// Import models
const Lead = require('../models/Lead');
const Opportunity = require('../models/Opportunity');
const Quote = require('../models/Quote');
const Client = require('../models/Client');
const Contract = require('../models/Contract');
const MarketingCampaign = require('../models/MarketingCampaign');

// Import middleware
const { authenticateToken, requireRole } = require('../middlewares/auth');

// ==================== LEADS ====================

// Get all leads
router.get('/leads', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status, source, assigned_to } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    
    if (search) {
      whereClause = {
        [Op.or]: [
          { first_name: { [Op.iLike]: `%${search}%` } },
          { last_name: { [Op.iLike]: `%${search}%` } },
          { company: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } }
        ]
      };
    }

    if (status) whereClause.status = status;
    if (source) whereClause.source = source;
    if (assigned_to) whereClause.assigned_to = assigned_to;

    const { count, rows: leads } = await Lead.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        items: leads,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get lead by ID
router.get('/leads/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    res.json({
      success: true,
      data: lead
    });

  } catch (error) {
    console.error('Get lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create lead
router.post('/leads', authenticateToken, async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      company,
      email,
      phone,
      source,
      status,
      assigned_to,
      notes,
      budget,
      timeline,
      requirements
    } = req.body;

    if (!first_name || !last_name || !email) {
      return res.status(400).json({
        success: false,
        message: 'First name, last name, and email are required'
      });
    }

    const lead = await Lead.create({
      first_name,
      last_name,
      company,
      email,
      phone,
      source: source || 'website',
      status: status || 'new',
      assigned_to: assigned_to || req.user.id,
      notes,
      budget,
      timeline,
      requirements,
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: lead
    });

  } catch (error) {
    console.error('Create lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update lead
router.put('/leads/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    await lead.update(updateData);

    res.json({
      success: true,
      message: 'Lead updated successfully',
      data: lead
    });

  } catch (error) {
    console.error('Update lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Convert lead to opportunity
router.post('/leads/:id/convert', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { opportunity_name, estimated_value, expected_close_date, probability } = req.body;

    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    if (lead.status === 'converted') {
      return res.status(400).json({
        success: false,
        message: 'Lead has already been converted'
      });
    }

    // Create opportunity
    const opportunity = await Opportunity.create({
      name: opportunity_name || `${lead.first_name} ${lead.last_name} - ${lead.company}`,
      lead_id: lead.id,
      client_id: null, // Will be set when client is created
      estimated_value: parseFloat(estimated_value) || 0,
      expected_close_date: expected_close_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      probability: parseInt(probability) || 50,
      stage: 'prospecting',
      assigned_to: lead.assigned_to,
      notes: lead.notes,
      created_by: req.user.id
    });

    // Update lead status
    await lead.update({ status: 'converted' });

    res.status(201).json({
      success: true,
      message: 'Lead converted to opportunity successfully',
      data: {
        lead,
        opportunity
      }
    });

  } catch (error) {
    console.error('Convert lead error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== OPPORTUNITIES ====================

// Get all opportunities
router.get('/opportunities', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, stage, assigned_to, probability_min, probability_max } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    
    if (search) {
      whereClause = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { notes: { [Op.iLike]: `%${search}%` } }
        ]
      };
    }

    if (stage) whereClause.stage = stage;
    if (assigned_to) whereClause.assigned_to = assigned_to;
    
    if (probability_min || probability_max) {
      whereClause.probability = {};
      if (probability_min) whereClause.probability[Op.gte] = parseInt(probability_min);
      if (probability_max) whereClause.probability[Op.lte] = parseInt(probability_max);
    }

    const { count, rows: opportunities } = await Opportunity.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Lead,
          as: 'lead',
          attributes: ['id', 'first_name', 'last_name', 'company', 'email', 'phone']
        },
        {
          model: Client,
          as: 'client',
          attributes: ['id', 'name', 'email', 'phone']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['expected_close_date', 'ASC']]
    });

    res.json({
      success: true,
      data: {
        items: opportunities,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get opportunities error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get opportunity by ID
router.get('/opportunities/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const opportunity = await Opportunity.findByPk(id, {
      include: [
        {
          model: Lead,
          as: 'lead',
          attributes: ['id', 'first_name', 'last_name', 'company', 'email', 'phone', 'source']
        },
        {
          model: Client,
          as: 'client',
          attributes: ['id', 'name', 'email', 'phone', 'address']
        }
      ]
    });

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    res.json({
      success: true,
      data: opportunity
    });

  } catch (error) {
    console.error('Get opportunity error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create opportunity
router.post('/opportunities', authenticateToken, async (req, res) => {
  try {
    const {
      name,
      lead_id,
      client_id,
      estimated_value,
      expected_close_date,
      probability,
      stage,
      assigned_to,
      notes,
      requirements
    } = req.body;

    if (!name || !estimated_value || !expected_close_date) {
      return res.status(400).json({
        success: false,
        message: 'Name, estimated value, and expected close date are required'
      });
    }

    const opportunity = await Opportunity.create({
      name,
      lead_id,
      client_id,
      estimated_value: parseFloat(estimated_value),
      expected_close_date,
      probability: parseInt(probability) || 50,
      stage: stage || 'prospecting',
      assigned_to: assigned_to || req.user.id,
      notes,
      requirements,
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Opportunity created successfully',
      data: opportunity
    });

  } catch (error) {
    console.error('Create opportunity error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update opportunity
router.put('/opportunities/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const opportunity = await Opportunity.findByPk(id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    await opportunity.update(updateData);

    res.json({
      success: true,
      message: 'Opportunity updated successfully',
      data: opportunity
    });

  } catch (error) {
    console.error('Update opportunity error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update opportunity stage
router.put('/opportunities/:id/stage', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { stage, notes } = req.body;

    const opportunity = await Opportunity.findByPk(id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    await opportunity.update({
      stage,
      notes: notes || opportunity.notes,
      updated_by: req.user.id
    });

    res.json({
      success: true,
      message: 'Opportunity stage updated successfully',
      data: opportunity
    });

  } catch (error) {
    console.error('Update opportunity stage error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== QUOTES ====================

// Get all quotes
router.get('/quotes', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, opportunity_id, client_id } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (status) whereClause.status = status;
    if (opportunity_id) whereClause.opportunity_id = opportunity_id;
    if (client_id) whereClause.client_id = client_id;

    const { count, rows: quotes } = await Quote.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Opportunity,
          as: 'opportunity',
          attributes: ['id', 'name', 'estimated_value']
        },
        {
          model: Client,
          as: 'client',
          attributes: ['id', 'name', 'email']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        items: quotes,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get quotes error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create quote
router.post('/quotes', authenticateToken, async (req, res) => {
  try {
    const {
      opportunity_id,
      client_id,
      quote_number,
      quote_date,
      valid_until,
      items,
      subtotal,
      tax_amount,
      total_amount,
      terms,
      notes
    } = req.body;

    if (!opportunity_id || !client_id || !quote_number || !total_amount) {
      return res.status(400).json({
        success: false,
        message: 'Opportunity, client, quote number, and total amount are required'
      });
    }

    const quote = await Quote.create({
      opportunity_id,
      client_id,
      quote_number,
      quote_date: quote_date || new Date(),
      valid_until: valid_until || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      items: items || [],
      subtotal: parseFloat(subtotal) || 0,
      tax_amount: parseFloat(tax_amount) || 0,
      total_amount: parseFloat(total_amount),
      terms,
      notes,
      status: 'draft',
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Quote created successfully',
      data: quote
    });

  } catch (error) {
    console.error('Create quote error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update quote status
router.put('/quotes/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const quote = await Quote.findByPk(id);
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    await quote.update({
      status,
      notes: notes || quote.notes,
      updated_by: req.user.id
    });

    // If quote is accepted, update opportunity stage
    if (status === 'accepted') {
      const opportunity = await Opportunity.findByPk(quote.opportunity_id);
      if (opportunity) {
        await opportunity.update({ stage: 'negotiation' });
      }
    }

    res.json({
      success: true,
      message: 'Quote status updated successfully',
      data: quote
    });

  } catch (error) {
    console.error('Update quote status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== CLIENTS ====================

// Get all clients
router.get('/clients', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    
    if (search) {
      whereClause = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
          { company: { [Op.iLike]: `%${search}%` } }
        ]
      };
    }

    if (status) whereClause.status = status;

    const { count, rows: clients } = await Client.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: {
        items: clients,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create client
router.post('/clients', authenticateToken, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      address,
      city,
      country,
      industry,
      contact_person,
      notes
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    const client = await Client.create({
      name,
      email,
      phone,
      company,
      address,
      city,
      country,
      industry,
      contact_person,
      notes,
      status: 'active',
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      data: client
    });

  } catch (error) {
    console.error('Create client error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== MARKETING CAMPAIGNS ====================

// Get all marketing campaigns
router.get('/marketing-campaigns', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, type } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (status) whereClause.status = status;
    if (type) whereClause.type = type;

    const { count, rows: campaigns } = await MarketingCampaign.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        items: campaigns,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get marketing campaigns error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create marketing campaign
router.post('/marketing-campaigns', authenticateToken, requireRole(['admin', 'sales-marketing']), async (req, res) => {
  try {
    const {
      name,
      type,
      description,
      start_date,
      end_date,
      budget,
      target_audience,
      goals,
      channels,
      status
    } = req.body;

    if (!name || !type || !start_date || !end_date) {
      return res.status(400).json({
        success: false,
        message: 'Name, type, start date, and end date are required'
      });
    }

    const campaign = await MarketingCampaign.create({
      name,
      type,
      description,
      start_date,
      end_date,
      budget: parseFloat(budget) || 0,
      target_audience,
      goals,
      channels: channels || [],
      status: status || 'planned',
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Marketing campaign created successfully',
      data: campaign
    });

  } catch (error) {
    console.error('Create marketing campaign error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== SALES STATISTICS ====================

// Get sales dashboard statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const totalLeads = await Lead.count();
    const newLeads = await Lead.count({ where: { status: 'new' } });
    const qualifiedLeads = await Lead.count({ where: { status: 'qualified' } });
    const totalOpportunities = await Opportunity.count();
    const openOpportunities = await Opportunity.count({ where: { stage: { [Op.notIn]: ['closed_won', 'closed_lost'] } } });
    const totalClients = await Client.count();
    const activeClients = await Client.count({ where: { status: 'active' } });

    // Calculate pipeline value
    const pipelineValue = await Opportunity.sum('estimated_value', {
      where: { stage: { [Op.notIn]: ['closed_won', 'closed_lost'] } }
    });

    // Calculate won opportunities value
    const wonValue = await Opportunity.sum('estimated_value', {
      where: { stage: 'closed_won' }
    });

    // Recent leads
    const recentLeads = await Lead.findAll({
      limit: 5,
      order: [['created_at', 'DESC']],
      attributes: ['id', 'first_name', 'last_name', 'company', 'source', 'status', 'created_at']
    });

    // Recent opportunities
    const recentOpportunities = await Opportunity.findAll({
      limit: 5,
      order: [['created_at', 'DESC']],
      attributes: ['id', 'name', 'estimated_value', 'stage', 'probability', 'expected_close_date']
    });

    // Lead sources breakdown
    const leadSources = await Lead.findAll({
      attributes: [
        'source',
        [Lead.sequelize.fn('COUNT', Lead.sequelize.col('id')), 'count']
      ],
      group: ['source'],
      order: [[Lead.sequelize.fn('COUNT', Lead.sequelize.col('id')), 'DESC']]
    });

    // Opportunity stages breakdown
    const opportunityStages = await Opportunity.findAll({
      attributes: [
        'stage',
        [Opportunity.sequelize.fn('COUNT', Opportunity.sequelize.col('id')), 'count'],
        [Opportunity.sequelize.fn('SUM', Opportunity.sequelize.col('estimated_value')), 'total_value']
      ],
      group: ['stage'],
      order: [[Opportunity.sequelize.fn('COUNT', Opportunity.sequelize.col('id')), 'DESC']]
    });

    res.json({
      success: true,
      data: {
        totalLeads,
        newLeads,
        qualifiedLeads,
        totalOpportunities,
        openOpportunities,
        totalClients,
        activeClients,
        pipelineValue: pipelineValue || 0,
        wonValue: wonValue || 0,
        recentLeads,
        recentOpportunities,
        leadSources,
        opportunityStages
      }
    });

  } catch (error) {
    console.error('Get sales stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
