'use client';

import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import dynamic from 'next/dynamic';
import { components } from '@/components/mdx-components';

// Dynamically import MDXRemote with SSR disabled
const MDXRemoteWrapper = dynamic(() => import('./mdx-remote-wrapper'), {
  ssr: false,
});

export default function MDXContent({
  source,
}: {
  source: MDXRemoteSerializeResult;
}) {
  return <MDXRemoteWrapper source={source} components={components} />;
}
