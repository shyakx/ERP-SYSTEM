const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

// Import models
const InventoryItem = require('../models/InventoryItem');
const InventoryTransaction = require('../models/InventoryTransaction');
const Supplier = require('../models/Supplier');
const PurchaseOrder = require('../models/PurchaseOrder');
const Warehouse = require('../models/Warehouse');

// Import middleware
const { authenticateToken, requireRole } = require('../middlewares/auth');

// ==================== INVENTORY ITEMS ====================

// Get all inventory items
router.get('/inventory-items', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, category, status, low_stock } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    
    if (search) {
      whereClause = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { sku: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } }
        ]
      };
    }

    if (category) whereClause.category = category;
    if (status) whereClause.status = status;
    if (low_stock === 'true') {
      whereClause.current_stock = { [Op.lte]: whereClause.min_stock_level || 0 };
    }

    const { count, rows: items } = await InventoryItem.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Supplier,
          as: 'supplier',
          attributes: ['id', 'name', 'contact_person', 'phone']
        },
        {
          model: Warehouse,
          as: 'warehouse',
          attributes: ['id', 'name', 'location']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: {
        items,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get inventory items error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get inventory item by ID
router.get('/inventory-items/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const item = await InventoryItem.findByPk(id, {
      include: [
        {
          model: Supplier,
          as: 'supplier',
          attributes: ['id', 'name', 'contact_person', 'phone', 'email']
        },
        {
          model: Warehouse,
          as: 'warehouse',
          attributes: ['id', 'name', 'location']
        },
        {
          model: InventoryTransaction,
          as: 'transactions',
          limit: 10,
          order: [['transaction_date', 'DESC']]
        }
      ]
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    res.json({
      success: true,
      data: item
    });

  } catch (error) {
    console.error('Get inventory item error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create inventory item
router.post('/inventory-items', authenticateToken, requireRole(['admin', 'operations']), async (req, res) => {
  try {
    const {
      name,
      sku,
      description,
      category,
      unit_price,
      current_stock,
      min_stock_level,
      max_stock_level,
      supplier_id,
      warehouse_id,
      unit_of_measure,
      barcode,
      weight,
      dimensions
    } = req.body;

    if (!name || !sku || !category || !unit_price) {
      return res.status(400).json({
        success: false,
        message: 'Name, SKU, category, and unit price are required'
      });
    }

    // Check if SKU already exists
    const existingItem = await InventoryItem.findOne({ where: { sku } });
    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: 'SKU already exists'
      });
    }

    const item = await InventoryItem.create({
      name,
      sku,
      description,
      category,
      unit_price: parseFloat(unit_price),
      current_stock: parseInt(current_stock) || 0,
      min_stock_level: parseInt(min_stock_level) || 0,
      max_stock_level: parseInt(max_stock_level) || 0,
      supplier_id,
      warehouse_id,
      unit_of_measure,
      barcode,
      weight,
      dimensions,
      status: 'active',
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Inventory item created successfully',
      data: item
    });

  } catch (error) {
    console.error('Create inventory item error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update inventory item
router.put('/inventory-items/:id', authenticateToken, requireRole(['admin', 'operations']), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const item = await InventoryItem.findByPk(id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    await item.update(updateData);

    res.json({
      success: true,
      message: 'Inventory item updated successfully',
      data: item
    });

  } catch (error) {
    console.error('Update inventory item error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== INVENTORY TRANSACTIONS ====================

// Get inventory transactions
router.get('/inventory-transactions', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, item_id, type, date_from, date_to } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (item_id) whereClause.item_id = item_id;
    if (type) whereClause.transaction_type = type;
    
    if (date_from && date_to) {
      whereClause.transaction_date = {
        [Op.between]: [date_from, date_to]
      };
    }

    const { count, rows: transactions } = await InventoryTransaction.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: InventoryItem,
          as: 'item',
          attributes: ['id', 'name', 'sku']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['transaction_date', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        items: transactions,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get inventory transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create inventory transaction
router.post('/inventory-transactions', authenticateToken, requireRole(['admin', 'operations']), async (req, res) => {
  try {
    const {
      item_id,
      transaction_type,
      quantity,
      unit_price,
      transaction_date,
      reference_number,
      notes,
      supplier_id
    } = req.body;

    if (!item_id || !transaction_type || !quantity || !transaction_date) {
      return res.status(400).json({
        success: false,
        message: 'Item ID, transaction type, quantity, and date are required'
      });
    }

    const item = await InventoryItem.findByPk(item_id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Inventory item not found'
      });
    }

    const transactionQuantity = parseInt(quantity);
    let newStock = item.current_stock;

    // Update stock based on transaction type
    if (transaction_type === 'in') {
      newStock += transactionQuantity;
    } else if (transaction_type === 'out') {
      if (newStock < transactionQuantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock available'
        });
      }
      newStock -= transactionQuantity;
    } else if (transaction_type === 'adjustment') {
      newStock = transactionQuantity;
    }

    // Create transaction
    const transaction = await InventoryTransaction.create({
      item_id,
      transaction_type,
      quantity: transactionQuantity,
      unit_price: parseFloat(unit_price) || item.unit_price,
      transaction_date,
      reference_number,
      notes,
      supplier_id,
      created_by: req.user.id
    });

    // Update item stock
    await item.update({ current_stock: newStock });

    res.status(201).json({
      success: true,
      message: 'Inventory transaction created successfully',
      data: transaction
    });

  } catch (error) {
    console.error('Create inventory transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== SUPPLIERS ====================

// Get all suppliers
router.get('/suppliers', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    
    if (search) {
      whereClause = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { contact_person: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } }
        ]
      };
    }

    if (status) whereClause.status = status;

    const { count, rows: suppliers } = await Supplier.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: {
        items: suppliers,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get suppliers error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create supplier
router.post('/suppliers', authenticateToken, requireRole(['admin', 'operations']), async (req, res) => {
  try {
    const {
      name,
      contact_person,
      email,
      phone,
      address,
      city,
      country,
      payment_terms,
      tax_id,
      website,
      notes
    } = req.body;

    if (!name || !contact_person || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name, contact person, and email are required'
      });
    }

    const supplier = await Supplier.create({
      name,
      contact_person,
      email,
      phone,
      address,
      city,
      country,
      payment_terms,
      tax_id,
      website,
      notes,
      status: 'active',
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Supplier created successfully',
      data: supplier
    });

  } catch (error) {
    console.error('Create supplier error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== PURCHASE ORDERS ====================

// Get all purchase orders
router.get('/purchase-orders', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, supplier_id, date_from, date_to } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (status) whereClause.status = status;
    if (supplier_id) whereClause.supplier_id = supplier_id;
    
    if (date_from && date_to) {
      whereClause.order_date = {
        [Op.between]: [date_from, date_to]
      };
    }

    const { count, rows: purchaseOrders } = await PurchaseOrder.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Supplier,
          as: 'supplier',
          attributes: ['id', 'name', 'contact_person', 'phone']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['order_date', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        items: purchaseOrders,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get purchase orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create purchase order
router.post('/purchase-orders', authenticateToken, requireRole(['admin', 'operations']), async (req, res) => {
  try {
    const {
      supplier_id,
      order_number,
      order_date,
      expected_delivery_date,
      items,
      subtotal,
      tax_amount,
      total_amount,
      notes,
      terms
    } = req.body;

    if (!supplier_id || !order_number || !order_date || !items || !total_amount) {
      return res.status(400).json({
        success: false,
        message: 'Supplier, order number, date, items, and total amount are required'
      });
    }

    const purchaseOrder = await PurchaseOrder.create({
      supplier_id,
      order_number,
      order_date,
      expected_delivery_date,
      items: items || [],
      subtotal: parseFloat(subtotal) || 0,
      tax_amount: parseFloat(tax_amount) || 0,
      total_amount: parseFloat(total_amount),
      notes,
      terms,
      status: 'pending',
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Purchase order created successfully',
      data: purchaseOrder
    });

  } catch (error) {
    console.error('Create purchase order error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update purchase order status
router.put('/purchase-orders/:id/status', authenticateToken, requireRole(['admin', 'operations']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const purchaseOrder = await PurchaseOrder.findByPk(id);
    if (!purchaseOrder) {
      return res.status(404).json({
        success: false,
        message: 'Purchase order not found'
      });
    }

    await purchaseOrder.update({
      status,
      notes,
      updated_by: req.user.id
    });

    // If order is received, update inventory
    if (status === 'received' && purchaseOrder.items) {
      for (const item of purchaseOrder.items) {
        const inventoryItem = await InventoryItem.findByPk(item.item_id);
        if (inventoryItem) {
          const newStock = inventoryItem.current_stock + item.quantity;
          await inventoryItem.update({ current_stock: newStock });

          // Create inventory transaction
          await InventoryTransaction.create({
            item_id: item.item_id,
            transaction_type: 'in',
            quantity: item.quantity,
            unit_price: item.unit_price,
            transaction_date: new Date(),
            reference_number: purchaseOrder.order_number,
            notes: `Received from purchase order ${purchaseOrder.order_number}`,
            supplier_id: purchaseOrder.supplier_id,
            created_by: req.user.id
          });
        }
      }
    }

    res.json({
      success: true,
      message: 'Purchase order status updated successfully',
      data: purchaseOrder
    });

  } catch (error) {
    console.error('Update purchase order error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== WAREHOUSES ====================

// Get all warehouses
router.get('/warehouses', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (search) {
      whereClause = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { location: { [Op.iLike]: `%${search}%` } }
        ]
      };
    }

    const { count, rows: warehouses } = await Warehouse.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: {
        items: warehouses,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get warehouses error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create warehouse
router.post('/warehouses', authenticateToken, requireRole(['admin', 'operations']), async (req, res) => {
  try {
    const {
      name,
      location,
      address,
      city,
      country,
      capacity,
      manager_name,
      manager_phone,
      manager_email,
      description
    } = req.body;

    if (!name || !location) {
      return res.status(400).json({
        success: false,
        message: 'Name and location are required'
      });
    }

    const warehouse = await Warehouse.create({
      name,
      location,
      address,
      city,
      country,
      capacity: parseInt(capacity) || 0,
      manager_name,
      manager_phone,
      manager_email,
      description,
      status: 'active',
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Warehouse created successfully',
      data: warehouse
    });

  } catch (error) {
    console.error('Create warehouse error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== OPERATIONS STATISTICS ====================

// Get operations dashboard statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const totalItems = await InventoryItem.count();
    const lowStockItems = await InventoryItem.count({
      where: {
        current_stock: { [Op.lte]: InventoryItem.sequelize.col('min_stock_level') }
      }
    });
    const totalSuppliers = await Supplier.count();
    const activeSuppliers = await Supplier.count({ where: { status: 'active' } });
    const pendingPurchaseOrders = await PurchaseOrder.count({ where: { status: 'pending' } });
    const totalWarehouses = await Warehouse.count();

    // Calculate total inventory value
    const inventoryValue = await InventoryItem.sum('current_stock * unit_price');

    // Recent transactions
    const recentTransactions = await InventoryTransaction.findAll({
      limit: 10,
      order: [['transaction_date', 'DESC']],
      include: [
        {
          model: InventoryItem,
          as: 'item',
          attributes: ['name', 'sku']
        }
      ]
    });

    // Top categories by value
    const categoryValues = await InventoryItem.findAll({
      attributes: [
        'category',
        [InventoryItem.sequelize.fn('SUM', InventoryItem.sequelize.col('current_stock * unit_price')), 'total_value']
      ],
      group: ['category'],
      order: [[InventoryItem.sequelize.fn('SUM', InventoryItem.sequelize.col('current_stock * unit_price')), 'DESC']],
      limit: 5
    });

    // Low stock alerts
    const lowStockAlerts = await InventoryItem.findAll({
      where: {
        current_stock: { [Op.lte]: InventoryItem.sequelize.col('min_stock_level') }
      },
      attributes: ['id', 'name', 'sku', 'current_stock', 'min_stock_level'],
      limit: 10
    });

    res.json({
      success: true,
      data: {
        totalItems,
        lowStockItems,
        totalSuppliers,
        activeSuppliers,
        pendingPurchaseOrders,
        totalWarehouses,
        inventoryValue: inventoryValue || 0,
        recentTransactions,
        categoryValues,
        lowStockAlerts
      }
    });

  } catch (error) {
    console.error('Get operations stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
