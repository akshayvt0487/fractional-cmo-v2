import React from 'react';
import SEO from '@/components/SEO';
import Header from '@/components/ui/header';
import Footer from '@/components/sections/Footer';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import InternalLinks from '@/components/InternalLinks';
import ScrollBottomPopup from '@/components/ui/scroll-bottom-popup';
import ServiceInquiryForm from '@/components/ServiceInquiryForm';
import StrategyForm from '@/components/ui/strategy-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Check, ChevronDown, Star, Award, Users, TrendingUp } from 'lucide-react';

interface ServiceFAQ {
  question: string;
  answer: string;
}

interface ServiceFeature {
  title: string;
  description: string;
}

interface ServiceProcess {
  step: number;
  title: string;
  description: string;
}

interface RelatedArticle {
  title: string;
  description: string;
  url: string;
  category: string;
}

interface ServicePageLayoutProps {
  serviceName: string;
  serviceSlug: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  features: ServiceFeature[];
  process: ServiceProcess[];
  faqs: ServiceFAQ[];
  relatedArticles: RelatedArticle[];
  benefits: string[];
  industries?: string[];
  children?: React.ReactNode;
}

const ServicePageLayout = ({
  serviceName,
  serviceSlug,
  metaTitle,
  metaDescription,
  heroTitle,
  heroSubtitle,
  heroDescription,
  features,
  process,
  faqs,
  relatedArticles,
  benefits,
  industries,
  children,
}: ServicePageLayoutProps) => {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: serviceName, href: `/services/${serviceSlug}` }
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": serviceName,
      "description": metaDescription,
      "provider": {
        "@type": "Organization",
        "name": "Basheer Padanna - Fractional CMO",
        "url": "https://fractional-cmo.com.au"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Australia"
      },
      "serviceType": serviceName
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": `https://fractional-cmo.com.au${item.href}`
      }))
    }
  ];

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        canonical={`/services/${serviceSlug}`}
        ogType="website"
        keywords={`${serviceName}, ${serviceName} Australia, ${serviceName} services, professional ${serviceName.toLowerCase()}`}
        structuredData={structuredData}
      />
      
      <Header />
      
      <main className="min-h-screen pt-32 md:pt-28">
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-background via-background to-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <BreadcrumbNavigation items={breadcrumbs} />
            
            <div className="grid lg:grid-cols-2 gap-12 items-start mt-8">
              <div>
                <Badge variant="secondary" className="mb-4">{heroSubtitle}</Badge>
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
                    <span>Certified Expert</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 text-primary" />
                    <span>100+ Clients Served</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <StrategyForm preSelectedService={serviceName} />
                  <Button variant="outline" size="lg" asChild>
                    <a href="#process">See Our Process</a>
                  </Button>
                </div>
              </div>

              {/* Inline Inquiry Form */}
              <ServiceInquiryForm serviceName={serviceName} />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Why Choose Our {serviceName} Services?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg border border-border/50">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Our {serviceName} Capabilities
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Comprehensive solutions tailored to drive measurable results for your business.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-16 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Our Proven Process
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              A systematic approach to delivering results that exceed expectations.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((step) => (
                <div key={step.step} className="relative">
                  <div className="bg-background rounded-lg p-6 border border-border/50 h-full">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        {industries && industries.length > 0 && (
          <section className="py-16">
            <div className="mx-auto max-w-6xl px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                Industries We Serve
              </h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Specialized expertise across diverse industry verticals.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {industries.map((industry, index) => (
                  <Badge key={index} variant="outline" className="px-4 py-2 text-sm">
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Custom Content */}
        {children && (
          <section className="py-16 bg-muted/30">
            <div className="container max-w-4xl px-4">
              {children}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-center mb-12">
              Common questions about our {serviceName.toLowerCase()} services.
            </p>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Collapsible key={index}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-background rounded-lg border border-border/50 hover:border-primary/30 transition-colors text-left">
                    <span className="font-medium text-foreground pr-4">{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4 pt-2 text-muted-foreground">
                    {faq.answer}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-6xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Related Insights
            </h2>
            <p className="text-muted-foreground text-center mb-12">
              Explore our latest articles on {serviceName.toLowerCase()}.
            </p>
            <InternalLinks articles={relatedArticles} title="" />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16">
          <div className="container max-w-4xl px-4">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-8 md:p-12 text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-6" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Transform Your {serviceName} Strategy?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Book a free 45-minute strategy call to discuss how we can help grow your business with proven {serviceName.toLowerCase()} strategies.
                </p>
                <StrategyForm preSelectedService={serviceName} />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <ScrollBottomPopup />
    </>
  );
};

export default ServicePageLayout;
