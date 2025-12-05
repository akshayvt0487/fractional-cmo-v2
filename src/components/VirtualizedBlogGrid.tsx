"use client"
import { useState, useMemo, memo } from "react";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/data/blogPosts";
interface VirtualizedBlogGridProps {
  posts: BlogPost[];
  initialPostsCount?: number;
  postsPerPage?: number;
}

const 

VirtualizedBlogGrid = memo(({ 
  posts, 
  initialPostsCount = 9, 
  postsPerPage = 6 
}: VirtualizedBlogGridProps) => {
  const [visibleCount, setVisibleCount] = useState(initialPostsCount);
  
  const visiblePosts = useMemo(() => 
    posts.slice(0, visibleCount), 
    [posts, visibleCount]
  );
  
  const hasMorePosts = visibleCount < posts.length;
  
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + postsPerPage, posts.length));
  };

  return (
    <div className="space-y-8 md:space-y-12 animate-fade-in">
      {/* Results Summary */}
      {posts.length > 0 && (
        <div className="text-center py-2 md:py-4">
          <p className="text-sm md:text-base text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{Math.min(visibleCount, posts.length)}</span> of <span className="font-semibold text-foreground">{posts.length}</span> articles
          </p>
        </div>
      )}

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 md:py-16">
          <div className="max-w-md mx-auto px-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <span className="text-xl md:text-2xl">📝</span>
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-sm md:text-base text-muted-foreground">Try selecting a different category to see more articles.</p>
          </div>
        </div>
      )}
      
      {hasMorePosts && (
        <div className="text-center animate-fade-in pt-4 md:pt-8">
          <Button 
            variant="outline" 
            onClick={loadMore}
            className="w-full sm:w-auto min-w-[180px] hover:bg-primary hover:text-white transition-all duration-300 hover:bg-gray-500 group cursor-pointer border-0 bg-gray-300 shadow-xl">
            Load More Articles
            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full group-hover:bg-primary-foreground/20 group-hover:text-primary-foreground">
              {posts.length - visibleCount} remaining
            </span>
          </Button>
        </div>
      )}
    </div>
  );
});

VirtualizedBlogGrid.displayName = "VirtualizedBlogGrid";

export default VirtualizedBlogGrid;