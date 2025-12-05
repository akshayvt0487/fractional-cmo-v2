'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import MobileNav from "@/components/ui/mobile-nav";
import { FileText, Users, Building2, Shield, Briefcase, Cpu, Code, Hammer, TrendingUp, Gavel, ChevronDown } from "lucide-react";
import ServicesMegaMenu from '@/components/ui/ServicesMegaMenu';
import { blogPosts } from "@/data/blogPosts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger } from
"@/components/ui/dropdown-menu";
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

  const blogCategories = [
  {
    name: "Accounting & Finance",
    icon: Briefcase,
    path: `/blog?category=${encodeURIComponent("Accounting & Finance")}`,
    subcategories: [
    { name: "Accounting Firms", path: `/blog?category=${encodeURIComponent("Accounting & Finance - Accounting Firms")}` },
    { name: "Finance Brokers", path: `/blog?category=${encodeURIComponent("Accounting & Finance - Finance Brokers")}` },
    { name: "Financial Planning", path: `/blog?category=${encodeURIComponent("Accounting & Finance - Financial Planning")}` },
    { name: "Tax Services", path: `/blog?category=${encodeURIComponent("Accounting & Finance - Tax Services")}` }]

  },
  {
    name: "Building & Construction",
    icon: Building2,
    path: `/blog?category=${encodeURIComponent("Building & Construction")}`,
    subcategories: [
    { name: "Buyers Agents", path: `/blog?category=${encodeURIComponent("Building & Construction - Buyers Agents")}` },
    { name: "Home Builders", path: `/blog?category=${encodeURIComponent("Building & Construction - Home Builders")}` },
    { name: "Real Estate", path: `/blog?category=${encodeURIComponent("Building & Construction - Real Estate")}` },
    { name: "Renovation Builders", path: `/blog?category=${encodeURIComponent("Building & Construction - Renovation Builders")}` }]

  },
  {
    name: "Digital Marketing",
    icon: TrendingUp,
    path: `/blog?category=${encodeURIComponent("Digital Marketing")}`,
    subcategories: [
    { name: "Digital Strategy", path: `/blog?category=${encodeURIComponent("Digital Marketing - Digital Strategy")}` },
    { name: "Google Ads", path: `/blog?category=${encodeURIComponent("Digital Marketing - Google Ads")}` },
    { name: "Growth Marketing", path: `/blog?category=${encodeURIComponent("Digital Marketing - Growth Marketing")}` },
    { name: "Lead Generation", path: `/blog?category=${encodeURIComponent("Digital Marketing - Lead Generation")}` },
    { name: "SEO", path: `/blog?category=${encodeURIComponent("Digital Marketing - SEO")}` },
    { name: "Social Media", path: `/blog?category=${encodeURIComponent("Digital Marketing - Social Media")}` }]

  },
  {
    name: "IT",
    icon: Code,
    path: `/blog?category=${encodeURIComponent("IT")}`,
    subcategories: [
    { name: "Consulting", path: `/blog?category=${encodeURIComponent("IT - Consulting")}` },
    { name: "Cyber Security", path: `/blog?category=${encodeURIComponent("IT - Cyber Security")}` },
    { name: "Networking", path: `/blog?category=${encodeURIComponent("IT - Networking")}` },
    { name: "SaaS", path: `/blog?category=${encodeURIComponent("IT - SaaS")}` }]

  },
  {
    name: "Legal",
    icon: Gavel,
    path: `/blog?category=${encodeURIComponent("Legal")}`,
    subcategories: [
    { name: "Conveyancing", path: `/blog?category=${encodeURIComponent("Legal - Conveyancing")}` },
    { name: "Criminal Law", path: `/blog?category=${encodeURIComponent("Legal - Criminal Law")}` },
    { name: "Divorce Law", path: `/blog?category=${encodeURIComponent("Legal - Divorce Law")}` },
    { name: "Family Law", path: `/blog?category=${encodeURIComponent("Legal - Family Law")}` }]

  },
  {
    name: "NDIS",
    icon: Users,
    path: `/blog?category=${encodeURIComponent("NDIS")}`,
    subcategories: [
    { name: "Business Growth", path: `/blog?category=${encodeURIComponent("NDIS - Business Growth")}` },
    { name: "Disability Service", path: `/blog?category=${encodeURIComponent("NDIS - Disability Service")}` },
    { name: "Participant Engagement", path: `/blog?category=${encodeURIComponent("NDIS - Participant Engagement")}` },
    { name: "SaaS", path: `/blog?category=${encodeURIComponent("NDIS - SaaS")}` },
    { name: "Therapy Service", path: `/blog?category=${encodeURIComponent("NDIS - Therapy Service")}` }]

  },
  {
    name: "Trade/Tradies",
    icon: Hammer,
    path: `/blog?category=${encodeURIComponent("Tradies")}`,
    subcategories: [
    { name: "Bricklayers", path: `/blog?category=${encodeURIComponent("Tradies - Bricklayers")}` },
    { name: "Floor Sanding Specialists", path: `/blog?category=${encodeURIComponent("Tradies - Floor Sanding Specialists")}` },
    { name: "Mechanics", path: `/blog?category=${encodeURIComponent("Tradies - Mechanics")}` },
    { name: "Painters", path: `/blog?category=${encodeURIComponent("Tradies - Painters")}` },
    { name: "Removalists", path: `/blog?category=${encodeURIComponent("Tradies - Removalists")}` },
    { name: "Security", path: `/blog?category=${encodeURIComponent("Tradies - Security")}` }]

  },
  { name: "All Articles", icon: FileText, path: "/blog" }];


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
        
        <div className="container mx-auto px-6 flex items-center justify-between max-w-[1400px]">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-white font-semibold text-xl hover:text-white/80 transition-colors">
              
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
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
      isScrolled ? "top-[60px]" : "top-[68px]"} bg-slate-800/90 backdrop-blur-sm border-b border-white/5`
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