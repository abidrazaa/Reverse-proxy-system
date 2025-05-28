import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

export const Navbar: React.FC<{ onToggleTheme(): void; dark: boolean; onLogout(): void }> = ({ onToggleTheme, dark, onLogout }) => {
  return (
    <nav className="bg-white dark:bg-zinc-900 shadow-sm border-b dark:border-zinc-700">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <span className="font-semibold">Proxy Logger</span>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={onToggleTheme}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</Button>
          <Button variant="outline" onClick={onLogout}>Logout</Button>
        </div>
      </div>
    </nav>
  );
};
