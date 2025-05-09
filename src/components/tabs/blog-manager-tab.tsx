import { useState, useEffect } from 'react';
import Link from 'next/link';
import PostList from '@/components/blog-post-list';
import { Post } from '@/lib/mdx';
import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://saintark.my.id/blogs'),
  title: 'Poli-Blogs -  Juansyah Akbar Personal Blog',
  description:
    'Portfolio of Juansyah Akbar, a web developer showcasing projects, designs, and contact information.',
  keywords: [
    'web',
    'blogs',
    'developer',
    'react',
    'Juansyah Akbar',
    'Web Developer',
    'Frontend Developer',
    'React Developer',
    'Portfolio',
    'Blog',
    'Blogging',
    'Writing',
    'Content Creation',
    'Web Development',
    'Programming',
  ],
  openGraph: {
    title: "Juansyah Akbar's Personal Blog",
    description: 'Blogging website of Juansyah Akbar.',
    type: 'website',
    url: 'https://saintark.my.id/blogs',
    images: [
      {
        url: 'https://static.saintark.my.id/static/assets/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

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
            href='/blogs'
            className='text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
          >
            See more in the blogs page <ArrowRight className='inline size-4' />
          </Link>
        </div>
      )}
    </div>
  );
}
