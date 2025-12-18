import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Book } from "lucide-react";
import Link from "next/link";
import Header from "@/components/ui/header";


const NotReady = () => {
  return (
    <>
      
      <Header />
      
      <main className="min-h-screen pt-32">
        <section className="py-16 md:py-24">
          <div className="container px-4 max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                You&apos;re Building Something Great
              </h1>
              <p className="text-muted-foreground">
                Based on your current revenue stage or marketing budget, a fractional CMO might not be the right fit just yet. But that doesn&apos;t mean we can&apos;t help you grow.
              </p>
            </div>

            <Card className="glass-card text-left mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-primary" />
                  Why Fractional CMO Services Work Best for $1M+ Businesses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Fractional CMO services are designed for businesses with established or targeted revenue streams ($1M+) and marketing budgets ($5,000+ monthly) that can support strategic initiatives. Here&apos;s why:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span><strong>Strategic Focus:</strong> CMO-level strategy requires existing systems and processes to optimise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span><strong>Investment Capacity:</strong> Strategic marketing initiatives typically require $5,000+ monthly budgets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span><strong>Team Management:</strong> CMOs work best when there&apos;s a marketing team or vendors to coordinate</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card text-left mb-8">
              <CardHeader>
                <CardTitle>What You Should Focus on Instead</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  For businesses under $1M revenue, here are the growth priorities that will get you ready for fractional CMO services:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">Foundation Building</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Validate product-market fit</li>
                      <li>• Establish consistent revenue streams</li>
                      <li>• Build basic marketing systems</li>
                      <li>• Focus on customer retention</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">Growth Tactics</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Direct sales and networking</li>
                      <li>• Content marketing and SEO</li>
                      <li>• Social media presence</li>
                      <li>• Referral programs</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Need Help Getting There?</h2>
              <p className="text-muted-foreground">
                While you&apos;re building towards fractional CMO readiness, our marketing agency can help you establish the foundation with professional branding, web design, and digital marketing services.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Professional Branding & Web Design</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get a professional brand identity and website that converts visitors into customers.
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <a href="https://dsigns.com.au" target="_blank" rel="noopener noreferrer">
                        Visit DSIGNS <ArrowRight className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Digital Marketing Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Strategic digital marketing to drive leads and grow your business online.
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <a href="https://leadweb.com.au" target="_blank" rel="noopener noreferrer">
                        Visit LeadWeb <ArrowRight className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-semibold">Ready to Take the Next Step?</h2>
              <p className="text-muted-foreground">
                When you reach $1M+ in revenue and have a marketing budget of $5,000+ per month, 
                that&apos;s when fractional CMO services can truly accelerate your growth.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/blog">
                    Read Growth Strategies <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/">
                    Back to Homepage
                  </Link>
                </Button>
              </div>
              
              <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <strong>Want to stay connected?</strong> Follow my content for actionable growth strategies 
                  that work for businesses at every stage. When you&apos;re ready for fractional CMO services, 
                  I&apos;ll be here to help scale your success.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      

    </>);

};

export default NotReady;

export const metadata = {
  robots: { index: false, follow: false },
};
