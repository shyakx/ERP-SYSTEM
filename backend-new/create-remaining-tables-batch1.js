const { sequelize } = require('./config/database');

// Import all the new models for batch 1
const Quote = require('./models/Quote');
const SecurityAssignment = require('./models/SecurityAssignment');
const System = require('./models/System');
const NetworkDevice = require('./models/NetworkDevice');
const MaintenanceSchedule = require('./models/MaintenanceSchedule');
const CompliancePolicy = require('./models/CompliancePolicy');
const RecoveryCase = require('./models/RecoveryCase');
const CustomerSurvey = require('./models/CustomerSurvey');
const SupportTicket = require('./models/SupportTicket');
const MarketingCampaign = require('./models/MarketingCampaign');

const createRemainingTablesBatch1 = async () => {
  try {
    console.log('🚀 Creating Remaining Tables - Batch 1...');
    console.log('📋 Creating 10 additional tables');
    console.log('');

    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Create all tables
    console.log('🗄️ Creating tables in database...');
    await sequelize.sync({ alter: true });

    console.log('');
    console.log('✅ Batch 1 Tables Created Successfully!');
    console.log('');
    console.log('📊 Created Tables Summary:');
    console.log('');
    console.log('📈 SALES & MARKETING (1 table):');
    console.log('   ✅ quotes - Sales quotations');
    console.log('');
    console.log('🛡️ SECURITY DEPARTMENT (1 table):');
    console.log('   ✅ security_assignments - Security guard duty assignments');
    console.log('');
    console.log('💻 IT DEPARTMENT (3 tables):');
    console.log('   ✅ systems - IT systems and applications');
    console.log('   ✅ network_devices - Network infrastructure');
    console.log('   ✅ maintenance_schedules - IT maintenance planning');
    console.log('');
    console.log('📋 COMPLIANCE DEPARTMENT (1 table):');
    console.log('   ✅ compliance_policies - Compliance policies');
    console.log('');
    console.log('🔄 RECOVERY DEPARTMENT (1 table):');
    console.log('   ✅ recovery_cases - Recovery case management');
    console.log('');
    console.log('🎧 CUSTOMER EXPERIENCE (3 tables):');
    console.log('   ✅ customer_surveys - Customer satisfaction surveys');
    console.log('   ✅ support_tickets - Customer support requests');
    console.log('   ✅ marketing_campaigns - Marketing campaigns');
    console.log('');
    console.log('🎯 Total Batch 1 Tables Created: 10 tables');
    console.log('📈 Database Coverage Improved: ~50% complete');
    console.log('');
    console.log('🚀 Ready for Batch 2: Advanced Feature Tables');
    console.log('📋 Next: Create remaining advanced tables');

    await sequelize.close();
    console.log('🔌 Database connection closed.');

  } catch (error) {
    console.error('❌ Error creating batch 1 tables:', error);
    process.exit(1);
  }
};

// Run the table creation
createRemainingTablesBatch1(); 