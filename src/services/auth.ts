import api from './api';
import { User } from '../contexts/AuthContext';

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

// Demo user credentials for testing
const demoUsers = [
  {
    email: 'admin@dicel.co.rw',
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@dicel.co.rw',
      firstName: 'Jean',
      lastName: 'Ndayisaba',
      role: 'admin' as const,
      department: 'admin',
      phone: '+250 788 123 456',
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },
  {
    email: 'hr.manager@dicel.co.rw',
    password: 'hr123',
    user: {
      id: '2',
      email: 'hr.manager@dicel.co.rw',
      firstName: 'Claudine',
      lastName: 'Uwimana',
      role: 'hr' as const,
      department: 'hr',
      phone: '+250 788 234 567',
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },
  {
    email: 'finance.manager@dicel.co.rw',
    password: 'finance123',
    user: {
      id: '3',
      email: 'finance.manager@dicel.co.rw',
      firstName: 'Emmanuel',
      lastName: 'Rugamba',
      role: 'finance' as const,
      department: 'finance',
      phone: '+250 788 345 678',
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },
  {
    email: 'it.manager@dicel.co.rw',
    password: 'it123',
    user: {
      id: '4',
      email: 'it.manager@dicel.co.rw',
      firstName: 'Eric',
      lastName: 'Niyonsenga',
      role: 'it' as const,
      department: 'it',
      phone: '+250 788 456 789',
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },
  {
    email: 'operations.manager@dicel.co.rw',
    password: 'operations123',
    user: {
      id: '5',
      email: 'operations.manager@dicel.co.rw',
      firstName: 'Paul',
      lastName: 'Mugenzi',
      role: 'operations' as const,
      department: 'operations',
      phone: '+250 788 567 890',
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },
  {
    email: 'legal.manager@dicel.co.rw',
    password: 'legal123',
    user: {
      id: '6',
      email: 'legal.manager@dicel.co.rw',
      firstName: 'Jean Claude',
      lastName: 'Nkurunziza',
      role: 'legal' as const,
      department: 'legal',
      phone: '+250 788 678 901',
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },
  {
    email: 'sales.manager@dicel.co.rw',
    password: 'sales123',
    user: {
      id: '7',
      email: 'sales.manager@dicel.co.rw',
      firstName: 'David',
      lastName: 'Habyarimana',
      role: 'sales' as const,
      department: 'sales',
      phone: '+250 788 789 012',
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }
];

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  console.log('authenticateUser called with:', { email, password });
  
  // First try backend authentication
  try {
    const response = await api.post<LoginResponse>('/auth/login', {
      email,
      password
    });

    if (response.data.success) {
      // Store token and user data
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      
      console.log(`Backend login successful for ${response.data.data.user.role} user: ${response.data.data.user.email}`);
      return response.data.data.user;
    }

    return null;
  } catch (error) {
    console.error('Backend authentication failed, trying demo credentials:', error);
    
    // Fallback to demo credentials if backend is not available
    const demoUser = demoUsers.find(user => 
      user.email === email && user.password === password
    );

    console.log('Demo user found:', demoUser ? demoUser.user.role : 'None');

    if (demoUser) {
      // Create a demo token
      const demoToken = `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('token', demoToken);
      localStorage.setItem('user', JSON.stringify(demoUser.user));
      
      console.log(`Demo login successful for ${demoUser.user.role} user: ${demoUser.user.email}`);
      return demoUser.user;
    }

    return null;
  }
};

export const registerUser = async (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
  department?: string;
}): Promise<User | null> => {
  try {
    const response = await api.post<RegisterResponse>('/auth/register', userData);

    if (response.data.success) {
      // Store token and user data
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return response.data.data.user;
    }

    return null;
  } catch (error) {
    console.error('Registration error:', error);
    return null;
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get('/users');
    return response.data.data || [];
  } catch (error) {
    console.error('Get users error:', error);
    return [];
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data.data || null;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};