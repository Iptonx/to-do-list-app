'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9">
        <div className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="w-9.5 h-9.5 rounded-lg hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer hover:bg-muted"
      aria-label="Cambiar tema"
    >
      <Sun className="h-4.5 w-4.5 rotate-0 scale-100 transition-all duration-500 ease-out group-hover:rotate-45 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4.5 w-4.5 rotate-90 scale-0 transition-all duration-500 ease-out group-hover:-rotate-12 dark:rotate-0 dark:scale-100" />
    </Button>
  );
}