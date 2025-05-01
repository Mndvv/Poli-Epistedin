'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

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
      component: <Lorem />,
    },
    {
      id: 'media',
      label: 'Media',
      component: <Lorem />,
    },
    {
      id: 'posts',
      label: 'Posts',
      component: <Lorem />,
    },
    {
      id: 'friends',
      label: 'Friends',
      component: <Lorem />,
    },
    {
      id: 'about',
      label: 'About me',
      component: <Lorem />,
    },
  ]);

  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

  useEffect(() => {
    const tabFromUrl = pathname.split('/').pop();
    const initialTab = tabs.find(tab => tab.id === tabFromUrl) || tabs[0];
    setActiveTab(initialTab);
  }, [pathname, tabs]);

  const updateIndicatorPosition = useCallback(() => {
    const activeIndex = tabs.findIndex(tab => tab.id === activeTab.id);
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
  }, [activeTab.id, tabs])

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
  }, [tabs]);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    router.push(`?tab=${tab.id}`, { scroll: false });
    
    // Scroll the tab into view when clicked
    const activeIndex = tabs.findIndex(t => t.id === tab.id);
    const activeButton = buttonRefs.current[activeIndex];
    
    if (activeButton && containerRef.current) {
      const container = containerRef.current;
      const buttonRect = activeButton.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Check if button is outside visible area
      if (buttonRect.left < containerRect.left || buttonRect.right > containerRect.right) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  return (
    <div className="w-full mt-6 mb-8">
      {/* Navigation Bar */}
      <div 
        ref={containerRef}
        className="relative flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto no-scrollbar"
      >
        <div className="flex">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(el) => { buttonRefs.current[index] = el; }}
              onClick={() => handleTabClick(tab)}
              className={`px-4 py-3 whitespace-nowrap font-medium text-sm transition-colors ${
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
          className="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300"
          style={{
            left: 0,
            width: 0,
            transform: 'translateX(0px)'
          }}
        />
      </div>

      {/* Content Area */}
      <div className="mt-4 pb-8">
        {activeTab.component}
      </div>
    </div>
  );
}

function Lorem() {
  return (
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo nisi nesciunt quis, rem perspiciatis cumque sequi fugit, illo quidem quibusdam ullam praesentium porro doloremque voluptates obcaecati nostrum veritatis dignissimos? Eaque!</p>
  );
}