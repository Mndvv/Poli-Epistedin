import { Link } from "next-view-transitions";

export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center w-full p-4 mt-8 bg-transparent max-w-3xl mb-5 md:mb-0 mx-auto gap-8">
            <div>
            <p className="text-sm sm:text-xs md:text-base text-center text-gray-500">Juansyah Akbar © 2025 Licensed in <Link href="https://github.com/Mndvv/CoSenseOP-License-V1.0" className="border-b border-gray-500">CoSenseOP-License-V1.0.</Link></p>
            </div>
        </footer>
    );
}