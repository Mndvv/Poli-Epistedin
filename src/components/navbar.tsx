'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import Blogsmanager from '@/components/tabs/blog-manager-tab';
import Overview from '@/components/tabs/overview-tab';
import Media from '@/components/tabs/media-tab';
import AboutMe from '@/components/tabs/about-me-tab';
import AboutTheSite from '@/components/tabs/about-the-site-tab';

type Tab = {
  id: string;
  label: string;
  component: React.ReactNode;
};

export default function HorizontalNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const [tabs] = useState<Tab[]>([
    {
      id: 'overview',
      label: 'Overview',
      component: <Overview />,
    },
    {
      id: 'media',
      label: 'Media',
      component: <Media />,
    },
    {
      id: 'blogs-overview',
      label: 'Blogs',
      component: <Blogsmanager />,
    },
    {
      id: 'about-me',
      label: 'About Me',
      component: <AboutMe />,
    },
    {
      id: 'about-site',
      label: 'About the site',
      component: <AboutTheSite />,
    },
  ]);

  // Function to determine active tab based on pathname
  const getActiveTabFromPath = useCallback(() => {
    // Check if we're at the root path
    if (pathname === '/') {
      return tabs[0]; // Default to first tab
    }

    // Otherwise, extract the tab ID from the path
    const currentPath = pathname?.split('/')[1] || '';
    const matchingTab = tabs.find((tab) => tab.id === currentPath);
    return matchingTab || tabs[0];
  }, [pathname, tabs]);

  const [activeTab, setActiveTab] = useState<Tab>(getActiveTabFromPath());

  // Update active tab when pathname changes
  useEffect(() => {
    setActiveTab(getActiveTabFromPath());
  }, [pathname, getActiveTabFromPath]);

  const updateIndicatorPosition = useCallback(() => {
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab.id);
    const activeButton = buttonRefs.current[activeIndex];
    const container = containerRef.current;
    const indicator = indicatorRef.current;

    if (activeButton && container && indicator) {
      const buttonRect = activeButton.getBoundingClientRect();
      const position = activeButton.offsetLeft;
      const width = buttonRect.width;

      indicator.style.transform = `translateX(${position}px)`;
      indicator.style.width = `${width}px`;
    }
  }, [activeTab.id, tabs]);

  useEffect(() => {
    updateIndicatorPosition();

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateIndicatorPosition);
      window.addEventListener('resize', updateIndicatorPosition);

      return () => {
        container.removeEventListener('scroll', updateIndicatorPosition);
        window.removeEventListener('resize', updateIndicatorPosition);
      };
    }
  }, [updateIndicatorPosition]);

  // Update indicator when tabs change or component mounts
  useEffect(() => {
    updateIndicatorPosition();
  }, [updateIndicatorPosition]);

  const handleTabClick = (tab: Tab) => {
    // Navigate to the tab path
    router.push(`/${tab.id}`, { scroll: false });

    // Scroll the tab into view when clicked
    const activeIndex = tabs.findIndex((t) => t.id === tab.id);
    const activeButton = buttonRefs.current[activeIndex];

    if (activeButton && containerRef.current) {
      const container = containerRef.current;
      const buttonRect = activeButton.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Check if button is outside visible area
      if (
        buttonRect.left < containerRect.left ||
        buttonRect.right > containerRect.right
      ) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  };

  return (
    <div className='mt-6 mb-8 w-full'>
      {/* Navigation Bar */}
      <div
        ref={containerRef}
        className='no-scrollbar relative flex overflow-x-auto border-b border-gray-200 dark:border-gray-700'
      >
        <div className='flex'>
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              onClick={() => handleTabClick(tab)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors hover:bg-gray-50/10 ${
                activeTab.id === tab.id
                  ? 'text-black dark:text-white'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Animated indicator */}
        <div
          ref={indicatorRef}
          className='absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300'
          style={{
            left: 0,
            width: 0,
            transform: 'translateX(0px)',
          }}
        />
      </div>

      {/* Content Area */}
      <div className='mt-4 pb-8'>{activeTab.component}</div>
    </div>
  );
}

export function HorizontalNavbarSkeleton() {
  return (
    <div className='mt-6 mb-8 w-full animate-pulse'>
      <div className='flex space-x-4 overflow-x-auto border-b border-gray-200 dark:border-gray-700'>
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className='h-8 w-20 rounded bg-gray-300 dark:bg-gray-700'
          ></div>
        ))}
      </div>
      <div className='mt-4 space-y-4'>
        <div className='h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700'></div>
        <div className='h-4 w-2/3 rounded bg-gray-300 dark:bg-gray-700'></div>
        <div className='h-4 w-1/3 rounded bg-gray-300 dark:bg-gray-700'></div>
      </div>
    </div>
  );
}
