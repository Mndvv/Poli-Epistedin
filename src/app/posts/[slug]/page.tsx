import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import PostHeader from '@/components/post-header';
import MDXContent from './mdx-content';
import { Link } from 'next-view-transitions';
import { ArrowLeft } from 'lucide-react';

interface PostPageParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: PostPageParams) {
  const params = await props.params;
  const slug = params?.slug;

  if (!slug) {
    return {
      title: 'Post Not Found',
    };
  }

  try {
    const post = await getPostBySlug(slug);

    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }

    return {
      title: post.frontMatter.title,
      description: post.frontMatter.description || '',
    };
  } catch (error) {
    return {
      title: 'Error Loading Post: ' + error,
    };
  }
}

export default async function PostPage(props: PostPageParams) {
  const params = await props.params;
  const slug = params?.slug;

  if (!slug) {
    notFound();
  }

  const post = await getPostBySlug(slug);

  if (!post || !post.content) {
    notFound();
  }

  return (
    <div>
      <article className='mx-4 max-w-3xl border-1 border-dotted border-gray-400 px-4 py-4 sm:border-t-0 sm:border-r-0 sm:border-b-0 sm:border-l sm:border-gray-400 dark:border-gray-200/30 sm:dark:border-gray-200/50'>
        <PostHeader frontMatter={post.frontMatter} />

        <div className='prose dark:prose-invert max-w-none'>
          <MDXContent source={post.content} />
        </div>
      </article>
      <div className='articleNav mt-10 ml-6 border-t border-gray-200 pt-4 dark:border-gray-700'>
        <Link href='/posts'>
          <ArrowLeft className='mr-3 inline-flex' />
          Go Back
        </Link>
      </div>
    </div>
  );
}
