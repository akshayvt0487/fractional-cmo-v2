import React, { Suspense } from 'react';
import { Providers } from './providers';
import './globals.css';
import './styles/sidebar.css';
import { defaultMetadata } from '@/lib/seo';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Manrope } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next";
import DynamicFooter from '@/components/client/DynamicFooter';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],  // Optimized to only load needed weights
  variable: '--font-manrope',
  preload: true,
  adjustFontFallback: true,
});

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} font-sans antialiased`}>
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