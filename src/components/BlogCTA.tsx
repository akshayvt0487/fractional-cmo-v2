'use client'

import React from 'react';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface BlogCTAProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const BlogCTA: React.FC<BlogCTAProps> = ({
  title = "Ready to Transform Your Business Growth?",
  description = "Get a free 30-minute strategy consultation to discover how a Fractional CMO can accelerate your business growth and increase revenue.",
  primaryButtonText = "Book Free Strategy Call",
  primaryButtonLink = "/contact",
  secondaryButtonText = "Learn About Our Services",
  secondaryButtonLink = "/about"
}) => {
  return (
    <Card className="mt-16 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-primary/20">
      <CardContent className="p-8 text-center">
        <h3 className="text-2xl font-bold mb-4 text-foreground">
          {title}
        </h3>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="gap-2 px-8"
            onClick={() => window.location.href = primaryButtonLink}
          >
            <Phone className="h-5 w-5" />
            {primaryButtonText}
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="gap-2 px-8"
            onClick={() => window.location.href = secondaryButtonLink}
          >
            <Mail className="h-5 w-5" />
            {secondaryButtonText}
          </Button>
        </div>
        
        <div className="mt-6 text-sm text-muted-foreground">
          <p>✓ No commitment required • ✓ 30-minute strategy session • ✓ Actionable insights guaranteed</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCTA;