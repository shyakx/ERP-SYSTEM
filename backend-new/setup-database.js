const { sequelize, testConnection } = require('./config/database');
const Department = require('./models/Department');
const User = require('./models/User');

// Import all models (we'll create these next)
const SystemSetting = require('./models/SystemSetting');
const AuditLog = require('./models/AuditLog');
const Employee = require('./models/Employee');
const JobPosting = require('./models/JobPosting');
const Candidate = require('./models/Candidate');
const TrainingProgram = require('./models/TrainingProgram');
const TrainingEnrollment = require('./models/TrainingEnrollment');
const LeaveRequest = require('./models/LeaveRequest');
const AttendanceRecord = require('./models/AttendanceRecord');
const PerformanceReview = require('./models/PerformanceReview');
const PayrollRecord = require('./models/PayrollRecord');
const FinancialAccount = require('./models/FinancialAccount');
const Transaction = require('./models/Transaction');
const Budget = require('./models/Budget');
const Expense = require('./models/Expense');
const Invoice = require('./models/Invoice');
const InvoiceItem = require('./models/InvoiceItem');
const ITAsset = require('./models/ITAsset');
const ITSupportTicket = require('./models/ITSupportTicket');
const SystemMonitoring = require('./models/SystemMonitoring');
const SecurityGuard = require('./models/SecurityGuard');
const SecurityAssignment = require('./models/SecurityAssignment');
const SecurityIncident = require('./models/SecurityIncident');
const PatrolRoute = require('./models/PatrolRoute');
const PatrolLog = require('./models/PatrolLog');
const InventoryItem = require('./models/InventoryItem');
const InventoryTransaction = require('./models/InventoryTransaction');
const Supplier = require('./models/Supplier');
const PurchaseOrder = require('./models/PurchaseOrder');
const Client = require('./models/Client');
const Contract = require('./models/Contract');
const ClientSupportTicket = require('./models/ClientSupportTicket');
const Lead = require('./models/Lead');
const Opportunity = require('./models/Opportunity');
const MarketingCampaign = require('./models/MarketingCampaign');
const CustomerFeedback = require('./models/CustomerFeedback');
const CustomerSurvey = require('./models/CustomerSurvey');
const RiskAssessment = require('./models/RiskAssessment');
const RiskIncident = require('./models/RiskIncident');
const RecoveryCase = require('./models/RecoveryCase');
const RecoveryDocument = require('./models/RecoveryDocument');
const CompliancePolicy = require('./models/CompliancePolicy');
const ComplianceAudit = require('./models/ComplianceAudit');

const setupDatabase = async () => {
  try {
    console.log('🔌 Testing database connection...');
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('❌ Database connection failed. Please check your PostgreSQL settings.');
      process.exit(1);
    }

    console.log('🗄️ Setting up database tables...');

    // Sync all models with database
    await sequelize.sync({ force: true }); // This will drop and recreate all tables

    console.log('✅ All tables created successfully!');
    console.log('📊 Database setup complete.');
    
    // Close the connection
    await sequelize.close();
    console.log('🔌 Database connection closed.');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
};

// Run the setup
setupDatabase(); 