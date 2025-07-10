import { User, UserRole } from '../types';

// Mock users for development
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@dicelsecurity.com',
    name: 'System Administrator',
    role: 'system_admin',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T10:30:00Z',
    isActive: true
  },
  {
    id: '2',
    email: 'hr@dicelsecurity.com',
    name: 'HR Manager',
    role: 'hr_manager',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T09:15:00Z',
    isActive: true
  },
  {
    id: '3',
    email: 'finance@dicelsecurity.com',
    name: 'Finance Manager',
    role: 'finance_manager',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T08:45:00Z',
    isActive: true
  },
  {
    id: '4',
    email: 'operations@dicelsecurity.com',
    name: 'Operations Supervisor',
    role: 'operations_supervisor',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T07:30:00Z',
    isActive: true
  },
  {
    id: '5',
    email: 'guard@dicelsecurity.com',
    name: 'Security Guard',
    role: 'security_guard',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T06:00:00Z',
    isActive: true
  }
];

export const authService = {
  login: async (email: string, password: string): Promise<{ user: User; token: string } | null> => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) return null;
      const data = await response.json();
      if (data.user && data.token) {
        localStorage.setItem('auth-token', data.token);
        localStorage.setItem('user-data', JSON.stringify(data.user));
        return { user: data.user, token: data.token };
      }
      return null;
    } catch {
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-data');
  },

  getCurrentUser: (): User | null => {
    const userData = localStorage.getItem('user-data');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  },

  getToken: (): string | null => {
    return localStorage.getItem('auth-token');
  },

  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('auth-token');
    return !!token;
  },

  hasRole: (user: User | null, requiredRoles: UserRole[]): boolean => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  }
};