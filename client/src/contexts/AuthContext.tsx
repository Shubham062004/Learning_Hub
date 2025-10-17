import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '../lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  address?: any;
  profilePic?: string;
  orderHistory?: any[];
  preferences?: any;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiClient.setToken(token);
      loadUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUserProfile = async () => {
    try {
      const userData = await apiClient.getProfile();
      setUser(userData);
    } catch (error) {
      console.error('Failed to load user profile:', error);
      localStorage.removeItem('token');
      apiClient.setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('🔐 Attempting login...', email);
      
      // BYPASS AUTHENTICATION FOR DEMO
      // Create fake user based on email
      const fakeUser = {
        _id: '123',
        name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'Demo User',
        email: email,
        role: 'student',
        phone: '1234567890'
      };
      
      // Store fake token and user
      localStorage.setItem('token', 'demo-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify(fakeUser));
      
      setUser(fakeUser);
      
      console.log('✅ Demo login successful!', fakeUser);
      
      // Simulate some delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error: any) {
      console.error('❌ Login failed:', error.message);
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      console.log('📝 Attempting registration...', userData.email);
      
      // BYPASS REGISTRATION FOR DEMO
      const fakeUser = {
        _id: '123',
        name: userData.name || 'Demo User',
        email: userData.email,
        role: 'student',
        phone: userData.phone || '1234567890'
      };
      
      // Store fake token and user
      localStorage.setItem('token', 'demo-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify(fakeUser));
      
      setUser(fakeUser);
      
      console.log('✅ Demo registration successful!', fakeUser);
      
      // Simulate some delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error: any) {
      console.error('❌ Registration failed:', error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    apiClient.setToken(null);
    setUser(null);
  };

  const updateProfile = async (userData: any) => {
    try {
      const updatedUser = await apiClient.updateProfile(userData);
      setUser(updatedUser);
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
