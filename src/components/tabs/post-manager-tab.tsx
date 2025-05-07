import { useState, useEffect } from 'react';
import Link from 'next/link';
import PostList from '@/components/post-list';
import { Post } from '@/lib/mdx';
import { ArrowRight } from 'lucide-react';

export default function PostManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className='space-y-4'>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className='animate-pulse rounded-lg bg-white p-6 shadow dark:bg-gray-800'
          >
            <div className='mb-3 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700'></div>
            <div className='mb-4 h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700'></div>
            <div className='mb-2 h-4 w-full rounded bg-gray-200 dark:bg-gray-700'></div>
            <div className='h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700'></div>
          </div>
        ))}
      </div>
    );
  }

  // Display only the first 5 posts
  const displayedPosts = posts.slice(0, 5);
  const hasMorePosts = posts.length > 5;

  return (
    <div>
      <h1 className='mb-6 text-2xl font-bold'>Blog Posts</h1>
      <PostList posts={displayedPosts} />

      {hasMorePosts && (
        <div className='mt-6 text-right'>
          <Link
            href='/posts'
            className='text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
          >
            See more in the posts page <ArrowRight className='inline size-4' />
          </Link>
        </div>
      )}
    </div>
  );
}
