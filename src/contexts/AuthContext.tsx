import React, { createContext, useContext, useState, useEffect } from 'react';
import { authenticateUser, getUsers, getUserById } from '../services/auth';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'hr' | 'finance' | 'it' | 'security' | 'compliance' | 'inventory' | 'client' | 'sales' | 'cx' | 'risk' | 'recovery' | 'employee';
  department?: string;
  phone?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // For now, we'll use a simple mock user since we don't have a real auth service
        const mockUser: User = {
          id: '1',
          email: 'admin@dicel.co.rw',
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin',
          department: 'admin',
          phone: '+250 788 123 456',
          isActive: true,
          lastLogin: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setUser(mockUser);
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userData = await authenticateUser(email, password);
      if (userData) {
        const token = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('token', token);
        setUser(userData);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      // For now, we'll create a simple mock user
      const mockUser: User = {
        id: '2',
        email: userData.email,
        firstName: userData.firstName || 'New',
        lastName: userData.lastName || 'User',
        role: userData.role || 'employee',
        department: userData.department,
        phone: userData.phone,
        isActive: true,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const token = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('token', token);
      setUser(mockUser);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext }