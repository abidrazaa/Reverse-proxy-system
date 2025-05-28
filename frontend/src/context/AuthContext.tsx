import React, { createContext, useContext, useState, useEffect } from 'react';

interface Context { token: string | null; login(token: string): void; logout(): void; }

const AuthContext = createContext<Context>({ token: null, login: () => {}, logout: () => {} });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  useEffect(() => { token ? localStorage.setItem('token', token) : localStorage.removeItem('token'); }, [token]);
  return <AuthContext.Provider value={{ token, login: setToken, logout: () => setToken(null) }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
