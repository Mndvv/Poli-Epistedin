'use client';

import { createContext, useContext, useState } from 'react';

type HeaderContextType = {
  title: string;
  subtitle: string;
  setHeader: (title: string, subtitle?: string) => void;
  resetHeader: () => void;
};

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const setHeader = (newTitle: string, newSubtitle = '') => {
    setTitle(newTitle);
    setSubtitle(newSubtitle);
  };

  const resetHeader = () => {
    setTitle('');
    setSubtitle('');
  };

  return (
    <HeaderContext.Provider value={{ title, subtitle, setHeader, resetHeader }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
}
