import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const Login: React.FC = () => {
  const [username, setUsername] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState('');
  const { login } = useAuth(); const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    try {
      const { data } = await axios.post('/api/auth/login', { username, password });
      login(data.token); navigate('/');
    } catch (err: any) { setError(err.response?.data?.message ?? 'Login failed'); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>Sign in</CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <input className="w-full border rounded p-2" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)}/>
            <input type="password" className="w-full border rounded p-2" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
            <Button className="w-full">Log in</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Login;
