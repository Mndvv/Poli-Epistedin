import { Button } from '@/components/ui/button';
import { Undo } from 'lucide-react';
import { Link } from 'next-view-transitions';

import bannerImage from '@assets/img/banner-2.jpg';

export default function NotFound() {
  return (
    <div className='mx-auto flex min-h-[72vh] w-full max-w-3xl flex-col items-center justify-center gap-3 p-5'>
      <h2
        className='bg-clip-text text-[9rem] font-bold tracking-wider text-transparent select-none'
        style={{
          backgroundImage: `url(${bannerImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        404
      </h2>
      <p className='-mt-2'>There&apos;s nothing interesting here.</p>
      <Button
        variant='outline'
        className='mt-4 flex items-center gap-3 transition-colors'
        asChild
      >
        <Link href='/'>
          <Undo className='size-5' />
          <span>Return to Homepage</span>
        </Link>
      </Button>
    </div>
  );
}
