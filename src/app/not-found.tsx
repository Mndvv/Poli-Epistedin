import { Button } from "@/components/ui/button";
import { Undo } from "lucide-react";
import { Link } from "next-view-transitions";

import bannerImage from '@assets/img/banner-2.jpg'

export default function NotFound() {
  return (
    <div className="w-full max-w-3xl mx-auto p-5 gap-3 flex flex-col justify-center items-center min-h-[72vh]">
      <h2 
      className="text-[9rem] font-bold tracking-wider bg-clip-text text-transparent select-none" 
      style={{
        backgroundImage: `url(${bannerImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>404</h2>
      <p className="-mt-2">There&apos;s nothing interesting here.</p>
      <Button
        variant="outline"
        className="transition-colors flex gap-3 items-center mt-4"
        asChild
      >
        <Link href="/">
          <Undo className="size-5" />
          <span>Return to Homepage</span>
        </Link>
      </Button>
    </div>
  );
}