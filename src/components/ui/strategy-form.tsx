'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { databases, APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_STRATEGY_FORM_ID } from "@/integrations/appwrite/client";
import { ID } from "appwrite";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const basheerImage = "/lovable-uploads/2975c655-d01c-4894-8737-276899af3f17.png";

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

const StrategyForm = ({ preSelectedService }: StrategyFormProps = {}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    challenge: "",
    timeline: ""
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (preSelectedService && serviceMapping[preSelectedService]) {
      setFormData(prev => ({ ...prev, service: serviceMapping[preSelectedService] }));
    }
  }, [preSelectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!APPWRITE_DATABASE_ID || !APPWRITE_COLLECTION_STRATEGY_FORM_ID) {
        throw new Error('Appwrite not configured');
      }

      await databases.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_STRATEGY_FORM_ID,
        ID.unique(),
        formData
      );

      toast({
        title: "Request submitted!",
        description: "Redirecting to confirmation page...",
      });
      setIsOpen(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        challenge: "",
        timeline: ""
      });

      // Redirect all leads to booking page
      window.location.href = 'https://link.dsigns.com.au/widget/bookings/fractional-cmo-basheer';
    } catch (error: unknown) {
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
        <Button variant="hero" size="lg" className="w-full sm:w-auto ">
          Book a Free Strategy Call <ArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-175 max-h-[90vh] overflow-y-auto">
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
              <SelectContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2">
                <SelectItem value="fractional-cmo" className="data-state:checked:bg-gray-200 data-highlighted:bg-gray-200 cursor-pointer transition-colors duration-200">Fractional CMO Services</SelectItem>
                <SelectItem value="growth-strategy" className="data-state:checked:bg-gray-200 data-highlighted:bg-gray-200 cursor-pointer transition-colors duration-200">Growth Strategy & Planning</SelectItem>
                <SelectItem value="performance-ads" className="data-state:checked:bg-gray-200 data-highlighted:bg-gray-200 cursor-pointer transition-colors duration-200">Google Ads & Meta Advertising</SelectItem>
                <SelectItem value="seo-content" className="data-state:checked:bg-gray-200 data-highlighted:bg-gray-200 cursor-pointer transition-colors duration-200">SEO & Content Marketing</SelectItem>
                <SelectItem value="conversion-optimization" className="data-state:checked:bg-gray-200 data-highlighted:bg-gray-200 cursor-pointer transition-colors duration-200">Conversion Rate Optimisation</SelectItem>
                <SelectItem value="marketing-automation" className="data-state:checked:bg-gray-200 data-highlighted:bg-gray-200 cursor-pointer transition-colors duration-200">Marketing Automation Setup</SelectItem>
                <SelectItem value="consultation" className="data-state:checked:bg-gray-200 data-highlighted:bg-gray-200 cursor-pointer transition-colors duration-200">Strategy Consultation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="challenge">Tell me about your business and main growth challenge *</Label>
            <Textarea
              id="challenge"
              required
              value={formData.challenge}
              onChange={(e) => handleInputChange("challenge", e.target.value)}
              placeholder={`Please share:
• What industry/niche you're in
• Your biggest growth challenge right now
• Current marketing efforts (if any)
• What success looks like for your business`}
              rows={5}
              className="text-base min-h-30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeline">Project Timeline</Label>
            <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="When would you like to begin?" />
              </SelectTrigger>
              <SelectContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2">
                <SelectItem value="asap" className="data-state:checked:bg-gray-200 data-highlighted:bg-gray-200 cursor-pointer transition-colors duration-200">Ready to start ASAP</SelectItem>
                <SelectItem value="1-month" className="data-state:checked:bg-gray-200 data-highlighted:bg-gray-200 cursor-pointer transition-colors duration-200">Within the next month</SelectItem>
                <SelectItem value="2-3-months" className="data-state:checked:bg-gray-200 data-highlighted:bg-gray-200 cursor-pointer transition-colors duration-200">2-3 months out</SelectItem>
                <SelectItem value="planning" className="data-state:checked:bg-gray-200 data-highlighted:bg-gray-200 cursor-pointer transition-colors duration-200">Still in planning phase</SelectItem>
                <SelectItem value="2026" className="data-state:checked:bg-gray-200 data-highlighted:bg-gray-200 cursor-pointer transition-colors duration-200">Sometime in 2026</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full h-12 text-white cursor-pointer bg-[#1A2235] hover:bg-[#313C4E] duration-200 ease-in-out" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StrategyForm;