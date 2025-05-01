import { Link } from 'next-view-transitions';

export default function Footer() {
  return (
    <footer className='mt-8 mb-5 flex w-full flex-col items-center justify-center gap-8 bg-transparent p-4 md:mb-0'>
      <div className='mt-auto'>
        <p className='text-center text-sm text-gray-500 sm:text-xs md:text-base'>
          Juansyah Akbar © 2025 Licensed in{' '}
          <Link
            href='https://github.com/Mndvv/CoSenseOP-License-V1.0'
            className='border-b border-gray-500'
          >
            CoSenseOP-License-V1.0.
          </Link>
        </p>
      </div>
    </footer>
  );
}
