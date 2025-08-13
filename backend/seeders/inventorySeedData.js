import { InventoryItem, InventoryTransaction, Warehouse } from '../models/associations.js';

// Sample warehouse data
const warehouseData = [
  {
    warehouseCode: 'WH-202501-001',
    name: 'Main Security Warehouse',
    description: 'Primary warehouse for security equipment and supplies',
    address: '123 Security Street, Kigali',
    city: 'Kigali',
    state: 'Kigali',
    country: 'Rwanda',
    postalCode: '25000',
    phone: '+250788123456',
    email: 'warehouse@dicel.co.rw',
    manager: 'John Warehouse',
    capacity: 5000,
    usedCapacity: 3200,
    temperature: 22.5,
    humidity: 45.0,
    securityLevel: 'high',
    status: 'active',
    operatingHours: {
      monday: '08:00-18:00',
      tuesday: '08:00-18:00',
      wednesday: '08:00-18:00',
      thursday: '08:00-18:00',
      friday: '08:00-18:00',
      saturday: '09:00-15:00',
      sunday: 'closed'
    },
    notes: 'Main warehouse for all security equipment',
    createdBy: '550e8400-e29b-41d4-a716-446655440001'
  },
  {
    warehouseCode: 'WH-202501-002',
    name: 'Equipment Storage Facility',
    description: 'Secondary storage for specialized equipment',
    address: '456 Equipment Road, Kigali',
    city: 'Kigali',
    state: 'Kigali',
    country: 'Rwanda',
    postalCode: '25001',
    phone: '+250788123457',
    email: 'equipment@dicel.co.rw',
    manager: 'Sarah Equipment',
    capacity: 3000,
    usedCapacity: 1800,
    temperature: 20.0,
    humidity: 40.0,
    securityLevel: 'maximum',
    status: 'active',
    operatingHours: {
      monday: '07:00-19:00',
      tuesday: '07:00-19:00',
      wednesday: '07:00-19:00',
      thursday: '07:00-19:00',
      friday: '07:00-19:00',
      saturday: '08:00-16:00',
      sunday: 'closed'
    },
    notes: 'High-security facility for sensitive equipment',
    createdBy: '550e8400-e29b-41d4-a716-446655440001'
  }
];

