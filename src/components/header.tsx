'use client';

import ThemeToggleButton from './ui/theme-toggle-button';
import { webDefaults } from '@/lib/global/consts.g';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Link } from 'next-view-transitions';
import { useHeader } from './header-context';

const texts = webDefaults.webHeader;
const typingSpeed = 120;
const deletingSpeed = 80;
const delayBetween = 2000;

export default function Header() {
  const { title, subtitle } = useHeader();
  const router = useRouter();
  const hasCustomHeader = !!title;
  const pathname = usePathname();
  const isBlogPage = pathname?.startsWith('/blogs/');

  const handleClick = () => {
    router.push('/');
  };

  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (hasCustomHeader) return;

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
  }, [text, isDeleting, index, hasCustomHeader]);

  return (
    <header className='bg-background/50 sticky top-0 z-50 flex w-full flex-col p-4 backdrop-blur-lg transition-all duration-300 ease-in-out select-none md:p-6'>
      <div className='mx-auto flex w-full max-w-3xl items-center justify-between'>
        <div className='ml-6' onClick={handleClick}>
          <Link
            className='cursor-pointer text-2xl font-bold md:text-3xl'
            href='/'
          >
            {hasCustomHeader ? (
              <span>{title}</span>
            ) : isBlogPage ? (
              <span className='bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-300'>
                {webDefaults.webHeader[0]}
              </span>
            ) : (
              <>
                <span className='whitespace-pre'>{text}</span>
                <span className='animate-pulse'>|</span>
              </>
            )}
          </Link>
          <h2 className='mt-1 text-sm tracking-widest text-gray-400 md:text-base lg:text-lg'>
            {isBlogPage
              ? 'Blogs | Enlighten your mind'
              : hasCustomHeader
                ? subtitle
                : webDefaults.webSubHeader}
          </h2>
        </div>
        <div className='mr-6'>
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}
