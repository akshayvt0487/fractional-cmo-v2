'use client'

import React, { useMemo, useState } from 'react';
import Header from '@/components/ui/header';

import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import BlogPostLayout from '@/components/BlogPostLayout';
import InternalLinks from '@/components/InternalLinks';
import SocialSharePreview from '@/components/SocialSharePreview';
import { generateArticleSchema, generateBreadcrumbSchema, generatePersonSchema, getRelatedArticles, ArticleData } from '@/utils/seoUtils';
import type { StaticImageData } from 'next/image';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface OptimizedBlogLayoutProps {
  articleData: ArticleData;
  children: React.ReactNode;
  relatedArticles?: Array<{
    title: string;
    description: string;
    url: string;
    category: string;
    readTime?: string;
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  heroImage?: string | StaticImageData;
  heroAlt?: string;
}

const OptimizedBlogLayout = ({
  articleData,
  children,
  relatedArticles: providedRelatedArticles,
  faqs,
  heroImage,
  heroAlt,
}: OptimizedBlogLayoutProps) => {
  const [showSocialPreview, setShowSocialPreview] = useState(false);

  // Use provided relatedArticles or generate dynamic ones for better relevance and variety
  const relatedArticles = useMemo(() => {
    if (providedRelatedArticles && providedRelatedArticles.length > 0) {
      return providedRelatedArticles;
    }
    const slug = articleData.url.replace('/blog/', '');
    return getRelatedArticles(slug, 4);
  }, [articleData.url, providedRelatedArticles]);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: articleData.headline, url: articleData.url }
  ];

  const structuredData: any[] = [
    generateArticleSchema(articleData),
    generateBreadcrumbSchema(breadcrumbs),
    generatePersonSchema()
  ];

  // Add FAQ schema if provided
  if (faqs && faqs.length > 0) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  // Normalize possible StaticImageData to a string src for places that need a string
  const normalizeImageToString = (img?: string | StaticImageData) => {
    if (!img) return undefined;
    return typeof img === 'string' ? img : (img as StaticImageData).src;
  };

  return (
    <>
  
      
      <Header />
      
      <main className="min-h-screen flex flex-col items-center justify-center">
        <div className="container max-w-4xl py-8 mt-20 md:mt-16">
          <BreadcrumbNavigation items={breadcrumbs.map(b => ({ label: b.name, href: b.url }))} />
          
          <BlogPostLayout
            title={articleData.headline}
            author={articleData.author || 'Basheer Padanna'}
            date={new Date(articleData.publishedDate).toLocaleDateString('en-AU', {
              year: 'numeric',
              month: 'long', 
              day: 'numeric'
            })}
            readTime={articleData.readTime || '10 min read'}
            category={articleData.category || 'Business Growth'}
            heroImage={heroImage || articleData.imageUrl}
            heroAlt={heroAlt || `${articleData.headline} - Professional guide by Basheer Padanna`}
            articleUrl={articleData.url}
          >
            {/* Admin: Social Share Preview Toggle */}
         

            {/* Social Share Preview (Dev Only) */}
            {showSocialPreview && (
              <SocialSharePreview
                title={articleData.headline}
                description={articleData.description}
                imageUrl={normalizeImageToString(heroImage ?? articleData.imageUrl) ?? ''}
                url={articleData.url}
              />
            )}

            <div className="prose prose-lg max-w-none">
              {children}
            </div>

            {/* FAQ Section if provided */}
            {faqs && faqs.length > 0 && (
              <section className="mt-12 mb-8">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <details
                      key={index}
                      className="group border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <summary className="font-semibold cursor-pointer text-foreground group-open:text-primary">
                        {faq.question}
                      </summary>
                      <div className="mt-3 text-muted-foreground">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Related Articles */}
            <InternalLinks articles={relatedArticles} />
          </BlogPostLayout>
        </div>
      </main>
      
     
    </>
  );
};

export default OptimizedBlogLayout;