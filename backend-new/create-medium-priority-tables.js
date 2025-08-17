const { sequelize } = require('./config/database');

// Import all the new medium-priority models
const TrainingEnrollment = require('./models/TrainingEnrollment');
const Benefit = require('./models/Benefit');
const Candidate = require('./models/Candidate');
const Interview = require('./models/Interview');
const PurchaseOrder = require('./models/PurchaseOrder');

const createMediumPriorityTables = async () => {
  try {
    console.log('🚀 Creating Medium-Priority Database Tables...');
    console.log('📋 Phase 2: Medium-Priority Tables (5 tables)');
    console.log('');

    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Create all tables
    console.log('🗄️ Creating tables in database...');
    await sequelize.sync({ alter: true });

    console.log('');
    console.log('✅ Medium-Priority Tables Created Successfully!');
    console.log('');
    console.log('📊 Created Tables Summary:');
    console.log('');
    console.log('👥 HR DEPARTMENT (4 tables):');
    console.log('   ✅ training_enrollments - Employee training participation');
    console.log('   ✅ benefits - Employee benefits and packages');
    console.log('   ✅ candidates - Job applicants and candidate data');
    console.log('   ✅ interviews - Interview scheduling and results');
    console.log('');
    console.log('📦 OPERATIONS DEPARTMENT (1 table):');
    console.log('   ✅ purchase_orders - Procurement orders');
    console.log('');
    console.log('🎯 Total Medium-Priority Tables Created: 5 tables');
    console.log('📈 Database Coverage Improved: ~40% complete');
    console.log('');
    console.log('🚀 Ready for Phase 3: Advanced Feature Tables');
    console.log('📋 Next: Create remaining tables for complete coverage');

    await sequelize.close();
    console.log('🔌 Database connection closed.');

  } catch (error) {
    console.error('❌ Error creating medium-priority tables:', error);
    process.exit(1);
  }
};

// Run the table creation
createMediumPriorityTables(); 