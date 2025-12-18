import { Metadata } from 'next';
import { createMetadata, SITE_URL } from '@/lib/seo';
import Header from '@/components/ui/header';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = createMetadata({
  title: 'Digital Marketing Services | Fractional CMO Australia',
  description: 'Professional digital marketing services including Google Ads, SEO, lead generation, digital growth strategy, social media marketing, and email marketing.',
  path: '/services',
  canonical: `${SITE_URL}/services`,
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  keywords: ['digital marketing services', 'Google Ads', 'SEO', 'lead generation', 'digital growth', 'social media marketing'],
});

const services = [
  {
    slug: 'google-ads',
    name: 'Google Ads',
    description: 'Drive targeted traffic and qualified leads with expert Google Ads management and optimization.',
  },
  {
    slug: 'seo',
    name: 'SEO',
    description: 'Improve your online visibility and attract organic traffic with proven search engine optimization strategies.',
  },
  {
    slug: 'lead-generation',
    name: 'Lead Generation',
    description: 'Generate high-quality leads for your business with targeted campaigns and conversion optimization.',
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies that drive growth and maximize your ROI.',
  },
  {
    slug: 'digital-growth-strategy',
    name: 'Digital Growth Strategy',
    description: 'Strategic planning and execution for sustainable business growth in the digital landscape.',
  },
  {
    slug: 'social-media-marketing',
    name: 'Social Media Marketing',
    description: 'Build engaged communities and drive conversions through strategic social media management.',
  },
  {
    slug: 'email-marketing',
    name: 'Email Marketing',
    description: 'Create compelling email campaigns that nurture leads and drive customer loyalty.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 md:pt-28">
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-background via-background to-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                Digital Marketing Services
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive digital marketing solutions tailored to help your business grow and thrive in the competitive online landscape.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`}>
                  <Card className="group hover:border-primary/30 hover:shadow-lg transition-all border-border/50 h-full">
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-4">{service.name}</Badge>
                      <p className="text-muted-foreground mb-6 line-clamp-3">{service.description}</p>
                      <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                        Explore <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Industries We Serve</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our specialized expertise extends across diverse industry verticals, helping businesses of all sizes achieve their growth objectives.
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                'NDIS Providers',
                'Builders',
                'Buyers Agents',
                'Accountants',
                'Lawyers',
                'Painters',
                'Electricians',
                'Plumbers',
                'Removalists',
                'Finance Brokers',
                'Bricklayers',
                'Floor Sanding',
              ].map((industry) => (
                <Badge key={industry} variant="outline" className="px-4 py-2 text-center">
                  {industry}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8">
              Book a free strategy call to discuss how we can help grow your business.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Get Your Free Strategy</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
