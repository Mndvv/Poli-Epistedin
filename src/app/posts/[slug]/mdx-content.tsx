'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { components } from '@/components/mdx-components';

export default function MDXContent({
  source,
}: {
  source: MDXRemoteSerializeResult;
}) {
  return <MDXRemote {...source} components={components} />;
}
