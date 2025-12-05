import Link from 'next/link';
import SEO from '@/components/SEO';
import Header from '@/components/ui/header';
// Footer is rendered globally in the root layout; avoid duplicate footers here
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import ScrollBottomPopup from '@/components/ui/scroll-bottom-popup';
import StrategyForm from '@/components/ui/strategy-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  Search, 
  TrendingUp, 
  Rocket, 
  Share2, 
  Mail,
  ArrowRight,
  Star,
  Award,
  Users
} from 'lucide-react';

const services = [
  {
    title: "Digital Growth Strategy",
    slug: "digital-growth-strategy",
    description: "Strategic consulting to build scalable systems for sustainable business growth.",
    icon: Rocket,
    color: "text-orange-500"
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    description: "Comprehensive digital and online marketing across all channels to maximize your presence and ROI.",
    icon: TrendingUp,
    color: "text-purple-500",
    subServices: ["Online Marketing", "Content Marketing", "Performance Marketing"]
  },
  {
    title: "Google Ads",
    slug: "google-ads",
    description: "Drive qualified leads with precision PPC campaigns across Google Search, Display, and YouTube.",
    icon: Target,
    color: "text-blue-500"
  },
  {
    title: "SEO Services",
    slug: "seo-services",
    description: "Build sustainable organic visibility with technical SEO, content optimization, and authority building.",
    icon: Search,
    color: "text-green-500"
  },
  {
    title: "Social Media Marketing",
    slug: "social-media-marketing",
    description: "Build engaged communities and drive brand awareness across social platforms.",
    icon: Share2,
    color: "text-pink-500"
  },
  {
    title: "Email Marketing",
    slug: "email-marketing",
    description: "Convert subscribers into customers with strategic email campaigns and automation.",
    icon: Mail,
    color: "text-yellow-500"
  }
];

const ServicesIndex = () => {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Digital Marketing Services",
    "description": "Professional digital marketing services in Australia",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "url": `https://fractional-cmo.com.au/services/${service.slug}`
      }
    }))
  };

  return (
    <>
      <SEO
        title="Digital Marketing Services Australia | Full-Service Marketing Agency"
        description="Explore our comprehensive digital marketing services including Google Ads, SEO, social media, email marketing, and growth strategy. Expert solutions for Australian businesses."
        canonical="/services"
        ogType="website"
        keywords="digital marketing services, Google Ads, SEO services, social media marketing, email marketing, growth strategy, Australia"
        structuredData={[structuredData]}
      />
      
      <Header />
      
      <main className="min-h-screen pt-32 md:pt-28 flex flex-col items-center">
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-background via-background to-primary/5 py-16 md:py-24 w-full flex justify-center">
          <div className="container max-w-6xl px-4 flex flex-col items-center">
            <BreadcrumbNavigation items={breadcrumbs} />
            
            <div className="text-center mt-8 mb-12">
              <Badge variant="secondary" className="mb-4">Our Services</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                Digital Marketing Services That Drive Results
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                From strategy to execution, we help Australian businesses grow with proven digital marketing solutions tailored to your goals.
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
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
              
              <StrategyForm />
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 w-full flex justify-center">
          <div className="container max-w-6xl px-4 flex flex-col items-center">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Card key={service.slug} className="group hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors`}>
                        <Icon className={`w-6 h-6 ${service.color}`} />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6">{service.description}</p>
                      <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Link href={`/services/${service.slug}`}>
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30 w-full flex justify-center">
          <div className="container max-w-4xl px-4 flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Book a free 45-minute strategy call. We'll assess your current marketing and recommend the best approach for your goals.
            </p>
            <StrategyForm />
          </div>
        </section>
      </main>
      
      <ScrollBottomPopup />
    </>
  );
};

export default ServicesIndex;
