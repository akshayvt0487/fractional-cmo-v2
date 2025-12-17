"use client";

import React, { ReactNode } from 'react';
import Header from '@/components/ui/header';
import Footer from '@/components/sections/Footer';
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
  Users,
  ArrowRight,
  Star,
  Award,
  ChevronDown,
  AlertTriangle,
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { industries, services, getRelatedBlogs, getIndustryServicePageData } from '@/data/serviceData';
import type { IndustryServicePageData, ServiceData, IndustryData } from '@/data/serviceData';

interface RelatedBlog {
  title: string;
  slug: string;
  excerpt: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Challenge {
  title: string;
  description: string;
}

interface Solution {
  icon?: string;
  title: string;
  description: string;
}

// Dynamic icon component
const DynamicIcon = ({ name, className }: { name?: string; className?: string }) => {
  if (!name) return <TrendingUp className={className} />;
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<unknown>>)[name as string];
  if (!IconComponent) return <TrendingUp className={className} />;
  const Comp = IconComponent as unknown as React.ComponentType<any>;
  return <Comp className={className} />;
};

export interface IndustryServiceLayoutProps {
  // Optional for backwards compatibility; callers may pass `data` only
  serviceSlug?: string;
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
  heroPoints?: string[];
  benefits?: string[];
  challenges?: Challenge[];
  solutions?: Solution[];
  relatedBlogs?: RelatedBlog[];
  faqs?: FAQ[];
  children?: ReactNode;
  
