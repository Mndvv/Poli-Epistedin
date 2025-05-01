'use client';

import ThemeToggleButton from './ui/theme-toggle-button';
import { webDefaults } from '@/lib/global/consts.g';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Link } from 'next-view-transitions';

const texts = webDefaults.webHeader;
const typingSpeed = 120; // Typewriter typing speed (ms)
const deletingSpeed = 80; // Typewriter deleting speed (ms)
const delayBetween = 2000; // Delay between typewriting (ms)

export default function Header() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index % texts.length];
    let timer: NodeJS.Timeout;

    if (!isDeleting && text.length < current.length) {
      timer = setTimeout(() => {
        setText(current.slice(0, text.length + 1));
      }, typingSpeed);
    } else if (isDeleting && text.length > 0) {
      timer = setTimeout(() => {
        setText(current.slice(0, text.length - 1));
      }, deletingSpeed);
    } else if (!isDeleting && text === current) {
      timer = setTimeout(() => setIsDeleting(true), delayBetween);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, index]);

  return (
    <header className='bg-background/50 sticky top-0 z-50 flex w-full flex-col p-4 backdrop-blur-lg transition-all duration-300 ease-in-out select-none md:p-6'>
      <div className='mx-auto flex w-full max-w-3xl items-center justify-between'>
        <div className='ml-6' onClick={handleClick}>
          <Link
            className='cursor-pointer text-2xl font-bold md:text-3xl'
            href='/'
          >
            <span className='whitespace-pre'>{text}</span>
            <span className='animate-pulse'>|</span>
          </Link>
          <h2 className='mt-1 text-sm tracking-widest text-gray-400 md:text-base lg:text-lg'>
            {webDefaults.webSubHeader}
          </h2>
        </div>
        <div className='mr-6'>
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}
