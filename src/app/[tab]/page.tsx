import SharedLayout from '@/components/shared-layout';

// This component will be rendered on the server
export default function TabPage() {
  return <SharedLayout />;
}

// Generate static params for all tabs at build time
export function generateStaticParams() {
  const tabs = ['overview', 'media', 'posts', 'aboutme', 'aboutsite'];
  return tabs.map((tab) => ({ tab }));
}