// Sample inventory items data
const inventoryItemData = [
  {
    itemCode: 'INV-202501-0001',
    name: 'Security Camera - HD Dome',
    description: 'High-definition dome security camera with night vision',
    category: 'Surveillance Equipment',
    subcategory: 'Cameras',
    unit: 'piece',
    currentStock: 45,
    minimumStock: 10,
    maximumStock: 100,
    unitCost: 85000.00,
    totalValue: 3825000.00,
    location: 'A1-01',
    warehouse: 'Main Security Warehouse',
    shelf: 'A1',
    supplier: 'TechVision Ltd',
    supplierCode: 'SUP001',
    reorderPoint: 15,
    reorderQuantity: 25,
    leadTime: 7,
    status: 'active',
    condition: 'new',
    barcode: '1234567890123',
    specifications: {
      resolution: '1080p',
      nightVision: true,
      weatherproof: true,
      powerSupply: '12V DC',
      storage: '128GB'
    },
    notes: 'High-quality dome cameras for indoor/outdoor use',
    createdBy: '550e8400-e29b-41d4-a716-446655440001'
  },
  {
    itemCode: 'INV-202501-0002',
    name: 'Security Uniform - Guard',
    description: 'Professional security guard uniform with patches',
    category: 'Uniforms & Equipment',
    subcategory: 'Clothing',
    unit: 'set',
    currentStock: 120,
    minimumStock: 20,
    maximumStock: 200,
    unitCost: 25000.00,
    totalValue: 3000000.00,
    location: 'B2-03',
    warehouse: 'Main Security Warehouse',
    shelf: 'B2',
    supplier: 'UniformPro Ltd',
    supplierCode: 'SUP002',
    reorderPoint: 30,
    reorderQuantity: 50,
    leadTime: 5,
    status: 'active',
    condition: 'new',
    barcode: '1234567890124',
    specifications: {
      material: 'Polyester',
      sizes: ['S', 'M', 'L', 'XL'],
      color: 'Navy Blue',
      includes: ['Shirt', 'Pants', 'Cap', 'Belt']
    },
    notes: 'Standard security guard uniforms',
    createdBy: '550e8400-e29b-41d4-a716-446655440001'
  },
  {
    itemCode: 'INV-202501-0003',
    name: 'Walkie Talkie - Professional',
    description: 'Professional two-way radio for security communications',
    category: 'Communication Equipment',
    subcategory: 'Radios',
    unit: 'piece',
    currentStock: 35,
    minimumStock: 8,
    maximumStock: 80,
    unitCost: 45000.00,
    totalValue: 1575000.00,
    location: 'C3-02',
    warehouse: 'Equipment Storage Facility',
    shelf: 'C3',
    supplier: 'CommTech Solutions',
    supplierCode: 'SUP003',
    reorderPoint: 12,
    reorderQuantity: 20,
    leadTime: 10,
    status: 'active',
    condition: 'new',
    barcode: '1234567890125',
    specifications: {
      range: '5km',
      channels: 16,
      batteryLife: '12 hours',
      waterproof: true,
      frequency: 'UHF'
    },
    notes: 'Professional communication equipment for security teams',
    createdBy: '550e8400-e29b-41d4-a716-446655440001'
  },
  {
    itemCode: 'INV-202501-0004',
    name: 'Flashlight - Tactical LED',
    description: 'High-powered tactical LED flashlight for security use',
    category: 'Security Equipment',
    subcategory: 'Lighting',
    unit: 'piece',
    currentStock: 85,
    minimumStock: 15,
    maximumStock: 150,
    unitCost: 15000.00,
    totalValue: 1275000.00,
    location: 'D4-01',
    warehouse: 'Main Security Warehouse',
    shelf: 'D4',
    supplier: 'LightPro Ltd',
    supplierCode: 'SUP004',
    reorderPoint: 20,
    reorderQuantity: 30,
    leadTime: 3,
    status: 'active',
    condition: 'new',
    barcode: '1234567890126',
    specifications: {
      brightness: '1000 lumens',
      batteryType: 'Rechargeable',
      runtime: '4 hours',
      waterproof: true,
      material: 'Aluminum'
    },
    notes: 'Tactical flashlights for security personnel',
    createdBy: '550e8400-e29b-41d4-a716-446655440001'
  },
  {
    itemCode: 'INV-202501-0005',
    name: 'First Aid Kit - Security',
    description: 'Comprehensive first aid kit for security operations',
    category: 'Safety Equipment',
    subcategory: 'Medical',
    unit: 'kit',
    currentStock: 25,
    minimumStock: 5,
    maximumStock: 50,
    unitCost: 35000.00,
    totalValue: 875000.00,
    location: 'E5-02',
    warehouse: 'Main Security Warehouse',
    shelf: 'E5',
    supplier: 'SafetyFirst Ltd',
    supplierCode: 'SUP005',
    reorderPoint: 8,
    reorderQuantity: 15,
    leadTime: 4,
    status: 'active',
    condition: 'new',
    barcode: '1234567890127',
    specifications: {
      contents: 'Bandages, Antiseptics, Pain Relievers',
      size: 'Medium',
      waterproof: true,
      expiryDate: '2026-12-31'
    },
    notes: 'First aid kits for security teams',
    createdBy: '550e8400-e29b-41d4-a716-446655440001'
  },
  {
    itemCode: 'INV-202501-0006',
    name: 'Access Control Card',
    description: 'RFID access control cards for security systems',
    category: 'Access Control',
    subcategory: 'Cards',
    unit: 'piece',
    currentStock: 500,
    minimumStock: 100,
    maximumStock: 1000,
    unitCost: 2500.00,
    totalValue: 1250000.00,
    location: 'F6-01',
    warehouse: 'Equipment Storage Facility',
    shelf: 'F6',
    supplier: 'CardTech Ltd',
    supplierCode: 'SUP006',
    reorderPoint: 150,
    reorderQuantity: 200,
    leadTime: 2,
    status: 'active',
    condition: 'new',
    barcode: '1234567890128',
    specifications: {
      type: 'RFID',
      frequency: '13.56 MHz',
      memory: '1KB',
      material: 'PVC'
    },
    notes: 'Access control cards for security systems',
    createdBy: '550e8400-e29b-41d4-a716-446655440001'
  },
  {
    itemCode: 'INV-202501-0007',
    name: 'Security Badge Holder',
    description: 'Professional badge holders for security identification',
    category: 'Access Control',
    subcategory: 'Badges',
    unit: 'piece',
    currentStock: 200,
    minimumStock: 50,
    maximumStock: 400,
    unitCost: 3000.00,
    totalValue: 600000.00,
    location: 'G7-03',
    warehouse: 'Main Security Warehouse',
    shelf: 'G7',
    supplier: 'BadgePro Ltd',
    supplierCode: 'SUP007',
    reorderPoint: 75,
    reorderQuantity: 100,
    leadTime: 3,
    status: 'active',
    condition: 'new',
    barcode: '1234567890129',
    specifications: {
      material: 'PVC',
      size: 'Standard',
      color: 'Clear',
      includes: 'Lanyard'
    },
    notes: 'Professional badge holders for security personnel',
    createdBy: '550e8400-e29b-41d4-a716-446655440001'
  },
  {
    itemCode: 'INV-202501-0008',
    name: 'Security Boots - Steel Toe',
    description: 'Steel toe security boots for safety and protection',
    category: 'Uniforms & Equipment',
    subcategory: 'Footwear',
    unit: 'pair',
    currentStock: 60,
    minimumStock: 10,
    maximumStock: 120,
    unitCost: 55000.00,
    totalValue: 3300000.00,
    location: 'H8-02',
    warehouse: 'Main Security Warehouse',
    shelf: 'H8',
    supplier: 'BootPro Ltd',
    supplierCode: 'SUP008',
    reorderPoint: 15,
    reorderQuantity: 25,
    leadTime: 7,
    status: 'active',
    condition: 'new',
    barcode: '1234567890130',
    specifications: {
      material: 'Leather',
      sole: 'Rubber',
      steelToe: true,
      waterproof: true,
      sizes: ['7', '8', '9', '10', '11', '12']
    },
    notes: 'Safety boots for security personnel',
    createdBy: '550e8400-e29b-41d4-a716-446655440001'
  }
];

