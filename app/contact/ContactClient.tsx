"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// 🟢 CORRECTED: Consolidated Appwrite imports
// 1. Imports 'databases' and IDs from your established client file.
// 2. Removed the duplicate import from "@/lib/appwrite".
import { databases, APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_CONTACT_SUBMISSION_ID } from "@/integrations/appwrite/client";
// 3. Added 'ID' from the 'appwrite' package itself.
import { ID } from "appwrite";

import { Mail, Phone, MapPin, Send, Shield, Clock, Star, Users, CheckCircle, Award } from "lucide-react";
import Header from "@/components/ui/header";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";

// 🟢 CORRECTED: Moved serviceMapping outside the component
// This prevents an infinite re-render loop by creating a stable constant.
const serviceMapping: Record<string, string> = {
  'google-ads': 'performance-ads',
  'seo': 'seo-content',
  'strategy': 'growth-strategy',
  'fractional-cmo': 'fractional-cmo',
  'conversion': 'conversion-optimization',
  'automation': 'marketing-automation',
  'consultation': 'consultation'
};

const ContactClient = ({ initialService }: { initialService?: string }) => {
  const router = useRouter(); 
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    budget: "",
    revenue: "",
    message: "",
    timeline: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
   if (initialService && serviceMapping[initialService]) {
      setFormData(prev => ({ ...prev, service: serviceMapping[initialService] }));
    }
  // 🟢 CORRECTED: Removed 'serviceMapping' from dependency array
  // It is now a stable constant and doesn't need to be a dependency.
  }, [initialService]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // This validation is correct!
    if (!APPWRITE_DATABASE_ID || !APPWRITE_COLLECTION_CONTACT_SUBMISSION_ID) {
      console.error("Appwrite Database ID or Contact Submission Collection ID is not set.");
      toast({
        title: "Configuration Error",
        description: "The form is not configured correctly. Please contact support.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // 🟢 CORRECTED: Use the imported constants instead of process.env
      await databases.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_CONTACT_SUBMISSION_ID,
        ID.unique(),
        formData
      );

      // Navigate to thank you page
      router.push('/thank-you');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        description: "Please try again or email me directly at basheer@dsigns.com.au",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-32 max-w-[1400px] mx-auto">
        <div className="container max-w-6xl py-8">
          <BreadcrumbNavigation
            items={[
              { label: "Contact", href: "/contact" }
            ]}
          />
        </div>

        <main className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-semibold mb-4">Let's Grow Your Business Together</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Ready to accelerate your growth? I help businesses build predictable, scalable marketing systems that drive real results.
              </p>
            </div>

            {/* Contact Form - Priority Position */}
            <div className="mb-16">
              <Card className="max-w-4xl mx-auto">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Send a Message</CardTitle>
                  <CardDescription>
                    Share your business details and I'll get back to you within 24 hours to schedule a strategy call
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Business Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name *</Label>
                        <Input
                          id="company"
                          required
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          placeholder="Your company name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          required
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+61 4XX XXX XXX"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="service">Primary Interest</Label>
                        <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="What do you need help with?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fractional-cmo">Fractional CMO Services</SelectItem>
                            <SelectItem value="growth-strategy">Growth Strategy & Planning</SelectItem>
                            <SelectItem value="performance-ads">Google Ads & Meta Advertising</SelectItem>
                            <SelectItem value="seo-content">SEO & Content Marketing</SelectItem>
                            <SelectItem value="conversion-optimization">Conversion Rate Optimisation</SelectItem>
                            <SelectItem value="marketing-automation">Marketing Automation Setup</SelectItem>
                            <SelectItem value="consultation">Strategy Consultation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="revenue">Current/Targeted Annual Revenue</Label>
                        <Select onValueChange={(value) => handleInputChange("revenue", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select revenue range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-500k">Under $500K/year</SelectItem>
                            <SelectItem value="500k-1m">$500K - $1M/year</SelectItem>
                            <SelectItem value="1m-5m">$1M - $5M/year</SelectItem>
                            <SelectItem value="5m-10m">$5M - $10M/year</SelectItem>
                            <SelectItem value="10m-plus">$10M+/year</SelectItem>
                            <SelectItem value="startup">Pre-revenue/Startup</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="budget">Marketing Budget Range</Label>
                        <Select onValueChange={(value) => handleInputChange("budget", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Monthly marketing spend" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-5k">Under $5,000/month</SelectItem>
                            <SelectItem value="5k-15k">$5,000 - $15,000/month</SelectItem>
                            <SelectItem value="15k-30k">$15,000 - $30,000/month</SelectItem>
                            <SelectItem value="30k-plus">$30,000+/month</SelectItem>
                            <SelectItem value="project-based">One-time project</SelectItem>
                            <SelectItem value="startup">Startup/Bootstrap</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Preferred Start Timeline</Label>
                        <Select onValueChange={(value) => handleInputChange("timeline", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="When would you like to begin?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asap">Ready to start ASAP</SelectItem>
                            <SelectItem value="1-month">Within the next month</SelectItem>
                            <SelectItem value="2-3-months">2-3 months out</SelectItem>
                            <SelectItem value="planning">Still in planning phase</SelectItem>
                            <SelectItem value="2025">Sometime in 2025</SelectItem>
                          </SelectContent> 
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Tell me about your business and goals *</Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Please share:
• What industry/niche you're in
• Your biggest growth challenge right now  
• Current marketing efforts (if any)
• What success looks like for your business
• Any specific goals or targets you're aiming for"
                        rows={6}
                      />
                    </div>

                    <div className="bg-accent/10 rounded-lg p-4 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <Shield className="h-4 w-4 mt-0.5 text-primary" />
                        <p>
                          <strong>Privacy:</strong> Your information is confidential and will never be shared. 
                          I'll use it only to understand your business and provide relevant recommendations.
                        </p>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                      size="lg"
                    >
                      {isSubmitting ? (
                        "Sending Your Message..."
                      ) : (
                        <>
                          Send Message & Get Free Insights <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Trust Factors Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Businesses Helped</div>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary">24hr</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
            </div>

            {/* Value Propositions */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center p-6">
                <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Confidentiality Guaranteed</h3>
                <p className="text-sm text-muted-foreground">
                  Your business information is secure. All discussions are protected by strict confidentiality agreements.
                </p>
              </Card>

              <Card className="text-center p-6">
                <CheckCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No-Obligation Consultation</h3>
                <p className="text-sm text-muted-foreground">
                  Get valuable insights during our initial call, even if we don't work together. No pressure, just value.
                </p>
              </Card>

              <Card className="text-center p-6">
                <Award className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Proven Track Record</h3>
                <p className="text-sm text-muted-foreground">
                  Successfully scaled service based businesses in Building/construction, Trade, Disability & Aged care across Australia, Middle East and India.
                </p>
              </Card>
            </div>

            {/* What to Expect Section - Moved below form */}
            <div className="mb-16">
              <Card className="p-8 max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold mb-4">What Happens After You Send Your Message?</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Here's exactly what you can expect from our communication process
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      1
                    </div>
                    <h3 className="font-semibold mb-2">Quick Response</h3>
                    <p className="text-sm text-muted-foreground">
                      I'll personally review your message and respond within 24 hours with initial thoughts and next steps.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      2
                    </div>
                    <h3 className="font-semibold mb-2">Free Strategy Session</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll schedule a 20-30 minute call to dive deeper into your business and discuss opportunities.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      3
                    </div>
                    <h3 className="font-semibold mb-2">Growth Strategy Deep Dive</h3>
                    <p className="text-sm text-muted-foreground">
                      If we're a good fit, we'll dive deep into the details before setting up your custom growth map.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

          </div>
        </main>
      </div>
    </>
  );
};

export default ContactClient;