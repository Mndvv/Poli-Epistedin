import Image from 'next/image';

import { Mail, Github, Linkedin } from 'lucide-react';

//import Profil Assets & Profile
import authorIcon from '@assets/img/furina.jpg'
import bannerImage from '@assets/img/banner.jpg'

import { developerProfiles } from '@/lib/global/consts.g';

export default function ProfileCard() {
    return (
        <div className="w-full flex flex-col items-center sm:items-start">
            {/* Banner */}
            <div className="profileCard-banner w-full h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden select-none relative shadow-gray-400 sm:shadow-gray-400/30 dark:shadow-blue-950 shadow-xl">
                <Image src={bannerImage} alt="" className="object-cover" fill/>
            </div>

            <div className="authorCard w-full -mt-20 sm:-mt-16 md:-mt-20 flex flex-col sm:flex-row items-center mx-auto sm:mx-0">
                {/* Author Icon */}
                <div className="profileCard-authorIcon w-32 h-32 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden select-none relative sm:ml-8">
                    <Image src={authorIcon} alt="" className="object-cover" fill/>
                </div>

                <div className="authorName font-bold text-gray-800 dark:text-white text-3xl sm:mt-15 sm:ml-6 sm:self-center flex-grow z-10">
                    <p>{developerProfiles[0].name}</p>
                </div>

                <div className="authorSocial flex flex-row gap-4 mt-4 sm:mt-15 sm:ml-auto sm:mr-8">
                    <a href={developerProfiles[0].socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-white hover:text-blue-900 transition-colors duration-300">
                        <Github size={24} />
                    </a>
                    <a href={developerProfiles[0].socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-white hover:text-blue-900 transition-colors duration-300">
                        <Linkedin size={24} />
                    </a>
                    <a href={`mailto:${developerProfiles[0].socialLinks.email}`} target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-white hover:text-blue-900 transition-colors duration-300">
                        <Mail size={24} />
                    </a>
                </div>
            </div>
        </div>
    );
}