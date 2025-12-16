'use client';

import { SessionProvider } from 'next-auth/react';
import { NavigationLoadingProvider } from '@/contexts/NavigationLoadingContext';
import TopProgressBar from '@/components/ui/TopProgressBar';

// Import any other providers you have, like Toaster, ThemeProvider, etc.
// import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NavigationLoadingProvider>
        <TopProgressBar />
        {children}
        {/* <Toaster /> */}
      </NavigationLoadingProvider>
    </SessionProvider>
  );
}