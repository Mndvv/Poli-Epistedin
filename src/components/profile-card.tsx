import Image from 'next/image';
import { Link } from 'next-view-transitions';

import { Mail, Github, Linkedin } from 'lucide-react';

//import Profil Assets & Profile
import authorIcon from '@assets/img/furina.jpg';
import bannerImage from '@assets/img/banner.jpg';

import { developerProfiles } from '@/lib/global/consts.g';

export default function ProfileCard() {
  return (
    <div className='-mt-4 flex w-full flex-col items-center sm:items-start'>
      {/* Banner */}
      <div className='profileCard-banner relative h-40 w-full overflow-hidden rounded-xl shadow-xl shadow-gray-400 select-none sm:h-56 sm:shadow-gray-400/30 md:h-64 dark:shadow-blue-950'>
        <Image
          src={bannerImage}
          alt='Page banner'
          className='object-cover'
          fill
        />
      </div>

      <div className='authorCard z-10 mx-auto -mt-20 flex w-full flex-col items-center sm:mx-0 sm:-mt-16 sm:flex-row md:-mt-20'>
        {/* Author Icon */}
        <div className='profileCard-authorIcon relative h-32 w-32 overflow-hidden rounded-full border-4 border-white select-none sm:ml-8 sm:h-32 sm:w-32 md:h-40 md:w-40'>
          <Image
            src={authorIcon}
            alt={developerProfiles[0].name + ' Profile icon'}
            className='object-cover'
            fill
          />
        </div>

        <div className='authorName mt-3 flex-grow text-3xl font-bold text-gray-800 sm:mt-20 sm:ml-4 sm:self-center dark:text-white'>
          <p>{developerProfiles[0].name}</p>
        </div>

        <div className='authorSocial mt-4 flex flex-row gap-4 sm:mt-20 sm:mr-8 sm:ml-auto'>
          <Link
            href={developerProfiles[0].socialLinks.github}
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-500 transition-colors duration-300 hover:text-black dark:text-white/70 hover:dark:text-white'
          >
            <Github size={24} />
          </Link>
          <Link
            href={developerProfiles[0].socialLinks.linkedin}
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-500 transition-colors duration-300 hover:text-black dark:text-white/70 hover:dark:text-white'
          >
            <Linkedin size={24} />
          </Link>
          <Link
            href={`mailto:${developerProfiles[0].socialLinks.email}`}
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-500 transition-colors duration-300 hover:text-black dark:text-white/70 hover:dark:text-white'
          >
            <Mail size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
