"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  role: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = setTimeout(() => {
      const savedToken = Cookies.get('token');
      
      if (savedToken) {
        try {
          const decoded = jwtDecode<User>(savedToken);
          setToken(savedToken);
          setUser(decoded);
        } catch {
          Cookies.remove('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    }, 0);

    return () => clearTimeout(checkAuth);
  }, []);

  const login = (newToken: string) => {
    Cookies.set('token', newToken, { expires: 1 });
    const decoded = jwtDecode<User>(newToken);
    setToken(newToken);
    setUser(decoded);
    router.push('/dashboard');
  };

  const logout = () => {
    Cookies.remove('token');
    setToken(null);
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};