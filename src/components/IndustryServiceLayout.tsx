import React, { ReactNode } from 'react';
import Header from '@/components/ui/header';
import SEO from '@/components/SEO';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import ScrollBottomPopup from '@/components/ui/scroll-bottom-popup';
import StrategyForm from '@/components/ui/strategy-form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  CheckCircle2, 
  TrendingUp, 
  Target, 
  Users,
  ArrowRight,
  Star,
  Award,
  ChevronDown
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { industries, services, getRelatedBlogs } from '@/data/industryServiceData';

interface RelatedBlog {
  title: string;
  slug: string;
  excerpt: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export interface IndustryServiceLayoutProps {
  // Required
  serviceSlug: string;
  industrySlug?: string;
  
  // Optional overrides - if not provided, derived from data
  serviceName?: string;
  industryName?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  benefits?: string[];
  challenges?: string[] | { title: string; description: string; }[];
  solutions?: { title: string; description: string; }[];
  relatedBlogs?: RelatedBlog[];
  faqs?: FAQ[];
  // Additional optional props for service overview pages
  features?: { title: string; description: string; }[];
  process?: { step?: number; title: string; description: string; }[];
  relatedArticles?: { title: string; slug?: string; url?: string; excerpt?: string; description?: string; category?: string; }[];
  children?: ReactNode;
}

const IndustryServiceLayout = ({
  serviceSlug,
  industrySlug,
  serviceName: customServiceName,
  industryName: customIndustryName,
  metaTitle: customMetaTitle,
  metaDescription: customMetaDescription,
  keywords: customKeywords,
  heroTitle: customHeroTitle,
  heroSubtitle: customHeroSubtitle,
  heroDescription: customHeroDescription,
  benefits: customBenefits,
  challenges: customChallenges,
  solutions: customSolutions,
  relatedBlogs: customRelatedBlogs,
  faqs: customFaqs,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  features,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  process,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  relatedArticles,
  children
}: IndustryServiceLayoutProps) => {
  // For industry-specific pages, industrySlug is required
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const industry = industrySlug ? (industries as any)[industrySlug] : undefined;
  const service = services[serviceSlug];

  // If industrySlug is provided but not found, or if no service found, show error
  if (industrySlug && !industry) {
    return <div>Industry not found</div>;
  }
  if (!service) {
    return <div>Service not found</div>;
  }

  // Use custom values or derive from data
  const serviceName = customServiceName || service.name;
  const industryName = customIndustryName || (industry?.name || '');
  const metaTitle = customMetaTitle || (industry 
    ? `${serviceName} for ${industryName} | Expert ${serviceName} Agency`
    : `${serviceName} | Professional ${serviceName} Services Australia`);
  const metaDescription = customMetaDescription || (industry
    ? `Specialized ${serviceName.toLowerCase()} services for ${industry.description}. Drive growth with industry-specific strategies.`
    : `Professional ${serviceName.toLowerCase()} services. Transform your business with expert strategies and proven results.`);
  const keywords = customKeywords || (industry
    ? `${serviceName.toLowerCase()}, ${industryName.toLowerCase()}, Australia`
    : `${serviceName.toLowerCase()}, Australia`);
  
  const heroTitle = customHeroTitle || (industry
    ? `${serviceName} for ${industryName}`
    : serviceName);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const heroSubtitle = customHeroSubtitle || (industry
    ? `Drive Growth with Expert ${serviceName}`
    : `Professional ${serviceName} Solutions`);
  const heroDescription = customHeroDescription || (industry
    ? `Our specialized ${serviceName.toLowerCase()} services help ${industry.description} attract more clients and grow sustainably.`
    : `Transform your business with our comprehensive ${serviceName.toLowerCase()} services.`);
  
  const benefits = customBenefits || service.benefits || [];
  const rawChallenges = customChallenges || (industry?.challenges) || [];
  // Convert string challenges to objects
  const challenges: { title: string; description: string; }[] = Array.isArray(rawChallenges) 
    ? rawChallenges.map((c: string | { title: string; description: string }) => typeof c === 'string' ? { title: c, description: '' } : c)
    : [];
  const faqs = customFaqs || service.faqs || [];
  const relatedBlogs = customRelatedBlogs || (industrySlug && industry ? getRelatedBlogs(industrySlug, serviceSlug) : []) || [];
  
  const solutions = customSolutions || (industry ? [
    { title: `${serviceName} Strategy`, description: `Custom strategies for ${industryName.toLowerCase()}.` },
    { title: 'Campaign Optimization', description: `Maximize your ${serviceName.toLowerCase()} ROI.` },
    { title: 'Performance Tracking', description: 'Detailed analytics and reporting.' },
    { title: 'Industry Targeting', description: `Reach your ideal ${industryName.toLowerCase()} clients.` }
  ] : [
    { title: 'Custom Strategy', description: `Tailored ${serviceName.toLowerCase()} approach for your business.` },
    { title: 'Implementation', description: `Expert deployment and optimization of your campaign.` },
    { title: 'Analytics & Reporting', description: 'Detailed performance metrics and insights.' },
    { title: 'Continuous Improvement', description: 'Ongoing optimization for maximum results.' }
  ]);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: serviceName, href: `/services/${service.parentSlug}` },
    { label: industryName, href: `/services/${serviceSlug}/${industrySlug}` }
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `${serviceName} for ${industryName}`,
      "description": metaDescription,
      "provider": { "@type": "Organization", "name": "Fractional CMO Australia" },
      "areaServed": { "@type": "Country", "name": "Australia" },
      "serviceType": serviceName
    }
  ];

  return (
    <>
      <SEO title={metaTitle} description={metaDescription} canonical={`/services/${serviceSlug}/${industrySlug}`} ogType="website" keywords={keywords} structuredData={structuredData} />
      <Header />
      <main className="min-h-screen pt-32 md:pt-28">
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-background via-background to-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <BreadcrumbNavigation items={breadcrumbs} />
            
            <div className="grid lg:grid-cols-2 gap-12 items-start mt-8">
              <div>
                <Badge variant="secondary" className="mb-4">{serviceName} for {industryName}</Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                  {heroTitle}
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {heroDescription}
                </p>
                
                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>15+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="w-4 h-4 text-primary" />
                    <span>Industry Specialist</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 text-primary" />
                    <span>100+ {industryName} Served</span>
                  </div>
                </div>

                <StrategyForm />
              </div>

              {/* Benefits Section */}
              <div className="bg-background rounded-xl p-8 border border-border/50">
                <h2 className="text-xl font-semibold mb-6">Why {industryName} Choose Us</h2>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{serviceName} Challenges for {industryName}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">We understand the unique challenges {industryName.toLowerCase()} face.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                      <Target className="w-5 h-5 text-destructive" />
                    </div>
                    <h3 className="font-semibold mb-2">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Our {serviceName} Solutions for {industryName}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {solutions.map((solution, index) => (
                <Card key={index} className="group hover:border-primary/30 transition-all border-border/50">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{solution.title}</h3>
                    <p className="text-sm text-muted-foreground">{solution.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {children}

        {/* Related Blogs Section */}
        {relatedBlogs.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="mx-auto max-w-6xl px-4">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold">Related Articles</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedBlogs.map((blog, index) => (
                  <Card key={index} className="group hover:border-primary/30 transition-all border-border/50">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary">
                        <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{blog.excerpt}</p>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/blog/${blog.slug}`}>
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">FAQs</h2>
            </div>
            <div className="space-y-4 w-full max-w-2xl mx-auto">
              {faqs.map((faq, index) => (
                <Collapsible key={index} className="border border-border/50 rounded-lg">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left font-medium hover:bg-muted/50">
                    {faq.question}
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4 text-muted-foreground">
                    {faq.answer}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="mx-auto max-w-4xl px-4 flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Grow?</h2>
            <p className="text-muted-foreground mb-8">Book a free strategy call to discuss {serviceName.toLowerCase()} for your business.</p>
            <div className="w-full max-w-xl mx-auto">
              <StrategyForm />
            </div>
          </div>
        </section>
      </main>
      <ScrollBottomPopup />
    </>
  );
};

export default IndustryServiceLayout;
