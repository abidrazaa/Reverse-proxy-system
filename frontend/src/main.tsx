import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';

const Private: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { token } = useAuth(); return token ? children : <Navigate to="/login" replace />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><AuthProvider><BrowserRouter>
    <Routes><Route path="/login" element={<Login/>}/> <Route path="/" element={<Private><Dashboard/></Private>}/></Routes>
  </BrowserRouter></AuthProvider></React.StrictMode>);
