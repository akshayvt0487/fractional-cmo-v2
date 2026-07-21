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
import { Mail, Phone, MapPin, Send, Shield, Clock, Star, Users, CheckCircle, Award, ArrowRight, ExternalLink } from "lucide-react";

import Header from "@/components/ui/header";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import SubmittingOverlay from "@/components/ui/SubmittingOverlay";

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

const ContactClient = ({ initialService }: { initialService?: string; }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (initialService && serviceMapping[initialService]) {
      setFormData((prev) => ({ ...prev, service: serviceMapping[initialService] }));
    }
    // 🟢 CORRECTED: Removed 'serviceMapping' from dependency array
    // It is now a stable constant and doesn't need to be a dependency.
  }, [initialService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'Contact Form',
          ...formData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Navigate to thank you page
      router.push('/thank-you');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        description: "Please try again or email me directly at basheer@dsigns.com.au",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <SubmittingOverlay isVisible={isSubmitting} />
      <Header />
      <div className="min-h-screen bg-background pt-32 max-w-[1400px] mx-auto">
        <div className="container max-w-6xl py-8">
          <BreadcrumbNavigation
            items={[
              { label: "Contact", href: "/contact" }]
            } />

        </div>

        <main className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-semibold mb-4">Let&apos;s Grow Your Business Together</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Ready to accelerate your growth? I help businesses build predictable, scalable marketing systems that drive real results.
              </p>
            </div>

            {/* Contact Form - Priority Position */}
            <div className="mb-16">
              <Card className="max-w-4xl mx-auto static-card cursor-default">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Send a Message</CardTitle>
                  <CardDescription>
                    Share your business details and I&apos;ll get back to you within 24 hours to schedule a strategy call
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name <span className="text-slate-900 font-bold ml-0.5">*</span></Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your full name" />

                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Business Email <span className="text-slate-900 font-bold ml-0.5">*</span></Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your@company.com" />

                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name <span className="text-slate-900 font-bold ml-0.5">*</span></Label>
                        <Input
                          id="company"
                          required
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          placeholder="Your company name" />

                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number <span className="text-slate-900 font-bold ml-0.5">*</span></Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          required
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+61 4XX XXX XXX" />

                      </div>
                    </div>

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
                      <Label htmlFor="message">Tell me about your business and goals <span className="text-slate-900 font-bold ml-0.5">*</span></Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder={`Please share:
• What industry/niche you're in
• Your biggest growth challenge right now
• Current marketing efforts (if any)
• What success looks like for your business
• Any specific goals or targets you're aiming for`}
                        rows={6} />

                    </div>

                    <div className="border border-border/50 rounded-md px-3 py-2.5 text-xs text-muted-foreground/70">
                      <div className="flex items-start gap-2">
                        <Shield className="h-3.5 w-3.5 mt-0.5 text-muted-foreground/50 shrink-0" />
                        <p className="leading-relaxed">
                          <strong className="text-muted-foreground/80">Privacy:</strong> Your information is confidential and will never be shared.
                          I&apos;ll use it only to understand your business and provide relevant recommendations.
                        </p>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full cursor-pointer" variant="hero"
                      disabled={isSubmitting}
                      size="lg">

                      {isSubmitting ?
                        "Sending Your Message..." :

                        <>
                          Send Message & Get Free Insights <Send className="ml-2 h-4 w-4" />
                        </>
                      }
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Modern Executive Bento Grid - Post Form Section */}
            <div className="space-y-12 mb-16">

              {/* Bento Row 1: Contact Hub & Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Bento Card 1: Address & Location (7 Cols) - Connected to Google Maps */}
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Suite+611,+Level+6,+150+George+street,+Parramatta+NSW+2150"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md:col-span-7 bg-white border border-slate-200/90 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group cursor-pointer"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#333E50]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                  
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#333E50] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-extrabold text-[#333E50] tracking-tight">Fractional CMO</h4>
                        <p className="text-sm font-medium text-slate-500 mt-0.5">Parramatta Executive Office</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#333E50] bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200/80 group-hover:bg-[#333E50] group-hover:text-white transition-all duration-300 shrink-0">
                      <span>Google Maps</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/60 text-slate-700 font-medium text-sm space-y-1 group-hover:bg-slate-100/90 transition-colors">
                    <p className="font-semibold text-[#333E50]">Suite 611, Level 6</p>
                    <p>150 George street Parramatta NSW 2150</p>
                  </div>
                </a>

                {/* Bento Card 2: Direct Contact Action Pills (5 Cols) */}
                <div className="md:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-4">
                  <a 
                    href="mailto:Basheer@fractional-cmo.com.au" 
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 hover:bg-[#333E50] hover:text-white transition-all duration-300 group/mail cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#333E50] text-white flex items-center justify-center shrink-0 group-hover/mail:bg-white group-hover/mail:text-[#333E50] transition-colors shadow-xs">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-xs font-semibold text-slate-500 group-hover/mail:text-slate-300 block transition-colors">Email Us Directly</span>
                      <span className="text-sm font-bold text-[#333E50] group-hover/mail:text-white truncate block transition-colors">
                        Basheer@fractional-cmo.com.au
                      </span>
                    </div>
                  </a>

                  <a 
                    href="tel:0291918049" 
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 hover:bg-[#333E50] hover:text-white transition-all duration-300 group/phone cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#333E50] text-white flex items-center justify-center shrink-0 group-hover/phone:bg-white group-hover/phone:text-[#333E50] transition-colors shadow-xs">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 group-hover/phone:text-slate-300 block transition-colors">Call Directly</span>
                      <span className="text-sm font-bold text-[#333E50] group-hover/phone:text-white block transition-colors">
                        02 9191 8049
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Google Maps Embed - Clean Map Only */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-3 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200/60 relative shadow-inner">
                  <iframe
                    title="Fractional CMO Parramatta Executive Office Location Map"
                    src="https://maps.google.com/maps?q=150+George+street+Parramatta+NSW+2150&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Bento Row 2: 3 High-Impact Stat Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 bg-gradient-to-br from-slate-50 via-white to-slate-50 border border-slate-200/90 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 text-center group cursor-pointer relative overflow-hidden">
                  <div className="w-12 h-12 rounded-2xl bg-[#333E50] text-white flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="text-4xl font-black text-[#333E50] tracking-tight mb-1">50+</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Businesses Helped</div>
                </div>

                <div className="p-8 bg-gradient-to-br from-slate-50 via-white to-slate-50 border border-slate-200/90 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 text-center group cursor-pointer relative overflow-hidden">
                  <div className="w-12 h-12 rounded-2xl bg-[#333E50] text-white flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="text-4xl font-black text-[#333E50] tracking-tight mb-1">15+</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Years Experience</div>
                </div>

                <div className="p-8 bg-gradient-to-br from-slate-50 via-white to-slate-50 border border-slate-200/90 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 text-center group cursor-pointer relative overflow-hidden">
                  <div className="w-12 h-12 rounded-2xl bg-[#333E50] text-white flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div className="text-4xl font-black text-[#333E50] tracking-tight mb-1">24hr</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Response Time</div>
                </div>
              </div>

              {/* Bento Row 3: 3 Dynamic Assurance Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-8 bg-white border border-slate-200/90 rounded-3xl shadow-sm hover:bg-[#333E50] hover:text-white hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#333E50] group-hover:bg-white/10 group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="font-extrabold text-lg text-[#333E50] group-hover:text-white mb-2.5 transition-colors">
                    Confidentiality Guaranteed
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 group-hover:text-slate-200 leading-relaxed transition-colors">
                    Your business information is secure. All discussions are protected by strict confidentiality agreements.
                  </p>
                </div>

                <div className="p-8 bg-white border border-slate-200/90 rounded-3xl shadow-sm hover:bg-[#333E50] hover:text-white hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#333E50] group-hover:bg-white/10 group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="font-extrabold text-lg text-[#333E50] group-hover:text-white mb-2.5 transition-colors">
                    No-Obligation Consultation
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 group-hover:text-slate-200 leading-relaxed transition-colors">
                    Get valuable insights during our initial call, even if we don&apos;t work together. No pressure, just value.
                  </p>
                </div>

                <div className="p-8 bg-white border border-slate-200/90 rounded-3xl shadow-sm hover:bg-[#333E50] hover:text-white hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#333E50] group-hover:bg-white/10 group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="font-extrabold text-lg text-[#333E50] group-hover:text-white mb-2.5 transition-colors">
                    Proven Track Record
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 group-hover:text-slate-200 leading-relaxed transition-colors">
                    Successfully scaled service based businesses in Building/construction, Trade, Disability & Aged care across Australia, Middle East and India.
                  </p>
                </div>
              </div>

              {/* Bento Row 4: Connected Process Steps */}
              <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 border border-slate-200/90 rounded-3xl p-8 md:p-12 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#333E50] text-center mb-10 tracking-tight">
                  What Happens After You Send Your Message?
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="p-6 bg-white border border-slate-200/80 rounded-2xl hover:shadow-md transition-all duration-300 text-center group cursor-pointer">
                    <div className="w-12 h-12 bg-[#333E50] text-white rounded-2xl flex items-center justify-center text-lg font-black mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                      1
                    </div>
                    <h3 className="font-bold text-base text-[#333E50] mb-2">Quick Response</h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                      I&apos;ll personally review your message and respond within 24 hours with initial thoughts and next steps.
                    </p>
                  </div>

                  <div className="p-6 bg-white border border-slate-200/80 rounded-2xl hover:shadow-md transition-all duration-300 text-center group cursor-pointer">
                    <div className="w-12 h-12 bg-[#333E50] text-white rounded-2xl flex items-center justify-center text-lg font-black mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                      2
                    </div>
                    <h3 className="font-bold text-base text-[#333E50] mb-2">Free Strategy Session</h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                      We&apos;ll schedule a 20-30 minute call to dive deeper into your business and discuss opportunities.
                    </p>
                  </div>

                  <div className="p-6 bg-white border border-slate-200/80 rounded-2xl hover:shadow-md transition-all duration-300 text-center group cursor-pointer">
                    <div className="w-12 h-12 bg-[#333E50] text-white rounded-2xl flex items-center justify-center text-lg font-black mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                      3
                    </div>
                    <h3 className="font-bold text-base text-[#333E50] mb-2">Growth Strategy Deep Dive</h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                      If we&apos;re a good fit, we&apos;ll dive deep into the details before setting up your custom growth map.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </>);

};

export default ContactClient;