"use client";

import React from 'react';
import Link from 'next/link';
import SEO from '@/components/SEO';
import Header from '@/components/ui/header';
import Footer from '@/components/sections/Footer';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import ScrollBottomPopup from '@/components/ui/scroll-bottom-popup';
import StrategyForm from '@/components/ui/strategy-form';
import ServiceInquiryForm from '@/components/ServiceInquiryForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Check, ChevronDown, TrendingUp } from 'lucide-react';
import type { MainServicePageData, ServiceFeature } from '@/data/serviceData';

type Props = {
  data: MainServicePageData;
  serviceName?: string;
  serviceSlug?: string;
  children?: React.ReactNode;
};

const ServicePageLayoutFixed: React.FC<Props> = ({ data, serviceName: customServiceName, serviceSlug: customServiceSlug, children }) => {
  const serviceName = customServiceName || data.serviceName || data.heroTitle || 'Service';
  const serviceSlug = customServiceSlug || '';
  const metaTitle = data.metaTitle || data.heroTitle || serviceName;
  const metaDescription = data.metaDescription || data.heroDescription || '';
  const heroTitle = data.heroTitle || serviceName;
  const heroSubtitle = data.heroSubtitle || '';
  const heroDescription = data.heroDescription || '';

  const faqs = data.faqs || [];
  const benefits = data.benefits || [];
  const features = (data.features || data.solutions || []) as ServiceFeature[];
  const process = data.process || [];

  const rawSource = (data as unknown) as { industries?: unknown; relatedIndustries?: unknown };
  const rawIndustries = rawSource.industries ?? rawSource.relatedIndustries ?? [];
  const industries: string[] = Array.isArray(rawIndustries)
    ? rawIndustries.map((it: any) => (typeof it === 'string' ? it : it?.name || it?.title)).filter(Boolean)
    : [];

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: serviceName, href: `/services/${serviceSlug || '#'}` },
  ];

  const structuredData = [
    { '@context': 'https://schema.org', '@type': 'Service', name: serviceName, description: metaDescription },
  ];

  return (
    <>
      <SEO title={metaTitle} description={metaDescription} canonical={`/services/${serviceSlug}`} ogType="website" structuredData={structuredData} />
      <Header />
      <main className="min-h-screen pt-32 md:pt-28">
        <section className="relative bg-linear-to-br from-background via-background to-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <BreadcrumbNavigation items={breadcrumbs} />
            <div className="grid lg:grid-cols-2 gap-12 items-start mt-8">
              <div>
                {heroSubtitle && <Badge variant="secondary" className="mb-4">{heroSubtitle}</Badge>}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">{heroTitle}</h1>
                {heroDescription && <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{heroDescription}</p>}
                <div className="flex flex-wrap gap-4">
                  <StrategyForm preSelectedService={serviceName} />
                  <Button variant="outline" size="lg" asChild>
                    <a href="#process">See Our Process</a>
                  </Button>
                </div>
              </div>
              <ServiceInquiryForm serviceName={serviceName} />
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Choose Our {serviceName} Services?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg border border-border/50">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Optional Challenges (if provided in page data) */}
        {((data as any)?.challenges && (data as any).challenges.length > 0) && (
          <section className="py-16">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="text-center mb-12">
                {/* derive industry from heroTitle if possible */}
                {(() => {
                  const hero = data?.heroTitle || '';
                  const parts = hero ? hero.split(/\s+for\s+/i).map(p => p && p.trim()) : [];
                  const industry = parts && parts.length > 1 ? parts[1] : undefined;
                  return (
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{serviceName} Challenges{industry ? ` for ${industry}` : ''}</h2>
                  );
                })()}
                <p className="text-muted-foreground max-w-2xl mx-auto">We understand the common challenges businesses face when it comes to {serviceName.toLowerCase()}. Our solutions are designed to address these specific pain points.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(data as any).challenges.map((c: any, idx: number) => {
                  const ch = typeof c === 'string' ? { title: c, description: '' } : c;
                  return (
                    <Card key={idx} className="border-border/50">
                      <CardContent className="p-6">
                        <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                          <svg className="w-5 h-5 text-destructive" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <h3 className="font-semibold mb-2 text-foreground">{ch.title}</h3>
                        <p className="text-sm text-muted-foreground">{ch.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section className="py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Our {serviceName} Capabilities</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Comprehensive solutions tailored to drive measurable results for your business.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((f, idx) => (
                <Card key={idx} className="border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3 text-foreground">{f.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="py-16 bg-muted/30">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Our Proven Process</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((step) => (
                <div key={step.step} className="bg-background rounded-lg p-6 border border-border/50 h-full">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">{step.step}</div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {industries && industries.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto max-w-6xl px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Industries We Serve</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {industries.map((i, idx) => <Badge key={idx} variant="outline" className="px-4 py-2 text-sm">{i}</Badge>)}
              </div>
            </div>
          </section>
        )}

        {children && (
          <section className="py-16 bg-muted/30"><div className="container mx-auto max-w-4xl px-4">{children}</div></section>
        )}

        <section className="py-16">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <Collapsible key={i}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-background rounded-lg border border-border/50 hover:border-primary/30 transition-colors text-left">
                    <span className="font-medium text-foreground pr-4">{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4 pt-2 text-muted-foreground">{faq.answer}</CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Related Insights</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {(data.relatedArticles || []).map((a: any, i: number) => (
                <Card key={i} className="group hover:border-primary/30 transition-all border-border/50">
                  <CardContent className="p-6 flex flex-col h-full">
                    {a.category && <Badge className="mb-3 w-fit text-xs">{a.category}</Badge>}
                    <h3 className="font-semibold mb-2 line-clamp-2 grow"><Link href={a.url}>{a.title}</Link></h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{a.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 flex items-center justify-center">
          <div className="container mx-auto max-w-4xl px-4">
            <Card className="bg-linear-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-8 md:p-12 text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-6" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your {serviceName} Strategy?</h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Book a free 45-minute strategy call to discuss how we can help grow your business with proven {serviceName.toLowerCase()} strategies.</p>
                <StrategyForm />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <ScrollBottomPopup />
    </>
  );
};

export default ServicePageLayoutFixed;
