"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StrategyForm from "@/components/ui/strategy-form";
import Link from 'next/link';

interface ScrollBottomPopupProps {
  onClose?: () => void;
}

const ScrollBottomPopup = ({ onClose }: ScrollBottomPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Show popup when user scrolls to 90% of the page
      const scrolledToBottom = scrollTop + clientHeight >= scrollHeight * 0.9;
      
      if (scrolledToBottom && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full mx-4 relative bg-white">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <CardContent className="p-6 pt-8 text-center">
          <h3 className="text-xl font-bold mb-3">
            Ready to Transform Your Business?
          </h3>
          <p className="text-muted-foreground mb-6">
            Get a free 45-minute strategy call to discuss how we can help you generate more leads and grow your business through proven digital marketing strategies.
          </p>
          
          <div className="space-y-3">
            <StrategyForm preSelectedService="strategy" />
            <Button variant="outline" asChild className="w-full">
              <Link href="/blog">Read More Articles</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScrollBottomPopup;