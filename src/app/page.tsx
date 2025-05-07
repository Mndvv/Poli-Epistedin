import ProfileCard from '@/components/profile-card';
import HorizontalNavbar, {
  HorizontalNavbarSkeleton,
} from '@/components/navbar';

import banner from '@assets/img/banner-2.jpg';

import { Metadata } from 'next';
import { Suspense } from 'react';

import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Landing - Poli-Epistedin',
  description: 'My personal portfolio site.',
  openGraph: {
    title: 'Landing - Poli-Epistedin',
    description: 'My personal portfolio site.',
    images: [banner.src],
  },
};

export default function Home() {
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
    </div>
  );
}
