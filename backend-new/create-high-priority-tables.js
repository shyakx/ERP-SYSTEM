const { sequelize } = require('./config/database');

// Import all the new high-priority models
const LeaveRequest = require('./models/LeaveRequest');
const AttendanceRecord = require('./models/AttendanceRecord');
const PayrollRecord = require('./models/PayrollRecord');
const PerformanceReview = require('./models/PerformanceReview');
const TrainingProgram = require('./models/TrainingProgram');
const Budget = require('./models/Budget');
const AccountsReceivable = require('./models/AccountsReceivable');
const AccountsPayable = require('./models/AccountsPayable');
const Invoice = require('./models/Invoice');
const FinancialReport = require('./models/FinancialReport');
const InventoryTransaction = require('./models/InventoryTransaction');
const Opportunity = require('./models/Opportunity');

const createHighPriorityTables = async () => {
  try {
    console.log('🚀 Creating High-Priority Database Tables...');
    console.log('📋 Phase 1: Core HR Tables (5 tables)');
    console.log('📋 Phase 2: Finance Tables (5 tables)');
    console.log('📋 Phase 3: Operations & Sales Tables (2 tables)');
    console.log('');

    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Create all tables
    console.log('🗄️ Creating tables in database...');
    await sequelize.sync({ alter: true });

    console.log('');
    console.log('✅ High-Priority Tables Created Successfully!');
    console.log('');
    console.log('📊 Created Tables Summary:');
    console.log('');
    console.log('👥 HR DEPARTMENT (5 tables):');
    console.log('   ✅ leave_requests - Employee leave applications');
    console.log('   ✅ attendance_records - Daily attendance tracking');
    console.log('   ✅ payroll_records - Monthly payroll data');
    console.log('   ✅ performance_reviews - Employee performance evaluations');
    console.log('   ✅ training_programs - Training courses and programs');
    console.log('');
    console.log('💰 FINANCE DEPARTMENT (5 tables):');
    console.log('   ✅ budgets - Department and project budgets');
    console.log('   ✅ accounts_receivable - Customer invoices and payments');
    console.log('   ✅ accounts_payable - Vendor bills and payments');
    console.log('   ✅ invoices - Invoice generation and tracking');
    console.log('   ✅ financial_reports - Financial statements and reports');
    console.log('');
    console.log('📦 OPERATIONS & SALES (2 tables):');
    console.log('   ✅ inventory_transactions - Stock movements');
    console.log('   ✅ opportunities - Sales pipeline management');
    console.log('');
    console.log('🎯 Total High-Priority Tables Created: 12 tables');
    console.log('📈 Database Coverage Improved: ~35% complete');
    console.log('');
    console.log('🚀 Ready for Phase 2: Medium-Priority Tables');
    console.log('📋 Next: Create 15 medium-priority tables');

    await sequelize.close();
    console.log('🔌 Database connection closed.');

  } catch (error) {
    console.error('❌ Error creating high-priority tables:', error);
    process.exit(1);
  }
};

// Run the table creation
createHighPriorityTables(); 