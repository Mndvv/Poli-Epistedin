'use client';

import ThemeToggleButton from "./ui/theme-toggle-button"

import { webDefaults } from "@/lib/global/consts.g";
import { useRouter } from 'next/navigation';


export default function Header() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/');
    };
    return (
        <div className="flex flex-col p-4 md:p-6 select-none transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-center">
            <div className="ml-6" onClick={handleClick}>
                <a className="text-2xl md:text-3xl font-bold" href="/">{webDefaults.webHeader}</a>
                <h2 className="text-sm md:text-base lg:text-lg text-gray-400 tracking-widest mt-1">{webDefaults.webSubHeader}</h2>
            </div>
            <div className="mr-6">
            <ThemeToggleButton />
            </div>
        </div>
        </div>
    );
}
