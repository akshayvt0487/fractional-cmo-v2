'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { databases, APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_STRATEGY_FORM_ID } from '@/integrations/appwrite/client';
import { ID } from 'appwrite';
import { sendStrategyFormNotification } from '@/lib/email';
import { Send, CheckCircle } from 'lucide-react';

interface StrategyFormInlineProps {
  preSelectedService?: string;
}

const StrategyFormInline = ({ preSelectedService }: StrategyFormInlineProps = {}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    challenge: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Appwrite database
      await databases.createDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_STRATEGY_FORM_ID,
        ID.unique(),
        {
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          phone: formData.phone || null,
          service: preSelectedService || null,
          challenge: formData.challenge,
          created_at: new Date().toISOString()
        }
      );

      // Send email notification
      const emailResult = await sendStrategyFormNotification({
        ...formData,
        service: preSelectedService
      });

      if (!emailResult.success) {
        console.error('Email notification failed:', emailResult.error);
      }

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
      <Card className="border-primary/20 bg-linear-to-br from-background to-primary/5">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
          <p className="text-muted-foreground">
            Your inquiry has been submitted. We&apos;ll contact you within 24 hours to discuss your {preSelectedService?.toLowerCase()} needs.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 bg-linear-to-br from-background to-primary/5">
      <CardHeader>
        <CardTitle className="text-xl">Get a Free {preSelectedService} Consultation</CardTitle>
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
                className="h-12 text-base transition-shadow duration-200 focus:shadow-md"
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
                className="h-12 text-base transition-shadow duration-200 focus:shadow-md"
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
                className="h-12 text-base transition-shadow duration-200 focus:shadow-md"
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
                className="h-12 text-base transition-shadow duration-200 focus:shadow-md"
                placeholder="Your phone"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="challenge">What&apos;s your biggest {preSelectedService?.toLowerCase()} challenge? *</Label>
            <Textarea
              id="challenge"
              name="challenge"
              value={formData.challenge}
              onChange={handleInputChange}
              className="text-base min-h-20 transition-shadow duration-200 focus:shadow-md"
              placeholder={`Tell us about your current ${preSelectedService?.toLowerCase()} challenges and goals...`}
              rows={3}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-[#0F172A] text-white hover:bg-[#1B2335] transition-colors duration-200 transform hover:-translate-y-0.5 cursor-pointer" disabled={isSubmitting}>
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
            No spam. We&apos;ll respond within 24 hours.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default StrategyFormInline;
