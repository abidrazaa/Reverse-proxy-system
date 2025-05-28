import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { StatsCard } from '@/components/StatsCard';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface Log { _id: string; method: string; url: string; timestamp: string; }
interface User { id: number; name: string; email: string; }

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [logs, setLogs] = useState<Log[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
    setDarkMode(!darkMode);
  };

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios.get('/api/logs', { headers, params: search ? { search } : {} }).then(r => setLogs(r.data));
  }, [search]);
  useEffect(() => { axios.get('/api/users').then(r => setUsers(r.data)); }, []);

  const stats = useMemo(() => ({
    totalLogs: logs.length,
    lastRequest: logs[0]?.timestamp ? new Date(logs[0].timestamp).toLocaleString() : '—'
  }), [logs]);

  return (
    <>
      <Navbar onToggleTheme={toggleDark} dark={darkMode} onLogout={logout}/>
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <section className="flex flex-col md:flex-row gap-4">
          <StatsCard label="Total Logs" value={stats.totalLogs}/>
          <StatsCard label="Last Request" value={stats.lastRequest}/>
          <StatsCard label="Users" value={users.length}/>
        </section>

        <section className="space-y-2">
          <h2>Proxy Logs</h2>
          <input className="border p-2 rounded w-full md:w-1/3" placeholder="Search logs..." value={search} onChange={e=>setSearch(e.target.value)}/>
          <Card className="overflow-x-auto">
            <CardContent className="p-0">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 dark:bg-zinc-800 text-left">
                  <tr><th className="p-3">Method</th><th className="p-3">URL</th><th className="p-3">Timestamp</th></tr>
                </thead>
                <tbody>
                  {logs.map(l=>(
                    <tr key={l._id} className="border-b last:border-none dark:border-zinc-700">
                      <td className="p-3 font-mono">{l.method}</td>
                      <td className="p-3 break-all">{l.url}</td>
                      <td className="p-3">{new Date(l.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                  {logs.length === 0 && <tr><td colSpan={3} className="p-4 text-center text-gray-500">No logs</td></tr>}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-2">
          <h2>Users (via proxy)</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {users.map(u=>(
              <Card key={u.id}>
                <CardContent>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-gray-500">{u.email}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
