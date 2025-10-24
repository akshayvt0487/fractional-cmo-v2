'use client'
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to automatically ping search engines for indexing
 * This can be triggered when the website is published or updated
 */
export const useAutoIndexing = (trigger: boolean = false) => {
  useEffect(() => {
    if (!trigger) return;

    const pingSearchEngines = async () => {
      try {
        console.log('Auto-pinging search engines for indexing...');
        
        const { data, error } = await supabase.functions.invoke('ping-search-engines', {
          body: {
            sitemap: true,
            urls: [
              'https://fractional-cmo.com.au',
              'https://fractional-cmo.com.au/blog',
              'https://fractional-cmo.com.au/about',
              'https://fractional-cmo.com.au/contact'
            ]
          }
        });

        if (error) {
          console.error('Auto-indexing error:', error);
          return;
        }

        console.log('Auto-indexing completed:', data);
        
        // Optionally store the result in localStorage for admin reference
        localStorage.setItem('lastAutoIndexing', JSON.stringify({
          timestamp: new Date().toISOString(),
          results: data.results
        }));

      } catch (error) {
        console.error('Failed to auto-ping search engines:', error);
      }
    };

    // Add a small delay to avoid immediate execution on page load
    const timeoutId = setTimeout(pingSearchEngines, 2000);

    return () => clearTimeout(timeoutId);
  }, [trigger]);
};

/**
 * Hook to automatically ping search engines when the site is published
 * This checks if the site was recently published and triggers indexing
 */
export const usePublishIndexing = () => {
  useEffect(() => {
    const checkAndPingOnPublish = async () => {
      // Check if this is a new deployment/publish
      const lastIndexing = localStorage.getItem('lastAutoIndexing');
      const deploymentTimestamp = document.querySelector('meta[name="deployment-timestamp"]')?.getAttribute('content');
      
      if (deploymentTimestamp) {
        const lastIndexingData = lastIndexing ? JSON.parse(lastIndexing) : null;
        const lastIndexingTime = lastIndexingData?.timestamp;
        
        // If no previous indexing or deployment is newer than last indexing
        if (!lastIndexingTime || new Date(deploymentTimestamp) > new Date(lastIndexingTime)) {
          console.log('New deployment detected, triggering search engine ping...');
          
          try {
            const { data, error } = await supabase.functions.invoke('ping-search-engines', {
              body: {
                sitemap: true
              }
            });

            if (!error) {
              localStorage.setItem('lastAutoIndexing', JSON.stringify({
                timestamp: new Date().toISOString(),
                results: data.results,
                trigger: 'auto-publish'
              }));
              console.log('Auto-publish indexing completed successfully');
            }
          } catch (error) {
            console.error('Auto-publish indexing failed:', error);
          }
        }
      }
    };

    // Check for publish indexing on page load
    checkAndPingOnPublish();
  }, []);
};