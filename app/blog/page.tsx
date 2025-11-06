'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Header from "@/components/ui/header";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import StrategyForm from "@/components/ui/strategy-form";
import VirtualizedBlogGrid from "@/components/VirtualizedBlogGrid";
import { Search, X } from "lucide-react";

import BlogMegaMenu from "@/components/BlogMegaMenu";
import { blogPosts, categories } from "@/data/blogPosts";

const Blog = () => {
  const searchParams = useSearchParams();
  const categoryFromURL = decodeURIComponent(searchParams?.get('category') || "All");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL);
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [searchQuery, setSearchQuery] = useState("");

  // Update selected category when URL changes
  useEffect(() => {
    setSelectedCategory(categoryFromURL);
  }, [categoryFromURL]);

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;

    // Apply search filter first
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter((post) =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "All") {
      if (selectedCategory.includes(" - ")) {
        // Handle subcategory filtering
        const [mainCategory, subcategory] = selectedCategory.split(" - ");
        posts = blogPosts.filter((post) => {
          // Custom logic for subcategory matching
          if (mainCategory === "NDIS") {
            if (post.category !== mainCategory) return false;
            if (subcategory === "Therapy Service") {
              return post.title.toLowerCase().includes("therapy");
            }
            if (subcategory === "SaaS") {
              return post.title.toLowerCase().includes("software") || post.title.toLowerCase().includes("saas");
            }
            if (subcategory === "Disability Service") {
              return !post.title.toLowerCase().includes("therapy") && !post.title.toLowerCase().includes("software");
            }
            if (subcategory === "Participant Engagement") {
              return post.title.toLowerCase().includes("participant");
            }
            if (subcategory === "Business Growth") {
              return post.title.toLowerCase().includes("growth") || post.title.toLowerCase().includes("strategy");
            }
          }
          if (mainCategory === "Accounting & Finance") {
            if (subcategory === "Accounting Firms") {
              return post.title.toLowerCase().includes("accounting") && (
              post.title.toLowerCase().includes("firm") ||
              post.title.toLowerCase().includes("practice") ||
              post.title.toLowerCase().includes("growth strategy"));
            }
            if (subcategory === "Financial Planning") {
              return post.title.toLowerCase().includes("financial planner") ||
              post.title.toLowerCase().includes("financial planning") ||
              post.slug.includes("financial-planner");
            }
            if (subcategory === "Tax Services") {
              return post.title.toLowerCase().includes("tax advisor") ||
              post.title.toLowerCase().includes("tax");
            }
            if (subcategory === "Finance Brokers") {
              return post.title.toLowerCase().includes("loan broker") ||
              post.title.toLowerCase().includes("mortgage broker") ||
              post.slug.includes("loan-broker") ||
              post.slug.includes("finance-broker");
            }
            if (subcategory === "Liquidators") {
              return post.category === "Accounting & Finance - Liquidators" ||
              post.title.toLowerCase().includes("liquidator") ||
              post.title.toLowerCase().includes("insolvency") ||
              post.title.toLowerCase().includes("voluntary administration") ||
              post.slug.includes("liquidator") ||
              post.slug.includes("insolvency") ||
              post.slug.includes("voluntary-administration");
            }
            if (subcategory === "Accounting Firms") {
              return post.title.toLowerCase().includes("accounting") &&
              !post.title.toLowerCase().includes("financial planner") &&
              !post.title.toLowerCase().includes("tax advisor");
            }
            // Default to showing all Accounting & Finance category posts
            return post.category === "Accounting & Finance";
          }
          if (mainCategory === "Building & Construction") {
            if (subcategory === "Home Builders") {
              return post.category === "Building & Construction - Home Builders";
            }
            if (subcategory === "Renovation Builders") {
              return post.category === "Building & Construction - Renovation Builders";
            }
            if (subcategory === "Real Estate") {
              return post.category === "Building & Construction - Real Estate";
            }
            if (subcategory === "Buyers Agents") {
              return post.category === "Building & Construction - Buyers Agents";
            }
            // Default to showing all Building & Construction related posts
            return post.category.startsWith("Building & Construction");
          }
          if (mainCategory === "Tradies") {
            // For Tradies subcategories, match exact category with special handling for Floor Sanding
            if (selectedCategory === "Tradies - Floor Sanding Specialists") {
              return post.category === "Tradies - Floor Sanding";
            }
            return post.category === selectedCategory;
          }
          if (mainCategory === "Legal") {
            if (post.category !== "Legal") return false;
            if (subcategory === "Conveyancing") {
              return post.title.toLowerCase().includes("conveyancing");
            }
            if (subcategory === "Family Law") {
              return post.title.toLowerCase().includes("family law") ||
              post.slug.includes("family-lawyers");
            }
            if (subcategory === "Divorce Law") {
              return post.title.toLowerCase().includes("divorce") ||
              post.slug.includes("divorce-lawyers");
            }
            if (subcategory === "Criminal Law") {
              return post.title.toLowerCase().includes("criminal") ||
              post.slug.includes("criminal-lawyers");
            }
          }
          if (mainCategory === "Digital Marketing") {
            if (subcategory === "Google Ads") {
              return post.category === "Digital Marketing" && (
              post.title.toLowerCase().includes("google ads") ||
              post.title.toLowerCase().includes("ppc") ||
              post.title.toLowerCase().includes("paid advertising")) ||
              // Include Google Ads posts from other categories
              post.title.toLowerCase().includes("google ads");
            }
            if (subcategory === "SEO") {
              return post.category === "Digital Marketing" && (
              post.title.toLowerCase().includes("seo") ||
              post.title.toLowerCase().includes("search engine")) ||
              // Include SEO posts from other categories
              post.title.toLowerCase().includes("seo");
            }
            if (subcategory === "Social Media") {
              return post.title.toLowerCase().includes("social media") ||
              post.title.toLowerCase().includes("facebook") ||
              post.title.toLowerCase().includes("instagram") ||
              post.title.toLowerCase().includes("linkedin");
            }
            if (subcategory === "Lead Generation") {
              return post.title.toLowerCase().includes("lead generation") ||
              post.title.toLowerCase().includes("lead gen");
            }
            if (subcategory === "Growth Marketing") {
              return post.title.toLowerCase().includes("growth marketing") ||
              post.title.toLowerCase().includes("growth hacking") ||
              post.title.toLowerCase().includes("growth strategy") ||
              post.title.toLowerCase().includes("growth") ||
              post.slug.includes("growth");
            }
            if (subcategory === "Digital Strategy") {
              return post.category === "Digital Marketing" && (
              post.title.toLowerCase().includes("digital strategy") ||
              post.title.toLowerCase().includes("digital marketing strategy") ||
              post.title.toLowerCase().includes("marketing automation")) ||
              // Include digital marketing posts from other categories
              post.title.toLowerCase().includes("digital marketing");
            }
            // Default to showing Digital Marketing category posts
            return post.category === "Digital Marketing";
          }
          if (mainCategory === "IT") {
            if (subcategory === "Cyber Security") {
              return post.category === "Cyber Security";
            }
            if (subcategory === "SaaS") {
              return post.title.toLowerCase().includes("saas") ||
              post.title.toLowerCase().includes("software") ||
              post.slug.includes("saas") ||
              post.slug.includes("software");
            }
            if (subcategory === "Consulting") {
              return post.category === "IT - Consulting";
            }
            if (subcategory === "Networking") {
              return post.category === "IT - Networking";
            }
          }
          return false;
        });
      } else {
        // Handle main category filtering
        if (selectedCategory === "IT") {

          // Show all Cyber Security posts under IT
        } else if (selectedCategory === "IT") {// Show all IT related posts
          posts = blogPosts.filter((post) =>
          post.category === "Cyber Security" ||
          post.category === "IT - SaaS" ||
          post.category === "IT - Consulting" ||
          post.category === "IT - Networking" ||
          post.title.toLowerCase().includes("saas") ||
          post.title.toLowerCase().includes("software") ||
          post.slug.includes("saas") ||
          post.slug.includes("software")
          );
        } else if (selectedCategory === "Legal") {
          // Show all Legal posts and conveyancing posts
          posts = blogPosts.filter((post) =>
          post.category === "Legal" || post.title.toLowerCase().includes("conveyancing")
          );
        } else if (selectedCategory === "Digital Marketing") {
          // Show all Digital Marketing posts
          posts = blogPosts.filter((post) => post.category === "Digital Marketing");
        } else if (selectedCategory === "Accounting & Finance") {
          // Show all Accounting & Finance posts
          posts = blogPosts.filter((post) => post.category === "Accounting & Finance");
        } else if (selectedCategory === "Building & Construction") {
          // Show all Building & Construction related posts
          posts = blogPosts.filter((post) =>
          post.category.startsWith("Building & Construction")
          );
        } else if (selectedCategory === "Tradies") {
          // Show all Tradies posts under Tradies
          posts = blogPosts.filter((post) => post.category.startsWith("Tradies"));
        } else if (selectedCategory === "Fractional CMO") {
          // Show all Fractional CMO posts
          posts = blogPosts.filter((post) => post.category === "fCMO");
        } else {
          // For other categories, filter normally
          posts = blogPosts.filter((post) => post.category === selectedCategory);
        }
      }
    }

    // Sort by date based on sortOrder
    return posts.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });
  }, [selectedCategory, sortOrder, searchQuery]);

  return (
    <div className="mx-auto w-full max-w-[1400px]">
      
      <Header />
      <div className="min-h-screen pt-32 md:pt-28">
        <div className="container max-w-6xl px-4 md:px-6 py-4 md:py-8">
          <BreadcrumbNavigation
            items={[
            { label: "Blog", href: "/blog" },
            ...(selectedCategory !== "All" ? [{
              label: selectedCategory === "Tradies" ? "Trade/Tradies" : selectedCategory,
              href: `/blog?category=${selectedCategory}`
            }] : [])]
            } />
          
        </div>
        
        {/* Hero Section */}
        <section className="py-8 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-bold md:text-5xl lg:text-6xl">
                Marketing <span className="text-primary">Insights</span>
              </h1>
              <p className="mt-4 md:mt-6 text-lg md:text-xl text-muted-foreground">
                Strategic marketing insights for service based businesses in Building & Construction, Trade, NDIS, Therapy, IT, Accounting, Finance and Legal.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Category Filtering */}
        <section className="py-6 md:py-8 border-b ">
          <div className="container max-w-7xl px-4 md:px-6">
            {/* Search Bar */}
            <div className="mb-6 md:mb-8 ">
              <div className="relative max-w-2xl ">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search articles by topic, keyword, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10" />
                
                {searchQuery &&
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0">
                  
                    <X className="h-4 w-4" />
                  </Button>
                }
              </div>
              {searchQuery &&
              <p className="mt-2 text-sm text-muted-foreground">
                  Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} matching &quot;{searchQuery}&quot;
                </p>
              }
            </div>

            <div className="mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-2">Filter by Category</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Choose a category to explore targeted marketing insights for your industry
              </p>
            </div>
            <BlogMegaMenu
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              className="mb-6" />
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mt-4 md:mt-6 ">
              <p className="text-xs md:text-sm text-muted-foreground">
                Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} 
                {selectedCategory !== "All" &&
                <span> in <strong>{selectedCategory === "Tradies" ? "Trade/Tradies" : selectedCategory}</strong></span>
                }
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm text-muted-foreground">Sort by:</span>
                <div className="flex gap-1">
                  <Button

                    size="sm"
                    onClick={() => setSortOrder("latest")}
                    className={sortOrder === "latest" ? "text-xs md:text-sm cursor-pointer bg-gray-900 text-white" : "bg-blue cursor-pointer"}>
                    
                    Latest
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setSortOrder("oldest")}
                    className={sortOrder === "oldest" ? "text-xs md:text-sm cursor-pointer bg-gray-900 text-white" : "bg-blue cursor-pointer"}>
                    
                    Oldest
                  </Button>
                </div>
                {(selectedCategory !== "All" || searchQuery) &&
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="text-primary hover:text-primary/80 text-xs md:text-sm">
                  
                    Clear all filters
                  </Button>
                }
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-6 md:py-8 lg:py-12 ">
          <div className="container max-w-7xl px-4 md:px-6 mx-auto">
            <VirtualizedBlogGrid
              key={`${selectedCategory}-${sortOrder}`}
              posts={filteredPosts}
              initialPostsCount={9}
              postsPerPage={6} />
            
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-muted/30 bg-blue-100/40  ">
          <div className="justify-center flex max-w-4xl px-4 md:px-6   mx-auto">
            <div className="max-w-2xl mx-auto text-center ">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Ready to Transform Your Growth?</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                Let&apos;s discuss how these strategies can work for your business. Book a free 45-minute strategy call and let&apos;s map your next growth chapter.
              </p>
              <StrategyForm preSelectedService="strategy" />
            </div>
          </div>
        </section>
      </div>

    </div>);

};

export default Blog;
