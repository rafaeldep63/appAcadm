import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../data/types';
import { useData } from './DataContext';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (resource: string, action: string) => boolean;
  isAdmin: boolean;
  isAluno: boolean;
}

const ADMIN_EMAIL = 'admin@academia.com';
const ADMIN_PASSWORD = '123';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { students } = useData();

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!email || !password) return false;

    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setCurrentUser({ id: 'admin', name: 'Admin', email: ADMIN_EMAIL, role: 'admin' });
      return true;
    }

    const student = students.find(
      (s) => s.email.trim().toLowerCase() === normalizedEmail && s.password === password
    );
    if (!student) return false;

    setCurrentUser({ id: student.id, name: student.name, email: student.email, role: 'aluno' });
    return true;
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
      logout,
      hasPermission,
      isAdmin,
      isAluno,
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
