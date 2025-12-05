import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/ui/header';
import Footer from '@/components/sections/Footer';
import SEO from '@/components/SEO';

const industries = [
  { name: 'NDIS Providers', slug: 'ndis-providers', description: 'Digital marketing strategies for disability support services' },
  { name: 'Builders', slug: 'builders', description: 'Comprehensive digital marketing for construction businesses' },
  { name: 'Painters', slug: 'painters', description: 'Online marketing solutions for painting contractors' },
  { name: 'Electricians', slug: 'electricians', description: 'Digital presence building for electrical services' },
  { name: 'Plumbers', slug: 'plumbers', description: 'Marketing strategies for plumbing businesses' },
  { name: 'Removalists', slug: 'removalists', description: 'Digital marketing for moving companies' },
  { name: 'Accountants', slug: 'accountants', description: 'Online marketing for accounting firms' },
  { name: 'Lawyers', slug: 'lawyers', description: 'Digital marketing for legal practices' },
];

const DigitalMarketingIndex = () => {
  return (
    <>
      <SEO
        title="Digital Marketing Services by Industry | Expert Marketing Agency"
        description="Industry-specific digital marketing services for NDIS providers, tradies, accountants, and lawyers. Tailored strategies that deliver results."
        canonical="/services/digital-marketing"
      />
      <Header />
      <main className="min-h-screen bg-background pt-32">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Digital Marketing Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Industry-specific digital marketing strategies designed to help your business grow online.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry) => (
              <Card key={industry.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{industry.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm">{industry.description}</p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href={`/services/digital-marketing/${industry.slug}`}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default DigitalMarketingIndex;
