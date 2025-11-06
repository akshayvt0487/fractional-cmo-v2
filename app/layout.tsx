import React, { Suspense } from 'react';
import { Providers } from './providers';
import './globals.css';
import { defaultMetadata } from '@/lib/seo';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Manrope } from 'next/font/google';
import Footer from '@/components/sections/Footer';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
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
        <Providers>
          <Suspense fallback={<div />}>
            <SpeedInsights/>
            {children}
            <Footer />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}