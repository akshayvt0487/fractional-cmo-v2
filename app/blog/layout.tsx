import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * This layout wraps all pages in the /blog directory.
 * It provides a consistent container and navigation for the blog section.
 *
 * The file structure should be:
 * - app/
 * - blog/
 * - layout.tsx  (This file)
 * - page.tsx    (Your main blog listing page)
 * - accounting-growth-strategy-guide/
 * - page.tsx  (Your individual blog post)
 */



export default  function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* This assumes your RootLayout (app/layout.tsx) already renders 
        your main site header and footer.
      */}

      {/* We add a main container here to ensure all blog pages 
        (the listing and individual posts) have the same max-width and padding.
      */}
      <div className="container mx-auto max-w-[1400px] px-4 py-8 md:py-12">
        
        {/* Optional: You could add a shared "Back to All Articles" link here.
          We can use a simple <Button> for consistent styling.
          This would appear on both the main blog page and individual posts,
          so you might want to add logic to hide it on /blog itself.
          
          For simplicity, we'll just include the main wrapper.
        */}
         {/*
       <div className="mb-8">
          <Button variant="outline" asChild>
            <Link href="/blog" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to All Articles
            </Link>
          </Button>
        </div>  */}

        {/* 'children' will be either your main blog listing page 
          or an individual blog post page.
        */}
        <main>{children}</main>
      </div>
    </>
  );
}