import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SitemapView = () => {
  const mainPages = [
    { url: "https://fractional-cmo.com.au/", title: "Home", priority: "1.0" },
    { url: "https://fractional-cmo.com.au/about", title: "About", priority: "0.8" },
    { url: "https://fractional-cmo.com.au/blog", title: "Blog", priority: "0.9" },
    { url: "https://fractional-cmo.com.au/contact", title: "Contact", priority: "0.7" },
    { url: "https://fractional-cmo.com.au/privacy-policy", title: "Privacy Policy", priority: "0.3" },
    { url: "https://fractional-cmo.com.au/terms-conditions", title: "Terms & Conditions", priority: "0.3" },
  ];

  const ndisArticles = [
    { url: "https://fractional-cmo.com.au/blog/ndis-business-growth-strategy", title: "NDIS Business Growth Strategy" },
    { url: "https://fractional-cmo.com.au/blog/advanced-ndis-lead-generation", title: "Advanced NDIS Lead Generation" },
    { url: "https://fractional-cmo.com.au/blog/ndis-digital-marketing-excellence", title: "NDIS Digital Marketing Excellence" },
    { url: "https://fractional-cmo.com.au/blog/ndis-digital-marketing-strategies", title: "NDIS Digital Marketing Strategies" },
    { url: "https://fractional-cmo.com.au/blog/ndis-web-design-guide", title: "NDIS Web Design Guide" },
    { url: "https://fractional-cmo.com.au/blog/ndis-lead-generation-mastery", title: "NDIS Lead Generation Mastery" },
    { url: "https://fractional-cmo.com.au/blog/ndis-marketing-guide-2024", title: "NDIS Marketing Guide 2024" },
    { url: "https://fractional-cmo.com.au/blog/ndis-participant-engagement-strategies", title: "NDIS Participant Engagement Strategies" },
  ];

  const constructionArticles = [
    { url: "https://fractional-cmo.com.au/blog/construction-lead-generation-strategies", title: "Construction Lead Generation Strategies" },
    { url: "https://fractional-cmo.com.au/blog/construction-project-management-best-practices", title: "Construction Project Management Best Practices" },
    
    { url: "https://fractional-cmo.com.au/blog/construction-cost-estimation-guide", title: "Construction Cost Estimation Guide" },
  ];

  const tradeArticles = [
    { url: "https://fractional-cmo.com.au/blog/local-seo-trade-businesses", title: "Local SEO for Trade Businesses" },
    { url: "https://fractional-cmo.com.au/blog/trade-business-growth-strategies", title: "Trade Business Growth Strategies" },
    { url: "https://fractional-cmo.com.au/blog/trade-customer-retention-strategies", title: "Trade Customer Retention Strategies" },
    { url: "https://fractional-cmo.com.au/blog/removalist-business-marketing-guide", title: "Removalist Business Marketing Guide" },
    { url: "https://fractional-cmo.com.au/blog/starting-removalist-business-guide", title: "Starting Removalist Business Guide" },
    { url: "https://fractional-cmo.com.au/blog/pre-purchase-car-inspection-business-guide", title: "Pre-Purchase Car Inspection Business Guide" },
    { url: "https://fractional-cmo.com.au/blog/car-inspection-marketing-strategies", title: "Car Inspection Marketing Strategies" },
  ];

  const digitalMarketingArticles = [
    { url: "https://fractional-cmo.com.au/blog/google-ads-service-businesses", title: "Google Ads for Service Businesses" },
    { url: "https://fractional-cmo.com.au/blog/digital-marketing-roi-service-businesses", title: "Digital Marketing ROI for Service Businesses" },
    { url: "https://fractional-cmo.com.au/blog/digital-marketing-automation-guide", title: "Digital Marketing Automation Guide" },
  ];

  const SectionCard = ({ title, items, showPriority = false }: { title: string; items: any[]; showPriority?: boolean }) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="border-l-2 border-primary/20 pl-4 hover:border-primary/40 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <a 
                  href={item.url} 
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.title}
                </a>
                {showPriority && (
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    Priority: {item.priority}
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground mt-1 break-all">
                {item.url}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Website Sitemap
            </h1>
            <p className="text-lg text-muted-foreground">
              Complete overview of all pages and content on fractional-cmo.com.au
            </p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Last updated: January 15, 2025 • Total pages: 24
              </p>
            </div>
          </div>

          <SectionCard 
            title="Main Pages" 
            items={mainPages} 
            showPriority={true}
          />

          <SectionCard 
            title="NDIS Articles" 
            items={ndisArticles}
          />

          <SectionCard 
            title="Construction Articles" 
            items={constructionArticles}
          />

          <SectionCard 
            title="Trade Business Articles" 
            items={tradeArticles}
          />

          <SectionCard 
            title="Digital Marketing Articles" 
            items={digitalMarketingArticles}
          />

          <div className="text-center mt-12 p-6 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-2">XML Sitemap</h3>
            <p className="text-muted-foreground mb-4">
              For search engines and automated tools, access the XML version:
            </p>
            <a 
              href="/sitemap.xml" 
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              View XML Sitemap
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitemapView;