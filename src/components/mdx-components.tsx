'use client';

import React, { ComponentProps, useState, useRef, useEffect } from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { MDXRemoteProps } from 'next-mdx-remote';
import { Highlight, themes } from 'prism-react-renderer';

type MDXComponentsType = NonNullable<MDXRemoteProps['components']>;

// Create a more specific extended components type that includes our custom components
type ExtendedMDXComponents = MDXComponentsType & {
  img: React.FC<ComponentProps<'img'> & { src: string; alt: string }>;
  Image: typeof NextImage;
  Link: typeof NextLink;
  code: React.FC<ComponentProps<'code'> & { className?: string }>;
  pre: React.FC<ComponentProps<'pre'> & { className?: string }>;
};

/**
 * Image viewer with zoom functionality and drag capability
 */
const ImageViewer: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, imgX: 0, imgY: 0 });
  const [, setImgNatural] = useState({ width: 0, height: 0 });
  const viewerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Fit image to screen on open
  useEffect(() => {
    if (isOpen && imageRef.current && viewerRef.current) {
      const img = imageRef.current;
      const container = viewerRef.current;
      const fitScale = Math.min(
        container.clientWidth / img.naturalWidth,
        container.clientHeight / img.naturalHeight,
        1,
      );
      setScale(fitScale);
      setPosition({ x: 0, y: 0 });
      setImgNatural({ width: img.naturalWidth, height: img.naturalHeight });
    }
  }, [isOpen]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canDrag()) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      imgX: position.x,
      imgY: position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: dragStart.imgX + (e.clientX - dragStart.x),
      y: dragStart.imgY + (e.clientY - dragStart.y),
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!canDrag() || e.touches.length !== 1) return;
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      imgX: position.x,
      imgY: position.y,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPosition({
      x: dragStart.imgX + (e.touches[0].clientX - dragStart.x),
      y: dragStart.imgY + (e.touches[0].clientY - dragStart.y),
    });
    e.preventDefault();
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Only allow drag if image lebih besar dari container
  const canDrag = () => {
    if (!viewerRef.current || !imageRef.current) return false;
    const container = viewerRef.current;
    const img = imageRef.current;
    return (
      img.naturalWidth * scale > container.clientWidth ||
      img.naturalHeight * scale > container.clientHeight
    );
  };

  const openViewer = () => setIsOpen(true);
  const closeViewer = () => {
    setIsOpen(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };
  const zoomIn = () => setScale((s) => Math.min(s + 0.25, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.25));
  const resetZoom = () => {
    if (viewerRef.current && imageRef.current) {
      const fitScale = Math.min(
        viewerRef.current.clientWidth / imageRef.current.naturalWidth,
        viewerRef.current.clientHeight / imageRef.current.naturalHeight,
        1,
      );
      setScale(fitScale);
      setPosition({ x: 0, y: 0 });
    }
  };

  // Prevent scrolling saat modal terbuka
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <span
        className='relative my-8 block overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md dark:border-gray-800'
        onClick={openViewer}
      >
        <NextImage
          src={src || ''}
          alt={alt || 'Blog image'}
          width={800}
          height={450}
          sizes='(max-width: 768px) 100vw, 800px'
          className='w-full cursor-zoom-in transition-transform duration-300 hover:scale-[1.03]'
        />
      </span>
      {isOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm'
          onClick={closeViewer}
          ref={viewerRef}
        >
          <div
            className='relative flex h-full w-full flex-col items-center justify-center p-4'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Controls */}
            <span className='absolute top-0 right-0 left-0 z-10 flex items-center justify-between p-4'>
              <div className='flex space-x-2 rounded-lg bg-black/50 p-2'>
                <button
                  onClick={zoomOut}
                  className='rounded-full p-2 text-white hover:bg-white/20'
                  aria-label='Zoom out'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <circle cx='11' cy='11' r='8' />
                    <line x1='21' y1='21' x2='16.65' y2='16.65' />
                    <line x1='8' y1='11' x2='14' y2='11' />
                  </svg>
                </button>
                <button
                  onClick={resetZoom}
                  className='rounded-full p-2 text-white hover:bg-white/20'
                  aria-label='Reset zoom'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8' />
                    <path d='M21 3v5h-5' />
                  </svg>
                </button>
                <button
                  onClick={zoomIn}
                  className='rounded-full p-2 text-white hover:bg-white/20'
                  aria-label='Zoom in'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <circle cx='11' cy='11' r='8' />
                    <line x1='21' y1='21' x2='16.65' y2='16.65' />
                    <line x1='11' y1='8' x2='11' y2='14' />
                    <line x1='8' y1='11' x2='14' y2='11' />
                  </svg>
                </button>
              </div>
              <button
                onClick={closeViewer}
                className='rounded-full bg-black/50 p-3 text-white hover:bg-black/70'
                aria-label='Close viewer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <line x1='18' y1='6' x2='6' y2='18' />
                  <line x1='6' y1='6' x2='18' y2='18' />
                </svg>
              </button>
            </span>
            {/* Image Container */}
            <div className='relative h-full max-h-screen w-full overflow-auto'>
              <NextImage
                ref={imageRef as React.RefObject<HTMLImageElement>}
                src={src}
                alt={alt || 'Enlarged image'}
                fill
                style={{
                  objectFit: 'contain',
                  transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale})`,
                  top: '50%',
                  left: '50%',
                  userSelect: isDragging ? 'none' : 'auto',
                  pointerEvents: 'auto',
                  position: 'absolute',
                  maxHeight: 'none',
                  maxWidth: 'none',
                }}
                className={`${canDrag() ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'} transition-transform duration-200`}
                onLoad={() => {
                  if (isOpen && imageRef.current && viewerRef.current) {
                    const img = imageRef.current;
                    const container = viewerRef.current;
                    const fitScale = Math.min(
                      container.clientWidth / img.naturalWidth,
                      container.clientHeight / img.naturalHeight,
                      1,
                    );
                    setScale(fitScale);
                    setPosition({ x: 0, y: 0 });
                    setImgNatural({
                      width: img.naturalWidth,
                      height: img.naturalHeight,
                    });
                  }
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                draggable={false}
                sizes='(max-width: 768px) 100vw, 800px'
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/**
 * Enhanced CodeBlock component with better overflow handling and visual distinction
 */
const CodeBlock: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const [copied, setCopied] = useState(false);
  const language =
    className
      ?.split(' ')
      .find((cls) => cls.startsWith('language-'))
      ?.replace('language-', '') || 'text';

  const getCodeString = (children: React.ReactNode): string => {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) return children.map(getCodeString).join('');
    if (
      typeof children === 'object' &&
      children !== null &&
      'props' in children &&
      children &&
      typeof (children as { props: Record<string, unknown> }).props ===
        'object' &&
      'children' in (children as { props: Record<string, unknown> }).props
    ) {
      return getCodeString(
        (children as { props: { children: React.ReactNode } }).props.children,
      );
    }
    return '';
  };

  const code = getCodeString(children).trim();

  const copyToClipboard = async () => {
    try {
      if (navigator?.clipboard) {
        await navigator.clipboard.writeText(code);
      } else {
        // Fallback for environments without Clipboard API
        const textarea = document.createElement('textarea');
        textarea.value = code;
        textarea.style.position = 'fixed'; // Prevent scrolling to the bottom
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(textarea.value);
        }
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopied(false);
    }
  };

  return (
    <div className='group relative'>
      <button
        onClick={copyToClipboard}
        className='absolute top-2 right-2 rounded bg-gray-700/50 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-700'
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <Highlight
        theme={
          typeof window !== 'undefined' &&
          document.documentElement.classList.contains('dark')
            ? themes.nightOwl
            : themes.nightOwlLight
        }
        code={code}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto p-4 text-sm`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className='table-row'>
                <span className='table-cell pr-4 text-right text-gray-500 select-none'>
                  {i + 1}
                </span>
                <span className='table-cell'>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

/**
 * Enhanced link component with better styling
 */
const getWebIdentity = (href: string | undefined) => {
  if (!href) return null;
  if (href.includes('github.com')) {
    return {
      name: 'GitHub',
      color: 'bg-black text-white hover:bg-gray-800',
      icon: (
        <svg className='mr-2 h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.99 0 1.99.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.09 0 4.43-2.69 5.41-5.25 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z' />
        </svg>
      ),
      display: (href: string) => {
        const path = href.replace(/^https?:\/\/(www\.)?github\.com\//, '');
        return `GitHub/${path}`;
      },
    };
  }
  if (href.includes('music.youtube.com')) {
    const path = href.replace(/^https?:\/\/music\.youtube\.com\//, '');
    return {
      name: 'YouTube Music',
      color: 'bg-[#FF0000] text-white hover:bg-[#cc0000]',
      icon: (
        <svg className='mr-2 h-5 w-5' viewBox='0 0 24 24' fill='currentColor'>
          <circle cx='12' cy='12' r='10' fill='#FF0000' />
          <polygon points='10,8 16,12 10,16' fill='#fff' />
        </svg>
      ),
      display: () => `YouTube Music/${path}`,
    };
  }
  if (href.includes('youtube.com') || href.includes('youtu.be')) {
    let path = href.replace(/^https?:\/\/(www\.)?youtube\.com\//, '');
    if (href.includes('youtu.be')) {
      path = href.replace(/^https?:\/\/(www\.)?youtu\.be\//, '');
    }
    return {
      name: 'YouTube',
      color: 'bg-[#FF0000] text-white hover:bg-[#cc0000]',
      icon: (
        <svg className='mr-2 h-5 w-5' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M23.498 6.186a2.994 2.994 0 0 0-2.112-2.12C19.23 3.5 12 3.5 12 3.5s-7.23 0-9.386.566A2.994 2.994 0 0 0 .502 6.186C0 8.342 0 12 0 12s0 3.658.502 5.814a2.994 2.994 0 0 0 2.112 2.12C4.77 20.5 12 20.5 12 20.5s7.23 0 9.386-.566a2.994 2.994 0 0 0 2.112-2.12C24 15.658 24 12 24 12s0-3.658-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
        </svg>
      ),
      display: () => `YouTube/${path}`,
    };
  }
  if (href.includes('spotify.com')) {
    const path = href.replace(/^https?:\/\/(open\.)?spotify\.com\//, '');
    return {
      name: 'Spotify',
      color: 'bg-[#1DB954] text-white hover:bg-[#169c46]',
      icon: (
        <svg className='mr-2 h-5 w-5' viewBox='0 0 24 24' fill='currentColor'>
          <circle cx='12' cy='12' r='10' fill='#1DB954' />
          <path
            d='M17.6 16.2c-.3.5-.9.7-1.4.4-3.9-2.3-8.8-1.4-8.9-1.4-.6.1-1.1-.3-1.2-.8-.1-.6.3-1.1.8-1.2.2 0 5.7-1 10.2 1.6.5.3.7.9.5 1.4zm1.2-2.7c-.4.6-1.1.8-1.7.5-4.5-2.7-11.3-1.5-11.4-1.5-.7.1-1.3-.4-1.4-1.1-.1-.7.4-1.3 1.1-1.4.3 0 7.7-1.3 12.8 1.7.6.3.8 1 .6 1.6zm.1-2.8C15.6 8.2 8.7 7.9 6.2 8c-.8 0-1.4-.6-1.4-1.4 0-.8.6-1.4 1.4-1.4 2.8-.1 10.3.2 13.7 2.2.7.4.9 1.3.5 2-.4.7-1.3.9-2 .5z'
            fill='#fff'
          />
        </svg>
      ),
      display: () => `Spotify/${path}`,
    };
  }
  // Not recognized: globe icon, show domain/path
  try {
    const url = new URL(href);
    const domain = url.hostname.replace(/^www\./, '');
    const path = url.pathname.replace(/^\//, '');
    return {
      name: domain,
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800',
      icon: (
        <svg
          className='mr-2 h-5 w-5'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'
        >
          <circle cx='12' cy='12' r='10' stroke='currentColor' />
          <path
            d='M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20'
            stroke='currentColor'
          />
        </svg>
      ),
      display: () => `${domain}${path ? '/' + path : ''}`,
    };
  } catch {
    return null;
  }
};

const EnhancedLink: React.FC<ComponentProps<'a'>> = (props) => {
  const identity = getWebIdentity(props.href);
  const isExternal =
    props.href?.startsWith('http') &&
    !props.href?.includes(
      typeof window !== 'undefined' ? window.location.hostname : '',
    );

  // Truncate the display text if too long
  let displayText: React.ReactNode = props.children;
  if (identity && typeof identity.display === 'function') {
    let text = identity.display(props.href ?? '');
    if (text.length > 32) text = text.slice(0, 29) + '...';
    displayText = text;
  } else if (typeof props.children === 'string' && props.children.length > 32) {
    displayText = props.children.slice(0, 29) + '...';
  }

  return (
    <a
      className={`relative inline-flex items-center rounded-md px-3 py-1 font-medium transition-all ${identity ? identity.color : 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800'} max-w-xs ring-1 ring-black/10 ring-inset dark:ring-white/10`}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {identity && identity.icon}
      <span className='ml-3 truncate'>{displayText}</span>
      {isExternal && !identity && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='ml-1'
          width='14'
          height='14'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
          <polyline points='15 3 21 3 21 9' />
          <line x1='10' y1='14' x2='21' y2='3' />
        </svg>
      )}
    </a>
  );
};

/**
 * Inline code component with improved styling
 */
const InlineCode: React.FC<ComponentProps<'code'>> = (props) => {
  // If within a pre tag, just render the code
  if (props.className?.includes('language-')) {
    return <code {...props} />;
  }

  // Otherwise apply inline code styling
  return (
    <code
      className='mx-0.5 rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-pink-600 dark:bg-gray-800 dark:text-pink-400'
      {...props}
    />
  );
};

const components: ExtendedMDXComponents = {
  h1: (props) => (
    <h1
      className='mt-10 mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50'
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className='mt-8 mb-3 border-b border-gray-200 pb-2 text-2xl font-bold tracking-tight text-gray-900 dark:border-gray-800 dark:text-gray-50'
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className='mt-6 mb-2 text-xl font-bold text-gray-900 dark:text-gray-50'
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className='mt-5 mb-2 text-lg font-medium text-gray-900 dark:text-gray-50'
      {...props}
    />
  ),
  p: (props) => (
    <p
      className='mb-4 text-base leading-7 text-gray-700 dark:text-gray-300'
      {...props}
    />
  ),
  a: (props) => <EnhancedLink {...props} />,
  ul: (props) => (
    <ul
      className='mb-6 ml-6 list-disc text-gray-700 marker:text-gray-400 dark:text-gray-300 dark:marker:text-gray-500'
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className='mb-6 ml-6 list-decimal text-gray-700 marker:text-gray-400 dark:text-gray-300 dark:marker:text-gray-500'
      {...props}
    />
  ),
  li: (props) => <li className='mb-2' {...props} />,
  blockquote: (props) => (
    <blockquote
      className='my-6 border-l-4 border-blue-200 bg-blue-50 pl-6 text-gray-700 italic dark:border-blue-800 dark:bg-blue-950/30 dark:text-gray-300'
      {...props}
    />
  ),
  code: (props) => <InlineCode {...props} />,
  pre: (props) => {
    // Improved code block detection: check if children is a code element or has className with "language-"
    interface CodeElementProps {
      className?: string;
      children?: React.ReactNode;
    }

    let codeElement: React.ReactElement<CodeElementProps> | null = null;
    if (
      React.Children.count(props.children) === 1 &&
      React.isValidElement(props.children)
    ) {
      const child = props.children as React.ReactElement<CodeElementProps>;
      if (
        child.type === 'code' ||
        (typeof child.props.className === 'string' &&
          child.props.className.includes('language-'))
      ) {
        codeElement = child;
      }
    }

    if (codeElement) {
      return (
        <div className='group relative my-8 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 shadow-sm dark:border-gray-700 dark:bg-gray-900'>
          {/* Header with language badge and copy button */}
          <div className='flex items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-2 dark:border-gray-700 dark:bg-gray-800'>
            <div className='text-sm font-medium text-gray-600 dark:text-gray-300'>
              {codeElement.props.className?.match(/language-([^\s]+)/)?.[1] ||
                'text'}
            </div>
          </div>
          <CodeBlock className={codeElement.props.className}>
            {codeElement.props.children}
          </CodeBlock>
        </div>
      );
    }

    // For non-code blocks, return regular pre
    return (
      <pre
        className='mb-6 overflow-x-auto rounded-lg bg-gray-50 p-4 dark:bg-gray-900'
        {...props}
      />
    );
  },
  img: (props) => (
    <ImageViewer src={props.src || ''} alt={props.alt || 'Blog image'} />
  ),
  table: (props) => (
    <div className='my-6 overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-800'>
      <div className='overflow-x-auto'>
        <table className='w-full border-collapse text-sm' {...props} />
      </div>
    </div>
  ),
  thead: (props) => (
    <thead
      className='bg-gray-100 text-left text-gray-700 dark:bg-gray-800 dark:text-gray-300'
      {...props}
    />
  ),
  tbody: (props) => (
    <tbody
      className='divide-y divide-gray-200 dark:divide-gray-800'
      {...props}
    />
  ),
  tr: (props) => (
    <tr className='border-b border-gray-200 dark:border-gray-800' {...props} />
  ),
  th: (props) => (
    <th
      className='p-4 text-sm font-medium text-gray-700 dark:text-gray-300'
      {...props}
    />
  ),
  td: (props) => (
    <td className='p-4 text-gray-700 dark:text-gray-300' {...props} />
  ),
  hr: (props) => (
    <hr className='my-8 border-gray-200 dark:border-gray-800' {...props} />
  ),
  Image: NextImage,
  Link: NextLink,
};

export { components };
