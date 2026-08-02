import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../data/types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<User | null>;
  logout: () => void;
  hasPermission: (resource: string, action: string) => boolean;
  isAdmin: boolean;
  isAluno: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!email || !password) return false;
    
    try {
      const validUsers = [
        { id: 'rafael', name: 'safadão', email:'rafaellindo', role: 'aluno' as const},
        { id: 'admin', name: 'Admin', email: 'admin@academia.com', role: 'admin' as const },
        { id: '2', name: 'João Silva', email: 'joao@email.com', role: 'aluno' as const },
      ];
      
      const user = validUsers.find(u => u.email === email && password === '123');
      if (!user) return false;
      
      setCurrentUser(user);
      return true;
    } catch (error) {
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<User | null> => {
    if (!name || !email || !password) return null;
    
    try {
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: 'aluno',
      };
      
      setCurrentUser(newUser);
      return newUser;
    } catch (error) {
      return null;
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const hasPermission = (resource: string, action: string): boolean => {
    if (!currentUser) return false;
    
    if (currentUser.role === 'admin') return true;
    
    if (currentUser.role === 'aluno') {
      switch (resource) {
        case 'profile':
          return action === 'view' || action === 'edit';
        case 'workout':
          return action === 'view';
        case 'progress':
          return action === 'view';
        default:
          return false;
      }
    }
    
    return false;
  };

  const isAdmin = currentUser?.role === 'admin';
  const isAluno = currentUser?.role === 'aluno';

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      login, 
      register, 
      logout, 
      hasPermission,
      isAdmin, 
      isAluno
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};