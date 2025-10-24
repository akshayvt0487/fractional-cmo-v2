import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/ui/header";
import Footer from "@/components/sections/Footer";
import SEO from "@/components/SEO";
import { CheckCircle, Calendar, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  useEffect(() => {
    // Track conversion event - you can replace this with your analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with your actual conversion tracking ID
        value: 1.0,
        currency: 'AUD'
      });
    }

    // You can also track with Facebook Pixel, other analytics tools here
    console.log('Strategy call conversion tracked');
  }, []);

  return (
    <>
      <SEO
        title="Thank You - Strategy Call Request Submitted | Basheer Padanna"
        description="Thank you for requesting a free strategy call. I'll be in touch within 24 hours to schedule our conversation."
        canonical="/thank-you"
      />
      
      <Header />
      
      <main className="min-h-screen flex items-center justify-center py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="glass-card p-8 md:p-12">
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <CheckCircle className="w-16 h-16 text-primary" />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold">
                  Thank You!
                </h1>
                <p className="text-lg text-muted-foreground">
                  Your strategy call request has been successfully submitted.
                </p>
              </div>

              <div className="bg-accent/10 rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  What happens next?
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>I'll review your submission and get back to you within 24 hours</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>We'll schedule a convenient time for your free 45-minute strategy call</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p>I'll prepare a preliminary growth strategy based on your submission</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  In the meantime, feel free to explore more resources:
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" asChild>
                    <Link to="/blog">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Read Latest Insights
                    </Link>
                  </Button>
                  
                  <Button variant="secondary" asChild>
                    <Link to="/about">
                      Learn More About Me
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>

                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <Link to="/">
                    ← Back to Home
                  </Link>
                </Button>
              </div>

              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  If you have any urgent questions, feel free to email me directly at{" "}
                  <a 
                    href="mailto:basheer@dsigns.com.au" 
                    className="text-primary hover:underline"
                  >
                    basheer@dsigns.com.au
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ThankYou;