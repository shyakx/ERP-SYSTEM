import { User } from '../contexts/AuthContext';

// Mock user data for demo purposes with comprehensive credentials
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@dicel.co.rw',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    department: 'admin',
    phone: '+250 788 123 456',
    isActive: true,
    lastLogin: '2024-01-20T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'hr@dicel.co.rw',
    firstName: 'HR',
    lastName: 'Manager',
    role: 'hr',
    department: 'hr',
    phone: '+250 788 234 567',
    isActive: true,
    lastLogin: '2024-01-20T09:15:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    email: 'finance@dicel.co.rw',
    firstName: 'Finance',
    lastName: 'Manager',
    role: 'finance',
    department: 'finance',
    phone: '+250 788 345 678',
    isActive: true,
    lastLogin: '2024-01-20T08:45:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    email: 'it@dicel.co.rw',
    firstName: 'IT',
    lastName: 'Manager',
    role: 'it',
    department: 'it',
    phone: '+250 788 456 789',
    isActive: true,
    lastLogin: '2024-01-20T11:20:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    email: 'security@dicel.co.rw',
    firstName: 'Security',
    lastName: 'Manager',
    role: 'security',
    department: 'security-guard-management',
    phone: '+250 788 567 890',
    isActive: true,
    lastLogin: '2024-01-20T07:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    email: 'compliance@dicel.co.rw',
    firstName: 'Compliance',
    lastName: 'Manager',
    role: 'compliance',
    department: 'compliance',
    phone: '+250 788 678 901',
    isActive: true,
    lastLogin: '2024-01-20T10:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '7',
    email: 'inventory@dicel.co.rw',
    firstName: 'Inventory',
    lastName: 'Manager',
    role: 'inventory',
    department: 'inventory',
    phone: '+250 788 789 012',
    isActive: true,
    lastLogin: '2024-01-20T09:45:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '8',
    email: 'client@dicel.co.rw',
    firstName: 'Client',
    lastName: 'Manager',
    role: 'client',
    department: 'client-management',
    phone: '+250 788 890 123',
    isActive: true,
    lastLogin: '2024-01-20T11:15:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '9',
    email: 'sales@dicel.co.rw',
    firstName: 'Sales',
    lastName: 'Manager',
    role: 'sales',
    department: 'sales-marketing',
    phone: '+250 788 901 234',
    isActive: true,
    lastLogin: '2024-01-20T08:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '10',
    email: 'cx@dicel.co.rw',
    firstName: 'Customer',
    lastName: 'Experience',
    role: 'cx',
    department: 'customer-experience',
    phone: '+250 788 012 345',
    isActive: true,
    lastLogin: '2024-01-20T10:45:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '11',
    email: 'risk@dicel.co.rw',
    firstName: 'Risk',
    lastName: 'Management',
    role: 'risk',
    department: 'risk-management',
    phone: '+250 788 123 456',
    isActive: true,
    lastLogin: '2024-01-20T09:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '12',
    email: 'recovery@dicel.co.rw',
    firstName: 'Recovery',
    lastName: 'Manager',
    role: 'recovery',
    department: 'recovery',
    phone: '+250 788 234 567',
    isActive: true,
    lastLogin: '2024-01-20T08:15:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Password mapping for each user
const userPasswords: { [email: string]: string } = {
  'admin@dicel.co.rw': 'admin123',
  'hr@dicel.co.rw': 'hr123',
  'finance@dicel.co.rw': 'finance123',
  'it@dicel.co.rw': 'it123',
  'security@dicel.co.rw': 'security123',
  'compliance@dicel.co.rw': 'compliance123',
  'inventory@dicel.co.rw': 'inventory123',
  'client@dicel.co.rw': 'client123',
  'sales@dicel.co.rw': 'sales123',
  'cx@dicel.co.rw': 'cx123',
  'risk@dicel.co.rw': 'risk123',
  'recovery@dicel.co.rw': 'recovery123'
};

// Mock authentication service
export const authService = {
  async login(email: string, password: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists in mock data
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Check password
    const expectedPassword = userPasswords[email];
    if (password !== expectedPassword) {
      throw new Error('Invalid email or password');
    }
    
    // Update last login
    user.lastLogin = new Date().toISOString();
    
    const token = `mock-token-${user.id}-${Date.now()}`;
    
    return {
      token,
      user
    };
  },

  async register(userData: Record<string, unknown>) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: `${mockUsers.length + 1}`,
      email: userData.email as string,
      firstName: (userData.firstName as string) || (userData.name as string)?.split(' ')[0] || 'New',
      lastName: (userData.lastName as string) || (userData.name as string)?.split(' ')[1] || 'User',
      role: 'employee',
      department: (userData.department as string) || 'general',
      phone: userData.phone as string || '',
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    
    // Add password for new user
    userPasswords[newUser.email] = userData.password as string || 'password123';
    
    const token = `mock-token-${newUser.id}-${Date.now()}`;
    
    return {
      token,
      user: newUser
    };
  },

  async getProfile() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    
    // Extract user ID from mock token
    const userId = token.split('-')[2];
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return { user };
  },

  // Helper method to get all users (for admin purposes)
  async getAllUsers() {
    return mockUsers.map(user => ({
      ...user,
      password: '***' // Don't expose passwords
    }));
  },

  // Helper method to get credentials for testing
  getCredentials() {
    return Object.entries(userPasswords).map(([email, password]) => ({
      email,
      password,
      role: mockUsers.find(u => u.email === email)?.role || 'unknown'
    }));
  }
};