  // Backwards-compatible: accept a full page data object
  data?: IndustryServicePageData;
  // Full JSON data export (optional) so pages can supply entire servicedata.json
  allServiceData?: unknown;
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
  heroPoints: customHeroPoints,
  benefits: customBenefits,
  challenges: customChallenges,
  solutions: customSolutions,
  relatedBlogs: customRelatedBlogs,
  faqs: customFaqs,
  children,
  allServiceData,
  data: providedData
}: IndustryServiceLayoutProps) => {
  // Backwards compatibility: if a full data object is provided by callers, use it directly.
  const centralizedData = providedData ?? (industrySlug && serviceSlug ? getIndustryServicePageData(industrySlug, serviceSlug) : undefined);

  // If centralizedData is present but service/industry slugs aren't reliable, derive display values from it.
  const serviceEntry = serviceSlug ? (services as Record<string, ServiceData>)[serviceSlug] as ServiceData | undefined : undefined;
  const industryEntry = industrySlug ? (industries as Record<string, IndustryData>)[industrySlug] as IndustryData | undefined : undefined;

  // If the page passed a `data` object but didn't include slugs, try to resolve
  // the corresponding service/industry entries from the optional `allServiceData` map.
  let resolvedServiceEntry = serviceEntry;
  let resolvedIndustryEntry = industryEntry;
  if ((!serviceSlug || !industrySlug) && (allServiceData as any) && providedData) {
    try {
      const map = (allServiceData as any).industryServiceContent as Record<string, Record<string, any>> | undefined;
      if (map) {
        outer: for (const indKey of Object.keys(map)) {
          const svcMap = map[indKey] || {};
          for (const svcKey of Object.keys(svcMap)) {
            const entry = svcMap[svcKey];
            if (!entry) continue;
            // compare by reference or by unique fields
            if (entry === providedData || entry?.heroTitle === providedData?.heroTitle || entry?.metaTitle === providedData?.metaTitle) {
              resolvedIndustryEntry = resolvedIndustryEntry || (industries as Record<string, IndustryData>)[indKey];
              resolvedServiceEntry = resolvedServiceEntry || (services as Record<string, ServiceData>)[svcKey];
              break outer;
            }
          }
        }
      }
    } catch (e) {
      // ignore resolution errors
    }
  }

  // Prefer explicit overrides, then canonical entries from `services`/`industries`.
  // If those are missing, try to derive names from the centralized page `heroTitle` (format: "<Service> for <Industry>").
  const deriveFromHero = (hero?: string) => {
    if (!hero) return { svc: undefined, ind: undefined };
    const parts = hero.split(/\s+for\s+/i).map(p => p && p.trim());
    return { svc: parts[0] || undefined, ind: parts[1] || undefined };
  };
  const heroParts = deriveFromHero(centralizedData?.heroTitle);

  const serviceName = customServiceName || resolvedServiceEntry?.name || serviceEntry?.name || heroParts.svc || 'Service';
  const industryName = customIndustryName || resolvedIndustryEntry?.name || industryEntry?.name || heroParts.ind || 'Industry';

  const metaTitle = customMetaTitle || centralizedData?.metaTitle || `${serviceName} for ${industryName} | Expert ${serviceName} Agency`;
  const metaDescription = customMetaDescription || centralizedData?.metaDescription || `Specialized ${serviceName.toLowerCase()} services for ${industryName}.`;
  const keywords = customKeywords || centralizedData?.keywords || `${serviceName.toLowerCase()}, ${industryName.toLowerCase()}, Australia`;

  const heroTitle = customHeroTitle || centralizedData?.heroTitle || `${serviceName} for ${industryName}`;
  const heroSubtitle = customHeroSubtitle || centralizedData?.heroSubtitle || `Drive Growth with Expert ${serviceName}`;
  const heroDescription = customHeroDescription || centralizedData?.heroDescription || centralizedData?.heroDescription || '';
  const heroPoints = customHeroPoints || centralizedData?.heroPoints;

  const benefits = customBenefits || centralizedData?.benefits || resolvedServiceEntry?.benefits || serviceEntry?.benefits || [];
  // Decide whether to show hero points on the left.
  // If all hero points are duplicated (or very similar) in the right-side `benefits`,
  // don't show them to avoid repetition. Use normalized token-overlap matching
  // so near-duplicates (slightly different phrasing) are detected.
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  const tokenSet = (s: string) => new Set(normalize(s).split(' ').filter(Boolean).filter(w => !['the','for','your','to','and','of','in','on','with','a','an','our'].includes(w)));

  const isSimilar = (a: string, b: string) => {
    const ta = tokenSet(a);
    const tb = tokenSet(b);
    if (ta.size === 0 || tb.size === 0) return false;
    const intersection = [...ta].filter(x => tb.has(x)).length;
    const smaller = Math.min(ta.size, tb.size);
    return (intersection / smaller) >= 0.5 || normalize(a).includes(normalize(b)) || normalize(b).includes(normalize(a));
  };

  const showHeroPoints = Array.isArray(heroPoints) && heroPoints.length > 0
    ? !(Array.isArray(benefits) && benefits.length > 0 && heroPoints.every((hp: string) => benefits.some((b: string) => isSimilar(hp, b))))
    : false;
  // Prefer explicit overrides. If the provided/centralized page-level `challenges` exists but is
  // an empty array, fall back to the canonical industry challenges (resolvedIndustryEntry).
  const challenges = (customChallenges && customChallenges.length > 0)
    ? customChallenges
    : (centralizedData?.challenges && (centralizedData.challenges as any).length > 0)
      ? (centralizedData.challenges as Array<string | { title: string; description: string }>)
      : (resolvedIndustryEntry?.challenges || industryEntry?.challenges || []);
  const faqs = customFaqs || [...(centralizedData?.faqs || []), ...(serviceEntry?.faqs || [])];
  const relatedBlogs = customRelatedBlogs || (resolvedIndustryEntry && resolvedServiceEntry ? getRelatedBlogs(resolvedIndustryEntry.slug, resolvedServiceEntry.slug) : (industrySlug && serviceSlug ? getRelatedBlogs(industrySlug, serviceSlug) : []));

  const solutions = customSolutions || centralizedData?.solutions || [
    { title: `${serviceName} Strategy`, description: `Custom ${serviceName.toLowerCase()} strategies designed specifically for ${industryName.toLowerCase()} businesses. We understand your market and create campaigns that resonate with your ideal clients.` },
    { title: 'Campaign Optimization', description: `Continuous optimization to maximize your ${serviceName.toLowerCase()} ROI. We analyze performance data and refine campaigns to improve results month over month.` },
    { title: 'Performance Tracking', description: `Detailed analytics and transparent reporting so you always know exactly how your ${serviceName.toLowerCase()} campaigns are performing and what results they're generating.` },
    { title: 'Industry Targeting', description: `Precision targeting to reach your ideal ${industryName.toLowerCase()} clients. We use industry-specific strategies to connect you with the right prospects at the right time.` }
  ];

  // serviceEntry defined above
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: serviceName, href: `/services/${serviceEntry?.parentSlug || serviceSlug || ''}` },
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
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq: FAQ) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
      }))
    }
  ];

  return (
    <>
      <SEO title={metaTitle} description={metaDescription} canonical={`/services/${serviceSlug}/${industrySlug}`} ogType="website" keywords={keywords} structuredData={structuredData} />
      <Header />
      <main className="min-h-screen pt-32 md:pt-28">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-background via-background to-primary/5 py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <BreadcrumbNavigation items={breadcrumbs} />
            <div className="grid lg:grid-cols-2 gap-12 mt-8">
              <div>
                <Badge variant="secondary" className="mb-4 bg-gray-200 border-gray-300 border-1">{serviceName} for {industryName}</Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">{heroTitle}</h1>
                <p className="text-xl text-primary font-medium mb-4">{heroSubtitle}</p>
                <p className="text-muted-foreground mb-6">{heroDescription}</p>
                
                {/* Hero Points */}
                {/* showHeroPoints && (
                  <div className="space-y-3 mb-6">
                    {heroPoints!.map((point, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                )*/}
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /><span>15+ Years Experience</span></div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground"><Award className="w-4 h-4 text-primary" /><span>Industry Specialist</span></div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground"><Users className="w-4 h-4 text-primary" /><span>100+ {industryName} Served</span></div>
                </div>
                <StrategyForm />
              </div>
              <div className="bg-card border border-border rounded-xl p-8">
                <h2 className="text-xl font-semibold mb-6">Why {industryName} Choose Us</h2>
                <div className="space-y-4">
                    {benefits.map((benefit: string, index: number) => (
                    <div key={index} className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" /><span className="text-muted-foreground">{benefit}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{serviceName} Challenges for {industryName}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">We understand the unique challenges {industryName.toLowerCase()} face when it comes to {serviceName.toLowerCase()}. Our solutions are designed to address these specific pain points.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge: unknown, index: number) => {
                const ch = typeof challenge === 'string' ? { title: challenge, description: '' } : (challenge as { title?: string; description?: string });
                return (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                        <AlertTriangle className="w-5 h-5 text-destructive text-red-700" />
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

        {/* Solutions Section */}
        <section className="py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our {serviceName} Solutions for {industryName}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Proven strategies designed to help {industryName.toLowerCase()} businesses grow through effective {serviceName.toLowerCase()}.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {solutions.map((solution, index) => (
                <Card key={index} className="group hover:border-primary/30 transition-all">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <DynamicIcon name={solution.icon} className="w-5 h-5 text-blue-800" />
                    </div>
                    <h3 className="font-semibold mb-2 text-foreground">{solution.title}</h3>
                    <p className="text-sm text-muted-foreground">{solution.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Content */}
        {children}

        {/* Related Articles Section */}
        {relatedBlogs.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Related Articles</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">Explore our latest insights on {serviceName.toLowerCase()} for {industryName.toLowerCase()}.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedBlogs.map((blog, index) => (
                  <Card key={index} className="group hover:border-primary/30 transition-all">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary">
                        <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{blog.excerpt}</p>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/blog/${blog.slug}`}>Read More<ArrowRight className="w-4 h-4 ml-2" /></Link>
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
          <div className="container mx-auto max-w-4xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Common questions about {serviceName.toLowerCase()} for {industryName.toLowerCase()}.</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Collapsible key={index} className="border border-border rounded-lg">
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
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Grow Your {industryName} Business?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Book a free 45-minute strategy call to discuss how our {serviceName.toLowerCase()} services can help grow your {industryName.toLowerCase()} business.</p>
            <StrategyForm />
          </div>
        </section>
      </main>
      <ScrollBottomPopup />
    </>
  );
};

export default IndustryServiceLayout;
