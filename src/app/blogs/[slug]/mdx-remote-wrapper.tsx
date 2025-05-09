'use client';

import {
  MDXRemote,
  MDXRemoteSerializeResult,
  MDXRemoteProps,
} from 'next-mdx-remote';
import { ComponentProps } from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';

// Define the type for components prop more explicitly
type MDXComponentsType = NonNullable<MDXRemoteProps['components']>;

// Create a more specific extended components type that includes our custom components
type ExtendedMDXComponents = MDXComponentsType & {
  img?: React.FC<ComponentProps<'img'> & { src: string; alt: string }>;
  Image?: typeof NextImage;
  Link?: typeof NextLink;
};

export default function MDXRemoteWrapper({
  source,
  components,
}: {
  source: MDXRemoteSerializeResult;
  components: ExtendedMDXComponents;
}) {
  return <MDXRemote {...source} components={components} />;
}
