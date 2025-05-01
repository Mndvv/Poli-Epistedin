import ProfileCard from '@/components/profile-card';
import HorizontalNavbar, {
  HorizontalNavbarSkeleton,
} from '@/components/navbar';

import banner from '@assets/img/banner-2.jpg';

import { Metadata } from 'next';
import { Suspense } from 'react';

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
      <ProfileCard />
      <Suspense fallback={<HorizontalNavbarSkeleton />}>
        <HorizontalNavbar />
      </Suspense>
    </div>
  );
}
