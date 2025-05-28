import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Log { _id: string; method: string; url: string; timestamp: string; }
interface User { id: number; name: string; email: string; }

const Dashboard: React.FC = () => {
  const { token, logout } = useAuth();
  const [logs, setLogs] = useState<Log[]>([]); const [users, setUsers] = useState<User[]>([]); const [search, setSearch] = useState('');

  const fetchLogs = async () => {
    const res = await axios.get('/api/logs', { headers: { Authorization: `Bearer ${token}` }, params: search ? { search } : {} });
    setLogs(res.data);
  };
  const fetchUsers = async () => setUsers((await axios.get('/api/users')).data);

  useEffect(() => { fetchLogs(); fetchUsers(); }, [search]);

  return <div className="p-6 space-y-6 max-w-5xl mx-auto">
    <header className="flex justify-between"><h1 className="text-3xl font-bold">Dashboard</h1>
    <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded-lg">Logout</button></header>

    <section className="space-y-2"><h2 className="text-xl font-semibold">Proxy Logs</h2>
      <input className="border p-2 rounded w-full md:w-1/3" placeholder="Search logs..." value={search} onChange={e=>setSearch(e.target.value)}/>
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm"><thead className="bg-gray-200"><tr><th className="p-2">Method</th><th className="p-2">URL</th><th className="p-2">Time</th></tr></thead>
        <tbody>{logs.map(l=> <tr key={l._id} className="border-b"><td className="p-2">{l.method}</td><td className="p-2">{l.url}</td><td className="p-2">{new Date(l.timestamp).toLocaleString()}</td></tr>)}</tbody></table>
      </div></section>

    <section className="space-y-2"><h2 className="text-xl font-semibold">Users (via proxy)</h2>
      <div className="grid md:grid-cols-2 gap-4">{users.map(u=> <div key={u.id} className="bg-white shadow rounded-lg p-4"><p className="font-medium">{u.name}</p><p className="text-gray-500">{u.email}</p></div>)}</div>
    </section>
  </div>;
};
export default Dashboard;
