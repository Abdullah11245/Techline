import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface AuthContextValue {
  token: string | null;
  adminEmail: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    const savedEmail = localStorage.getItem('adminEmail');
    if (savedToken) setToken(savedToken);
    if (savedEmail) setAdminEmail(savedEmail);
    setIsLoading(false);
  }, []);

  const login = (newToken: string, email: string) => {
    setToken(newToken);
    setAdminEmail(email);
    localStorage.setItem('adminToken', newToken);
    localStorage.setItem('adminEmail', email);
  };

  const logout = () => {
    setToken(null);
    setAdminEmail(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
  };

  const value = useMemo(
    () => ({
      token,
      adminEmail,
      isAuthenticated: Boolean(token),
      isLoading,
      login,
      logout,
    }),
    [token, adminEmail, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
