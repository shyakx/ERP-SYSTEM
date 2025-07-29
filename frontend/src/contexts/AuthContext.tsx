import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthContextType, User } from '../types';
import { authService } from '../services/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      // Check if there's already a user in localStorage
      const existingUserData = localStorage.getItem('user-data');
      
      if (existingUserData) {
        try {
          const existingUser = JSON.parse(existingUserData);
          setUser(existingUser);
        } catch (error) {
          console.error('Error parsing existing user data:', error);
          // Clear invalid data
          localStorage.removeItem('user-data');
          localStorage.removeItem('auth-token');
        }
      }
      
      // Force a small delay to ensure state updates
      setTimeout(() => {
        setLoading(false);
      }, 100);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await authService.login(email, password);
      if (result) {
        setUser(result.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const switchUser = async (email: string, password: string = 'Password123!') => {
    try {
      const success = await login(email, password);
      if (success) {
        console.log('Switched to user:', email);
      } else {
        console.error('Failed to switch to user:', email);
      }
    } catch (error) {
      console.error('Error switching user:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
    switchUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};