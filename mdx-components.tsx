import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

// Custom components for MDX
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override default components with custom ones
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mt-5 mb-2">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>,
    p: ({ children }) => <p className="my-4">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-6 my-4">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
    a: ({ href, children }) => (
      <Link href={href || '#'} className="text-primary hover:underline">
        {children}
      </Link>
    ),
    img: ({ src, alt, width, height }) => (
      <div className="my-6">
        <Image 
          src={src || ''}
          alt={alt || ''}
          width={width ? Number(width) : 800}
          height={height ? Number(height) : 450}
          className="rounded-lg"
        />
      </div>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => (
      <code className={`${className || ''} font-mono px-1 py-0.5 bg-muted rounded`}>
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
        {children}
      </pre>
    ),
    hr: () => <hr className="my-8 border-muted" />,
    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full divide-y divide-border">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left font-semibold bg-muted">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 border-t border-border">
        {children}
      </td>
    ),
    // Add your custom components here
    // Example: Alert component for highlighting important information
    Alert: ({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'error' | 'success' }) => {
      const styles = {
        info: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-200 dark:border-blue-800',
        warning: 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-200 dark:border-yellow-800',
        error: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-200 dark:border-red-800',
        success: 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-200 dark:border-green-800',
      }[type];
      
      return (
        <div className={`p-4 border rounded-md my-6 ${styles}`}>
          {children}
        </div>
      );
    },
    // Example: CodeBlock component with syntax highlighting
    CodeBlock: ({ children, language = 'javascript' }) => {
      return (
        <pre className={`language-${language} bg-muted p-4 rounded-lg overflow-x-auto my-6`}>
          <code className={`language-${language}`}>{children}</code>
        </pre>
      );
    },
    ...components,
  };
}