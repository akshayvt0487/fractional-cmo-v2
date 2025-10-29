'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// 🟢 APPWRITE IMPORT: Import Appwrite client and IDs
import { databases, APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_STRATEGY_FORM_ID } from "@/integrations/appwrite/client";
// 🟢 APPWRITE IMPORT: Import ID for creating unique documents
import { ID } from "appwrite";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Using the uploaded professional photo directly
const basheerImage = "/lovable-uploads/2975c655-d01c-4894-8737-276899af3f17.png";

// 🟢 REVISION: Moved serviceMapping outside the component
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

interface StrategyFormProps {
  preSelectedService?: string;
}

// Set default value for optional props
const StrategyForm = ({ preSelectedService }: StrategyFormProps = {}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    revenue: "",
    budget: "",
    challenge: "",
    timeline: ""
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const router = useRouter(); 

  useEffect(() => {
    if (preSelectedService && serviceMapping[preSelectedService]) {
      setFormData(prev => ({ ...prev, service: serviceMapping[preSelectedService] }));
    }
  // 🟢 REVISION: serviceMapping can be removed from dependencies
  // as it's now a stable constant defined outside
  }, [preSelectedService]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 🟢 VALIDATION: Ensure required IDs are present
    if (!APPWRITE_DATABASE_ID || !APPWRITE_COLLECTION_STRATEGY_FORM_ID) {
      console.error("Appwrite Database ID or Collection ID is not set.");
      toast({
        title: "Configuration Error",
        description: "The form is not configured correctly. Please contact support.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // 🟢 APPWRITE: Create a new document in the specified collection
      await databases.createDocument(
        APPWRITE_DATABASE_ID,
       APPWRITE_COLLECTION_STRATEGY_FORM_ID, // This ID must be for your "form submissions" collection
        ID.unique(), // Creates a new unique ID for the document
        formData      // The form data object is saved as the document
      );
      
      // 🟢 Appwrite throws an error on failure, so if we get here, it succeeded.

      toast({
        title: "Request submitted!",
        description: "Redirecting...",
      });
      
      setIsOpen(false);
      
      // Store form data for redirect logic *before* clearing state
      const submittedRevenue = formData.revenue;
      const submittedBudget = formData.budget;

      // Clear form data after successful submission
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        revenue: "",
        budget: "",
        challenge: "",
        timeline: ""
      });
      
      // Check revenue and budget - redirect based on lead quality
      if (submittedRevenue === "under-500k" || submittedRevenue === "500k-1m" || submittedBudget === "under-5k") {
        router.push('/not-ready'); 
      } else {
        window.location.href = 'https://link.dsigns.com.au/widget/bookings/fractional-cmo-basheer';
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        title: "Submission failed",
        description: "Please try again or contact me directly.",
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="hero" size="lg" className="w-full sm:w-auto cursor-pointer">
          Book a Free Strategy Call <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4 pb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage 
                src={basheerImage} 
                alt="Basheer Padanna - Professional Fractional CMO and Growth Marketing Expert" 
                className="object-cover"
              />
              <AvatarFallback className="bg-primary text-primary-foreground">BP</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-left">Book Your Free Strategy Call</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">with Basheer Padanna</p>
            </div>
          </div>
          <DialogDescription className="sr-only">
            Schedule a free 45-minute strategy consultation with Basheer Padanna to discuss your business growth objectives.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Your full name"
                className="h-12 text-base"
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
                className="h-12 text-base"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                required
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="Your company name"
                className="h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+61 4XX XXX XXX"
                className="h-12 text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service">Primary Interest</Label>
            <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
              <SelectTrigger className="h-12 text-base">
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

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="revenue">Current Annual Revenue or Targeted Annual Revenue</Label>
              <Select value={formData.revenue} onValueChange={(value) => handleInputChange("revenue", value)}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select revenue range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-500k">Under $500K</SelectItem>
                  <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                  <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                  <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                  <SelectItem value="10m-25m">$10M - $25M</SelectItem>
                  <SelectItem value="25m-plus">$25M+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Marketing Budget Range</Label>
              <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                <SelectTrigger className="h-12 text-base">
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="challenge">Tell me about your business and main growth challenge *</Label>
            <Textarea
              id="challenge"
              required
              value={formData.challenge}
              onChange={(e) => handleInputChange("challenge", e.target.value)}
              placeholder="Please share:
• What industry/niche you're in
• Your biggest growth challenge right now  
• Current marketing efforts (if any)
• What success looks like for your business"
              rows={5}
              className="text-base min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeline">Project Timeline</Label>
            <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="When would you like to begin?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asap">Ready to start ASAP</SelectItem>
                <SelectItem value="1-month">Within the next month</SelectItem>
                {/* 🟢 REVISION: Fixed typo here (removed stray '.') */}
                <SelectItem value="2-3-months">2-3 months out</SelectItem>
                <SelectItem value="planning">Still in planning phase</SelectItem>
                <SelectItem value="2025">Sometime in 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full h-12 text-base" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StrategyForm;

