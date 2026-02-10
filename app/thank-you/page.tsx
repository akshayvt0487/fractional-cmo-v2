// app/thank-you/page.tsx

"use client"; // <-- Added because of useEffect

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/ui/header";

import { CheckCircle, Calendar, MessageCircle, ArrowRight } from "lucide-react";

// import { Link } from "react-router-dom"; // <-- Removed
import Link from "next/link"; // <-- Added Next.js Link
import type { Metadata } from 'next'; // <-- Import Metadata type

// Note: Because this is a Client Component, we can't export static metadata directly.
// For SEO on this client page, you'd typically handle it in the parent layout
// or dynamically update the document head within the useEffect hook if needed.
// However, for a simple Thank You page, setting it in the RootLayout might be sufficient.
// If you NEED dynamic metadata based on something client-side, Next.js docs cover that.

const ThankYou = () => {
  useEffect(() => {
    // Track conversion event - you can replace this with your analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      // --- IMPORTANT: Replace with your actual conversion ID/Label ---
      const conversionId = 'AW-CONVERSION_ID'; // Example: AW-123456789
      const conversionLabel = 'CONVERSION_LABEL'; // Example: AbCdEfGhIjKlMnOpQrS
      // -----------------------------------------------------------------

      if (conversionId !== 'AW-CONVERSION_ID' && conversionLabel !== 'CONVERSION_LABEL') {
        (window as any).gtag('event', 'conversion', {
          send_to: `${conversionId}/${conversionLabel}`,
          value: 1.0,
          currency: 'AUD'
        });
        console.log('Google Ads conversion tracked');
      } else {
        console.warn('Google Ads Conversion ID/Label not set. Tracking skipped.');
      }
    } else {
      console.log('gtag not found. Skipping Google Ads conversion tracking.');
    }

    // You can also track with Facebook Pixel, other analytics tools here
    console.log('Strategy call conversion processing complete.');
  }, []);

  return (
    <>
      {/* SEO handled differently in Next.js */}
      
      <Header />
      
      <main className="min-h-screen flex items-center justify-center py-16 px-4 bg-gradient-to-br from-background to-muted/30 mt-10 "> {/* Added subtle gradient */}
        <div className="max-w-2xl w-full mx-auto text-center">
          {/* Applied Tailwind classes directly for glass effect */}
          <Card className="bg-card/80 backdrop-blur-lg border border-border/20 shadow-xl rounded-xl p-8 md:p-12 bg-gray-200/80 border-2 border-gray-200 mt-10"> 
            <CardContent className="space-y-6">
              <div className="flex justify-center mb-4"> {/* Added margin */}
                <CheckCircle className="w-16 h-16 text-green-700 animate-pulse" /> {/* Added subtle animation */}
              </div>
              
              <div className="space-y-4 ">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground"> {/* Ensured text color */}
                  Thank You!
                </h1>
                <p className="text-lg text-muted-foreground">
                  Your strategy call request has been successfully submitted.
                </p>
              </div>

              <div className="bg-accent/50 rounded-lg p-6 space-y-4 border border-border/10">
                <h2 className="text-xl font-semibold flex items-center justify-center gap-2 text-foreground">
                  <Calendar className="w-5 h-5 text-primary" />
                  What happens next?
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5 shrink-0"></div>
                    <p className="text-left">I&apos;ll personally review your submission and get back to you within <strong className="text-foreground">24 business hours</strong>.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5 shrink-0"></div>
                    <p className="text-left">We&apos;ll schedule a convenient time for your free <strong className="text-foreground">45-minute strategy call</strong> via email.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5 shrink-0"></div>
                    <p className="text-left">I&apos;ll prepare some initial thoughts based on your submission for our call.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4"> {/* Added padding top */}
                <p className="text-sm text-muted-foreground">
                  In the meantime, feel free to explore more resources:
                </p>
                
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
  <Button variant="outline" className="border-2 border-gray-300 bg-gray-700 text-white" asChild>
    <Link href="/blog">
      <span className="inline-flex items-center "> 
        <MessageCircle className="w-4 h-4 mr-2 " />
        Read Latest Insights
      </span>
    </Link>
  </Button>
  
  <Button variant="secondary" className="border " asChild>
    <Link href="/about">
      <span className="inline-flex items-center"> 
        Learn More About Me
        <ArrowRight className="w-4 h-4 ml-2" />
      </span>
    </Link>
  </Button>
                </div>

                <Button variant="ghost" asChild className="w-full sm:w-auto text-muted-foreground hover:text-foreground">
   <Link href="/">
     
      <span> 
         ← Back to Home
      </span>
   </Link>
                </Button>
              </div>

              <div className="pt-6 border-t border-border/50"> 
                <p className="text-xs text-muted-foreground">
                  If you have any urgent questions, feel free to email me directly at{" "}
                  <a
                    href="mailto:basheer@dsigns.com.au"
                    className="text-primary hover:underline font-medium">
                    
                    basheer@dsigns.com.au
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>


    </>);

};

export default ThankYou;

