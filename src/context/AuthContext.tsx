import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../data/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
  isAluno: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const register = (name: string, email: string, password: string): boolean => {
    if (!name || !email || !password) return false;
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: 'aluno',
    };
    setUser(newUser);
    return true;
  };

  const login = (email: string, password: string): boolean => {
    if (email === 'admin@academia.com' && password === '123456') {
      setUser({
        id: '1',
        name: 'Admin',
        email,
        role: 'admin',
      });
      return true;
    }
    if (email === 'joao@email.com' && password === '123456') {
      setUser({
        id: '2',
        name: 'Joao Silva',
        email,
        role: 'aluno',
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';
  const isAluno = user?.role === 'aluno';

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin, isAluno }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
