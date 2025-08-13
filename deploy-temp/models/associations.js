import { User } from './User.js';
import { Department } from './Department.js';
import { Project } from './Project.js';
import { Task } from './Task.js';
import { Asset } from './Asset.js';
import { Document } from './Document.js';
import { ChatMessage } from './ChatMessage.js';
import { Employee } from './Employee.js';
import { JobPosting } from './JobPosting.js';
import { Candidate } from './Candidate.js';
import { TrainingCourse } from './TrainingCourse.js';
import { TrainingEnrollment } from './TrainingEnrollment.js';
import { LeaveType } from './LeaveType.js';
import { LeaveRequest } from './LeaveRequest.js';
import { AttendanceRecord } from './AttendanceRecord.js';
import { PerformanceReview } from './PerformanceReview.js';
import { PayrollRecord } from './PayrollRecord.js';
import Benefit from './Benefit.js';
import Compliance from './Compliance.js';
import Report from './Report.js';
import Setting from './Setting.js';

// Finance Models
import Transaction from './Transaction.js';
import Account from './Account.js';
import Vendor from './Vendor.js';
import Customer from './Customer.js';
import Invoice from './Invoice.js';
import Bill from './Bill.js';
import Expense from './Expense.js';
import Budget from './Budget.js';
import TaxRecord from './TaxRecord.js';

// Inventory Models
import InventoryItem from './InventoryItem.js';
import InventoryTransaction from './InventoryTransaction.js';
import Warehouse from './Warehouse.js';

// User Associations
User.hasOne(Employee, { foreignKey: 'userId', as: 'employeeProfile' });
Employee.belongsTo(User, { foreignKey: 'userId', as: 'userAccount' });

// Department Associations
Department.hasMany(User, { foreignKey: 'departmentId', as: 'departmentUsers' });
User.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });

Department.hasMany(Project, { foreignKey: 'departmentId', as: 'departmentProjects' });
Project.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });

Department.hasMany(Asset, { foreignKey: 'departmentId', as: 'departmentAssets' });
Asset.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });

// Project Associations
Project.hasMany(Task, { foreignKey: 'projectId', as: 'projectTasks' });
Task.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

Project.belongsTo(User, { foreignKey: 'managerId', as: 'projectManager' });
User.hasMany(Project, { foreignKey: 'managerId', as: 'managedProjects' });

// Task Associations
Task.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignedUser' });
User.hasMany(Task, { foreignKey: 'assignedTo', as: 'assignedTasks' });

Task.belongsTo(User, { foreignKey: 'createdBy', as: 'taskCreator' });
User.hasMany(Task, { foreignKey: 'createdBy', as: 'createdTasks' });

// Asset Associations
Asset.belongsTo(User, { foreignKey: 'assignedTo', as: 'assetAssignee' });
User.hasMany(Asset, { foreignKey: 'assignedTo', as: 'assignedAssets' });

// Document Associations
Document.belongsTo(User, { foreignKey: 'userId', as: 'documentOwner' });
User.hasMany(Document, { foreignKey: 'userId', as: 'userDocuments' });

// Chat Message Associations
ChatMessage.belongsTo(User, { foreignKey: 'userId', as: 'messageUser' });
User.hasMany(ChatMessage, { foreignKey: 'userId', as: 'userMessages' });

// HR Specific Associations

// Job Posting Associations
JobPosting.hasMany(Candidate, { foreignKey: 'jobPostingId', as: 'jobCandidates' });
Candidate.belongsTo(JobPosting, { foreignKey: 'jobPostingId', as: 'jobPosting' });

// Training Associations
TrainingCourse.hasMany(TrainingEnrollment, { foreignKey: 'courseId', as: 'courseEnrollments' });
TrainingEnrollment.belongsTo(TrainingCourse, { foreignKey: 'courseId', as: 'course' });

TrainingEnrollment.belongsTo(Employee, { foreignKey: 'employeeId', as: 'enrolledEmployee' });
Employee.hasMany(TrainingEnrollment, { foreignKey: 'employeeId', as: 'employeeEnrollments' });

// Leave Associations
LeaveType.hasMany(LeaveRequest, { foreignKey: 'leaveTypeId', as: 'leaveTypeRequests' });
LeaveRequest.belongsTo(LeaveType, { foreignKey: 'leaveTypeId', as: 'leaveType' });

LeaveRequest.belongsTo(Employee, { foreignKey: 'employeeId', as: 'leaveEmployee' });
Employee.hasMany(LeaveRequest, { foreignKey: 'employeeId', as: 'employeeLeaveRequests' });

// Attendance Associations
AttendanceRecord.belongsTo(Employee, { foreignKey: 'employeeId', as: 'attendanceEmployee' });
Employee.hasMany(AttendanceRecord, { foreignKey: 'employeeId', as: 'employeeAttendanceRecords' });

// Performance Review Associations
PerformanceReview.belongsTo(Employee, { foreignKey: 'employeeId', as: 'reviewEmployee' });
Employee.hasMany(PerformanceReview, { foreignKey: 'employeeId', as: 'employeePerformanceReviews' });

// Payroll Associations
PayrollRecord.belongsTo(Employee, { foreignKey: 'employeeId', as: 'payrollEmployee' });
Employee.hasMany(PayrollRecord, { foreignKey: 'employeeId', as: 'employeePayrollRecords' });

// Benefit Associations
Benefit.belongsToMany(Employee, { through: 'EmployeeBenefits', as: 'benefitEmployees' });
Employee.belongsToMany(Benefit, { through: 'EmployeeBenefits', as: 'employeeBenefits' });

// Finance Associations

// Transaction Associations
Transaction.belongsTo(Account, { foreignKey: 'accountId', as: 'account' });
Account.hasMany(Transaction, { foreignKey: 'accountId', as: 'transactions' });

Transaction.belongsTo(Account, { foreignKey: 'relatedAccountId', as: 'relatedAccount' });
Account.hasMany(Transaction, { foreignKey: 'relatedAccountId', as: 'relatedTransactions' });

Transaction.belongsTo(Vendor, { foreignKey: 'vendorId', as: 'vendor' });
Vendor.hasMany(Transaction, { foreignKey: 'vendorId', as: 'vendorTransactions' });

Transaction.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });
Customer.hasMany(Transaction, { foreignKey: 'customerId', as: 'customerTransactions' });

Transaction.belongsTo(Invoice, { foreignKey: 'invoiceId', as: 'invoice' });
Invoice.hasMany(Transaction, { foreignKey: 'invoiceId', as: 'invoiceTransactions' });

Transaction.belongsTo(Bill, { foreignKey: 'billId', as: 'bill' });
Bill.hasMany(Transaction, { foreignKey: 'billId', as: 'billTransactions' });

Transaction.belongsTo(Expense, { foreignKey: 'expenseId', as: 'expense' });
Expense.hasMany(Transaction, { foreignKey: 'expenseId', as: 'expenseTransactions' });

Transaction.belongsTo(User, { foreignKey: 'createdBy', as: 'transactionCreator' });
User.hasMany(Transaction, { foreignKey: 'createdBy', as: 'createdTransactions' });

Transaction.belongsTo(User, { foreignKey: 'approvedBy', as: 'transactionApprover' });
User.hasMany(Transaction, { foreignKey: 'approvedBy', as: 'approvedTransactions' });

// Account Associations
Account.belongsTo(User, { foreignKey: 'createdBy', as: 'accountCreator' });
User.hasMany(Account, { foreignKey: 'createdBy', as: 'createdAccounts' });

// Vendor Associations
Vendor.belongsTo(User, { foreignKey: 'createdBy', as: 'vendorCreator' });
User.hasMany(Vendor, { foreignKey: 'createdBy', as: 'createdVendors' });

// Customer Associations
Customer.belongsTo(User, { foreignKey: 'createdBy', as: 'customerCreator' });
User.hasMany(Customer, { foreignKey: 'createdBy', as: 'createdCustomers' });

// Invoice Associations
Invoice.belongsTo(Customer, { foreignKey: 'customerId', as: 'invoiceCustomer' });
Customer.hasMany(Invoice, { foreignKey: 'customerId', as: 'customerInvoices' });

Invoice.belongsTo(User, { foreignKey: 'createdBy', as: 'invoiceCreator' });
User.hasMany(Invoice, { foreignKey: 'createdBy', as: 'createdInvoices' });

// Bill Associations
Bill.belongsTo(Vendor, { foreignKey: 'vendorId', as: 'billVendor' });
Vendor.hasMany(Bill, { foreignKey: 'vendorId', as: 'vendorBills' });

Bill.belongsTo(User, { foreignKey: 'createdBy', as: 'billCreator' });
User.hasMany(Bill, { foreignKey: 'createdBy', as: 'createdBills' });

