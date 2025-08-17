const { sequelize } = require('./config/database');

// Import all the new models for batch 2
const Warehouse = require('./models/Warehouse');
const TaxRecord = require('./models/TaxRecord');
const CashFlow = require('./models/CashFlow');
const Goal = require('./models/Goal');
const KPI = require('./models/KPI');

const createRemainingTablesBatch2 = async () => {
  try {
    console.log('🚀 Creating Remaining Tables - Batch 2...');
    console.log('📋 Creating 5 additional advanced feature tables');
    console.log('');

    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Create all tables
    console.log('🗄️ Creating tables in database...');
    await sequelize.sync({ alter: true });

    console.log('');
    console.log('✅ Batch 2 Tables Created Successfully!');
    console.log('');
    console.log('📊 Created Tables Summary:');
    console.log('');
    console.log('📦 OPERATIONS (1 table):');
    console.log('   ✅ warehouses - Warehouse locations and management');
    console.log('');
    console.log('💰 FINANCE (2 tables):');
    console.log('   ✅ tax_records - Tax management and compliance');
    console.log('   ✅ cash_flows - Cash flow tracking and analysis');
    console.log('');
    console.log('👥 HR (1 table):');
    console.log('   ✅ goals - Employee goals and performance tracking');
    console.log('');
    console.log('📈 ANALYTICS (1 table):');
    console.log('   ✅ kpis - Performance indicators and metrics');
    console.log('');
    console.log('🎯 Total Batch 2 Tables Created: 5 tables');
    console.log('📈 Database Coverage Improved: ~55% complete');
    console.log('');
    console.log('🚀 Ready for Batch 3: Final Advanced Tables');
    console.log('📋 Next: Create remaining specialized tables');

    await sequelize.close();
    console.log('🔌 Database connection closed.');

  } catch (error) {
    console.error('❌ Error creating batch 2 tables:', error);
    process.exit(1);
  }
};

// Run the table creation
createRemainingTablesBatch2(); 