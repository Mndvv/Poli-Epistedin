'use client';

import ProfileCard from '@/components/profile-card';
import HorizontalNavbar, {
  HorizontalNavbarSkeleton,
} from '@/components/navbar';
import { Suspense, ReactNode } from 'react';
import Head from 'next/head';

type SharedLayoutProps = {
  children?: ReactNode;
};

export default function SharedLayout({ children }: SharedLayoutProps) {
  return (
    <div className='p-6'>
      <Head>
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Juansyah Akbar',
            url: 'https://saintark.my.id',
            sameAs: [
              'https://github.com/Mndvv',
              'https://www.linkedin.com/in/juansyah-akbar-77b278322/',
              'mailto:juansyakbar25@gmail.com',
            ],
            jobTitle: 'Web Developer',
            image: 'https://static.saintark.my.id/static/assets/og-image.jpg',
          })}
        </script>
      </Head>

      <ProfileCard />
      <Suspense fallback={<HorizontalNavbarSkeleton />}>
        <HorizontalNavbar />
      </Suspense>

      {children}
    </div>
  );
}
