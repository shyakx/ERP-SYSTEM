import { sequelize } from './config/database.js';
import './models/associations.js';
import { Invoice, Bill, Customer, Vendor } from './models/associations.js';

// Sample data for invoices
const invoiceData = [
  {
    invoiceNumber: 'INV001',
    customerId: '463bbf3c-f93d-411b-a9e3-62b778dd018b', // ABC Corporation
    customerName: 'ABC Corporation',
    type: 'service',
    description: 'Security Services - Monthly Contract',
    subtotal: 500000,
    taxAmount: 90000,
    discountAmount: 0,
    totalAmount: 590000,
    currency: 'RWF',
    issueDate: '2024-08-01',
    dueDate: '2024-08-31',
    paymentTerms: 30,
    status: 'sent',
    paidAmount: 0,
    remainingAmount: 590000,
    paymentMethod: 'bank_transfer',
    referenceNumber: 'REF001',
    notes: 'Monthly security services invoice',
    createdBy: '550e8400-e29b-41d4-a716-446655440001', // Jean Pierre Uwimana
    isActive: true
  },
  {
    invoiceNumber: 'INV002',
    customerId: '463bbf3c-f93d-411b-a9e3-62b778dd018b', // ABC Corporation
    customerName: 'ABC Corporation',
    type: 'service',
    description: 'Consulting Services - Q3 2024',
    subtotal: 750000,
    taxAmount: 135000,
    discountAmount: 50000,
    totalAmount: 835000,
    currency: 'RWF',
    issueDate: '2024-08-05',
    dueDate: '2024-09-05',
    paymentTerms: 30,
    status: 'draft',
    paidAmount: 0,
    remainingAmount: 835000,
    paymentMethod: 'bank_transfer',
    referenceNumber: 'REF002',
    notes: 'Q3 consulting services',
    createdBy: '550e8400-e29b-41d4-a716-446655440001', // Jean Pierre Uwimana
    isActive: true
  },
  {
    invoiceNumber: 'INV003',
    customerId: '463bbf3c-f93d-411b-a9e3-62b778dd018b', // ABC Corporation
    customerName: 'ABC Corporation',
    type: 'product',
    description: 'Security Equipment - Cameras and Sensors',
    subtotal: 1200000,
    taxAmount: 216000,
    discountAmount: 0,
    totalAmount: 1416000,
    currency: 'RWF',
    issueDate: '2024-08-10',
    dueDate: '2024-09-10',
    paymentTerms: 30,
    status: 'sent',
    paidAmount: 0,
    remainingAmount: 1416000,
    paymentMethod: 'bank_transfer',
    referenceNumber: 'REF003',
    notes: 'Security equipment purchase',
    createdBy: '550e8400-e29b-41d4-a716-446655440001', // Jean Pierre Uwimana
    isActive: true
  }
];

// Sample data for bills
const billData = [
  {
    billNumber: 'BILL001',
    vendorId: 'b26a3510-da34-45ef-aee0-d49be1317728', // Maintenance Services
    vendorName: 'Maintenance Services Ltd',
    vendorInvoiceNumber: 'VINV001',
    type: 'service',
    description: 'Building Maintenance - August 2024',
    subtotal: 250000,
    taxAmount: 45000,
    discountAmount: 0,
    totalAmount: 295000,
    currency: 'RWF',
    issueDate: '2024-08-01',
    dueDate: '2024-08-31',
    paymentTerms: 30,
    status: 'received',
    paidAmount: 0,
    remainingAmount: 295000,
    paymentMethod: 'bank_transfer',
    referenceNumber: 'VREF001',
    notes: 'Monthly building maintenance',
    createdBy: '550e8400-e29b-41d4-a716-446655440001', // Jean Pierre Uwimana
    isActive: true
  },
  {
    billNumber: 'BILL002',
    vendorId: 'b26a3510-da34-45ef-aee0-d49be1317728', // Maintenance Services
    vendorName: 'Maintenance Services Ltd',
    type: 'service',
    description: 'Equipment Repair Services',
    subtotal: 180000,
    taxAmount: 32400,
    discountAmount: 10000,
    totalAmount: 202400,
    currency: 'RWF',
    issueDate: '2024-08-05',
    dueDate: '2024-09-05',
    paymentTerms: 30,
    status: 'draft',
    paidAmount: 0,
    remainingAmount: 202400,
    paymentMethod: 'bank_transfer',
    referenceNumber: 'VREF002',
    notes: 'Emergency equipment repair',
    createdBy: '550e8400-e29b-41d4-a716-446655440001', // Jean Pierre Uwimana
    isActive: true
  },
  {
    billNumber: 'BILL003',
    vendorId: 'b26a3510-da34-45ef-aee0-d49be1317728', // Maintenance Services
    vendorName: 'Maintenance Services Ltd',
    type: 'product',
    description: 'Cleaning Supplies - Monthly',
    subtotal: 75000,
    taxAmount: 13500,
    discountAmount: 0,
    totalAmount: 88500,
    currency: 'RWF',
    issueDate: '2024-08-10',
    dueDate: '2024-09-10',
    paymentTerms: 30,
    status: 'received',
    paidAmount: 0,
    remainingAmount: 88500,
    paymentMethod: 'bank_transfer',
    referenceNumber: 'VREF003',
    notes: 'Monthly cleaning supplies',
    createdBy: '550e8400-e29b-41d4-a716-446655440001', // Jean Pierre Uwimana
    isActive: true
  }
];

async function fixInvoiceBillTables() {
  try {
    console.log('🔧 Starting Invoice and Bill tables fix...');
    
    // Sync the database to ensure tables exist
    console.log('📊 Syncing database...');
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced successfully');
    
    // Check if invoices exist
    const existingInvoices = await Invoice.count();
    console.log(`📋 Found ${existingInvoices} existing invoices`);
    
    if (existingInvoices === 0) {
      console.log('📝 Creating sample invoices...');
      await Invoice.bulkCreate(invoiceData);
      console.log(`✅ Created ${invoiceData.length} invoices`);
    } else {
      console.log('ℹ️ Invoices already exist, skipping creation');
    }
    
    // Check if bills exist
    const existingBills = await Bill.count();
    console.log(`📋 Found ${existingBills} existing bills`);
    
    if (existingBills === 0) {
      console.log('📝 Creating sample bills...');
      await Bill.bulkCreate(billData);
      console.log(`✅ Created ${billData.length} bills`);
    } else {
      console.log('ℹ️ Bills already exist, skipping creation');
    }
    
    // Verify the data
    const finalInvoiceCount = await Invoice.count();
    const finalBillCount = await Bill.count();
    
    console.log('\n📊 Final Results:');
    console.log(`📋 Invoices: ${finalInvoiceCount}`);
    console.log(`📋 Bills: ${finalBillCount}`);
    
    console.log('\n🎉 Invoice and Bill tables fixed successfully!');
    
  } catch (error) {
    console.error('❌ Error fixing Invoice and Bill tables:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

// Run the fix
fixInvoiceBillTables()
  .then(() => {
    console.log('✅ Migration completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }); 