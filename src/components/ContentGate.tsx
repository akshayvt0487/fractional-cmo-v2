'use client'
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Unlock } from "lucide-react";
import StrategyForm from "@/components/ui/strategy-form";
//import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { usePathname } from "next/navigation";

interface ContentGateProps {
  isUnlocked: boolean;
  onUnlock: (email?: string) => void;
  blogTitle?: string;
  blogSlug?: string;
}

const ContentGate = ({ isUnlocked, onUnlock, blogTitle, blogSlug }: ContentGateProps) => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [showCodeForm, setShowCodeForm] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const location = usePathname();

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    
    if (code !== "2025") {
      setError("Invalid code. Please try again or book a discovery call.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Send notification email
      const currentBlogSlug = blogSlug || location.pathname.replace('/blog/', '');
      console.log('Sending notification for:', { email, blogSlug: currentBlogSlug, blogTitle, unlockMethod: 'code' });
      
      const response = await supabase.functions.invoke('send-content-unlock-notification', {
        body: {
          email,
          blogSlug: currentBlogSlug,
          blogTitle: blogTitle || 'Blog Post',
          unlockMethod: 'code'
        }
      });
      
      console.log('Notification response:', response);

      onUnlock(email);
      setError("");
      toast({
        title: "Content Unlocked!",
        description: "You now have access to the complete article.",
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      // Still unlock content even if notification fails
      onUnlock(email);
      setError("");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isUnlocked) {
    return null;
  }

  return (
    <div className="relative">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
      
      {/* Gate content */}
      <div className="relative z-20 pt-8">
        <Card className="glass-card max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Continue Reading</CardTitle>
            <p className="text-muted-foreground">
              To access the complete article with actionable strategies and insights, choose one of the options below:
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Option 1: Book Discovery Call */}
            <div className="text-center space-y-4">
              <h3 className="font-semibold text-lg">Option 1: Book a Free Discovery Call</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized insights for your business plus access to all our premium content
              </p>
              <StrategyForm preSelectedService="content-access" />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Option 2: Enter Code */}
            <div className="text-center space-y-4">
              <h3 className="font-semibold text-lg">Option 2: Enter Access Code</h3>
              <p className="text-sm text-muted-foreground">
                Already have an access code? Enter it below
              </p>
              
              {!showCodeForm ? (
                <Button 
                  variant="outline" 
                  onClick={() => setShowCodeForm(true)}
                  className="w-full"
                >
                  <Unlock className="w-4 h-4 mr-2" />
                  I have an access code
                </Button>
              ) : (
                <form onSubmit={handleCodeSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="access-code">Access Code</Label>
                    <Input
                      id="access-code"
                      type="text"
                      placeholder="Enter your code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="text-center"
                      required
                    />
                    {error && (
                      <p className="text-sm text-destructive">{error}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => {
                        setShowCodeForm(false);
                        setEmail("");
                        setCode("");
                        setError("");
                      }}
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Unlocking..." : "Unlock Content"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentGate;