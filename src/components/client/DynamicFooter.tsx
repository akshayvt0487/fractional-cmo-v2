'use client';

import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/sections/Footer'), {
  loading: () => <div className="h-[200px]" />,
  ssr: false
});

export default function DynamicFooter() {
  return <Footer />;
}