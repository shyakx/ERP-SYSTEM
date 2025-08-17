const { sequelize, testConnection } = require('./config/database');
const Department = require('./models/Department');
const User = require('./models/User');
const SystemSetting = require('./models/SystemSetting');
const AuditLog = require('./models/AuditLog');

const setupCoreTables = async () => {
  try {
    console.log('🔌 Testing database connection...');
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('❌ Database connection failed. Please check your PostgreSQL settings.');
      process.exit(1);
    }

    console.log('🗄️ Setting up core database tables...');

    // Sync core models with database
    await sequelize.sync({ force: true }); // This will drop and recreate all tables

    console.log('✅ Core tables created successfully!');
    console.log('📊 Created tables:');
    console.log('   - departments');
    console.log('   - users');
    console.log('   - system_settings');
    console.log('   - audit_logs');
    
    // Close the connection
    await sequelize.close();
    console.log('🔌 Database connection closed.');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
};

// Run the setup
setupCoreTables(); 