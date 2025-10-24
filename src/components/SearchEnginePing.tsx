import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle, Globe, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PingResult {
  google: { success: boolean; error: string | null };
  bing: { success: boolean; error: string | null };
}

const SearchEnginePing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastResult, setLastResult] = useState<PingResult | null>(null);
  const { toast } = useToast();

  const handlePing = async () => {
    setIsLoading(true);
    setLastResult(null);

    try {
      console.log('Triggering search engine ping...');
      
      const { data, error } = await supabase.functions.invoke('ping-search-engines', {
        body: {
          sitemap: true,
          urls: [
            // Add any additional URLs you want to ping
            'https://fractional-cmo.com.au/blog',
            'https://fractional-cmo.com.au/about',
            'https://fractional-cmo.com.au/contact'
          ]
        }
      });

      if (error) {
        throw error;
      }

      console.log('Search engine ping response:', data);
      setLastResult(data.results);

      const googleSuccess = data.results.google.success;
      const bingSuccess = data.results.bing.success;

      if (googleSuccess && bingSuccess) {
        toast({
          title: "Success!",
          description: "Both Google and Bing have been notified of your site updates.",
        });
      } else if (googleSuccess || bingSuccess) {
        toast({
          title: "Partial Success",
          description: `${googleSuccess ? 'Google' : 'Bing'} was notified successfully. ${!googleSuccess ? 'Google' : 'Bing'} failed.`,
          variant: "default",
        });
      } else {
        toast({
          title: "Failed",
          description: "Failed to notify search engines. Please check your API keys.",
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error('Error pinging search engines:', error);
      toast({
        title: "Error",
        description: "Failed to ping search engines. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search Engine Indexing
        </CardTitle>
        <CardDescription>
          Notify Google and Bing about website updates for faster indexing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={handlePing} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Pinging Search Engines...
            </>
          ) : (
            <>
              <Globe className="mr-2 h-4 w-4" />
              Ping Search Engines
            </>
          )}
        </Button>

        {lastResult && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Google:</span>
              <Badge variant={lastResult.google.success ? "default" : "destructive"}>
                {lastResult.google.success ? (
                  <CheckCircle className="h-3 w-3 mr-1" />
                ) : (
                  <XCircle className="h-3 w-3 mr-1" />
                )}
                {lastResult.google.success ? "Success" : "Failed"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Bing:</span>
              <Badge variant={lastResult.bing.success ? "default" : "destructive"}>
                {lastResult.bing.success ? (
                  <CheckCircle className="h-3 w-3 mr-1" />
                ) : (
                  <XCircle className="h-3 w-3 mr-1" />
                )}
                {lastResult.bing.success ? "Success" : "Failed"}
              </Badge>
            </div>

            {(lastResult.google.error || lastResult.bing.error) && (
              <div className="text-xs text-muted-foreground space-y-1">
                {lastResult.google.error && (
                  <div>Google: {lastResult.google.error}</div>
                )}
                {lastResult.bing.error && (
                  <div>Bing: {lastResult.bing.error}</div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          This will notify search engines about your homepage, blog, about page, contact page, and sitemap.
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchEnginePing;