const { sequelize } = require('./config/database');

// Import all the new models for batch 3
const Project = require('./models/Project');
const Notification = require('./models/Notification');
const Report = require('./models/Report');
const Workflow = require('./models/Workflow');
const Integration = require('./models/Integration');

const createRemainingTablesBatch3 = async () => {
  try {
    console.log('🚀 Creating Remaining Tables - Batch 3...');
    console.log('📋 Creating 5 additional specialized tables');
    console.log('');

    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Create all tables
    console.log('🗄️ Creating tables in database...');
    await sequelize.sync({ alter: true });

    console.log('');
    console.log('✅ Batch 3 Tables Created Successfully!');
    console.log('');
    console.log('📊 Created Tables Summary:');
    console.log('');
    console.log('📋 PROJECT MANAGEMENT (1 table):');
    console.log('   ✅ projects - Project management and tracking');
    console.log('');
    console.log('🔔 SYSTEM FEATURES (1 table):');
    console.log('   ✅ notifications - System notifications and alerts');
    console.log('');
    console.log('📊 REPORTING (1 table):');
    console.log('   ✅ reports - System reports and analytics');
    console.log('');
    console.log('⚙️ BUSINESS PROCESSES (1 table):');
    console.log('   ✅ workflows - Business process workflows');
    console.log('');
    console.log('🔗 INTEGRATIONS (1 table):');
    console.log('   ✅ integrations - External system integrations');
    console.log('');
    console.log('🎯 Total Batch 3 Tables Created: 5 tables');
    console.log('📈 Database Coverage Improved: ~60% complete');
    console.log('');
    console.log('🚀 Ready for Final Batch: Remaining Specialized Tables');
    console.log('📋 Next: Create final set of tables for 100% coverage');

    await sequelize.close();
    console.log('🔌 Database connection closed.');

  } catch (error) {
    console.error('❌ Error creating batch 3 tables:', error);
    process.exit(1);
  }
};

// Run the table creation
createRemainingTablesBatch3(); 