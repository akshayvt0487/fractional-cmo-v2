import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import  Link  from "next/link";

interface RelatedArticle {
  title: string;
  description: string;
  url: string;
  category: string;
}

interface InternalLinksProps {
  articles: RelatedArticle[];
  title?: string;
}

const InternalLinks = ({ articles, title = "Related Articles" }: InternalLinksProps) => {
  return (
    <Card className="my-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
      <CardContent className="p-8">
        <h3 className="text-xl font-semibold mb-6 text-center">{title}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <div 
              key={index} 
              className="bg-background/80 backdrop-blur-sm rounded-lg p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="mb-3">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                  {article.category}
                </span>
              </div>
              <h4 className="font-semibold mb-2 text-foreground leading-tight">
                <Link 
                  href={article.url}
                  className="hover:text-primary transition-colors"
                >
                  {article.title}
                </Link>
              </h4>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {article.description}
              </p>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={article.url}>Read More</Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InternalLinks;