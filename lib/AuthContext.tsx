'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Admin, AuthContextType } from './types';
import { login as apiLogin, getMe } from './api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (token) {
        const adminData = await getMe();
        setAdmin({ ...adminData, token });
      }
    } catch (error) {
      localStorage.removeItem('adminToken');
      setAdmin(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    const adminData = await apiLogin(username, password);
    localStorage.setItem('adminToken', adminData.token);
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
