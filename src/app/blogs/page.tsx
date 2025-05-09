import PostList from '@/components/blog-post-list';
import { getAllPosts } from '@/lib/mdx';
import { Link } from 'next-view-transitions';
import { FileText, Frown, Home, BookText } from 'lucide-react';

export default async function PostManager() {
  const posts = await getAllPosts();

  return (
    <div className='max-w-4xl px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl dark:from-gray-100 dark:to-gray-300'>
          <BookText className='-mt-1 -mr-1 inline-flex text-gray-900 dark:text-white' />{' '}
          Blog Posts
        </h1>
        {posts.length > 0 && (
          <span className='mt-2 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/50 px-4 py-2 text-sm font-medium text-gray-800 backdrop-blur-sm transition-all duration-200 hover:bg-white/70 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200 dark:hover:bg-gray-800/70'>
            <FileText className='h-4 w-4' />
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </span>
        )}
      </div>

      {posts.length > 0 ? (
        <div>
          <PostList posts={posts} />
          <div className='mt-8 flex justify-center'>
            Not interested?
            <Link
              href='/'
              className='ml-1 inline-flex border-1 border-t-0 border-r-0 border-l-0 border-dotted border-b-gray-500'
            >
              Go back to the homepage
            </Link>
          </div>
        </div>
      ) : (
        <div className='rounded-xl border border-gray-200 bg-white/50 py-16 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/70 dark:border-gray-700 dark:bg-gray-900/50 dark:hover:bg-gray-900/70'>
          <div className='mx-auto max-w-md'>
            <div className='flex justify-center'>
              <div className='mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-gray-200 bg-gray-100/50 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50'>
                <Frown
                  className='h-10 w-10 text-gray-500 dark:text-gray-400'
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <h2 className='mb-3 text-2xl font-semibold text-gray-800 dark:text-gray-100'>
              No posts found
            </h2>
            <p className='mb-6 text-gray-600 dark:text-gray-400'>
              Make sure you have markdown files in your @markdown directory.
            </p>
            <Link
              href='/'
              className='inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 font-medium text-white transition-all duration-200 hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200'
            >
              <Home className='h-5 w-5' />
              Return to home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
