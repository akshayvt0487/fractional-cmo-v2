import React from 'react';
import { createMetadata } from "@/lib/seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import OptimizedBlogLayout from "@/components/OptimizedBlogLayout";
import { relatedArticles, generateBlogPostingSchema } from '@/utils/seoUtils';
import { blogPosts } from '@/data/blogPosts';
export const metadata = createMetadata({
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },

  title: "Finance Broker PPC Guide | Google Ads Strategy 2026",
  description: "Step-by-step Google Ads blueprint for finance brokers: plan campaigns, target local and high-intent keywords, optimize ads, and maximize conversions.",
  path: "/blog/finance-broker-google-ads",
  keywords: ["finance brokers", "Google Ads", "PPC", "mortgage advertising", "broker advertising", "paid search"],
  openGraph: {
    title: "Google Ads for Finance Brokers: Complete PPC Strategy Guide 2026",
    description: "Master Google Ads for finance and mortgage brokers.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/finance-broker-google-ads`,
    siteName: "Fractional CMO",
    type: "article",
    images: [{
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/blog/loan-broker-google-ads-hero.jpg`,
      width: 1200,
      height: 630,
      alt: "Google Ads Strategy for Finance Brokers"
    }],
    publishedTime: "2025-02-05T00:00:00.000Z",
    modifiedTime: "2025-02-05T00:00:00.000Z",
    authors: ["Basheer Padanna"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Google Ads for Finance Brokers: Complete PPC Strategy Guide 2026",
    description: "Master Google Ads for finance and mortgage brokers.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/blog/loan-broker-google-ads-hero.jpg`],
    site: "@FractionalCMO"
  }
});
  const convertDateFormat = (dateString: string): string => {
    const date = new Date(dateString);

    return date.toISOString().split('T')[0];
  };







