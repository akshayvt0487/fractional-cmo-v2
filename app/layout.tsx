import React, { Suspense } from 'react';
import { Providers } from './providers'; // 1. Import your new client wrapper
import './globals.css'; // Your global styles
import { defaultMetadata } from '@/lib/seo';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Suspense fallback={<div />}>
          <SpeedInsights/>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}