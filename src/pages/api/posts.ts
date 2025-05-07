import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllPosts, Post } from '@/lib/mdx';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[] | { message: string }>,
) {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
}
