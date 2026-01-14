"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface OtherServicesProps {
  currentService: string;
}

const allServices = [
  {
    slug: 'google-ads',
    name: 'Google Ads',
    description: 'Drive targeted traffic and qualified leads with expert Google Ads management.',
  },
  {
    slug: 'seo',
    name: 'SEO',
    description: 'Improve your online visibility and attract organic traffic with proven strategies.',
  },
  {
    slug: 'lead-generation',
    name: 'Lead Generation',
    description: 'Generate high-quality leads for your business with targeted campaigns.',
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies that drive growth and maximize ROI.',
  },
  {
    slug: 'digital-growth-strategy',
    name: 'Digital Growth Strategy',
    description: 'Strategic planning for sustainable business growth in the digital landscape.',
  },
  {
    slug: 'social-media-marketing',
    name: 'Social Media Marketing',
    description: 'Build engaged communities and drive conversions through strategic social media.',
  },
  {
    slug: 'email-marketing',
    name: 'Email Marketing',
    description: 'Create compelling email campaigns that nurture leads and drive loyalty.',
  },
];

const OtherServices: React.FC<OtherServicesProps> = ({ currentService }) => {
  // Filter out the current service
  const otherServices = allServices.filter(
    (service) => service.slug !== currentService
  );

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Complementary Services</Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Explore Our Other Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive suite of digital marketing and growth services work together to maximize your business impact and build topical authority across all channels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherServices.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group"
            >
              <Card className="h-full border-border/50 hover:border-primary/50 transition-all hover:shadow-md cursor-pointer">
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    {service.description}
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherServices;
