import { User } from '../contexts/AuthContext';

// Mock user data for demo purposes
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@dicel.co.rw',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    department: 'admin',
    isActive: true,
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
    isActive: true,
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
    isActive: true,
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
    isActive: true,
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
    isActive: true,
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
    isActive: true,
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
    isActive: true,
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
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Mock authentication service
export const authService = {
  async login(email: string, _password: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists in mock data
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // For demo purposes, accept any password
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
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    
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
  }
};