const FinanceBrokerGoogleAds = () => {
  const post = blogPosts.find(p => p.slug === "finance-broker-google-ads");
  if (!post) throw new Error("Blog post not found: finance-broker-google-ads");
  const articleData = {
    headline: "Google Ads for Finance Brokers: Complete PPC Strategy Guide 2026",
    description: "Master Google Ads for finance and mortgage brokers. Learn campaign structure, keyword strategy, ad copy best practices, and conversion optimisation.",
    author: "Basheer Padanna",
    publishedDate: convertDateFormat(post.date),
    modifiedDate: "2025-02-05T00:00:00.000Z",
    url: "/blog/finance-broker-google-ads",
    imageUrl: '/images/blog/loan-broker-google-ads-hero.jpg',
    category: "Google Ads",
    readTime: "21 min read",
    tags: ["Finance Brokers", "Google Ads", "PPC", "Mortgage Advertising", "Broker Advertising", "Paid Search"]
  };

  const faqs = [
    {
      question: "How much do Google Ads cost for finance brokers?",
      answer: "Finance broker keywords typically cost $8-25 per click, with competitive terms like 'mortgage broker Sydney' reaching $30+. Monthly budgets of $2,000-$6,000 are common. Focus on conversion rate optimisation to maximise ROI at any budget level."
    },
    {
      question: "What keywords should finance brokers target?",
      answer: "Target service-specific keywords (mortgage broker, home loan broker), location keywords (finance broker Melbourne), loan type keywords (investment loan broker, refinance specialist), and long-tail variations. Negative keywords are essential to avoid wasted spend."
    },
    {
      question: "How do I write compliant Google Ads for finance services?",
      answer: "Include your ACL number in ads or landing pages, avoid specific rate claims unless you can guarantee them, use disclaimers appropriately, and don't make promises about loan approval. Google also has financial services policies to follow."
    },
    {
      question: "What conversion rate should finance brokers expect from Google Ads?",
      answer: "Well-optimised finance broker campaigns achieve 5-10% landing page conversion rates. Lead-to-client conversion varies from 10-25% depending on lead quality and follow-up processes. Target cost per client acquisition of $200-$500."
    }
  ];

  const blogPostingSchema = generateBlogPostingSchema({
    headline: articleData.headline,
    description: articleData.description,
    author: articleData.author,
    publishedDate: articleData.publishedDate,
    modifiedDate: "2025-02-05",
    url: articleData.url,
    imageUrl: articleData.imageUrl,
    keywords: articleData.tags,
    category: articleData.category,
    wordCount: 5000,
    readTime: "PT21M"
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
    <OptimizedBlogLayout
      articleData={articleData}
      relatedArticles={relatedArticles.digitalMarketing}
      faqs={faqs}
      heroImage={'/images/blog/loan-broker-google-ads-hero.jpg'}
      heroAlt="Google Ads Strategy for Finance Brokers"
    >
      <Card className="mb-8 bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <p className="text-lg leading-relaxed">
            Google Ads is one of the most effective channels for finance brokers to generate immediate, qualified leads. By targeting borrowers actively searching for mortgage and loan products, you can capture high-intent prospects ready to take action.
          </p>
        </CardContent>
      </Card>

      <h2 className="text-3xl font-bold mb-6">Google Ads Fundamentals for Finance Brokers</h2>
      
      <p className="text-lg text-muted-foreground mb-6">
        Google Ads allows you to place ads in front of people actively searching for finance and mortgage services, making it one of the highest-intent marketing channels available.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Types</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <ul className="space-y-2 list-disc list-inside">
              <li>Search campaigns for high-intent keywords</li>
              <li>Display ads for awareness building</li>
              <li>Remarketing to website visitors</li>
              <li>YouTube ads for educational content</li>
              <li>Local Services Ads for immediate visibility</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <ul className="space-y-2 list-disc list-inside">
              <li>Cost Per Click (CPC): $8-25+ depending on competitiveness</li>
              <li>Click-Through Rate (CTR): 3-8% for finance ads</li>
              <li>Conversion Rate: 5-10% landing page conversion</li>
              <li>Cost Per Lead: $40-100 typically</li>
              <li>Cost Per Client: $200-500 target</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mb-6">Keyword Strategy for Finance Brokers</h2>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Strategic Keyword Selection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Service Keywords (Broad)</h4>
            <div className="bg-muted p-3 rounded text-sm mb-2">mortgage broker | home loan broker | finance broker | personal loan broker</div>
            <p className="text-sm text-muted-foreground">High search volume but generic. Include location modifiers for better targeting.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Location-Specific Keywords</h4>
            <div className="bg-muted p-3 rounded text-sm mb-2">mortgage broker Sydney | home loan broker Melbourne | finance broker Brisbane</div>
            <p className="text-sm text-muted-foreground">Better targeting for local brokers. High intent from geographically relevant prospects.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Loan Type Keywords</h4>
            <div className="bg-muted p-3 rounded text-sm mb-2">investment loan broker | refinance specialist | construction loan broker | business loan broker</div>
            <p className="text-sm text-muted-foreground">Highly specific and qualified leads. Lower search volume but higher conversion potential.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Intent-Based Keywords</h4>
            <div className="bg-muted p-3 rounded text-sm mb-2">best mortgage rates | refinance home loan | get approved for mortgage | apply for home loan</div>
            <p className="text-sm text-muted-foreground">Prospect is ready to take action. These keywords convert well but are more competitive.</p>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-3xl font-bold mb-6">Campaign Structure & Setup</h2>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recommended Campaign Organization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Campaign 1: Brand Keywords</h4>
            <p className="text-sm text-muted-foreground mb-2">Bid on your broker name and branded terms. Defend against competitors bidding on your brand.</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Your business name</li>
              <li>Common misspellings</li>
              <li>Competitor brand + your brand</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Campaign 2: Service Keywords (Geographic)</h4>
            <p className="text-sm text-muted-foreground mb-2">Target your main service areas with generic service terms.</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Mortgage broker + location</li>
              <li>Home loan broker + location</li>
              <li>Finance broker + location</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Campaign 3: Loan Type Specific</h4>
            <p className="text-sm text-muted-foreground mb-2">High-intent loan-specific searches.</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Investment loan broker</li>
              <li>Refinance specialist</li>
              <li>Construction loan lender</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Campaign 4: Remarketing</h4>
            <p className="text-sm text-muted-foreground mb-2">Re-engage website visitors who didn't convert.</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Website visitors remarketing</li>
              <li>High-intent page visitors</li>
              <li>Lead form abandoners</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-3xl font-bold mb-6">Ad Copy Best Practices</h2>

      <Card>
        <CardHeader>
          <CardTitle>Creating Compliant, Converting Ads</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Headlines (Test Multiple Variations)</h4>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>Lead with specific benefits (rates, speed, approval)</li>
              <li>Include location keywords when relevant</li>
              <li>Use numbers and statistics where possible</li>
              <li>Create urgency without making false claims</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Description Lines</h4>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>Explain your unique value proposition</li>
              <li>Include call-to-action (Call, Apply, Get Quote)</li>
              <li>Add relevant extensions (phone, location, offer)</li>
              <li>Include compliance disclaimers when necessary</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Compliance Considerations</h4>
            <ul className="text-sm space-y-2 list-disc list-inside">
              <li>Don't guarantee approval or specific rates</li>
              <li>Include ACL number in ads or landing pages</li>
              <li>Avoid misleading claims about products</li>
              <li>Include appropriate disclaimers and disclosures</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </OptimizedBlogLayout>
    </>
  );
};

export default FinanceBrokerGoogleAds;
