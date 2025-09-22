// Core Models
const User = require('./User');
const Employee = require('./Employee');
const Department = require('./Department');

// Chat Models
const Conversation = require('./Conversation');
const Message = require('./Message');
const ConversationMember = require('./ConversationMember');
const MessageReaction = require('./MessageReaction');
const TypingIndicator = require('./TypingIndicator');

// HR Models
const LeaveRequest = require('./LeaveRequest');
const AttendanceRecord = require('./AttendanceRecord');
const PayrollRecord = require('./PayrollRecord');
const PerformanceReview = require('./PerformanceReview');
const TrainingProgram = require('./TrainingProgram');
const TrainingEnrollment = require('./TrainingEnrollment');
const JobPosting = require('./JobPosting');
const Candidate = require('./Candidate');
const Interview = require('./Interview');
const Benefit = require('./Benefit');

// Finance Models
const Transaction = require('./Transaction');
const FinancialAccount = require('./FinancialAccount');
const Expense = require('./Expense');
const Budget = require('./Budget');
const Invoice = require('./Invoice');
const AccountsReceivable = require('./AccountsReceivable');
const AccountsPayable = require('./AccountsPayable');
const TaxRecord = require('./TaxRecord');
const CashFlow = require('./CashFlow');
const FinancialReport = require('./FinancialReport');

// Operations Models
const InventoryItem = require('./InventoryItem');
const InventoryTransaction = require('./InventoryTransaction');
const Supplier = require('./Supplier');
const PurchaseOrder = require('./PurchaseOrder');
const Warehouse = require('./Warehouse');

// Sales & Marketing Models
const Lead = require('./Lead');
const Opportunity = require('./Opportunity');
const Quote = require('./Quote');
const Client = require('./Client');
const MarketingCampaign = require('./MarketingCampaign');

// IT Models
const ITAsset = require('./ITAsset');
const ITSupportTicket = require('./ITSupportTicket');
const System = require('./System');
const NetworkDevice = require('./NetworkDevice');
const MaintenanceSchedule = require('./MaintenanceSchedule');

// Security Models
const SecurityGuard = require('./SecurityGuard');
const SecurityIncident = require('./SecurityIncident');
const SecurityAssignment = require('./SecurityAssignment');

// Compliance & Risk Models
const CompliancePolicy = require('./CompliancePolicy');
const RiskAssessment = require('./RiskAssessment');
const RecoveryCase = require('./RecoveryCase');

// Other Models
const AuditLog = require('./AuditLog');
const Notification = require('./Notification');
const SystemSetting = require('./SystemSetting');
const Integration = require('./Integration');
const Workflow = require('./Workflow');
const Project = require('./Project');
const Goal = require('./Goal');
const KPI = require('./KPI');
const Report = require('./Report');
const Contract = require('./Contract');
const CustomerSurvey = require('./CustomerSurvey');
const SupportTicket = require('./SupportTicket');

module.exports = {
  // Core Models
  User,
  Employee,
  Department,
  
  // Chat Models
  Conversation,
  Message,
  ConversationMember,
  MessageReaction,
  TypingIndicator,
  
  // HR Models
  LeaveRequest,
  AttendanceRecord,
  PayrollRecord,
  PerformanceReview,
  TrainingProgram,
  TrainingEnrollment,
  JobPosting,
  Candidate,
  Interview,
  Benefit,
  
  // Finance Models
  Transaction,
  FinancialAccount,
  Expense,
  Budget,
  Invoice,
  AccountsReceivable,
  AccountsPayable,
  TaxRecord,
  CashFlow,
  FinancialReport,
  
  // Operations Models
  InventoryItem,
  InventoryTransaction,
  Supplier,
  PurchaseOrder,
  Warehouse,
  
  // Sales & Marketing Models
  Lead,
  Opportunity,
  Quote,
  Client,
  MarketingCampaign,
  
  // IT Models
  ITAsset,
  ITSupportTicket,
  System,
  NetworkDevice,
  MaintenanceSchedule,
  
  // Security Models
  SecurityGuard,
  SecurityIncident,
  SecurityAssignment,
  
  // Compliance & Risk Models
  CompliancePolicy,
  RiskAssessment,
  RecoveryCase,
  
  // Other Models
  AuditLog,
  Notification,
  SystemSetting,
  Integration,
  Workflow,
  Project,
  Goal,
  KPI,
  Report,
  Contract,
  CustomerSurvey,
  SupportTicket
};
