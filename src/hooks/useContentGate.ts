import { useState, useEffect } from "react";
import { blogPosts } from "@/data/blogPosts";
//import { supabase } from "@/integrations/supabase/client";

const DAILY_UNLOCK_KEY = "daily_content_unlocked";

// Function to get today's date string (YYYY-MM-DD)
const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Function to check if user has unlocked content for today
const checkDailyUnlock = (): boolean => {
  const storedData = localStorage.getItem(DAILY_UNLOCK_KEY);
  if (!storedData) return false;
  
  try {
    const { date, unlocked } = JSON.parse(storedData);
    return unlocked && date === getTodayDateString();
  } catch {
    return false;
  }
};

// Function to set daily unlock for today
const setDailyUnlock = (): void => {
  const unlockData = {
    date: getTodayDateString(),
    unlocked: true
  };
  localStorage.setItem(DAILY_UNLOCK_KEY, JSON.stringify(unlockData));
};

// Function to track blog access in database
const trackBlogAccess = async (blogSlug: string, blogTitle: string) => {
  // Get email from previous unlock if available
  const email = localStorage.getItem("unlocked_user_email") || "anonymous";
  
  try {
    // Check if this is a new user (first time accessing any blog)
    const { data: existingAccess } = await supabase
      .from("blog_access")
      .select("id")
      .eq("email", email)
      .limit(1);
    
    const isNewUser = !existingAccess || existingAccess.length === 0;
    
    // Insert blog access record
    const { error: insertError } = await supabase.from("blog_access").insert({
      email,
      blog_slug: blogSlug,
      blog_title: blogTitle,
      user_agent: navigator.userAgent,
      ip_address: "client-side" // Will be populated by server if needed
    });

    if (insertError) {
      console.error("Failed to insert blog access:", insertError);
      return;
    }

    // Send notification to admin about the access (fire and forget)
    supabase.functions.invoke("send-blog-access-notification", {
      body: {
        email,
        blogSlug: blogSlug,
        blogTitle: blogTitle,
        userAgent: navigator.userAgent,
        isNewUser
      }
    }).catch(error => {
      console.error("Failed to send access notification:", error);
      // Don't throw - this is a background task
    });
    
  } catch (error) {
    console.error("Failed to track blog access:", error);
  }
};

// Function to get 3 different articles each day from different categories
const getDailyFeaturedArticles = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000) + 1;
  
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
  
  console.log('Daily featured articles:', selectedArticles.map(a => ({ slug: a.slug, category: a.category })));
  return selectedArticles;
};

// Function to check if an article slug is currently featured
const isArticleFeaturedToday = (blogSlug: string): boolean => {
  const featuredArticles = getDailyFeaturedArticles();
  return featuredArticles.some(article => article.slug === blogSlug);
};

export const useContentGate = (blogSlug: string) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const checkUnlockStatus = async () => {
      // Always start by checking if this is a featured article for today
      const isFeaturedToday = isArticleFeaturedToday(blogSlug);
      
      if (isFeaturedToday) {
        // Featured articles are always unlocked, no gating
        console.log(`Article "${blogSlug}" is featured today - automatically unlocked`);
        setIsUnlocked(true);
        
        // Track access for featured article
        const blogPost = blogPosts.find(post => post.slug === blogSlug);
        if (blogPost) {
          await trackBlogAccess(blogSlug, blogPost.title);
        }
        return;
      }

      // Check for daily unlock
      const hasDailyUnlock = checkDailyUnlock();
      
      if (hasDailyUnlock) {
        console.log(`Daily content unlock detected - article "${blogSlug}" automatically unlocked for today`);
        setIsUnlocked(true);
        
        // Track access for unlocked article
        const blogPost = blogPosts.find(post => post.slug === blogSlug);
        if (blogPost) {
          await trackBlogAccess(blogSlug, blogPost.title);
        }
        return;
      }

      // For non-featured articles without daily unlock, require gating
      console.log(`Article "${blogSlug}" not featured, no daily unlock - content gated`);
      setIsUnlocked(false);
    };

    checkUnlockStatus();
  }, [blogSlug]);

  const unlock = (email?: string) => {
    setIsUnlocked(true);
    
    // Set daily unlock for today
    setDailyUnlock();
    
    // Store email for tracking purposes
    if (email) {
      localStorage.setItem("unlocked_user_email", email);
    }
    
    // Track this specific blog access
    const blogPost = blogPosts.find(post => post.slug === blogSlug);
    if (blogPost) {
      trackBlogAccess(blogSlug, blogPost.title);
    }
  };

  return { isUnlocked, unlock };
};