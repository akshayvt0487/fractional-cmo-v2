import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';
import './styles/sidebar.css';
import { defaultMetadata, SITE_URL } from '@/lib/seo';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next";
import DynamicFooter from '@/components/client/DynamicFooter';
import { GoogleTagManager } from '@next/third-parties/google';

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
      <GoogleTagManager gtmId="GTM-W9PHPGPW" />
      <body className="font-sans">
        <Analytics />
        <SpeedInsights />
        <Providers>
          <Suspense fallback={<div className="min-h-screen" />}>
            {children}
          </Suspense>
          <DynamicFooter />
        </Providers>
      </body>
    </html>
  );
}
