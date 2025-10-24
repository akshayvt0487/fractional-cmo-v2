'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, FileImage } from "lucide-react";
import { useAuth } from "@/src/contexts/AuthContext";

export const GenerateSnapshots = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { session } = useAuth();

  const handleGenerate = async () => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please log in as an admin to generate snapshots.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        'generate-blog-snapshots',
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      if (error) throw error;

      // Download snapshots as files
      if (data.snapshots && data.snapshots.length > 0) {
        for (const snapshot of data.snapshots) {
          const blob = new Blob([snapshot.html], { type: 'text/html' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${snapshot.slug}.html`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          
          // Small delay between downloads
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }

      toast({
        title: "Snapshots generated",
        description: `${data.snapshots?.length || 0} HTML snapshots downloaded. Upload them to your public/blog/ folder.`,
      });
    } catch (error: any) {
      console.error('Error generating snapshots:', error);
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate snapshots",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-6">
        <div className="flex items-start gap-4">
          <FileImage className="h-8 w-8 text-primary mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Generate SEO Snapshots</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Generate static HTML snapshots for all published blog posts with proper meta tags for search engines and social media crawlers.
            </p>
            <div className="bg-muted p-4 rounded-md mb-4 text-sm">
              <p className="font-medium mb-2">How it works:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Fetches all published blog posts from database</li>
                <li>Generates HTML files with full meta tags (OG, Twitter, etc.)</li>
                <li>Downloads files to your computer</li>
                <li>Upload them to public/blog/ folder for SEO benefits</li>
              </ol>
            </div>
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full sm:w-auto"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Snapshots...
                </>
              ) : (
                <>
                  <FileImage className="mr-2 h-4 w-4" />
                  Generate SEO Snapshots
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800 p-4">
        <p className="text-sm text-amber-900 dark:text-amber-100">
          <strong>Note:</strong> After downloading, upload the HTML files to your server's public/blog/ directory. 
          These snapshots will be served to bots while humans get the full React app experience.
        </p>
      </div>
    </div>
  );
};
