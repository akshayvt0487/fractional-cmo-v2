import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full py-8 md:py-12">
      {/* Centered container */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
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
