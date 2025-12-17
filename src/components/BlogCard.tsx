'use client'

import { memo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import  Link  from "next/link";
import { Clock, ArrowRight, Calendar } from "lucide-react";
import type { BlogPost } from "@/data/blogPosts";
import Image from "next/image";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

const BlogCard = memo(({ post, index = 0 }: BlogCardProps) => {
  // Extract main category name and map to correct display names
  const getCategoryDisplayName = (category: string) => {
    // First split by " - " to get main category
    const baseCategory = category.split(' - ')[0];
    
    // Map specific categories to their main category
    const categoryMapping: { [key: string]: string } = {
      'Cyber Security': 'IT',
      'Construction': 'Building & Construction',
      'Building & Construction - Real Estate': 'Building & Construction',
      'Building & Construction - Renovation Builders': 'Building & Construction',
      'Building & Construction - Buyers Agents': 'Building & Construction',
      'Building & Construction - Home Builders': 'Building & Construction',
      'Tradies': 'Trade/Tradies'
    };
    
    // Check for full category match first, then base category
    return categoryMapping[category] || categoryMapping[baseCategory] || baseCategory;
  };
  
  const mainCategory = getCategoryDisplayName(post.category);
  
  return (
    <Card 
      className="group glass-card h-full flex flex-col overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in hover-scale"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="aspect-video overflow-hidden relative">
        <Image 
          src={post.image} 
          alt={`${post.title} - Digital Marketing Guide by ${post.author}`}
          className="group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
          width={400}
          height={225}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardHeader className="space-y-2 md:space-y-3 p-4 md:p-6 pb-3 md:pb-4">
        <div className="flex items-center gap-2 md:gap-3 text-xs">
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs">
            {mainCategory}
          </Badge>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <CardTitle className="text-base md:text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
          <Link 
            href={`/blog/${post.slug}`}
            className="story-link"
          >
            {post.title}
          </Link>
        </CardTitle>
        
        <CardDescription className="text-xs md:text-sm line-clamp-3 leading-relaxed">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col justify-end p-4 md:p-6 pt-0">
        <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-border/50">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span className="hidden sm:inline">{post.date}</span>
            <span className="sm:hidden">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
            className="group/btn text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300 text-xs md:text-sm px-2 md:px-3"
          >
            <Link href={`/blog/${post.slug}`} className="flex items-center gap-1">
              <span className="hidden sm:inline">Read more</span>
              <span className="sm:hidden">Read</span>
              <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

BlogCard.displayName = "BlogCard";

export default BlogCard;