'use client'

import React from 'react';
import { Calendar, Clock, User, Bookmark } from 'lucide-react';
import type { StaticImageData } from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SocialShareButton from '@/components/SocialShareButton';
import Image from 'next/image';

interface BlogPostLayoutProps {
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  heroImage?: string | StaticImageData;
  heroAlt: string;
  articleUrl: string;
  children: React.ReactNode;
}

const BlogPostLayout: React.FC<BlogPostLayoutProps> = ({
  title,
  author,
  date,
  readTime,
  category,
  heroImage,
  heroAlt,
  articleUrl,
  children
}) => {
  return (
    <article className="max-w-4xl mx-auto animate-fade-in">
      {/* Hero Section */}
      <header className="mb-12">
        <div className="mb-6">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 mb-4">
            {category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>
        </div>
        
        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="font-medium">{author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mb-8">
          <SocialShareButton 
            title={title}
            url={articleUrl}
            description={`${title} - A comprehensive guide by ${author}`}
          />
          <Button variant="outline" size="sm" className="gap-2 border-gray-200 text-gray-700 hover:bg-gray-50">
            <Bookmark className="h-4 w-4" />
            Save
          </Button>
        </div>
        
        {/* Hero Image with Next.js Image optimization */}
        {heroImage && (
          <div className="relative overflow-hidden rounded-xl mb-8 shadow-md">
            {typeof heroImage === 'string' ? (
              // String URL - use fill layout with aspect-video container
              <div className="relative aspect-video">
                <Image
                  src={heroImage}
                  alt={heroAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                  quality={85}
                />
              </div>
            ) : (
              // StaticImageData - use the imported dimensions
              <Image
                src={heroImage}
                alt={heroAlt}
                className="w-full h-auto object-cover"
                priority
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-gray-900/10 to-transparent" />
          </div>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none prose-headings:scroll-mt-20 prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12 prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-8 prose-p:mb-6 prose-p:leading-relaxed prose-p:text-base prose-p:text-gray-700 prose-ul:mb-8 prose-li:mb-3 prose-li:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8">
        {children}
      </div>

    </article>
  );
};

export default BlogPostLayout;