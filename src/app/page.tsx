import Header from '@/components/header';
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
    <div className="home w-full max-w-[800px] mx-auto">
      <Header />
      <ProfileCard />
    </div>
  );
}
