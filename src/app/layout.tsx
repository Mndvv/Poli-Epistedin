import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { ViewTransitions } from 'next-view-transitions';
import './globals.css';

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
  title: 'Poli-Epistedin',
  description:
    'A portofolio site to show off my work and projects as a web developer.',
  keywords: ['web', 'portfolio', 'developer', 'react'],
  openGraph: {
    title: "Stark's Portfolio",
    description: 'Check out my web dev projects!',
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
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <main className='mx-auto flex w-full max-w-3xl flex-col gap-5 p-5'>
                {children}
              </main>
              <ScrollToTopButton />
              <Footer />
            </ThemeProvider>
          </body>
        </html>
      </ViewTransitions>
    </>
  );
}
