'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send, CheckCircle } from 'lucide-react';

interface ServiceInquiryFormProps {
  serviceName: string;
}

const ServiceInquiryForm = ({ serviceName }: ServiceInquiryFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    budget: '',
    challenge: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, budget: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('submit-strategy-form', {
        body: {
          ...formData,
          service: serviceName
        }
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Inquiry Submitted!",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
          <p className="text-muted-foreground">
            Your inquiry has been submitted. We'll contact you within 24 hours to discuss your {serviceName.toLowerCase()} needs.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 bg-background">
      <CardHeader>
        <CardTitle className="text-xl">Get a Free {serviceName} Consultation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Your phone"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Monthly Budget</Label>
            <Select onValueChange={handleSelectChange} value={formData.budget}>
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-2k">Under $2,000/month</SelectItem>
                <SelectItem value="2k-5k">$2,000 - $5,000/month</SelectItem>
                <SelectItem value="5k-10k">$5,000 - $10,000/month</SelectItem>
                <SelectItem value="10k-plus">$10,000+/month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="challenge">What's your biggest {serviceName.toLowerCase()} challenge? *</Label>
            <Textarea
              id="challenge"
              name="challenge"
              value={formData.challenge}
              onChange={handleInputChange}
              placeholder={`Tell us about your current ${serviceName.toLowerCase()} challenges and goals...`}
              rows={3}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Get Free Consultation
              </>
            )}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            No spam. We'll respond within 24 hours.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default ServiceInquiryForm;
