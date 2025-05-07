'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return showButton ? (
    <button
      onClick={scrollToTop}
      className='fixed right-6 bottom-24 z-50 rounded-xl border-1 border-black p-3 shadow-2xl transition-all dark:border-white/40'
      aria-label='Scroll to top'
    >
      <ArrowUp className='h-7 w-7' />
    </button>
  ) : null;
}
