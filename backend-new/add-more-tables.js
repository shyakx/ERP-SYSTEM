const { sequelize, testConnection } = require('./config/database');
const Department = require('./models/Department');
const User = require('./models/User');
const SystemSetting = require('./models/SystemSetting');
const AuditLog = require('./models/AuditLog');
const Employee = require('./models/Employee');
const Client = require('./models/Client');
const FinancialAccount = require('./models/FinancialAccount');

const addMoreTables = async () => {
  try {
    console.log('🔌 Testing database connection...');
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('❌ Database connection failed. Please check your PostgreSQL settings.');
      process.exit(1);
    }

    console.log('🗄️ Adding more database tables...');

    // Sync models with database (this will add new tables without dropping existing ones)
    await sequelize.sync({ alter: true });

    console.log('✅ Additional tables created successfully!');
    console.log('📊 All tables in database:');
    console.log('   - departments');
    console.log('   - users');
    console.log('   - system_settings');
    console.log('   - audit_logs');
    console.log('   - employees');
    console.log('   - clients');
    console.log('   - financial_accounts');
    
    // Close the connection
    await sequelize.close();
    console.log('🔌 Database connection closed.');

  } catch (error) {
    console.error('❌ Error adding tables:', error);
    process.exit(1);
  }
};

// Run the setup
addMoreTables(); 