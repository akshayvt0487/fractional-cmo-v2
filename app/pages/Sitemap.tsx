import { useEffect } from 'react';

const Sitemap = () => {
  useEffect(() => {
    // Set the content type to XML
    document.documentElement.setAttribute('content-type', 'application/xml');
    
    // Get the sitemap content and redirect to serve it properly
    window.location.href = '/sitemap.xml';
  }, []);

  // This component won't actually render, it just redirects
  return null;
};

export default Sitemap;