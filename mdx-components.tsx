import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

// Custom components for MDX
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override default components with custom ones
    h1: ({ children }) => (
      <h1 className='mt-8 mb-4 text-3xl font-bold'>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className='mt-6 mb-3 text-2xl font-bold'>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className='mt-5 mb-2 text-xl font-bold'>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className='mt-4 mb-2 text-lg font-bold'>{children}</h4>
    ),
    p: ({ children }) => <p className='my-4'>{children}</p>,
    ul: ({ children }) => <ul className='my-4 list-disc pl-6'>{children}</ul>,
    ol: ({ children }) => (
      <ol className='my-4 list-decimal pl-6'>{children}</ol>
    ),
    li: ({ children }) => <li className='mb-1'>{children}</li>,
    a: ({ href, children }) => (
      <Link href={href || '#'} className='text-primary hover:underline'>
        {children}
      </Link>
    ),
    img: ({ src, alt, width, height }) => (
      <div className='my-6'>
        <Image
          src={src || ''}
          alt={alt || ''}
          width={width ? Number(width) : 800}
          height={height ? Number(height) : 450}
          className='rounded-lg'
        />
      </div>
    ),
    blockquote: ({ children }) => (
      <blockquote className='border-primary my-6 border-l-4 pl-4 italic'>
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => (
      <code
        className={`${className || ''} bg-muted rounded px-1 py-0.5 font-mono`}
      >
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className='bg-muted my-6 overflow-x-auto rounded-lg p-4'>
        {children}
      </pre>
    ),
    hr: () => <hr className='border-muted my-8' />,
    table: ({ children }) => (
      <div className='my-6 overflow-x-auto'>
        <table className='divide-border min-w-full divide-y'>{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className='bg-muted px-4 py-3 text-left font-semibold'>{children}</th>
    ),
    td: ({ children }) => (
      <td className='border-border border-t px-4 py-3'>{children}</td>
    ),
    // Add your custom components here
    // Example: Alert component for highlighting important information
    Alert: ({
      children,
      type = 'info',
    }: {
      children: React.ReactNode;
      type?: 'info' | 'warning' | 'error' | 'success';
    }) => {
      const styles = {
        info: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-200 dark:border-blue-800',
        warning:
          'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-200 dark:border-yellow-800',
        error:
          'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-200 dark:border-red-800',
        success:
          'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-200 dark:border-green-800',
      }[type];

      return (
        <div className={`my-6 rounded-md border p-4 ${styles}`}>{children}</div>
      );
    },
    // Example: CodeBlock component with syntax highlighting
    CodeBlock: ({ children, language = 'javascript' }) => {
      return (
        <pre
          className={`language-${language} bg-muted my-6 overflow-x-auto rounded-lg p-4`}
        >
          <code className={`language-${language}`}>{children}</code>
        </pre>
      );
    },
    ...components,
  };
}
