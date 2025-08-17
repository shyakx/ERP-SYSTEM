import { User } from '../contexts/AuthContext';

// Empty user data - no mock data
const mockUsers: User[] = [];

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  // Mock authentication - accept any credentials for testing
  const mockUser: User = {
    id: '1',
    email: email,
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

  return mockUser;
};

export const getUsers = async (): Promise<User[]> => {
  return mockUsers;
};

export const getUserById = async (id: string): Promise<User | null> => {
  return mockUsers.find(user => user.id === id) || null;
};