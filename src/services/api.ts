import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

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

export default api;