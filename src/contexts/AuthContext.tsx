import React, { createContext, useContext, useState, useEffect } from 'react';
import { authenticateUser, registerUser, getUsers, getUserById } from '../services/auth';

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
  getDashboardRoute: (role: string) => string;
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
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          // Check if it's a demo token
          if (token.startsWith('demo_')) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
          } else {
            // For real tokens, we'll use the stored user data
            // In a production app, you might want to validate the token with the backend
            const userData = JSON.parse(storedUser);
            setUser(userData);
          }
        } catch (error) {
          // If parsing fails, remove token
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userData = await authenticateUser(email, password);
      if (userData) {
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
      const newUser = await registerUser(userData);
      if (newUser) {
        setUser(newUser);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Function to get the appropriate dashboard route based on user role
  const getDashboardRoute = (role: string): string => {
    switch (role) {
      case 'admin':
        return '/admin';
      case 'hr':
        return '/hr';
      case 'finance':
        return '/finance';
      case 'it':
        return '/it';
      case 'security':
        return '/security';
      case 'inventory':
        return '/inventory';
      case 'sales':
        return '/sales';
      case 'cx':
        return '/cx';
      case 'risk':
        return '/risk';
      case 'recovery':
        return '/recovery';
      case 'employee':
      default:
        return '/hr'; // Default to HR dashboard for employees
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, getDashboardRoute }}>
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