Bill.belongsTo(User, { foreignKey: 'approvedBy', as: 'billApprover' });
User.hasMany(Bill, { foreignKey: 'approvedBy', as: 'approvedBills' });

// Expense Associations
Expense.belongsTo(Vendor, { foreignKey: 'vendorId', as: 'expenseVendor' });
Vendor.hasMany(Expense, { foreignKey: 'vendorId', as: 'vendorExpenses' });

Expense.belongsTo(Employee, { foreignKey: 'employeeId', as: 'expenseEmployee' });
Employee.hasMany(Expense, { foreignKey: 'employeeId', as: 'employeeExpenses' });

Expense.belongsTo(Project, { foreignKey: 'projectId', as: 'expenseProject' });
Project.hasMany(Expense, { foreignKey: 'projectId', as: 'projectExpenses' });

Expense.belongsTo(User, { foreignKey: 'submittedBy', as: 'expenseSubmitter' });
User.hasMany(Expense, { foreignKey: 'submittedBy', as: 'submittedExpenses' });

Expense.belongsTo(User, { foreignKey: 'approvedBy', as: 'expenseApprover' });
User.hasMany(Expense, { foreignKey: 'approvedBy', as: 'approvedExpenses' });

Expense.belongsTo(User, { foreignKey: 'paidBy', as: 'expensePayer' });
User.hasMany(Expense, { foreignKey: 'paidBy', as: 'paidExpenses' });

// Budget Associations
Budget.belongsTo(Project, { foreignKey: 'projectId', as: 'budgetProject' });
Project.hasMany(Budget, { foreignKey: 'projectId', as: 'projectBudgets' });

Budget.belongsTo(User, { foreignKey: 'createdBy', as: 'budgetCreator' });
User.hasMany(Budget, { foreignKey: 'createdBy', as: 'createdBudgets' });

Budget.belongsTo(User, { foreignKey: 'approvedBy', as: 'budgetApprover' });
User.hasMany(Budget, { foreignKey: 'approvedBy', as: 'approvedBudgets' });

// Tax Record Associations
TaxRecord.belongsTo(User, { foreignKey: 'calculatedBy', as: 'taxCalculator' });
User.hasMany(TaxRecord, { foreignKey: 'calculatedBy', as: 'calculatedTaxes' });

TaxRecord.belongsTo(User, { foreignKey: 'filedBy', as: 'taxFiler' });
User.hasMany(TaxRecord, { foreignKey: 'filedBy', as: 'filedTaxes' });

TaxRecord.belongsTo(User, { foreignKey: 'paidBy', as: 'taxPayer' });
User.hasMany(TaxRecord, { foreignKey: 'paidBy', as: 'paidTaxes' });

// Inventory Associations
InventoryItem.belongsTo(User, { foreignKey: 'createdBy', as: 'itemCreator' });
User.hasMany(InventoryItem, { foreignKey: 'createdBy', as: 'createdItems' });

InventoryTransaction.belongsTo(InventoryItem, { foreignKey: 'itemId', as: 'transactionItem' });
InventoryItem.hasMany(InventoryTransaction, { foreignKey: 'itemId', as: 'itemTransactions' });

InventoryTransaction.belongsTo(User, { foreignKey: 'createdBy', as: 'transactionCreator' });
User.hasMany(InventoryTransaction, { foreignKey: 'createdBy', as: 'createdInventoryTransactions' });

InventoryTransaction.belongsTo(User, { foreignKey: 'approvedBy', as: 'transactionApprover' });
User.hasMany(InventoryTransaction, { foreignKey: 'approvedBy', as: 'approvedInventoryTransactions' });

Warehouse.belongsTo(User, { foreignKey: 'createdBy', as: 'warehouseCreator' });
User.hasMany(Warehouse, { foreignKey: 'createdBy', as: 'createdWarehouses' });

export {
  User,
  Department,
  Project,
  Task,
  Asset,
  Document,
  ChatMessage,
  Employee,
  JobPosting,
  Candidate,
  TrainingCourse,
  TrainingEnrollment,
  LeaveType,
  LeaveRequest,
  AttendanceRecord,
  PerformanceReview,
  PayrollRecord,
  Benefit,
  Compliance,
  Report,
  Setting,
  // Finance Models
  Transaction,
  Account,
  Vendor,
  Customer,
  Invoice,
  Bill,
  Expense,
  Budget,
  TaxRecord,
  // Inventory Models
  InventoryItem,
  InventoryTransaction,
  Warehouse
};