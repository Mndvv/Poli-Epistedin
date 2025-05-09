import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://saintark.my.id/about-me'),
  title: 'Poli-Epistedin -  Juansyah Akbar Portofolio Site',
  description:
    'Portfolio of Juansyah Akbar, a web developer showcasing projects, designs, and contact information.',
  keywords: [
    'web',
    'portfolio',
    'developer',
    'react',
    'Juansyah Akbar',
    'Web Developer',
    'Frontend Developer',
    'React Developer',
    'Portfolio',
  ],
  openGraph: {
    title: "Juansyah Akbar's Portfolio",
    description: 'Portfolio website of Juansyah Akbar.',
    type: 'website',
    url: 'https://saintark.my.id/about-me',
    images: [
      {
        url: 'https://static.saintark.my.id/static/assets/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function AboutMe() {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold'>About Me</h1>
      <p className='text-gray-500'>This is the about me section.</p>
    </div>
  );
}
