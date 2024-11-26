import React, { createContext, useContext, useState } from 'react';
import { AuthContextType, User } from '../types/Auth';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username: string, password: string) => {
    // Check admin credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const adminUser: User = {
        id: 'admin',
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        fullName: 'Administrador',
        unitNumber: 'N/A',
        emergencyContact: 'N/A',
        createdAt: new Date().toISOString()
      };
      setCurrentUser(adminUser);
      setIsAuthenticated(true);
      return true;
    }

    // Check resident credentials
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.username === username && u.password === password);
    
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      return true;
    }

    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}