import { PostFrontMatter } from '@/lib/mdx';

interface PostHeaderProps {
  frontMatter: PostFrontMatter;
}

export default function PostHeader({ frontMatter }: PostHeaderProps) {
  return (
    <div className='mb-8'>
      <h1 className='mb-2 text-3xl font-bold md:text-4xl'>
        {frontMatter.title}
      </h1>

      <div className='flex flex-col items-start text-sm text-gray-500 sm:flex-row dark:text-gray-400'>
        {frontMatter.author && (
          <>
            <span className='text-sm'>{frontMatter.author}</span>
            <span className='mx-2 hidden sm:inline'>•</span>
          </>
        )}

        <div className='mt-1 flex sm:mt-0'>
          <span className='mx-2 inline sm:hidden'>•</span>
          <time dateTime={frontMatter.date}>
            {new Date(frontMatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>

          {frontMatter.category && (
            <>
              <span className='ml-4 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
                {frontMatter.category}
              </span>
            </>
          )}

          {frontMatter.readingTime && (
            <>
              <span className='mx-2'>•</span>
              <span>{frontMatter.readingTime} min read</span>
            </>
          )}
        </div>
      </div>

      {frontMatter.description && (
        <p className='mt-4 text-lg text-gray-600 dark:text-gray-300'>
          {frontMatter.description}
        </p>
      )}
    </div>
  );
}
