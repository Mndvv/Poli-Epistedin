import ThemeToggleButton from "./ui/theme-toggle-button"

import { webDefaults } from "@/lib/global/consts.g";

export default function Header() {
  return (
    <div className="flex flex-col min-h-screen p-4 md:p-8 select-none transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center">
        <div className="ml-6">
          <a className="text-2xl md:text-3xl font-bold">{webDefaults.webHeader}</a>
          <h2 className="text-sm md:text-base lg:text-lg text-gray-400 tracking-widest mt-1">{webDefaults.webSubHeader}</h2>
        </div>
        <div className="mr-6">
          <ThemeToggleButton />
        </div>
      </div>
    </div>
  );
}
