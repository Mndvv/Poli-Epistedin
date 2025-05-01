'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Wait until the component is mounted before rendering
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted, return nothing (this avoids hydration issues)
  if (!mounted) return null;

  // Toggle between dark and light themes
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      onClick={toggleTheme}
      variant='ghost'
      size='icon'
      className='group relative h-9 w-9 cursor-pointer p-0 transition-colors'
      name='Theme Toggle Button'
    >
      <Sun className='size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
      <Moon className='absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
      <span className='sr-only'>Theme Toggle </span>
    </Button>
  );
}
