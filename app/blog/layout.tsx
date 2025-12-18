import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { createMetadata, SITE_URL } from '@/lib/seo';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = createMetadata({
  title: 'Blog - Digital Marketing & Growth Strategy Articles',
  description: 'Read our latest articles on digital marketing, SEO, Google Ads, lead generation, and growth strategies for service businesses.',
  path: '/blog',
  canonical: `${SITE_URL}/blog`,
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  keywords: [
    'digital marketing blog',
    'SEO articles',
    'lead generation guide',
    'Google Ads tips',
    'marketing strategy',
  ],
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full py-8 md:py-12">
      {/* Centered container */}
      <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-8">
          <Button variant="outline" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to All Articles
            </Link>
          </Button>
        </div>

        {/* Page content */}
        <main className="w-full  mx-auto">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
