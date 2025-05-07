import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { ViewTransitions } from 'next-view-transitions';
import './globals.css';

import { HeaderProvider } from '@/components/header-context';
import Header from '@/components/header';
import Footer from '@/components/footer';

import ScrollToTopButton from '@/components/ui/scrollup-button';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://saintark.my.id'),
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
    url: 'https://saintark.my.id',
    images: [
      {
        url: 'https://static.saintark.my.id/static/assets/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ViewTransitions>
        <html lang='en' suppressHydrationWarning>
          <body
            className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col scroll-smooth antialiased`}
          >
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <HeaderProvider>
                <Header />
                <main className='mx-auto flex w-full max-w-3xl flex-grow flex-col gap-5'>
                  {children}
                </main>
                <ScrollToTopButton />
                <Footer />
              </HeaderProvider>
            </ThemeProvider>
          </body>
        </html>
      </ViewTransitions>
    </>
  );
}