// Sample inventory transactions data
const inventoryTransactionData = [
  {
    transactionNumber: 'ITXN-202501-0001',
    itemId: null, // Will be set after items are created
    type: 'in',
    quantity: 50,
    unitCost: 85000.00,
    totalCost: 4250000.00,
    reference: 'PO-2025-001',
    referenceType: 'purchase_order',
    fromLocation: 'Supplier',
    toLocation: 'Main Security Warehouse',
    reason: 'Initial stock purchase',
    notes: 'Initial stock of security cameras',
    transactionDate: '2025-01-15T00:00:00.000Z',
    status: 'completed',
    createdBy: '550e8400-e29b-41d4-a716-446655440001'
  },
  {
    transactionNumber: 'ITXN-202501-0002',
    itemId: null, // Will be set after items are created
    type: 'in',
    quantity: 150,
    unitCost: 25000.00,
    totalCost: 3750000.00,
    reference: 'PO-2025-002',
    referenceType: 'purchase_order',
    fromLocation: 'Supplier',
    toLocation: 'Main Security Warehouse',
    reason: 'Uniform stock purchase',
    notes: 'Security guard uniforms',
    transactionDate: '2025-01-16T00:00:00.000Z',
    status: 'completed',
    createdBy: '550e8400-e29b-41d4-a716-446655440001'
  },
  {
    transactionNumber: 'ITXN-202501-0003',
    itemId: null, // Will be set after items are created
    type: 'out',
    quantity: 5,
    unitCost: 85000.00,
    totalCost: 425000.00,
    reference: 'SO-2025-001',
    referenceType: 'sales_order',
    fromLocation: 'Main Security Warehouse',
    toLocation: 'Client Site',
    reason: 'Client installation',
    notes: 'Security camera installation for ABC Corp',
    transactionDate: '2025-01-20T00:00:00.000Z',
    status: 'completed',
    createdBy: '550e8400-e29b-41d4-a716-446655440001'
  },
  {
    transactionNumber: 'ITXN-202501-0004',
    itemId: null, // Will be set after items are created
    type: 'out',
    quantity: 30,
    unitCost: 25000.00,
    totalCost: 750000.00,
    reference: 'ISSUE-2025-001',
    referenceType: 'other',
    fromLocation: 'Main Security Warehouse',
    toLocation: 'Security Team',
    reason: 'Team equipment issue',
    notes: 'Uniforms issued to new security guards',
    transactionDate: '2025-01-22T00:00:00.000Z',
    status: 'completed',
    createdBy: '550e8400-e29b-41d4-a716-446655440001'
  }
];

export const seedInventoryData = async () => {
  try {
    console.log('🌱 Seeding Inventory data...');

    // Create warehouses
    console.log('📦 Creating warehouses...');
    const warehouses = await Warehouse.bulkCreate(warehouseData, {
      ignoreDuplicates: true
    });
    console.log(`✅ Created ${warehouses.length} warehouses`);

    // Create inventory items
    console.log('📋 Creating inventory items...');
    const items = await InventoryItem.bulkCreate(inventoryItemData, {
      ignoreDuplicates: true
    });
    console.log(`✅ Created ${items.length} inventory items`);

    // Create inventory transactions with proper item IDs
    console.log('📊 Creating inventory transactions...');
    const transactionsWithItemIds = inventoryTransactionData.map((transaction, index) => ({
      ...transaction,
      itemId: items[index % items.length].id // Cycle through items
    }));

    const transactions = await InventoryTransaction.bulkCreate(transactionsWithItemIds, {
      ignoreDuplicates: true
    });
    console.log(`✅ Created ${transactions.length} inventory transactions`);

    console.log('🎉 Inventory seeding completed successfully!');
    return { warehouses, items, transactions };
  } catch (error) {
    console.error('❌ Error seeding inventory data:', error);
    throw error;
  }
}; 