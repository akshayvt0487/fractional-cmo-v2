'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import MobileNav from "@/components/ui/mobile-nav";
import ServicesMegaMenu from '@/components/ui/ServicesMegaMenu';
import { blogPosts } from "@/data/blogPosts";
import { usePathname } from "next/navigation";

// Function to get 3 different articles each day from different categories
const getDailyFeaturedArticles = () => {
  const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);

  // Group articles by category
  const articlesByCategory = blogPosts.reduce((acc, article) => {
    if (!acc[article.category]) {
      acc[article.category] = [];
    }
    acc[article.category].push(article);
    return acc;
  }, {} as Record<string, typeof blogPosts>);

  const categories = Object.keys(articlesByCategory);
  const selectedArticles = [];

  // Select 3 different categories for today
  for (let i = 0; i < 3; i++) {
    const categoryIndex = (dayOfYear + i) % categories.length;
    const selectedCategory = categories[categoryIndex];
    const categoryArticles = articlesByCategory[selectedCategory];

    // Pick an article from this category (rotate daily)
    const articleIndex = Math.floor(dayOfYear / 3 + i) % categoryArticles.length;
    selectedArticles.push(categoryArticles[articleIndex]);
  }

  console.log('Header Featured Articles:', selectedArticles.map((a) => ({
    title: a.title,
    slug: a.slug,
    category: a.category,
    linkTo: `/blog/${a.slug}`
  })));

  return selectedArticles;
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const handleSectionClick = (sectionId: string) => {

  const headerOffset = 50; 

  if (pathname === '/') {
    
    const element = document.getElementById(sectionId);
    if (element) {
      
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  } else {
    // If on other pages, navigate to homepage with hash
    // This part works with your CSS 'scroll-margin-top'
    window.location.href = `/#${sectionId}`;
  }
};

  return (
    <>
      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ?
        "bg-slate-900/95 backdrop-blur-md border-b border-white/10 py-3" :
        "bg-slate-900/80 backdrop-blur-sm border-b border-white/5 py-4"}`
        }>
        
        <div className="container mx-auto px-6 flex items-center justify-between max-w-350">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-white font-semibold text-xl hover:text-white/80 transition-colors">
              
              <span className="bg-linear-to-r from-white to-white/80 bg-clip-text text-transparent">
                BP
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            <ServicesMegaMenu />
            <button
              onClick={() => handleSectionClick('capabilities')}
              className="text-white/80 hover:text-white transition-colors text-sm font-medium cursor-pointer">
              Capabilities
            </button>
            <button
              onClick={() => handleSectionClick('services')}
              className="text-white/80 hover:text-white transition-colors text-sm font-medium cursor-pointer">
              
              Engagements
            </button>
            <button
              onClick={() => handleSectionClick('process')}
              className="text-white/80 hover:text-white transition-colors text-sm font-medium cursor-pointer">
              
              Process
            </button>
            <Link href="/blog" className="text-white/80 hover:text-white transition-colors text-sm font-medium">Blog</Link>
            <a
              href="https://LinkedIn.com/in/basheerpadanna"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors"
              aria-label="LinkedIn Profile">
              
              <LinkedInIcon size={20} />
            </a>
            <Button asChild className="bg-white" size="sm">
              <Link href="/contact">Contact</Link>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </header>

      {/* Secondary Blog Navigation - Visible on all pages */}
      <div className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? "top-15" : "top-17"} bg-slate-800/90 backdrop-blur-sm border-b border-white/5`
      }>
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between py-3">
            <div className="flex items-center space-x-4">
              <h2 className="text-white/60 text-xs font-medium tracking-wide uppercase">Today&apos;s Featured Articles:</h2>
              <span className="text-white/40 text-xs">Click to read and explore more!</span>
            </div>
            <div className="flex-1 max-w-3xl mx-8 overflow-hidden h-8 relative">
              {getDailyFeaturedArticles().map((article, index) =>
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className={`absolute top-0 left-0 w-full animate-fade-article text-sm lg:text-base font-medium text-white/90 hover:text-white transition-colors truncate px-4 ${
                index === 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`
                }
                style={{
                  animationDelay: `${index * 4}s`,
                  animationDuration: '12s'
                }}>
                
                  📖 {article.title}
                </Link>
              )}
            </div>
            <Link
              href="/blog"
              className="text-xs lg:text-sm font-medium text-white/70 hover:text-white transition-colors px-4 py-2 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5">
              
              View All Articles
            </Link>
          </div>

          {/* Mobile Navigation - Rotating Articles */}
          <div className="md:hidden py-3 px-2">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-white/60 text-xs font-medium tracking-wide uppercase">Today&apos;s Featured Articles:</h3>
                <span className="text-white/40 text-xs">Click to read!</span>
              </div>
              <div className="overflow-hidden h-8 relative">
                {getDailyFeaturedArticles().map((article, index) =>
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className={`absolute top-0 left-0 w-full animate-fade-article text-sm font-medium text-white/90 hover:text-white transition-colors truncate px-2 py-1 ${
                  index === 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`
                  }
                  style={{
                    animationDelay: `${index * 4}s`,
                    animationDuration: '12s'
                  }}>
                  
                    📖 {article.title}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>);

};

export default Header;