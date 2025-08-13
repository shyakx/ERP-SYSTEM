import axios from 'axios';

// Determine API URL based on environment
const getApiUrl = () => {
  // For now, always use dummy URL to trigger fallback system
  // This ensures consistent behavior whether in development or production
  return 'http://dummy-backend-url-that-will-fail.com/api';
  
  // Uncomment below when you have a real backend running
  // if (window.location.hostname.includes('cloudfront.net') || 
  //     window.location.hostname.includes('s3-website') ||
  //     window.location.hostname.includes('amazonaws.com')) {
  //   return 'http://dummy-backend-url-that-will-fail.com/api';
  // }
  // return 'http://localhost:5000/api';
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
    
    // Handle backend not available gracefully - catch all connection errors
    if (error.code === 'ECONNABORTED' || 
        error.response?.status === 0 || 
        error.response?.status === 503 ||
        error.code === 'ERR_NETWORK' ||
        error.message?.includes('Network Error') ||
        error.message?.includes('Connection refused') ||
        error.message?.includes('Failed to fetch')) {
      
      console.warn('🔄 Backend server not available, using fallback data for:', error.config?.url);
      
      // Return mock data based on the request URL
      const url = error.config?.url || '';
      
      // Stats endpoints
      if (url.includes('/employees/test/stats')) {
        console.log('📊 Providing fallback data for employee stats');
        return Promise.resolve({
          data: {
            success: true,
            data: {
              total: 5,
              active: 5,
              new: 2,
              turnover: 0
            }
          }
        });
      }
      
      if (url.includes('/job-postings/test/stats')) {
        console.log('📊 Providing fallback data for job posting stats');
        return Promise.resolve({
          data: {
            success: true,
            data: {
              total: 2,
              active: 2,
              applications: 23,
              filled: 0
            }
          }
        });
      }
      
      if (url.includes('/candidates/test/stats')) {
        console.log('📊 Providing fallback data for candidate stats');
        return Promise.resolve({
          data: {
            success: true,
            data: {
              total: 2,
              shortlisted: 1,
              interviewed: 1,
              hired: 0
            }
          }
        });
      }
      
      if (url.includes('/training/test/stats')) {
        console.log('📊 Providing fallback data for training stats');
        return Promise.resolve({
          data: {
            success: true,
            data: {
              courses: 2,
              enrollments: 2,
              completed: 0,
              ongoing: 2
            }
          }
        });
      }
      
      if (url.includes('/leave/test/stats')) {
        console.log('📊 Providing fallback data for leave stats');
        return Promise.resolve({
          data: {
            success: true,
            data: {
              requests: 2,
              approved: 1,
              pending: 1,
              rejected: 0
            }
          }
        });
      }
      
      if (url.includes('/attendance/test/stats')) {
        console.log('📊 Providing fallback data for attendance stats');
        return Promise.resolve({
          data: {
            success: true,
            data: {
              present: 2,
              absent: 0,
              late: 0,
              overtime: 1
            }
          }
        });
      }
      
      if (url.includes('/performance/test/stats')) {
        console.log('📊 Providing fallback data for performance stats');
        return Promise.resolve({
          data: {
            success: true,
            data: {
              reviews: 2,
              average: 4.75,
              excellent: 1,
              good: 1
            }
          }
        });
      }
      
      if (url.includes('/payroll/test/stats')) {
        console.log('📊 Providing fallback data for payroll stats');
        return Promise.resolve({
          data: {
            success: true,
            data: {
              total: 2,
              paid: 2,
              pending: 0,
              amount: 5225000
            }
          }
        });
      }
      
      // List endpoints for dashboard data
      if (url.includes('/employees/test')) {
        console.log('📊 Providing fallback data for employee list');
        return Promise.resolve({
          data: {
            success: true,
            items: [
              {
                id: '1',
                employeeId: 'EMP001',
                firstName: 'Jean Pierre',
                lastName: 'Uwimana',
                position: 'Software Developer',
                department: 'IT',
                location: 'Kigali',
                status: 'Active'
              },
              {
                id: '2',
                employeeId: 'EMP002',
                firstName: 'Marie Claire',
                lastName: 'Niyonsaba',
                position: 'HR Manager',
                department: 'HR',
                location: 'Kigali',
                status: 'Active'
              },
              {
                id: '3',
                employeeId: 'EMP003',
                firstName: 'Emmanuel',
                lastName: 'Ndayisaba',
                position: 'Marketing Specialist',
                department: 'Marketing',
                location: 'Kigali',
                status: 'Active'
              },
              {
                id: '4',
                employeeId: 'EMP004',
                firstName: 'Ange',
                lastName: 'Uwineza',
                position: 'Finance Manager',
                department: 'Finance',
                location: 'Kigali',
                status: 'Active'
              },
              {
                id: '5',
                employeeId: 'EMP005',
                firstName: 'Patrick',
                lastName: 'Nshimiyimana',
                position: 'Sales Representative',
                department: 'Sales',
                location: 'Kigali',
                status: 'Active'
              }
            ],
            total: 5,
            page: 1,
            limit: 10
          }
        });
      }
      
      if (url.includes('/training/courses/test')) {
        console.log('📊 Providing fallback data for training courses');
        return Promise.resolve({
          data: {
            success: true,
            items: [
              {
                id: '1',
                title: 'Advanced JavaScript Development',
                department: 'IT',
                instructor: 'Jean Pierre Uwimana',
                duration: '3 days',
                capacity: 20,
                enrolled: 15,
                status: 'Active',
                startDate: '2024-03-01',
                endDate: '2024-03-03'
              },
              {
                id: '2',
                title: 'Leadership Skills Workshop',
                department: 'HR',
                instructor: 'Marie Claire Niyonsaba',
                duration: '2 days',
                capacity: 15,
                enrolled: 12,
                status: 'Active',
                startDate: '2024-03-15',
                endDate: '2024-03-16'
              }
            ],
            total: 2,
            page: 1,
            limit: 10
          }
        });
      }
      
      if (url.includes('/leave/requests/test')) {
        console.log('📊 Providing fallback data for leave requests');
        return Promise.resolve({
          data: {
            success: true,
            items: [
              {
                id: '1',
                employeeId: 'EMP001',
                leaveType: 'Annual Leave',
                startDate: '2024-02-15',
                endDate: '2024-02-20',
                days: 6,
                reason: 'Family vacation',
                status: 'Approved'
              },
              {
                id: '2',
                employeeId: 'EMP002',
                leaveType: 'Sick Leave',
                startDate: '2024-02-10',
                endDate: '2024-02-12',
                days: 3,
                reason: 'Medical appointment',
                status: 'Pending'
              }
            ],
            total: 2,
            page: 1,
            limit: 10
          }
        });
      }
      
      if (url.includes('/attendance/test')) {
        console.log('📊 Providing fallback data for attendance');
        return Promise.resolve({
          data: {
            success: true,
            items: [
              {
                id: '1',
                employeeId: 'EMP001',
                date: '2024-02-08',
                checkIn: '08:30:00',
                checkOut: '17:30:00',
                totalHours: '9h 0m',
                status: 'Present',
                overtime: '1h 0m'
              },
              {
                id: '2',
                employeeId: 'EMP002',
                date: '2024-02-08',
                checkIn: '08:00:00',
                checkOut: '17:00:00',
                totalHours: '9h 0m',
                status: 'Present',
                overtime: '0h 0m'
              }
            ],
            total: 2,
            page: 1,
            limit: 10
          }
        });
      }
      
      if (url.includes('/performance/test')) {
        console.log('📊 Providing fallback data for performance');
        return Promise.resolve({
          data: {
            success: true,
            items: [
              {
                id: '1',
                employeeId: 'EMP001',
                reviewDate: '2024-01-15',
                rating: 4.5,
                status: 'Completed',
                supervisor: 'Marie Claire Niyonsaba'
              },
              {
                id: '2',
                employeeId: 'EMP002',
                reviewDate: '2024-01-20',
                rating: 5.0,
                status: 'Completed',
                supervisor: 'System Administrator'
              }
            ],
            total: 2,
            page: 1,
            limit: 10
          }
        });
      }
      
      if (url.includes('/payroll/test')) {
        console.log('📊 Providing fallback data for payroll');
        return Promise.resolve({
          data: {
            success: true,
            items: [
              {
                id: '1',
                employeeId: 'EMP001',
                month: '1',
                year: 2024,
                basicSalary: 'RWF 2,500,000',
                netSalary: 'RWF 2,375,000',
                status: 'Paid',
                paymentDate: '2024-01-31'
              },
              {
                id: '2',
                employeeId: 'EMP002',
                month: '1',
                year: 2024,
                basicSalary: 'RWF 3,000,000',
                netSalary: 'RWF 2,850,000',
                status: 'Paid',
                paymentDate: '2024-01-31'
              }
            ],
            total: 2,
            page: 1,
            limit: 10
          }
        });
      }
      
      // Finance endpoints
      if (url.includes('/transactions/test')) {
        console.log('📊 Providing fallback data for transactions');
        return Promise.resolve({
          data: {
            success: true,
            items: [
              {
                id: '1',
                type: 'income',
                amount: 5000000,
                description: 'Client Payment',
                status: 'completed',
                date: '2024-02-08'
              },
              {
                id: '2',
                type: 'expense',
                amount: 1500000,
                description: 'Office Supplies',
                status: 'completed',
                date: '2024-02-07'
              }
            ],
            total: 2,
            page: 1,
            limit: 10
          }
        });
      }
      
      if (url.includes('/accounts/test')) {
        console.log('📊 Providing fallback data for accounts');
        return Promise.resolve({
          data: {
            success: true,
            items: [
              {
                id: '1',
                name: 'Main Bank Account',
                type: 'bank',
                currentBalance: 25000000,
                currency: 'RWF'
              },
              {
                id: '2',
                name: 'Petty Cash',
                type: 'cash',
                currentBalance: 500000,
                currency: 'RWF'
              }
            ],
            total: 2,
            page: 1,
            limit: 10
          }
        });
      }
      
      if (url.includes('/budgets/test')) {
        console.log('📊 Providing fallback data for budgets');
        return Promise.resolve({
          data: {
            success: true,
            items: [
              {
                id: '1',
                name: 'IT Department Budget',
                amount: 10000000,
                spent: 6500000,
                remaining: 3500000
              },
              {
                id: '2',
                name: 'Marketing Budget',
                amount: 8000000,
                spent: 5200000,
                remaining: 2800000
              }
            ],
            total: 2,
            page: 1,
            limit: 10
          }
        });
      }
      
      // Messaging endpoints
      if (url.includes('/chat/conversations')) {
        console.log('📊 Providing fallback data for conversations');
        return Promise.resolve({
          data: {
            success: true,
            items: [
              {
                id: "conv-1",
                name: "Marie Claire Niyonsaba",
                type: "direct",
                avatar: "MC",
                lastMessage: "Can you review the security audit report?",
                lastMessageTime: "2 min ago",
                unreadCount: 2,
                isOnline: true,
                members: ["Marie Claire Niyonsaba"],
                isPinned: true,
                role: "admin"
              },
              {
                id: "conv-2",
                name: "Finance Team",
                type: "group",
                avatar: "FT",
                lastMessage: "Budget approval needed for Q2",
                lastMessageTime: "15 min ago",
                unreadCount: 0,
                isOnline: false,
                members: ["Finance Manager", "Accountant", "Analyst"],
                isPinned: false,
                isMuted: true
              },
              {
                id: "conv-3",
                name: "IT Support",
                type: "group",
                avatar: "IT",
                lastMessage: "System maintenance scheduled for tonight",
                lastMessageTime: "1 hour ago",
                unreadCount: 5,
                isOnline: true,
                members: ["IT Manager", "Tech Support", "Network Admin"],
                isPinned: true,
                role: "moderator"
              },
              {
                id: "conv-4",
                name: "Security Alert",
                type: "channel",
                avatar: "SA",
                lastMessage: "New security protocol implemented",
                lastMessageTime: "3 hours ago",
                unreadCount: 1,
                isOnline: false,
                members: ["Security Team"],
                isPinned: true,
                isArchived: false
              },
              {
                id: "conv-5",
                name: "HR Updates",
                type: "channel",
                avatar: "HR",
                lastMessage: "New employee onboarding process",
                lastMessageTime: "1 day ago",
                unreadCount: 0,
                isOnline: false,
                members: ["HR Team"],
                isPinned: false,
                isMuted: true
              }
            ],
            total: 5,
            page: 1,
            limit: 20
          }
        });
      }
      
      if (url.includes('/chat/channels')) {
        console.log('📊 Providing fallback data for channels');
        return Promise.resolve({
          data: {
            success: true,
            items: [
              {
                id: "channel-1",
                name: "general",
                description: "Company-wide announcements and updates",
                memberCount: 45,
                isPrivate: false,
                lastActivity: "2 min ago",
                topics: ["announcements", "updates", "general"],
                isJoined: true,
                isMuted: false
              },
              {
                id: "channel-2",
                name: "security-alerts",
                description: "Real-time security notifications and alerts",
                memberCount: 12,
                isPrivate: true,
                lastActivity: "5 min ago",
                topics: ["security", "alerts", "incidents"],
                isJoined: true,
                isMuted: false
              },
              {
                id: "channel-3",
                name: "tech-support",
                description: "Technical support and IT assistance",
                memberCount: 8,
                isPrivate: false,
                lastActivity: "1 hour ago",
                topics: ["support", "technical", "help"],
                isJoined: true,
                isMuted: true
              },
              {
                id: "channel-4",
                name: "project-alpha",
                description: "Project Alpha development team",
                memberCount: 15,
                isPrivate: true,
                lastActivity: "2 hours ago",
                topics: ["development", "project", "alpha"],
                isJoined: false,
                isMuted: false
              }
            ],
            total: 4,
            page: 1,
            limit: 20
          }
        });
      }
      
      if (url.includes('/chat/contacts')) {
        console.log('📊 Providing fallback data for contacts');
        return Promise.resolve({
          data: {
            success: true,
            items: [
              { id: '1', name: "Marie Claire Niyonsaba", role: "Security Manager", avatar: "MC", isOnline: true },
              { id: '2', name: "Finance Manager", role: "Finance Department", avatar: "FM", isOnline: false },
              { id: '3', name: "IT Manager", role: "IT Department", avatar: "IM", isOnline: true },
              { id: '4', name: "HR Manager", role: "Human Resources", avatar: "HM", isOnline: false },
              { id: '5', name: "Operations Lead", role: "Operations", avatar: "OL", isOnline: true }
            ],
            total: 5,
            page: 1,
            limit: 20
          }
        });
      }
      
      if (url.includes('/chat/conversations/') && url.includes('/messages')) {
        console.log('📊 Providing fallback data for messages');
        return Promise.resolve({
          data: {
            success: true,
            items: [
              {
                id: "msg-1",
                sender: "Marie Claire Niyonsaba",
                senderAvatar: "MC",
                content: "Hi! Can you review the security audit report I just uploaded?",
                timestamp: "10:30 AM",
                type: "text",
                isRead: true,
                isStarred: false,
                reactions: [{ emoji: "👍", count: 2, users: ["You", "Admin"] }]
              },
              {
                id: "msg-2",
                sender: "You",
                senderAvatar: "Y",
                content: "Sure! I'll take a look at it right away. Which specific sections should I focus on?",
                timestamp: "10:32 AM",
                type: "text",
                isRead: true,
                isStarred: false,
                reactions: []
              },
              {
                id: "msg-3",
                sender: "Marie Claire Niyonsaba",
                senderAvatar: "MC",
                content: "Please check the access control section and the incident response procedures. I've highlighted the areas that need attention.",
                timestamp: "10:35 AM",
                type: "text",
                isRead: true,
                isStarred: true,
                reactions: [{ emoji: "⭐", count: 1, users: ["You"] }]
              },
              {
                id: "msg-4",
                sender: "You",
                senderAvatar: "Y",
                content: "Perfect! I can see the highlighted sections. I'll review them and get back to you with my feedback by end of day.",
                timestamp: "10:37 AM",
                type: "text",
                isRead: false,
                isStarred: false,
                reactions: [{ emoji: "👍", count: 1, users: ["Marie Claire Niyonsaba"] }]
              },
              {
                id: "msg-5",
                sender: "Marie Claire Niyonsaba",
                senderAvatar: "MC",
                content: "Great! Also, I've attached the latest compliance checklist. Can you verify if we're meeting all the requirements?",
                timestamp: "10:40 AM",
                type: "file",
                fileName: "compliance-checklist-2024.pdf",
                fileSize: "2.3 MB",
                fileUrl: "#",
                isRead: false,
                isStarred: false,
                reactions: []
              }
            ],
            total: 5,
            page: 1,
            limit: 50
          }
        });
      }
      
      if (url.includes('/chat/stats')) {
        console.log('📊 Providing fallback data for chat stats');
        return Promise.resolve({
          data: {
            success: true,
            data: {
              totalConversations: 5,
              totalMessages: 127,
              unreadMessages: 8,
              activeUsers: 12,
              totalChannels: 4,
              totalContacts: 25
            }
          }
        });
      }
      
      // Handle sendMessage POST requests
      if (url.includes('/chat/conversations/') && url.includes('/messages') && error.config?.method === 'post') {
        console.log('📊 Providing fallback response for sendMessage');
        const messageData = error.config?.data ? JSON.parse(error.config.data) : {};
        const conversationId = url.split('/chat/conversations/')[1]?.split('/messages')[0];
        
        return Promise.resolve({
          data: {
            success: true,
            message: {
              id: `msg-${Date.now()}`,
              sender: "You",
              senderAvatar: "Y",
              content: messageData.content || "Message sent",
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              type: messageData.type || "text",
              isRead: false,
              isStarred: false,
              reactions: [],
              fileName: messageData.fileName,
              fileSize: messageData.fileSize,
              fileUrl: messageData.fileUrl
            }
          }
        });
      }
      
      // Default fallback for any other API calls
      console.log('📊 Providing default fallback data for:', url);
      return Promise.resolve({
        data: {
          success: true,
          data: [],
          items: [],
          message: 'Backend server not available - using demo data'
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

