import { Link } from 'next-view-transitions';
import { Post } from '@/lib/mdx';

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  if (!posts || posts.length === 0) {
    return <div className='py-8 text-center'>No posts found</div>;
  }

  return (
    <div className='space-y-8'>
      {posts.map((post) => (
        <article
          key={post.slug}
          className='rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-md dark:bg-gray-800'
        >
          <div className='flex items-start justify-between'>
            <div>
              <Link href={`/posts/${post.slug}`}>
                <h2 className='text-2xl font-bold transition-colors hover:text-blue-500'>
                  {post.frontMatter.title}
                </h2>
              </Link>
              <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
                {post.frontMatter.author && (
                  <span className='text-sm'>{post.frontMatter.author}</span>
                )}
                <span className='mx-2'>-</span>
                {new Date(post.frontMatter.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            {post.frontMatter.category && (
              <span className='rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
                {post.frontMatter.category}
              </span>
            )}
          </div>

          {post.frontMatter.description && (
            <p className='mt-3 text-gray-600 dark:text-gray-300'>
              {post.frontMatter.description}
            </p>
          )}

          <div className='mt-4'>
            <Link
              href={`/posts/${post.slug}`}
              className='text-sm font-medium text-blue-500 hover:text-blue-700'
            >
              Read more →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
