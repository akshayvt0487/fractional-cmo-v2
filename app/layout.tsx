import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Script from 'next/script';
import { Providers } from './providers';
import './globals.css';
import './styles/sidebar.css';
import { defaultMetadata, SITE_URL } from '@/lib/seo';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next";
import DynamicFooter from '@/components/client/DynamicFooter';
import ScrollBottomPopup from '@/components/ui/scroll-bottom-popup';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  ...defaultMetadata,
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans antialiased`}>
      <head>
        {/* Advanced robots meta tag for SERP control */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Preconnect to Bunny CDN for font delivery */}
        <link rel="preconnect" href="https://fonts.bunny.net" crossOrigin="anonymous" />
        {/* Preload critical Roboto font with font-display: swap */}
        <link
          rel="preload"
          as="font"
          href="https://fonts.bunny.net/files/roboto-latin-400-normal.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Preconnect to Google services for faster tag loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        
        {/* Font metric overrides to prevent layout shift when Roboto loads */}
        {/* This prevents CLS by setting font fallback metrics that match Roboto */}
        <style>{`
          @font-face {
            font-family: 'Roboto Fallback';
            src: local('system-ui');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
            ascent-override: 103%;
            descent-override: 24.4%;
            line-gap-override: 0%;
          }
          
          /* Use fallback font with Roboto metrics while Roboto loads */
          body {
            font-family: var(--font-inter), 'Roboto Fallback', system-ui, sans-serif;
          }
        `}</style>
      </head>
      
      {/* Defer Google Tag Manager to after page loads */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-2J0KSCHPZT"
        strategy="lazyOnload"
        async
      />
      <Script
        id="gtm-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2J0KSCHPZT');
            
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=GTM-W9PHPGPW'+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W9PHPGPW');
          `,
        }}
      />
      
      {/* Lazy-load reCAPTCHA only if needed - loads after interaction */}
      <Script
        src="https://www.google.com/recaptcha/api.js"
        strategy="lazyOnload"
        async
        defer
      />
      
      <body className="font-sans">
        <Analytics />
        <SpeedInsights />
        <Providers>
          <Suspense fallback={<div className="min-h-screen" />}>
            {children}
          </Suspense>
          <DynamicFooter />
          <ScrollBottomPopup />
        </Providers>
      </body>
    </html>
  );
}
