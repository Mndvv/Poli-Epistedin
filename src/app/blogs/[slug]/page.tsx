import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import PostHeader from '@/components/post-header';
import MDXContent from './mdx-content';
import { Link } from 'next-view-transitions';
import { ArrowLeft } from 'lucide-react';

import { Metadata } from 'next';

export async function generateMetadata(
  props: PostPageParams,
): Promise<Metadata> {
  const params = await props.params;
  const slug = params?.slug;

  if (!slug) {
    return {
      metadataBase: new URL('https://saintark.my.id/blogs'),
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
      keywords: ['not found', 'error'],
    };
  }

  try {
    const post = await getPostBySlug(slug);

    if (!post) {
      return {
        metadataBase: new URL('https://saintark.my.id/blogs'),
        title: 'Post Not Found',
        description: 'The requested post could not be found.',
        keywords: ['not found', 'error'],
      };
    }

    return {
      metadataBase: new URL('https://saintark.my.id/blogs'),
      title: post.frontMatter.title,
      description: post.frontMatter.description || '',
      keywords: Array.isArray(post.frontMatter.keywords)
        ? post.frontMatter.keywords
        : typeof post.frontMatter.keywords === 'string'
          ? [post.frontMatter.keywords]
          : [],
      openGraph: {
        title: post.frontMatter.title,
        description: post.frontMatter.description || '',
        type: 'article',
        url: `https://saintark.my.id/blogs/${slug}`,
        images:
          typeof post.frontMatter.image === 'string' && post.frontMatter.image
            ? [
                {
                  url: post.frontMatter.image,
                  width: 1200,
                  height: 630,
                },
              ]
            : [],
      },
    };
  } catch (error) {
    return {
      metadataBase: new URL('https://saintark.my.id/blogs'),
      title: 'Error Loading Post',
      description: `An error occurred while loading the post. (${error})`,
      keywords: ['error', 'loading'],
    };
  }
}

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
        <Link href='/blogs'>
          <ArrowLeft className='mr-3 inline-flex' />
          Go Back
        </Link>
      </div>
    </div>
  );
}
