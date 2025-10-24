import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LazyImage from "@/components/LazyImage";
import { blogPosts } from "@/data/blogPosts";
import  Link  from "next/link";
import Image from "next/image";

const BlogSection = () => {
  // Show only first 6 posts on homepage for performance
  const featuredPosts = blogPosts.slice(0, 6);

  return (
    <section id="blog" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold md:text-4xl mb-4">Latest Insights</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Strategic marketing insights for service based businesses in Building & Construction, Trade, NDIS, Therapy, IT, Accounting, Finance and Legal.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <Card key={post.slug} className="glass-card h-full flex flex-col overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={`${post.title} - Digital Marketing Guide by ${post.author}`}
                  className="hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  width={400}
                  height={225}
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <CardTitle className="text-lg leading-tight">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-sm">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-end">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/blog/${post.slug}`}>Read more →</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" asChild>
            <Link href="/blog">View all articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;