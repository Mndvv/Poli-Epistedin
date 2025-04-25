'use client';

import ThemeToggleButton from "./ui/theme-toggle-button";
import { webDefaults } from "@/lib/global/consts.g";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { Link } from "next-view-transitions";

const texts = webDefaults.webHeader;
const typingSpeed = 120;      // Typewriter typing speed (ms)
const deletingSpeed = 80;     // Typewriter deleting speed (ms)
const delayBetween = 2000;    // Delay between typewriting (ms)

export default function Header() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/');
    };

    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = texts[index % texts.length];
        let timer: NodeJS.Timeout;

        if (!isDeleting && text.length < current.length) {
            timer = setTimeout(() => {
                setText(current.slice(0, text.length + 1));
            }, typingSpeed);
        } else if (isDeleting && text.length > 0) {
            timer = setTimeout(() => {
                setText(current.slice(0, text.length - 1));
            }, deletingSpeed);
        } else if (!isDeleting && text === current) {
            timer = setTimeout(() => setIsDeleting(true), delayBetween);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % texts.length);
        }

        return () => clearTimeout(timer);
    }, [text, isDeleting, index]);

    return (
        <div className="flex flex-col p-4 md:p-6 select-none transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-center">
                <div className="ml-6" onClick={handleClick}>
                    <Link className="text-2xl md:text-3xl font-bold cursor-pointer" href="/">
                        <span className="whitespace-pre">{text}</span>
                        <span className="animate-pulse">|</span>
                    </Link>
                    <h2 className="text-sm md:text-base lg:text-lg text-gray-400 tracking-widest mt-1">
                        {webDefaults.webSubHeader}
                    </h2>
                </div>
                <div className="mr-6">
                    <ThemeToggleButton />
                </div>
            </div>
        </div>
    );
}
