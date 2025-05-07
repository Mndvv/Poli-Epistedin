import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from 'rehype-prism-plus';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

// Define types for our post data
export interface PostFrontMatter {
  title: string;
  author: string;
  date: string;
  description?: string;
  category?: string;
  readingTime?: string;
  [key: string]: unknown;
}

export interface Post {
  slug: string;
  frontMatter: PostFrontMatter;
  content?: MDXRemoteSerializeResult<Record<string, unknown>>; // MDX content
}

// Path to our markdown content
const POSTS_PATH = path.join(process.cwd(), 'src/markdown');

// Get all post slugs
export function getPostSlugs(): string[] {
  try {
    return fs.readdirSync(POSTS_PATH).filter((file) => {
      return path.extname(file).toLowerCase() === '.mdx';
    });
  } catch (error) {
    console.error('Failed to read post directory:', error);
    return [];
  }
}

// Get post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(POSTS_PATH, `${realSlug}.mdx`);

  try {
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const mdxSource = await serialize(content, {
      mdxOptions: {
        rehypePlugins: [rehypePrism],
      },
      scope: data,
    });

    return {
      slug: realSlug,
      frontMatter: data as PostFrontMatter,
      content: mdxSource,
    };
  } catch (error) {
    console.error(`Error processing post ${slug}:`, error);
    return null;
  }
}

// Get all posts with basic metadata
export async function getAllPosts(): Promise<Post[]> {
  try {
    const slugs = getPostSlugs();
    const posts: Post[] = [];

    for (const slug of slugs) {
      const realSlug = slug.replace(/\.mdx$/, '');
      const fullPath = path.join(POSTS_PATH, slug);

      if (!fs.existsSync(fullPath)) {
        continue;
      }

      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      posts.push({
        slug: realSlug,
        frontMatter: data as PostFrontMatter,
      });
    }

    // Sort posts by date in descending order
    return posts.sort((a, b) => {
      const dateA = new Date(a.frontMatter.date || 0);
      const dateB = new Date(b.frontMatter.date || 0);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}
