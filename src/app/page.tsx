import SharedLayout from '@/components/shared-layout';
import banner from '@assets/img/banner-2.jpg';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Landing - Poli-Epistedin',
  description:
    'Juansyah Akbar Portofolio Site showcasing projects, skills, and experiences.',
  openGraph: {
    title: 'Landing - Poli-Epistedin',
    description:
      "Explore Juansyah Akbar's portfolio, featuring innovative projects and professional achievements.",
    images: [banner.src],
  },
  alternates: {
    canonical: 'https://www.saintark.my.id',
  },
};

export default function Home() {
  return <SharedLayout />;
}
