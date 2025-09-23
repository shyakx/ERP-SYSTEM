import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// DEMO MODE: Set to true to use mock data for pitching
const DEMO_MODE = true;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 second timeout to prevent long waits
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors (backend not available)
    if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK' || error.response?.status === 0) {
      console.warn('Backend server not available, authentication will use demo credentials');
      return Promise.reject(new Error('Backend not available'));
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Temporarily handle 403 errors gracefully
    if (error.response?.status === 403) {
      console.warn('Backend server not available, using fallback data');
      // Return a mock response to prevent crashes
      return Promise.resolve({
        data: {
          success: true,
          data: [],
          message: 'Backend server not available'
        }
      });
    }
    
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: (credentials: any) => api.post('/auth/login', credentials),
  register: (userData: any) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getRecentActivity: () => api.get('/dashboard/recent-activity'),
  getDepartmentStats: () => api.get('/dashboard/department-stats'),
};

// Employee API
export const employeeAPI = {
  getAll: (params: any = {}) => api.get('/employees/test', { params }),
  getById: (id: string) => api.get(`/employees/${id}`),
  create: (data: any) => api.post('/employees', data),
  update: (id: string, data: any) => api.put(`/employees/${id}`, data),
  delete: (id: string) => api.delete(`/employees/${id}`),
  getStats: () => api.get('/employees/test/stats'),
};

// Job Posting API
export const jobPostingAPI = {
  getAll: (params: any = {}) => api.get('/job-postings/test', { params }),
  getById: (id: string) => api.get(`/job-postings/${id}`),
  create: (data: any) => api.post('/job-postings', data),
  update: (id: string, data: any) => api.put(`/job-postings/${id}`, data),
  delete: (id: string) => api.delete(`/job-postings/${id}`),
  getStats: () => api.get('/job-postings/test/stats'),
};

// Candidate API
export const candidateAPI = {
  getAll: (params: any = {}) => api.get('/candidates/test', { params }),
  getById: (id: string) => api.get(`/candidates/${id}`),
  create: (data: any) => api.post('/candidates', data),
  update: (id: string, data: any) => api.put(`/candidates/${id}`, data),
  delete: (id: string) => api.delete(`/candidates/${id}`),
  updateStatus: (id: string, status: any) => api.patch(`/candidates/${id}/status`, status),
  getStats: () => api.get('/candidates/test/stats'),
};

// Training API
export const trainingAPI = {
  // Courses
  getAllCourses: (params: any = {}) => api.get('/training/courses/test', { params }),
  getCourseById: (id: string) => api.get(`/training/courses/${id}`),
  createCourse: (data: any) => api.post('/training/courses', data),
  updateCourse: (id: string, data: any) => api.put(`/training/courses/${id}`, data),
  deleteCourse: (id: string) => api.delete(`/training/courses/${id}`),
  
  // Enrollments
  getAllEnrollments: (params: any = {}) => api.get('/training/enrollments/test', { params }),
  enrollEmployee: (data: any) => api.post('/training/enroll', data),
  updateEnrollmentStatus: (id: string, status: any) => api.patch(`/training/enrollments/${id}/status`, status),
  deleteEnrollment: (id: string) => api.delete(`/training/enrollments/${id}`),
  
  // Stats
  getStats: () => api.get('/training/test/stats'),
};

// Leave API
export const leaveAPI = {
  getAllRequests: (params: any = {}) => api.get('/leave/requests/test', { params }),
  getRequestById: (id: string) => api.get(`/leave/requests/${id}`),
  createRequest: (data: any) => api.post('/leave/requests', data),
  updateRequest: (id: string, data: any) => api.put(`/leave/requests/${id}`, data),
  deleteRequest: (id: string) => api.delete(`/leave/requests/${id}`),
  updateRequestStatus: (id: string, status: any) => api.patch(`/leave/requests/${id}/status`, status),
  
  // Types
  getAllTypes: () => api.get('/leave/types/test'),
  createType: (data: any) => api.post('/leave/types', data),
  updateType: (id: string, data: any) => api.put(`/leave/types/${id}`, data),
  
  // Stats
  getStats: () => api.get('/leave/test/stats'),
};

// Attendance API
export const attendanceAPI = {
  getAll: (params: any = {}) => api.get('/attendance/test', { params }),
  getById: (id: string) => api.get(`/attendance/${id}`),
  create: (data: any) => api.post('/attendance', data),
  update: (id: string, data: any) => api.put(`/attendance/${id}`, data),
  delete: (id: string) => api.delete(`/attendance/${id}`),
  checkIn: (data: any) => api.post('/attendance/checkin', data),
  checkOut: (data: any) => api.post('/attendance/checkout', data),
  getStats: () => api.get('/attendance/test/stats'),
};

// Performance API
export const performanceAPI = {
  getAll: (params: any = {}) => api.get('/performance/test', { params }),
  getById: (id: string) => api.get(`/performance/${id}`),
  create: (data: any) => api.post('/performance', data),
  update: (id: string, data: any) => api.put(`/performance/${id}`, data),
  delete: (id: string) => api.delete(`/performance/${id}`),
  getStats: () => api.get('/performance/test/stats'),
};

// Payroll API
export const payrollAPI = {
  getAll: (params: any = {}) => api.get('/payroll/test', { params }),
  getById: (id: string) => api.get(`/payroll/${id}`),
  create: (data: any) => api.post('/payroll', data),
  update: (id: string, data: any) => api.put(`/payroll/${id}`, data),
  delete: (id: string) => api.delete(`/payroll/${id}`),
  getStats: () => api.get('/payroll/test/stats'),
};

// Department API
export const departmentAPI = {
  getAll: (params: any = {}) => api.get('/departments', { params }),
  getById: (id: string) => api.get(`/departments/${id}`),
  create: (data: any) => api.post('/departments', data),
  update: (id: string, data: any) => api.put(`/departments/${id}`, data),
  delete: (id: string) => api.delete(`/departments/${id}`),
  getStats: () => api.get('/departments/stats'),
};

// Project API
export const projectAPI = {
  getAll: (params: any = {}) => api.get('/projects', { params }),
  getById: (id: string) => api.get(`/projects/${id}`),
  create: (data: any) => api.post('/projects', data),
  update: (id: string, data: any) => api.put(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
  getStats: () => api.get('/projects/stats'),
};

// Asset API
export const assetAPI = {
  getAll: (params: any = {}) => api.get('/assets', { params }),
  getById: (id: string) => api.get(`/assets/${id}`),
  create: (data: any) => api.post('/assets', data),
  update: (id: string, data: any) => api.put(`/assets/${id}`, data),
  delete: (id: string) => api.delete(`/assets/${id}`),
  getStats: () => api.get('/assets/stats'),
};

// Document API
export const documentAPI = {
  getAll: (params: any = {}) => api.get('/documents', { params }),
  getById: (id: string) => api.get(`/documents/${id}`),
  create: (data: any) => api.post('/documents', data),
  update: (id: string, data: any) => api.put(`/documents/${id}`, data),
  delete: (id: string) => api.delete(`/documents/${id}`),
};

// Chat API
export const chatAPI = {
  // Conversations
  getConversations: (params = {}) => api.get('/chat/conversations', { params }),
  getConversationById: (id: string) => api.get(`/chat/conversations/${id}`),
  createConversation: (data: any) => api.post('/chat/conversations', data),
  updateConversation: (id: string, data: any) => api.put(`/chat/conversations/${id}`, data),
  deleteConversation: (id: string) => api.delete(`/chat/conversations/${id}`),
  
  // Messages
  getMessages: (conversationId: string, params = {}) => api.get(`/chat/conversations/${conversationId}/messages`, { params }),
  sendMessage: (conversationId: string, data: any) => api.post(`/chat/conversations/${conversationId}/messages`, data),
  updateMessage: (conversationId: string, messageId: string, data: any) => api.put(`/chat/conversations/${conversationId}/messages/${messageId}`, data),
  deleteMessage: (conversationId: string, messageId: string) => api.delete(`/chat/conversations/${conversationId}/messages/${messageId}`),
  
  // Reactions
  addReaction: (conversationId: string, messageId: string, reaction: string) => api.post(`/chat/conversations/${conversationId}/messages/${messageId}/reactions`, { reaction }),
  removeReaction: (conversationId: string, messageId: string, reaction: string) => api.delete(`/chat/conversations/${conversationId}/messages/${messageId}/reactions/${reaction}`),
  
  // Typing Indicators
  updateTypingIndicator: (conversationId: string, isTyping: boolean) => api.post(`/chat/conversations/${conversationId}/typing`, { is_typing: isTyping }),
  getTypingUsers: (conversationId: string) => api.get(`/chat/conversations/${conversationId}/typing`),
  
  // Search
  searchMessages: (query: string, params = {}) => api.get('/chat/search', { params: { q: query, ...params } }),
};

// HR API
export const hrAPI = {
  // Employees
  getEmployees: (params = {}) => api.get('/hr/employees', { params }),
  getEmployeeById: (id: string) => api.get(`/hr/employees/${id}`),
  createEmployee: (data: any) => api.post('/hr/employees', data),
  updateEmployee: (id: string, data: any) => api.put(`/hr/employees/${id}`, data),
  deleteEmployee: (id: string) => api.delete(`/hr/employees/${id}`),
  
  // Leave Requests
  getLeaveRequests: (params = {}) => api.get('/hr/leave-requests', { params }),
  createLeaveRequest: (data: any) => api.post('/hr/leave-requests', data),
  updateLeaveRequestStatus: (id: string, data: any) => api.put(`/hr/leave-requests/${id}/status`, data),
  
  // Attendance
  getAttendance: (params = {}) => api.get('/hr/attendance', { params }),
  recordAttendance: (data: any) => api.post('/hr/attendance', data),
  
  // Payroll
  getPayroll: (params = {}) => api.get('/hr/payroll', { params }),
  generatePayroll: (data: any) => api.post('/hr/payroll/generate', data),
  
  // Performance Reviews
  getPerformanceReviews: (params = {}) => api.get('/hr/performance-reviews', { params }),
  createPerformanceReview: (data: any) => api.post('/hr/performance-reviews', data),
  
  // Training
  getTrainingPrograms: (params = {}) => api.get('/hr/training-programs', { params }),
  createTrainingProgram: (data: any) => api.post('/hr/training-programs', data),
  enrollInTraining: (data: any) => api.post('/hr/training-enrollments', data),
  
  // Recruitment
  getJobPostings: (params = {}) => api.get('/hr/job-postings', { params }),
  createJobPosting: (data: any) => api.post('/hr/job-postings', data),
  getCandidates: (params = {}) => api.get('/hr/candidates', { params }),
  createCandidate: (data: any) => api.post('/hr/candidates', data),
  
  // Statistics
  getStats: () => api.get('/hr/stats'),
};

// Finance API
export const financeAPI = {
  // Transactions
  getTransactions: (params = {}) => api.get('/finance/transactions', { params }),
  createTransaction: (data: any) => api.post('/finance/transactions', data),
  
  // Accounts
  getAccounts: (params = {}) => api.get('/finance/accounts', { params }),
  createAccount: (data: any) => api.post('/finance/accounts', data),
  
  // Expenses
  getExpenses: (params = {}) => api.get('/finance/expenses', { params }),
  createExpense: (data: any) => api.post('/finance/expenses', data),
  approveExpense: (id: string, data: any) => api.put(`/finance/expenses/${id}/approve`, data),
  
  // Budgets
  getBudgets: (params = {}) => api.get('/finance/budgets', { params }),
  createBudget: (data: any) => api.post('/finance/budgets', data),
  
  // Invoices
  getInvoices: (params = {}) => api.get('/finance/invoices', { params }),
  createInvoice: (data: any) => api.post('/finance/invoices', data),
  
  // Accounts Receivable
  getAccountsReceivable: (params = {}) => api.get('/finance/accounts-receivable', { params }),
  recordPayment: (id: string, data: any) => api.post(`/finance/accounts-receivable/${id}/payment`, data),
  
  // Accounts Payable
  getAccountsPayable: (params = {}) => api.get('/finance/accounts-payable', { params }),
  recordPaymentMade: (id: string, data: any) => api.post(`/finance/accounts-payable/${id}/payment`, data),
  
  // Reports
  generateReport: (data: any) => api.post('/finance/reports/generate', data),
  
  // Statistics
  getStats: () => api.get('/finance/stats'),
};

// Operations API
export const operationsAPI = {
  // Inventory Items
  getInventoryItems: (params = {}) => api.get('/operations/inventory-items', { params }),
  getInventoryItemById: (id: string) => api.get(`/operations/inventory-items/${id}`),
  createInventoryItem: (data: any) => api.post('/operations/inventory-items', data),
  updateInventoryItem: (id: string, data: any) => api.put(`/operations/inventory-items/${id}`, data),
  
  // Inventory Transactions
  getInventoryTransactions: (params = {}) => api.get('/operations/inventory-transactions', { params }),
  createInventoryTransaction: (data: any) => api.post('/operations/inventory-transactions', data),
  
  // Suppliers
  getSuppliers: (params = {}) => api.get('/operations/suppliers', { params }),
  createSupplier: (data: any) => api.post('/operations/suppliers', data),
  
  // Purchase Orders
  getPurchaseOrders: (params = {}) => api.get('/operations/purchase-orders', { params }),
  createPurchaseOrder: (data: any) => api.post('/operations/purchase-orders', data),
  updatePurchaseOrderStatus: (id: string, data: any) => api.put(`/operations/purchase-orders/${id}/status`, data),
  
  // Warehouses
  getWarehouses: (params = {}) => api.get('/operations/warehouses', { params }),
  createWarehouse: (data: any) => api.post('/operations/warehouses', data),
  
  // Statistics
  getStats: () => api.get('/operations/stats'),
};

// Sales API
export const salesAPI = {
  // Leads
  getLeads: (params = {}) => api.get('/sales/leads', { params }),
  getLeadById: (id: string) => api.get(`/sales/leads/${id}`),
  createLead: (data: any) => api.post('/sales/leads', data),
  updateLead: (id: string, data: any) => api.put(`/sales/leads/${id}`, data),
  convertLead: (id: string, data: any) => api.post(`/sales/leads/${id}/convert`, data),
  
  // Opportunities
  getOpportunities: (params = {}) => api.get('/sales/opportunities', { params }),
  getOpportunityById: (id: string) => api.get(`/sales/opportunities/${id}`),
  createOpportunity: (data: any) => api.post('/sales/opportunities', data),
  updateOpportunity: (id: string, data: any) => api.put(`/sales/opportunities/${id}`, data),
  updateOpportunityStage: (id: string, data: any) => api.put(`/sales/opportunities/${id}/stage`, data),
  
  // Quotes
  getQuotes: (params = {}) => api.get('/sales/quotes', { params }),
  createQuote: (data: any) => api.post('/sales/quotes', data),
  updateQuoteStatus: (id: string, data: any) => api.put(`/sales/quotes/${id}/status`, data),
  
  // Clients
  getClients: (params = {}) => api.get('/sales/clients', { params }),
  createClient: (data: any) => api.post('/sales/clients', data),
  
  // Marketing Campaigns
  getMarketingCampaigns: (params = {}) => api.get('/sales/marketing-campaigns', { params }),
  createMarketingCampaign: (data: any) => api.post('/sales/marketing-campaigns', data),
  
  // Statistics
  getStats: () => api.get('/sales/stats'),
};

// IT API
export const itAPI = {
  // Assets
  getAssets: (params = {}) => api.get('/it/assets', { params }),
  getAssetById: (id: string) => api.get(`/it/assets/${id}`),
  createAsset: (data: any) => api.post('/it/assets', data),
  updateAsset: (id: string, data: any) => api.put(`/it/assets/${id}`, data),
  
  // Support Tickets
  getSupportTickets: (params = {}) => api.get('/it/support-tickets', { params }),
  getSupportTicketById: (id: string) => api.get(`/it/support-tickets/${id}`),
  createSupportTicket: (data: any) => api.post('/it/support-tickets', data),
  updateSupportTicket: (id: string, data: any) => api.put(`/it/support-tickets/${id}`, data),
  assignSupportTicket: (id: string, data: any) => api.put(`/it/support-tickets/${id}/assign`, data),
  closeSupportTicket: (id: string, data: any) => api.put(`/it/support-tickets/${id}/close`, data),
  
  // Systems
  getSystems: (params = {}) => api.get('/it/systems', { params }),
  createSystem: (data: any) => api.post('/it/systems', data),
  
  // Network Devices
  getNetworkDevices: (params = {}) => api.get('/it/network-devices', { params }),
  createNetworkDevice: (data: any) => api.post('/it/network-devices', data),
  
  // Maintenance Schedules
  getMaintenanceSchedules: (params = {}) => api.get('/it/maintenance-schedules', { params }),
  createMaintenanceSchedule: (data: any) => api.post('/it/maintenance-schedules', data),
  updateMaintenanceScheduleStatus: (id: string, data: any) => api.put(`/it/maintenance-schedules/${id}/status`, data),
  
  // Statistics
  getStats: () => api.get('/it/stats'),
};

// Security API
export const securityAPI = {
  // Guards
  getGuards: (params = {}) => api.get('/security/guards', { params }),
  getGuardById: (id: string) => api.get(`/security/guards/${id}`),
  createGuard: (data: any) => api.post('/security/guards', data),
  updateGuard: (id: string, data: any) => api.put(`/security/guards/${id}`, data),
  
  // Incidents
  getIncidents: (params = {}) => api.get('/security/incidents', { params }),
  getIncidentById: (id: string) => api.get(`/security/incidents/${id}`),
  createIncident: (data: any) => api.post('/security/incidents', data),
  updateIncident: (id: string, data: any) => api.put(`/security/incidents/${id}`, data),
  assignIncident: (id: string, data: any) => api.put(`/security/incidents/${id}/assign`, data),
  closeIncident: (id: string, data: any) => api.put(`/security/incidents/${id}/close`, data),
  
  // Assignments
  getAssignments: (params = {}) => api.get('/security/assignments', { params }),
  createAssignment: (data: any) => api.post('/security/assignments', data),
  updateAssignment: (id: string, data: any) => api.put(`/security/assignments/${id}`, data),
  updateAssignmentStatus: (id: string, data: any) => api.put(`/security/assignments/${id}/status`, data),
  
  // Statistics
  getStats: () => api.get('/security/stats'),
};


// User API
export const userAPI = {
  getAll: (params: any = {}) => api.get('/users', { params }),
  getById: (id: string) => api.get(`/users/${id}`),
  create: (data: any) => api.post('/users', data),
  update: (id: string, data: any) => api.put(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
};

// Benefits API
export const benefitsAPI = {
  getAll: (params: any) => api.get('/benefits/test', { params }),
  getStats: () => api.get('/benefits/test/stats'),
  getById: (id: string) => api.get(`/benefits/${id}`),
  create: (data: any) => api.post('/benefits', data),
  update: (id: string, data: any) => api.put(`/benefits/${id}`, data),
  delete: (id: string) => api.delete(`/benefits/${id}`)
};

// Compliance API
export const complianceAPI = {
  getAll: (params: any) => api.get('/compliance/test', { params }),
  getStats: () => api.get('/compliance/test/stats'),
  getById: (id: string) => api.get(`/compliance/${id}`),
  create: (data: any) => api.post('/compliance', data),
  update: (id: string, data: any) => api.put(`/compliance/${id}`, data),
  delete: (id: string) => api.delete(`/compliance/${id}`)
};

// Reports API
export const reportsAPI = {
  getAll: (params: any) => api.get('/reports/test', { params }),
  getStats: () => api.get('/reports/test/stats'),
  getById: (id: string) => api.get(`/reports/${id}`),
  create: (data: any) => api.post('/reports', data),
  update: (id: string, data: any) => api.put(`/reports/${id}`, data),
  delete: (id: string) => api.delete(`/reports/${id}`)
};

// Settings API
export const settingsAPI = {
  getAll: (params: any) => api.get('/settings/test', { params }),
  getStats: () => api.get('/settings/test/stats'),
  getById: (id: string) => api.get(`/settings/${id}`),
  create: (data: any) => api.post('/settings', data),
  update: (id: string, data: any) => api.put(`/settings/${id}`, data),
  delete: (id: string) => api.delete(`/settings/${id}`)
};

// Finance APIs

// Transaction API
export const transactionAPI = {
  getAll: (params: any = {}) => api.get('/transactions/test', { params }),
  getById: (id: string) => api.get(`/transactions/${id}`),
  create: (data: any) => api.post('/transactions', data),
  update: (id: string, data: any) => api.put(`/transactions/${id}`, data),
  delete: (id: string) => api.delete(`/transactions/${id}`),
  getStats: () => api.get('/transactions/test/stats'),
};

// Account API
export const accountAPI = {
  getAll: (params: any = {}) => api.get('/accounts/test', { params }),
  getById: (id: string) => api.get(`/accounts/${id}`),
  create: (data: any) => api.post('/accounts', data),
  update: (id: string, data: any) => api.put(`/accounts/${id}`, data),
  delete: (id: string) => api.delete(`/accounts/${id}`),
  getStats: () => api.get('/accounts/test/stats'),
};

// Vendor API
export const vendorAPI = {
  getAll: (params: any = {}) => api.get('/vendors/test', { params }),
  getById: (id: string) => api.get(`/vendors/${id}`),
  create: (data: any) => api.post('/vendors', data),
  update: (id: string, data: any) => api.put(`/vendors/${id}`, data),
  delete: (id: string) => api.delete(`/vendors/${id}`),
  getStats: () => api.get('/vendors/test/stats'),
};

// Customer API
export const customerAPI = {
  getAll: (params: any = {}) => api.get('/customers/test', { params }),
  getById: (id: string) => api.get(`/customers/${id}`),
  create: (data: any) => api.post('/customers', data),
  update: (id: string, data: any) => api.put(`/customers/${id}`, data),
  delete: (id: string) => api.delete(`/customers/${id}`),
  getStats: () => api.get('/customers/test/stats'),
};

// Expense API
export const expenseAPI = {
  getAll: (params: any = {}) => api.get('/expenses/test', { params }),
  getById: (id: string) => api.get(`/expenses/${id}`),
  create: (data: any) => api.post('/expenses', data),
  update: (id: string, data: any) => api.put(`/expenses/${id}`, data),
  delete: (id: string) => api.delete(`/expenses/${id}`),
  getStats: () => api.get('/expenses/test/stats'),
};

// Budget API
export const budgetAPI = {
  getAll: (params: any = {}) => api.get('/budgets/test', { params }),
  getById: (id: string) => api.get(`/budgets/${id}`),
  create: (data: any) => api.post('/budgets', data),
  update: (id: string, data: any) => api.put(`/budgets/${id}`, data),
  delete: (id: string) => api.delete(`/budgets/${id}`),
  getStats: () => api.get('/budgets/test/stats'),
};

// Tax Record API
export const taxRecordAPI = {
  getAll: (params: any = {}) => api.get('/tax-records/test', { params }),
  getById: (id: string) => api.get(`/tax-records/${id}`),
  create: (data: any) => api.post('/tax-records', data),
  update: (id: string, data: any) => api.put(`/tax-records/${id}`, data),
  delete: (id: string) => api.delete(`/tax-records/${id}`),
  getStats: () => api.get('/tax-records/test/stats'),
};

// Invoice API
export const invoiceAPI = {
  getAll: (params: any = {}) => api.get('/invoices/test', { params }),
  getById: (id: string) => api.get(`/invoices/${id}`),
  create: (data: any) => api.post('/invoices', data),
  update: (id: string, data: any) => api.put(`/invoices/${id}`, data),
  delete: (id: string) => api.delete(`/invoices/${id}`),
  getStats: () => api.get('/invoices/test/stats'),
};

// Bill API
export const billAPI = {
  getAll: (params: any = {}) => api.get('/bills/test', { params }),
  getById: (id: string) => api.get(`/bills/${id}`),
  create: (data: any) => api.post('/bills', data),
  update: (id: string, data: any) => api.put(`/bills/${id}`, data),
  delete: (id: string) => api.delete(`/bills/${id}`),
  getStats: () => api.get('/bills/test/stats'),
};

// Inventory APIs

// Inventory Item API
export const inventoryItemAPI = {
  getAll: (params: any = {}) => api.get('/inventory-items/test', { params }),
  getById: (id: string) => api.get(`/inventory-items/${id}`),
  create: (data: any) => api.post('/inventory-items', data),
  update: (id: string, data: any) => api.put(`/inventory-items/${id}`, data),
  delete: (id: string) => api.delete(`/inventory-items/${id}`),
  getStats: () => api.get('/inventory-items/test/stats'),
};

// Inventory Transaction API
export const inventoryTransactionAPI = {
  getAll: (params: any = {}) => api.get('/inventory-transactions/test', { params }),
  getById: (id: string) => api.get(`/inventory-transactions/${id}`),
  create: (data: any) => api.post('/inventory-transactions', data),
  update: (id: string, data: any) => api.put(`/inventory-transactions/${id}`, data),
  delete: (id: string) => api.delete(`/inventory-transactions/${id}`),
  getStats: () => api.get('/inventory-transactions/test/stats'),
};

// Warehouse API
export const warehouseAPI = {
  getAll: (params: any = {}) => api.get('/warehouses/test', { params }),
  getById: (id: string) => api.get(`/warehouses/${id}`),
  create: (data: any) => api.post('/warehouses', data),
  update: (id: string, data: any) => api.put(`/warehouses/${id}`, data),
  delete: (id: string) => api.delete(`/warehouses/${id}`),
  getStats: () => api.get('/warehouses/test/stats'),
};

// Audit API
export const auditAPI = {
  getLogs: (params: any = {}) => api.get('/audit/logs', { params }),
  getStats: (params: any = {}) => api.get('/audit/stats', { params }),
};

// Lead API
export const leadAPI = {
  getAll: (params: any = {}) => api.get('/leads/test', { params }),
  getById: (id: string) => api.get(`/leads/${id}`),
  create: (data: any) => api.post('/leads', data),
  update: (id: string, data: any) => api.put(`/leads/${id}`, data),
  delete: (id: string) => api.delete(`/leads/${id}`),
  getStats: () => api.get('/leads/test/stats'),
};

// Opportunity API
export const opportunityAPI = {
  getAll: (params: any = {}) => api.get('/opportunities/test', { params }),
  getById: (id: string) => api.get(`/opportunities/${id}`),
  create: (data: any) => api.post('/opportunities', data),
  update: (id: string, data: any) => api.put(`/opportunities/${id}`, data),
  delete: (id: string) => api.delete(`/opportunities/${id}`),
  getStats: () => api.get('/opportunities/test/stats'),
};

// Quote API
export const quoteAPI = {
  getAll: (params: any = {}) => api.get('/quotes/test', { params }),
  getById: (id: string) => api.get(`/quotes/${id}`),
  create: (data: any) => api.post('/quotes', data),
  update: (id: string, data: any) => api.put(`/quotes/${id}`, data),
  delete: (id: string) => api.delete(`/quotes/${id}`),
  getStats: () => api.get('/quotes/test/stats'),
};

// Supplier API
export const supplierAPI = {
  getAll: (params: any = {}) => api.get('/suppliers/test', { params }),
  getById: (id: string) => api.get(`/suppliers/${id}`),
  create: (data: any) => api.post('/suppliers', data),
  update: (id: string, data: any) => api.put(`/suppliers/${id}`, data),
  delete: (id: string) => api.delete(`/suppliers/${id}`),
  getStats: () => api.get('/suppliers/test/stats'),
};

// Support Ticket API
export const supportTicketAPI = {
  getAll: (params: any = {}) => api.get('/support-tickets/test', { params }),
  getById: (id: string) => api.get(`/support-tickets/${id}`),
  create: (data: any) => api.post('/support-tickets', data),
  update: (id: string, data: any) => api.put(`/support-tickets/${id}`, data),
  delete: (id: string) => api.delete(`/support-tickets/${id}`),
  getStats: () => api.get('/support-tickets/test/stats'),
};

// IT Asset API
export const itAssetAPI = {
  getAll: (params: any = {}) => api.get('/it-assets/test', { params }),
  getById: (id: string) => api.get(`/it-assets/${id}`),
  create: (data: any) => api.post('/it-assets', data),
  update: (id: string, data: any) => api.put(`/it-assets/${id}`, data),
  delete: (id: string) => api.delete(`/it-assets/${id}`),
  getStats: () => api.get('/it-assets/test/stats'),
};

// Security Guard API
export const securityGuardAPI = {
  getAll: (params: any = {}) => api.get('/security-guards/test', { params }),
  getById: (id: string) => api.get(`/security-guards/${id}`),
  create: (data: any) => api.post('/security-guards', data),
  update: (id: string, data: any) => api.put(`/security-guards/${id}`, data),
  delete: (id: string) => api.delete(`/security-guards/${id}`),
  getStats: () => api.get('/security-guards/test/stats'),
};

// Security Incident API
export const securityIncidentAPI = {
  getAll: (params: any = {}) => api.get('/security-incidents/test', { params }),
  getById: (id: string) => api.get(`/security-incidents/${id}`),
  create: (data: any) => api.post('/security-incidents', data),
  update: (id: string, data: any) => api.put(`/security-incidents/${id}`, data),
  delete: (id: string) => api.delete(`/security-incidents/${id}`),
  getStats: () => api.get('/security-incidents/test/stats'),
};

// Report API
export const reportAPI = {
  getAll: (params: any = {}) => api.get('/reports/test', { params }),
  getById: (id: string) => api.get(`/reports/${id}`),
  create: (data: any) => api.post('/reports', data),
  update: (id: string, data: any) => api.put(`/reports/${id}`, data),
  delete: (id: string) => api.delete(`/reports/${id}`),
  getStats: () => api.get('/reports/test/stats'),
};

// ============================================================================
// MOCK DATA FOR DEMO MODE
// ============================================================================

// Mock data generators
const generateMockStats = () => ({
  total: Math.floor(Math.random() * 1000) + 100,
  active: Math.floor(Math.random() * 500) + 50,
  pending: Math.floor(Math.random() * 100) + 10,
  completed: Math.floor(Math.random() * 300) + 20,
  revenue: Math.floor(Math.random() * 1000000) + 100000,
  growth: (Math.random() * 20 - 10).toFixed(1) + '%'
});

// Realistic employee names for demo
const employeeNames = [
  'Jean Ndayisaba', 'Claudine Uwimana', 'Pierre Nkurunziza', 'Marie Mukamana', 'Paul Kagame',
  'Grace Uwase', 'David Nkurunziza', 'Alice Mukamana', 'John Ndayisaba', 'Sarah Uwimana',
  'Peter Kagame', 'Ruth Mukamana', 'Joseph Nkurunziza', 'Esther Uwase', 'Daniel Ndayisaba',
  'Hannah Uwimana', 'Samuel Kagame', 'Rebecca Mukamana', 'Isaac Nkurunziza', 'Miriam Uwase'
];

const positions = [
  'Software Engineer', 'HR Manager', 'Finance Director', 'Sales Representative', 'Operations Manager',
  'IT Support Specialist', 'Marketing Coordinator', 'Project Manager', 'Accountant', 'Security Guard',
  'Customer Service Rep', 'Data Analyst', 'Business Analyst', 'Quality Assurance', 'Network Administrator'
];

const departments = ['HR', 'Finance', 'IT', 'Sales', 'Operations', 'Security', 'Marketing', 'Administration'];

const generateMockEmployee = (id: number) => ({
  id: id,
  name: employeeNames[id % employeeNames.length],
  email: `${employeeNames[id % employeeNames.length].toLowerCase().replace(' ', '.')}@dicel.co.rw`,
  position: positions[id % positions.length],
  department: departments[id % departments.length],
  status: ['active', 'pending', 'on-leave'][Math.floor(Math.random() * 3)],
  phone: `+250 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100}`,
  hireDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  salary: Math.floor(Math.random() * 5000000) + 500000,
  avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(employeeNames[id % employeeNames.length])}&background=random`
});

const generateMockList = (count: number = 10, type: string = 'generic') => {
  if (type === 'employee') {
    return Array.from({ length: count }, (_, i) => generateMockEmployee(i + 1));
  }
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Demo Item ${i + 1}`,
    status: ['active', 'pending', 'completed'][Math.floor(Math.random() * 3)],
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: Math.floor(Math.random() * 10000) + 1000,
    department: departments[Math.floor(Math.random() * departments.length)]
  }));
};

const generateMockDashboard = () => ({
  monthlyRevenue: 12500000,
  monthlyExpenses: 8500000,
  monthlyProfit: 4000000,
  totalReceivables: 3200000,
  recentTransactions: [
    {
      id: '1',
      type: 'income',
      description: 'Software License Sales',
      amount: 2500000,
      transactionDate: '2024-09-20',
      status: 'completed',
      category: 'Sales'
    },
    {
      id: '2',
      type: 'expense',
      description: 'Office Rent',
      amount: 800000,
      transactionDate: '2024-09-18',
      status: 'completed',
      category: 'Operations'
    },
    {
      id: '3',
      type: 'income',
      description: 'Consulting Services',
      amount: 1800000,
      transactionDate: '2024-09-15',
      status: 'completed',
      category: 'Services'
    },
    {
      id: '4',
      type: 'expense',
      description: 'Employee Salaries',
      amount: 4200000,
      transactionDate: '2024-09-10',
      status: 'completed',
      category: 'Payroll'
    }
  ],
  stats: generateMockStats(),
  recentActivity: generateMockList(5),
  charts: {
    revenue: Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2024, i).toLocaleDateString('en-US', { month: 'short' }),
      value: Math.floor(Math.random() * 100000) + 50000
    })),
    users: Array.from({ length: 7 }, (_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      value: Math.floor(Math.random() * 100) + 20
    }))
  }
});

const generateHRDashboard = () => ({
  stats: {
    totalEmployees: 150,
    activeEmployees: 142,
    onLeave: 8,
    newHires: 12,
    totalDepartments: 8,
    averageSalary: 2500000,
    turnoverRate: 5.2,
    satisfactionScore: 4.3
  },
  recentActivity: generateMockList(5, 'employee'),
  charts: {
    employeesByDepartment: departments.map(dept => ({
      department: dept,
      count: Math.floor(Math.random() * 30) + 10
    })),
    monthlyHires: Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2024, i).toLocaleDateString('en-US', { month: 'short' }),
      hires: Math.floor(Math.random() * 10) + 1
    }))
  }
});

// Mock API functions
const mockAPI = {
  // Auth
  login: () => Promise.resolve({
    data: {
      success: true,
      token: 'demo-token-12345',
      user: {
        id: 1,
        name: 'Demo User',
        email: 'demo@dicel.com',
        role: 'admin',
        department: 'Management'
      }
    }
  }),

  // HR APIs
  hrStats: () => Promise.resolve({ data: generateHRDashboard() }),
  employees: (params: any = {}) => Promise.resolve({ 
    data: { 
      employees: generateMockList(20, 'employee'),
      total: 150,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),
  jobPostings: (params: any = {}) => Promise.resolve({ 
    data: { 
      jobPostings: [
        { id: 1, title: 'Senior Software Engineer', department: 'IT', location: 'Kigali', status: 'active', applicants: 25, postedDate: '2024-09-15' },
        { id: 2, title: 'HR Manager', department: 'HR', location: 'Kigali', status: 'active', applicants: 18, postedDate: '2024-09-10' },
        { id: 3, title: 'Finance Analyst', department: 'Finance', location: 'Kigali', status: 'closed', applicants: 32, postedDate: '2024-09-05' },
        { id: 4, title: 'Sales Representative', department: 'Sales', location: 'Kigali', status: 'active', applicants: 15, postedDate: '2024-09-12' },
        { id: 5, title: 'Operations Manager', department: 'Operations', location: 'Kigali', status: 'active', applicants: 22, postedDate: '2024-09-08' }
      ],
      total: 45,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),
  candidates: (params: any = {}) => Promise.resolve({ 
    data: { 
      candidates: [
        { id: 1, name: 'Alice Mukamana', position: 'Software Engineer', status: 'interviewed', experience: '3 years', appliedDate: '2024-09-15' },
        { id: 2, name: 'David Nkurunziza', position: 'HR Manager', status: 'shortlisted', experience: '5 years', appliedDate: '2024-09-12' },
        { id: 3, name: 'Ruth Mukamana', position: 'Finance Analyst', status: 'hired', experience: '2 years', appliedDate: '2024-09-10' },
        { id: 4, name: 'Samuel Kagame', position: 'Sales Rep', status: 'pending', experience: '1 year', appliedDate: '2024-09-14' },
        { id: 5, name: 'Esther Uwase', position: 'Operations Manager', status: 'rejected', experience: '4 years', appliedDate: '2024-09-08' }
      ],
      total: 120,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),
  training: (params: any = {}) => Promise.resolve({ 
    data: { 
      enrollments: [
        { id: 1, employeeName: 'Jean Ndayisaba', courseName: 'Leadership Development', status: 'completed', progress: 100, enrolledDate: '2024-09-01' },
        { id: 2, employeeName: 'Claudine Uwimana', courseName: 'Project Management', status: 'in-progress', progress: 65, enrolledDate: '2024-09-05' },
        { id: 3, employeeName: 'Pierre Nkurunziza', courseName: 'Financial Analysis', status: 'enrolled', progress: 0, enrolledDate: '2024-09-10' },
        { id: 4, employeeName: 'Marie Mukamana', courseName: 'Customer Service Excellence', status: 'completed', progress: 100, enrolledDate: '2024-08-15' },
        { id: 5, employeeName: 'Paul Kagame', courseName: 'Digital Marketing', status: 'in-progress', progress: 40, enrolledDate: '2024-09-08' }
      ],
      total: 85,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),
  payroll: (params: any = {}) => Promise.resolve({ 
    data: { 
      payroll: [
        { id: 1, employeeName: 'Jean Ndayisaba', position: 'Software Engineer', basicSalary: 2500000, allowances: 500000, deductions: 200000, netSalary: 2800000, status: 'paid' },
        { id: 2, employeeName: 'Claudine Uwimana', position: 'HR Manager', basicSalary: 3000000, allowances: 600000, deductions: 250000, netSalary: 3350000, status: 'paid' },
        { id: 3, employeeName: 'Pierre Nkurunziza', position: 'Finance Director', basicSalary: 4000000, allowances: 800000, deductions: 350000, netSalary: 4450000, status: 'pending' },
        { id: 4, employeeName: 'Marie Mukamana', position: 'Sales Rep', basicSalary: 2000000, allowances: 300000, deductions: 150000, netSalary: 2150000, status: 'paid' },
        { id: 5, employeeName: 'Paul Kagame', position: 'Operations Manager', basicSalary: 3500000, allowances: 700000, deductions: 300000, netSalary: 3900000, status: 'paid' }
      ],
      total: 200,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),
  performance: (params: any = {}) => Promise.resolve({ 
    data: { 
      reviews: [
        { id: 1, employeeName: 'Jean Ndayisaba', position: 'Software Engineer', rating: 4.5, goals: 8, achievements: 7, status: 'completed', reviewDate: '2024-09-15' },
        { id: 2, employeeName: 'Claudine Uwimana', position: 'HR Manager', rating: 4.8, goals: 9, achievements: 8, status: 'completed', reviewDate: '2024-09-10' },
        { id: 3, employeeName: 'Pierre Nkurunziza', position: 'Finance Director', rating: 4.2, goals: 7, achievements: 6, status: 'in-progress', reviewDate: '2024-09-20' },
        { id: 4, employeeName: 'Marie Mukamana', position: 'Sales Rep', rating: 4.6, goals: 8, achievements: 7, status: 'completed', reviewDate: '2024-09-12' },
        { id: 5, employeeName: 'Paul Kagame', position: 'Operations Manager', rating: 4.3, goals: 7, achievements: 6, status: 'pending', reviewDate: '2024-09-25' }
      ],
      total: 75,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),
  leave: (params: any = {}) => Promise.resolve({ 
    data: { 
      requests: [
        { id: 1, employeeName: 'Jean Ndayisaba', leaveType: 'Annual Leave', startDate: '2024-10-01', endDate: '2024-10-05', days: 5, status: 'approved', reason: 'Family vacation' },
        { id: 2, employeeName: 'Claudine Uwimana', leaveType: 'Sick Leave', startDate: '2024-09-20', endDate: '2024-09-22', days: 3, status: 'approved', reason: 'Medical appointment' },
        { id: 3, employeeName: 'Pierre Nkurunziza', leaveType: 'Emergency Leave', startDate: '2024-09-25', endDate: '2024-09-26', days: 2, status: 'pending', reason: 'Family emergency' },
        { id: 4, employeeName: 'Marie Mukamana', leaveType: 'Maternity Leave', startDate: '2024-11-01', endDate: '2025-01-30', days: 90, status: 'approved', reason: 'Maternity leave' },
        { id: 5, employeeName: 'Paul Kagame', leaveType: 'Study Leave', startDate: '2024-10-15', endDate: '2024-10-17', days: 3, status: 'pending', reason: 'Professional development course' }
      ],
      total: 95,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),
  attendance: (params: any = {}) => Promise.resolve({ 
    data: { 
      records: generateMockList(35),
      total: 250,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),
  benefits: (params: any = {}) => Promise.resolve({ 
    data: { 
      benefits: generateMockList(8),
      total: 25,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),
  compliance: (params: any = {}) => Promise.resolve({ 
    data: { 
      policies: generateMockList(15),
      total: 40,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),

  // Finance APIs
  financeStats: () => Promise.resolve({ data: generateMockDashboard() }),
  invoices: (params: any = {}) => Promise.resolve({ 
    data: { 
      invoices: generateMockList(20),
      total: 180,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),
  transactions: (params: any = {}) => Promise.resolve({ 
    data: { 
      items: [
        {
          id: '1',
          transactionNumber: 'TXN-001',
          type: 'income',
          description: 'Software License Sales',
          amount: 2500000,
          transactionDate: '2024-09-20',
          status: 'completed',
          category: 'Sales'
        },
        {
          id: '2',
          transactionNumber: 'TXN-002',
          type: 'expense',
          description: 'Office Rent',
          amount: 800000,
          transactionDate: '2024-09-18',
          status: 'completed',
          category: 'Operations'
        },
        {
          id: '3',
          transactionNumber: 'TXN-003',
          type: 'income',
          description: 'Consulting Services',
          amount: 1800000,
          transactionDate: '2024-09-15',
          status: 'completed',
          category: 'Services'
        },
        {
          id: '4',
          transactionNumber: 'TXN-004',
          type: 'expense',
          description: 'Employee Salaries',
          amount: 4200000,
          transactionDate: '2024-09-10',
          status: 'completed',
          category: 'Payroll'
        },
        {
          id: '5',
          transactionNumber: 'TXN-005',
          type: 'income',
          description: 'Product Sales',
          amount: 3200000,
          transactionDate: '2024-09-08',
          status: 'completed',
          category: 'Sales'
        },
        {
          id: '6',
          transactionNumber: 'TXN-006',
          type: 'expense',
          description: 'Marketing Campaign',
          amount: 650000,
          transactionDate: '2024-09-05',
          status: 'completed',
          category: 'Marketing'
        }
      ],
      total: 25,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),
  accounts: (params: any = {}) => Promise.resolve({ 
    data: { 
      items: [
        {
          id: '1',
          name: 'Main Checking Account',
          type: 'checking',
          currentBalance: 8500000
        },
        {
          id: '2',
          name: 'Business Savings',
          type: 'savings',
          currentBalance: 3200000
        },
        {
          id: '3',
          name: 'Petty Cash',
          type: 'cash',
          currentBalance: 250000
        }
      ],
      total: 3,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),
  budgets: (params: any = {}) => Promise.resolve({ 
    data: { 
      items: [
        {
          id: '1',
          name: 'Q4 2024 Budget',
          amount: 15000000,
          spent: 8500000,
          category: 'Operations'
        }
      ],
      total: 5,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),

  // Sales APIs
  salesStats: () => Promise.resolve({ data: generateMockDashboard() }),
  leads: (params: any = {}) => Promise.resolve({ 
    data: { 
      leads: generateMockList(30),
      total: 200,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),
  opportunities: (params: any = {}) => Promise.resolve({ 
    data: { 
      opportunities: generateMockList(18),
      total: 120,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),
  quotes: (params: any = {}) => Promise.resolve({ 
    data: { 
      quotes: generateMockList(15),
      total: 80,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),

  // Operations APIs
  operationsStats: () => Promise.resolve({ data: generateMockDashboard() }),
  projects: (params: any = {}) => Promise.resolve({ 
    data: { 
      projects: generateMockList(20),
      total: 150,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),
  inventory: (params: any = {}) => Promise.resolve({ 
    data: { 
      items: generateMockList(25),
      total: 200,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),
  suppliers: (params: any = {}) => Promise.resolve({ 
    data: { 
      suppliers: generateMockList(15),
      total: 60,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),

  // IT APIs
  itStats: () => Promise.resolve({ data: generateMockDashboard() }),
  tickets: (params: any = {}) => Promise.resolve({ 
    data: { 
      tickets: generateMockList(20),
      total: 100,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),
  assets: (params: any = {}) => Promise.resolve({ 
    data: { 
      assets: generateMockList(18),
      total: 80,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),

  // Security APIs
  securityStats: () => Promise.resolve({ data: generateMockDashboard() }),
  guards: (params: any = {}) => Promise.resolve({ 
    data: { 
      guards: generateMockList(12),
      total: 25,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),
  incidents: (params: any = {}) => Promise.resolve({ 
    data: { 
      incidents: generateMockList(8),
      total: 15,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),

  // Chat API
  conversations: () => Promise.resolve({ 
    data: { 
      success: true,
      data: {
        items: [
          {
            id: '1',
            name: 'HR Team Chat',
            type: 'group',
            description: 'HR department discussions',
            lastMessage: {
              id: '101',
              content: 'The new employee onboarding process is ready for review',
              sender_id: '2',
              sender: {
                id: '2',
                firstName: 'Claudine',
                lastName: 'Uwimana',
                avatar_url: 'https://ui-avatars.com/api/?name=Claudine+Uwimana&background=random'
              },
              created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
              message_type: 'text'
            },
            participants: [
              {
                id: '1',
                user_id: '1',
                user: {
                  id: '1',
                  firstName: 'Jean',
                  lastName: 'Ndayisaba',
                  email: 'jean.ndayisaba@dicel.co.rw',
                  avatar_url: 'https://ui-avatars.com/api/?name=Jean+Ndayisaba&background=random'
                }
              },
              {
                id: '2',
                user_id: '2',
                user: {
                  id: '2',
                  firstName: 'Claudine',
                  lastName: 'Uwimana',
                  email: 'claudine.uwimana@dicel.co.rw',
                  avatar_url: 'https://ui-avatars.com/api/?name=Claudine+Uwimana&background=random'
                }
              }
            ],
            unreadCount: 3,
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '2',
            name: 'Finance Updates',
            type: 'group',
            description: 'Financial reports and updates',
            lastMessage: {
              id: '102',
              content: 'Monthly financial report has been generated',
              sender_id: '3',
              sender: {
                id: '3',
                firstName: 'Pierre',
                lastName: 'Nkurunziza',
                avatar_url: 'https://ui-avatars.com/api/?name=Pierre+Nkurunziza&background=random'
              },
              created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
              message_type: 'text'
            },
            participants: [
              {
                id: '3',
                user_id: '3',
                user: {
                  id: '3',
                  firstName: 'Pierre',
                  lastName: 'Nkurunziza',
                  email: 'pierre.nkurunziza@dicel.co.rw',
                  avatar_url: 'https://ui-avatars.com/api/?name=Pierre+Nkurunziza&background=random'
                }
              },
              {
                id: '1',
                user_id: '1',
                user: {
                  id: '1',
                  firstName: 'Jean',
                  lastName: 'Ndayisaba',
                  email: 'jean.ndayisaba@dicel.co.rw',
                  avatar_url: 'https://ui-avatars.com/api/?name=Jean+Ndayisaba&background=random'
                }
              }
            ],
            unreadCount: 1,
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '3',
            name: 'Marie Mukamana',
            type: 'direct',
            description: 'Direct message with Marie',
            lastMessage: {
              id: '103',
              content: 'Thanks for the update on the project timeline',
              sender_id: '4',
              sender: {
                id: '4',
                firstName: 'Marie',
                lastName: 'Mukamana',
                avatar_url: 'https://ui-avatars.com/api/?name=Marie+Mukamana&background=random'
              },
              created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
              message_type: 'text'
            },
            participants: [
              {
                id: '4',
                user_id: '4',
                user: {
                  id: '4',
                  firstName: 'Marie',
                  lastName: 'Mukamana',
                  email: 'marie.mukamana@dicel.co.rw',
                  avatar_url: 'https://ui-avatars.com/api/?name=Marie+Mukamana&background=random'
                }
              },
              {
                id: '1',
                user_id: '1',
                user: {
                  id: '1',
                  firstName: 'Jean',
                  lastName: 'Ndayisaba',
                  email: 'jean.ndayisaba@dicel.co.rw',
                  avatar_url: 'https://ui-avatars.com/api/?name=Jean+Ndayisaba&background=random'
                }
              }
            ],
            unreadCount: 0,
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
          },
          {
            id: '4',
            name: 'IT Support',
            type: 'group',
            description: 'Technical support and IT issues',
            lastMessage: {
              id: '104',
              content: 'The server maintenance has been completed successfully',
              sender_id: '5',
              sender: {
                id: '5',
                firstName: 'Paul',
                lastName: 'Kagame',
                avatar_url: 'https://ui-avatars.com/api/?name=Paul+Kagame&background=random'
              },
              created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
              message_type: 'text'
            },
            participants: [
              {
                id: '5',
                user_id: '5',
                user: {
                  id: '5',
                  firstName: 'Paul',
                  lastName: 'Kagame',
                  email: 'paul.kagame@dicel.co.rw',
                  avatar_url: 'https://ui-avatars.com/api/?name=Paul+Kagame&background=random'
                }
              },
              {
                id: '1',
                user_id: '1',
                user: {
                  id: '1',
                  firstName: 'Jean',
                  lastName: 'Ndayisaba',
                  email: 'jean.ndayisaba@dicel.co.rw',
                  avatar_url: 'https://ui-avatars.com/api/?name=Jean+Ndayisaba&background=random'
                }
              }
            ],
            unreadCount: 2,
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
          }
        ]
      }
    }
  }),
  
  messages: (conversationId: string) => Promise.resolve({
    data: {
      success: true,
      data: {
        items: conversationId === '1' ? [
          {
            id: '101',
            content: 'The new employee onboarding process is ready for review',
            sender_id: '2',
            sender: {
              id: '2',
              firstName: 'Claudine',
              lastName: 'Uwimana',
              avatar_url: 'https://ui-avatars.com/api/?name=Claudine+Uwimana&background=random'
            },
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            message_type: 'text'
          },
          {
            id: '102',
            content: 'Great work! I\'ll review it this afternoon',
            sender_id: '1',
            sender: {
              id: '1',
              firstName: 'Jean',
              lastName: 'Ndayisaba',
              avatar_url: 'https://ui-avatars.com/api/?name=Jean+Ndayisaba&background=random'
            },
            created_at: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
            message_type: 'text'
          },
          {
            id: '103',
            content: 'The training materials are also updated',
            sender_id: '2',
            sender: {
              id: '2',
              firstName: 'Claudine',
              lastName: 'Uwimana',
              avatar_url: 'https://ui-avatars.com/api/?name=Claudine+Uwimana&background=random'
            },
            created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            message_type: 'text'
          }
        ] : [
          {
            id: '201',
            content: 'Welcome to the team!',
            sender_id: '1',
            sender: {
              id: '1',
              firstName: 'Jean',
              lastName: 'Ndayisaba',
              avatar_url: 'https://ui-avatars.com/api/?name=Jean+Ndayisaba&background=random'
            },
            created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            message_type: 'text'
          }
        ]
      }
    }
  }),
  
  sendMessage: (conversationId: string, messageData: any) => Promise.resolve({
    data: {
      success: true,
      data: {
        id: Date.now().toString(),
        content: messageData.content,
        sender_id: '1',
        sender: {
          id: '1',
          firstName: 'Jean',
          lastName: 'Ndayisaba',
          avatar_url: 'https://ui-avatars.com/api/?name=Jean+Ndayisaba&background=random'
        },
        created_at: new Date().toISOString(),
        message_type: messageData.message_type || 'text'
      }
    }
  }),
  
  createConversation: (conversationData: any) => Promise.resolve({
    data: {
      success: true,
      data: {
        id: Date.now().toString(),
        name: conversationData.name || 'New Conversation',
        type: conversationData.type || 'direct',
        description: conversationData.description,
        participants: conversationData.participantIds.map((id: string, index: number) => ({
          id: (index + 1).toString(),
          user_id: id,
          user: {
            id: id,
            firstName: ['Alice', 'Bob', 'Charlie'][index] || 'User',
            lastName: ['Smith', 'Johnson', 'Brown'][index] || 'Name',
            email: `user${id}@dicel.co.rw`,
            avatar_url: `https://ui-avatars.com/api/?name=User+${id}&background=random`
          }
        })),
        unreadCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
  }),

  // Reports API
  reports: (params: any = {}) => Promise.resolve({ 
    data: { 
      reports: generateMockList(10),
      total: 35,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),

  // Additional specific endpoints
  trainingCourses: (params: any = {}) => Promise.resolve({ 
    data: { 
      courses: [
        { id: 1, name: 'Leadership Development', instructor: 'Dr. Sarah Uwimana', duration: '5 days', status: 'active', enrolled: 25 },
        { id: 2, name: 'Project Management', instructor: 'Jean Ndayisaba', duration: '3 days', status: 'active', enrolled: 18 },
        { id: 3, name: 'Financial Analysis', instructor: 'Marie Mukamana', duration: '4 days', status: 'completed', enrolled: 12 },
        { id: 4, name: 'Customer Service Excellence', instructor: 'Paul Kagame', duration: '2 days', status: 'active', enrolled: 30 },
        { id: 5, name: 'Digital Marketing', instructor: 'Grace Uwase', duration: '3 days', status: 'upcoming', enrolled: 15 }
      ],
      total: 30,
      page: params.page || 1,
      limit: params.limit || 10
    }
  }),
  leaveTypes: () => Promise.resolve({ 
    data: { 
      types: [
        { id: 1, name: 'Annual Leave', days: 21, description: 'Paid annual vacation leave' },
        { id: 2, name: 'Sick Leave', days: 10, description: 'Medical leave for illness' },
        { id: 3, name: 'Maternity Leave', days: 90, description: 'Maternity leave for new mothers' },
        { id: 4, name: 'Paternity Leave', days: 14, description: 'Paternity leave for new fathers' },
        { id: 5, name: 'Emergency Leave', days: 5, description: 'Emergency personal leave' },
        { id: 6, name: 'Study Leave', days: 7, description: 'Leave for educational purposes' }
      ]
    }
  })
};

// Override API functions when in demo mode
if (DEMO_MODE) {
  // Override auth API
  authAPI.login = mockAPI.login;

  // Override HR APIs
  hrAPI.getStats = mockAPI.hrStats;
  employeeAPI.getAll = mockAPI.employees;
  jobPostingAPI.getAll = mockAPI.jobPostings;
  candidateAPI.getAll = mockAPI.candidates;
  trainingAPI.getAll = mockAPI.training;
  trainingAPI.getStats = mockAPI.training;
  trainingAPI.getAllCourses = mockAPI.trainingCourses;
  trainingAPI.getAllEnrollments = mockAPI.training;
  payrollAPI.getAll = mockAPI.payroll;
  performanceAPI.getAll = mockAPI.performance;
  leaveAPI.getAll = mockAPI.leave;
  leaveAPI.getStats = mockAPI.leave;
  leaveAPI.getAllTypes = mockAPI.leaveTypes;
  leaveAPI.getAllRequests = mockAPI.leave;
  attendanceAPI.getAll = mockAPI.attendance;
  attendanceAPI.getStats = mockAPI.attendance;
  benefitsAPI.getAll = mockAPI.benefits;
  benefitsAPI.getStats = mockAPI.benefits;
  complianceAPI.getAll = mockAPI.compliance;
  complianceAPI.getStats = mockAPI.compliance;

  // Override Finance APIs
  financeAPI.getStats = mockAPI.financeStats;
  financeAPI.getTransactions = mockAPI.transactions;
  financeAPI.getAccounts = mockAPI.accounts;
  financeAPI.getBudgets = mockAPI.budgets;
  invoiceAPI.getAll = mockAPI.invoices;
  invoiceAPI.getStats = mockAPI.invoices;
  transactionAPI.getAll = mockAPI.transactions;
  transactionAPI.getStats = mockAPI.transactions;
  budgetAPI.getAll = mockAPI.budgets;
  budgetAPI.getStats = mockAPI.budgets;

  // Override Sales APIs
  salesAPI.getStats = mockAPI.salesStats;
  leadAPI.getAll = mockAPI.leads;
  leadAPI.getStats = mockAPI.leads;
  opportunityAPI.getAll = mockAPI.opportunities;
  opportunityAPI.getStats = mockAPI.opportunities;
  quoteAPI.getAll = mockAPI.quotes;
  quoteAPI.getStats = mockAPI.quotes;

  // Override Operations APIs
  operationsAPI.getStats = mockAPI.operationsStats;
  projectAPI.getAll = mockAPI.projects;
  projectAPI.getStats = mockAPI.projects;
  inventoryItemAPI.getAll = mockAPI.inventory;
  inventoryItemAPI.getStats = mockAPI.inventory;
  supplierAPI.getAll = mockAPI.suppliers;
  supplierAPI.getStats = mockAPI.suppliers;

  // Override IT APIs
  itAPI.getStats = mockAPI.itStats;
  supportTicketAPI.getAll = mockAPI.tickets;
  supportTicketAPI.getStats = mockAPI.tickets;
  itAssetAPI.getAll = mockAPI.assets;
  itAssetAPI.getStats = mockAPI.assets;

  // Override Security APIs
  securityAPI.getStats = mockAPI.securityStats;
  securityGuardAPI.getAll = mockAPI.guards;
  securityGuardAPI.getStats = mockAPI.guards;
  securityIncidentAPI.getAll = mockAPI.incidents;
  securityIncidentAPI.getStats = mockAPI.incidents;

  // Override Chat API
  chatAPI.getConversations = mockAPI.conversations;
  chatAPI.getMessages = mockAPI.messages;
  chatAPI.sendMessage = mockAPI.sendMessage;
  chatAPI.createConversation = mockAPI.createConversation;

  // Override Reports API
  reportAPI.getAll = mockAPI.reports;
  reportAPI.getStats = mockAPI.reports;
  reportsAPI.getAll = mockAPI.reports;
  reportsAPI.getStats = mockAPI.reports;

  // Override Settings API
  settingsAPI.getAll = mockAPI.reports;
  settingsAPI.getStats = mockAPI.reports;

  // Override Audit API
  auditAPI.getLogs = mockAPI.reports;
  auditAPI.getStats = mockAPI.reports;

  console.log('🎭 DEMO MODE ENABLED - Using mock data for all API calls');
}

export default api;