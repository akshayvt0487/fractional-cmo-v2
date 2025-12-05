'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileImage } from 'lucide-react';
import { Client, Functions, Account } from 'appwrite';
import { useAuth } from '@/src/contexts/AuthContext';

export const GenerateSnapshots = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  // ✅ Appwrite client setup
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const functions = new Functions(client);
  const account = new Account(client);

  const handleGenerate = async () => {
    if (!isAdmin) {
      toast({
        title: 'Authentication required',
        description: 'Admin access required to generate snapshots.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Get JWT from Appwrite Account
      const jwt = (await account.createJWT()).jwt;

      // Execute Appwrite Function with JWT payload
      const execution = await functions.createExecution(
        process.env.NEXT_PUBLIC_APPWRITE_FUNCTION_ID!,
        JSON.stringify({ jwt })
      );

      // Parse the JSON response
      const responseData = JSON.parse((execution as any).response || (execution as any).responseString || '{}');

      if (responseData.snapshots?.length) {
        for (const snapshot of responseData.snapshots) {
          const blob = new Blob([snapshot.html], { type: 'text/html' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${snapshot.slug}.html`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          await new Promise((res) => setTimeout(res, 200));
        }
      }

      toast({
        title: 'Snapshots generated',
        description: `${responseData.snapshots?.length || 0} HTML snapshots downloaded.`,
      });
    } catch (error: any) {
      console.error('Error generating snapshots:', error);
      toast({
        title: 'Generation failed',
        description: error.message || 'Failed to generate snapshots',
        variant: 'destructive',
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
              Generate static HTML snapshots for all published blog posts with proper
              meta tags for search engines and social media crawlers.
            </p>
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

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-900">
          <strong>Note:</strong> After downloading, upload the HTML files to your
          server's public/blog/ directory. These snapshots will be served to bots while
          humans get the full React app experience.
        </p>
      </div>
    </div>
  );
};
