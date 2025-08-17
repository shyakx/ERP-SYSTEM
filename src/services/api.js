import axios from 'axios';

// Determine API URL based on environment
const getApiUrl = () => {
  // Production (AWS CloudFront or S3)
  if (window.location.hostname.includes('cloudfront.net') || 
      window.location.hostname.includes('s3-website') ||
      window.location.hostname.includes('amazonaws.com') ||
      window.location.hostname.includes('apprunner.aws') ||
      window.location.hostname.includes('elasticbeanstalk.com')) {
    // Production backend URL - update this when deploying
    return 'https://your-production-backend-url.com/api';
  }
  // Development - new local backend
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiUrl();

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
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
  (response) => {
    console.log('✅ API Response:', response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.config?.url, error.message, error.code);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    // Handle backend not available gracefully
    if (error.code === 'ECONNABORTED' || 
        error.response?.status === 0 || 
        error.response?.status === 503 ||
        error.code === 'ERR_NETWORK' ||
        error.message?.includes('Network Error') ||
        error.message?.includes('Connection refused') ||
        error.message?.includes('Failed to fetch')) {
      
      console.warn('🔄 Backend server not available for:', error.config?.url);
      
      // Return empty data instead of fallback data
      const url = error.config?.url || '';
      
      // Return empty data for all endpoints
      if (url.includes('/test/stats') || url.includes('/test')) {
        console.log('📊 Returning empty data for:', url);
        return Promise.resolve({
          data: {
            success: true,
            data: {
              items: [],
              total: 0,
            page: 1,
            limit: 10
            }
          }
        });
      }
      
      // Default empty response
      console.log('📊 Providing empty fallback data for:', url);
      return Promise.resolve({
        data: {
          success: true,
          data: [],
          items: [],
          message: 'Backend server not available - no data'
        }
      });
    }
    
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
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
  getAll: (params = {}) => api.get('/employees/test', { params }),
  getById: (id) => api.get(`/employees/${id}`),
  create: (data) => api.post('/employees', data),
  update: (id, data) => api.put(`/employees/${id}`, data),
  delete: (id) => api.delete(`/employees/${id}`),
  getStats: () => api.get('/employees/test/stats'),
};

// Job Posting API
export const jobPostingAPI = {
  getAll: (params = {}) => api.get('/job-postings/test', { params }),
  getById: (id) => api.get(`/job-postings/${id}`),
  create: (data) => api.post('/job-postings', data),
  update: (id, data) => api.put(`/job-postings/${id}`, data),
  delete: (id) => api.delete(`/job-postings/${id}`),
  getStats: () => api.get('/job-postings/test/stats'),
};

// Candidate API
export const candidateAPI = {
  getAll: (params = {}) => api.get('/candidates/test', { params }),
  getById: (id) => api.get(`/candidates/${id}`),
  create: (data) => api.post('/candidates', data),
  update: (id, data) => api.put(`/candidates/${id}`, data),
  delete: (id) => api.delete(`/candidates/${id}`),
  updateStatus: (id, status) => api.patch(`/candidates/${id}/status`, status),
  getStats: () => api.get('/candidates/test/stats'),
};

// Training API
export const trainingAPI = {
  // Courses
  getAllCourses: (params = {}) => api.get('/training/courses/test', { params }),
  getCourseById: (id) => api.get(`/training/courses/${id}`),
  createCourse: (data) => api.post('/training/courses', data),
  updateCourse: (id, data) => api.put(`/training/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/training/courses/${id}`),
  
  // Enrollments
  getAllEnrollments: (params = {}) => api.get('/training/enrollments/test', { params }),
  enrollEmployee: (data) => api.post('/training/enroll', data),
  updateEnrollmentStatus: (id, status) => api.patch(`/training/enrollments/${id}/status`, status),
  deleteEnrollment: (id) => api.delete(`/training/enrollments/${id}`),
  
  // Stats
  getStats: () => api.get('/training/test/stats'),
};

// Leave API
export const leaveAPI = {
  // Requests
  getAllRequests: (params = {}) => api.get('/leave/requests/test', { params }),
  getRequestById: (id) => api.get(`/leave/requests/${id}`),
  createRequest: (data) => api.post('/leave/requests', data),
  updateRequest: (id, data) => api.put(`/leave/requests/${id}`, data),
  deleteRequest: (id) => api.delete(`/leave/requests/${id}`),
  updateRequestStatus: (id, status) => api.patch(`/leave/requests/${id}/status`, status),
  
  // Types
  getAllTypes: () => api.get('/leave/types/test'),
  createType: (data) => api.post('/leave/types', data),
  updateType: (id, data) => api.put(`/leave/types/${id}`, data),
  
  // Stats
  getStats: () => api.get('/leave/test/stats'),
};

// Attendance API
export const attendanceAPI = {
  getAll: (params = {}) => api.get('/attendance/test', { params }),
  getById: (id) => api.get(`/attendance/${id}`),
  create: (data) => api.post('/attendance', data),
  update: (id, data) => api.put(`/attendance/${id}`, data),
  delete: (id) => api.delete(`/attendance/${id}`),
  checkIn: (data) => api.post('/attendance/checkin', data),
  checkOut: (data) => api.post('/attendance/checkout', data),
  getStats: () => api.get('/attendance/test/stats'),
};

// Performance API
export const performanceAPI = {
  getAll: (params = {}) => api.get('/performance/test', { params }),
  getById: (id) => api.get(`/performance/${id}`),
  create: (data) => api.post('/performance', data),
  update: (id, data) => api.put(`/performance/${id}`, data),
  delete: (id) => api.delete(`/performance/${id}`),
  getStats: () => api.get('/performance/test/stats'),
};

// Payroll API
export const payrollAPI = {
  getAll: (params = {}) => api.get('/payroll/test', { params }),
  getById: (id) => api.get(`/payroll/${id}`),
  create: (data) => api.post('/payroll', data),
  update: (id, data) => api.put(`/payroll/${id}`, data),
  delete: (id) => api.delete(`/payroll/${id}`),
  getStats: () => api.get('/payroll/test/stats'),
};

// Department API
export const departmentAPI = {
  getAll: (params = {}) => api.get('/departments', { params }),
  getById: (id) => api.get(`/departments/${id}`),
  create: (data) => api.post('/departments', data),
  update: (id, data) => api.put(`/departments/${id}`, data),
  delete: (id) => api.delete(`/departments/${id}`),
  getStats: () => api.get('/departments/stats'),
};

// Project API
export const projectAPI = {
  getAll: (params = {}) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
  getStats: () => api.get('/projects/stats'),
};

// Asset API
export const assetAPI = {
  getAll: (params = {}) => api.get('/assets', { params }),
  getById: (id) => api.get(`/assets/${id}`),
  create: (data) => api.post('/assets', data),
  update: (id, data) => api.put(`/assets/${id}`, data),
  delete: (id) => api.delete(`/assets/${id}`),
  getStats: () => api.get('/assets/stats'),
};

// Document API
export const documentAPI = {
  getAll: (params = {}) => api.get('/documents', { params }),
  getById: (id) => api.get(`/documents/${id}`),
  create: (data) => api.post('/documents', data),
  update: (id, data) => api.put(`/documents/${id}`, data),
  delete: (id) => api.delete(`/documents/${id}`),
};

// Chat/Messaging API
/** @type {import('../types/api').ChatAPI} */
export const chatAPI = {
  // Conversations
  getConversations: (params = {}) => api.get('/chat/conversations', { params }),
  getConversationById: (id) => api.get(`/chat/conversations/${id}`),
  createConversation: (data) => api.post('/chat/conversations', data),
  updateConversation: (id, data) => api.put(`/chat/conversations/${id}`, data),
  deleteConversation: (id) => api.delete(`/chat/conversations/${id}`),
  
  // Messages
  getMessages: (conversationId, params = {}) => api.get(`/chat/conversations/${conversationId}/messages`, { params }),
  sendMessage: (conversationId, data) => api.post(`/chat/conversations/${conversationId}/messages`, data),
  updateMessage: (conversationId, messageId, data) => api.put(`/chat/conversations/${conversationId}/messages/${messageId}`, data),
  deleteMessage: (conversationId, messageId) => api.delete(`/chat/conversations/${conversationId}/messages/${messageId}`),
  
  // Channels
  getChannels: (params = {}) => api.get('/chat/channels', { params }),
  getChannelById: (id) => api.get(`/chat/channels/${id}`),
  createChannel: (data) => api.post('/chat/channels', data),
  updateChannel: (id, data) => api.put(`/chat/channels/${id}`, data),
  deleteChannel: (id) => api.delete(`/chat/channels/${id}`),
  joinChannel: (id) => api.post(`/chat/channels/${id}/join`),
  leaveChannel: (id) => api.post(`/chat/channels/${id}/leave`),
  
  // Contacts
  getContacts: (params = {}) => api.get('/chat/contacts', { params }),
  getContactById: (id) => api.get(`/chat/contacts/${id}`),
  addContact: (data) => api.post('/chat/contacts', data),
  removeContact: (id) => api.delete(`/chat/contacts/${id}`),
  
  // File Upload
  uploadFile: (conversationId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/chat/conversations/${conversationId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // Message Reactions
  addReaction: (conversationId, messageId, reaction) => api.post(`/chat/conversations/${conversationId}/messages/${messageId}/reactions`, { reaction }),
  removeReaction: (conversationId, messageId, reaction) => api.delete(`/chat/conversations/${conversationId}/messages/${messageId}/reactions/${reaction}`),
  
  // Message Status
  markAsRead: (conversationId, messageId) => api.post(`/chat/conversations/${conversationId}/messages/${messageId}/read`),
  markConversationAsRead: (conversationId) => api.post(`/chat/conversations/${conversationId}/read`),
  
  // Typing Indicators
  sendTypingIndicator: (conversationId, isTyping) => api.post(`/chat/conversations/${conversationId}/typing`, { isTyping }),
  
  // Search
  searchMessages: (query, params = {}) => api.get('/chat/search', { params: { q: query, ...params } }),
  
  // Statistics
  getStats: () => api.get('/chat/stats'),
  
  // Legacy endpoints for backward compatibility
  getAll: (params = {}) => api.get('/chat', { params }),
  getById: (id) => api.get(`/chat/${id}`),
  create: (data) => api.post('/chat', data),
  update: (id, data) => api.put(`/chat/${id}`, data),
  delete: (id) => api.delete(`/chat/${id}`),
};

// User API
export const userAPI = {
  getAll: (params = {}) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

// Benefits API
export const benefitsAPI = {
  getAll: (params) => api.get('/benefits/test', { params }),
  getStats: () => api.get('/benefits/test/stats'),
  getById: (id) => api.get(`/benefits/${id}`),
  create: (data) => api.post('/benefits', data),
  update: (id, data) => api.put(`/benefits/${id}`, data),
  delete: (id) => api.delete(`/benefits/${id}`)
};

// Compliance API
export const complianceAPI = {
  getAll: (params) => api.get('/compliance/test', { params }),
  getStats: () => api.get('/compliance/test/stats'),
  getById: (id) => api.get(`/compliance/${id}`),
  create: (data) => api.post('/compliance', data),
  update: (id, data) => api.put(`/compliance/${id}`, data),
  delete: (id) => api.delete(`/compliance/${id}`)
};

// Reports API
export const reportsAPI = {
  getAll: (params) => api.get('/reports/test', { params }),
  getStats: () => api.get('/reports/test/stats'),
  getById: (id) => api.get(`/reports/${id}`),
  create: (data) => api.post('/reports', data),
  update: (id, data) => api.put(`/reports/${id}`, data),
  delete: (id) => api.delete(`/reports/${id}`)
};

// Settings API
export const settingsAPI = {
  getAll: (params) => api.get('/settings/test', { params }),
  getStats: () => api.get('/settings/test/stats'),
  getById: (id) => api.get(`/settings/${id}`),
  create: (data) => api.post('/settings', data),
  update: (id, data) => api.put(`/settings/${id}`, data),
  delete: (id) => api.delete(`/settings/${id}`)
};

export default api;