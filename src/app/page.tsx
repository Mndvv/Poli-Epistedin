import ProfileCard from '@/components/profile-card';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landing - Poli-Epistedin",
  description: "Where it all begins.",
  openGraph: {
    title: "Landing - Poli-Epistedin",
    description: "Where it all begins.",
  },
};

export default function Home() {
  return (
    <div className="h-screen p-4">
      <ProfileCard />
    </div>
  );
}
