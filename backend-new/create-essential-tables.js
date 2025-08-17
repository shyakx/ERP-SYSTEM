const { sequelize, testConnection } = require('./config/database');

// Core Models (already exist)
const Department = require('./models/Department');
const User = require('./models/User');
const SystemSetting = require('./models/SystemSetting');
const AuditLog = require('./models/AuditLog');
const Employee = require('./models/Employee');
const Client = require('./models/Client');
const FinancialAccount = require('./models/FinancialAccount');

// Essential HR Models
const JobPosting = require('./models/JobPosting');

// Essential Finance Models
const Transaction = require('./models/Transaction');
const Expense = require('./models/Expense');

// Essential IT Models
const ITAsset = require('./models/ITAsset');
const ITSupportTicket = require('./models/ITSupportTicket');

// Essential Security Models
const SecurityGuard = require('./models/SecurityGuard');
const SecurityIncident = require('./models/SecurityIncident');

// Essential Operations Models
const InventoryItem = require('./models/InventoryItem');
const Supplier = require('./models/Supplier');

// Essential Business Models
const Contract = require('./models/Contract');
const Lead = require('./models/Lead');

// Essential Risk Models
const RiskAssessment = require('./models/RiskAssessment');

const createEssentialTables = async () => {
  try {
    console.log('🔌 Testing database connection...');
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('❌ Database connection failed. Please check your PostgreSQL settings.');
      process.exit(1);
    }

    console.log('🗄️ Creating essential ERP database tables...');

    // Sync all models with database
    await sequelize.sync({ alter: true });

    console.log('✅ Essential tables created successfully!');
    console.log('📊 Essential ERP Database Schema:');
    console.log('');
    console.log('🏗️  CORE TABLES:');
    console.log('   - departments');
    console.log('   - users');
    console.log('   - system_settings');
    console.log('   - audit_logs');
    console.log('');
    console.log('👥 HR DEPARTMENT:');
    console.log('   - employees');
    console.log('   - job_postings');
    console.log('');
    console.log('💰 FINANCE DEPARTMENT:');
    console.log('   - financial_accounts');
    console.log('   - transactions');
    console.log('   - expenses');
    console.log('');
    console.log('💻 IT DEPARTMENT:');
    console.log('   - it_assets');
    console.log('   - it_support_tickets');
    console.log('');
    console.log('🛡️ SECURITY DEPARTMENT:');
    console.log('   - security_guards');
    console.log('   - security_incidents');
    console.log('');
    console.log('📦 OPERATIONS/INVENTORY:');
    console.log('   - inventory_items');
    console.log('   - suppliers');
    console.log('');
    console.log('👥 CLIENT MANAGEMENT:');
    console.log('   - clients');
    console.log('   - contracts');
    console.log('');
    console.log('📈 SALES & MARKETING:');
    console.log('   - leads');
    console.log('');
    console.log('⚠️ RISK MANAGEMENT:');
    console.log('   - risk_assessments');
    console.log('');
    console.log('📊 Total Essential Tables: 15 tables');
    console.log('🎯 Essential database ready for DICEL ERP system!');
    console.log('');
    console.log('💡 You can add more tables later as needed.');
    
    // Close the connection
    await sequelize.close();
    console.log('🔌 Database connection closed.');

  } catch (error) {
    console.error('❌ Error creating tables:', error);
    process.exit(1);
  }
};

// Run the setup
createEssentialTables(); 