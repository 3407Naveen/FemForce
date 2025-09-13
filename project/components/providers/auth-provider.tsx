'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'personnel' | 'medical' | 'commander';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  rank: string;
  unit: string;
  avatar?: string;
  isOnline: boolean;
  lastActivity: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('femforce-user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser({
          ...userData,
          lastActivity: new Date(userData.lastActivity),
          isOnline: true
        });
      } catch (error) {
        localStorage.removeItem('femforce-user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would be handled by backend
    if (password === 'femforce123') {
      const userData: User = {
        id: `user-${Date.now()}`,
        name: getUserNameByRole(role),
        email,
        role,
        rank: getRankByRole(role),
        unit: 'Special Operations Unit',
        isOnline: true,
        lastActivity: new Date()
      };
      
      setUser(userData);
      localStorage.setItem('femforce-user', JSON.stringify(userData));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('femforce-user');
  };

  const getUserNameByRole = (role: UserRole): string => {
    switch (role) {
      case 'personnel': return 'Sarah Martinez';
      case 'medical': return 'Dr. Emily Chen';
      case 'commander': return 'Col. Jennifer Roberts';
      default: return 'Unknown User';
    }
  };

  const getRankByRole = (role: UserRole): string => {
    switch (role) {
      case 'personnel': return 'Sergeant';
      case 'medical': return 'Captain (Medical)';
      case 'commander': return 'Colonel';
      default: return 'Unknown';
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}