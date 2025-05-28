import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState('');
  const nav = useNavigate(); const { login } = useAuth();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    try {
      const { data } = await axios.post('/api/auth/login', { username, password });
      login(data.token); nav('/');
    } catch (err: any) { setError(err.response?.data?.message ?? 'Login failed'); }
  };

  return <div className="flex items-center justify-center h-screen bg-gray-100">
    <form onSubmit={submit} className="bg-white p-8 rounded-xl shadow-xl space-y-4 w-full max-w-sm">
      <h1 className="text-2xl font-bold">Sign in</h1>{error && <p className="text-red-500">{error}</p>}
      <input className="w-full border p-2 rounded" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
      <input className="w-full border p-2 rounded" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Log in</button>
    </form></div>;
};
export default Login;
