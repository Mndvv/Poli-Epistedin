'use client';

import { ComponentProps, FC, JSX } from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';

// Define component types
type ComponentType<T extends keyof JSX.IntrinsicElements> = FC<
  JSX.IntrinsicElements[T]
>;

interface MDXComponents {
  h1: ComponentType<'h1'>;
  h2: ComponentType<'h2'>;
  h3: ComponentType<'h3'>;
  h4: ComponentType<'h4'>;
  p: ComponentType<'p'>;
  a: ComponentType<'a'>;
  ul: ComponentType<'ul'>;
  ol: ComponentType<'ol'>;
  li: ComponentType<'li'>;
  blockquote: ComponentType<'blockquote'>;
  code: ComponentType<'code'>;
  pre: ComponentType<'pre'>;
  img: FC<ComponentProps<'img'> & { src: string; alt: string }>;
  Image: typeof NextImage;
  Link: typeof NextLink;
}

export const components: MDXComponents = {
  h1: (props) => <h1 className='mt-8 mb-4 text-3xl font-bold' {...props} />,
  h2: (props) => <h2 className='mt-6 mb-3 text-2xl font-bold' {...props} />,
  h3: (props) => <h3 className='mt-5 mb-2 text-xl font-bold' {...props} />,
  h4: (props) => <h4 className='mt-4 mb-2 text-lg font-bold' {...props} />,
  p: (props) => <p className='mb-4 leading-relaxed' {...props} />,
  a: (props) => <a className='text-blue-500 hover:text-blue-700' {...props} />,
  ul: (props) => <ul className='mb-4 list-disc pl-6' {...props} />,
  ol: (props) => <ol className='mb-4 list-decimal pl-6' {...props} />,
  li: (props) => <li className='mb-1' {...props} />,
  blockquote: (props) => (
    <blockquote
      className='my-4 border-l-4 border-gray-300 pl-4 italic dark:border-gray-700'
      {...props}
    />
  ),
  code: (props) => (
    <code
      className='rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-800'
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className='mb-4 overflow-x-auto rounded bg-gray-100 p-4 dark:bg-gray-800'
      {...props}
    />
  ),
  img: (props) => (
    <div className='relative my-6 h-auto w-full'>
      <NextImage
        src={props.src || ''}
        alt={props.alt || 'Blog image'}
        width={800}
        height={450}
        sizes='(max-width: 768px) 100vw, 800px'
        className='rounded'
      />
    </div>
  ),
  Image: NextImage,
  Link: NextLink,
};
