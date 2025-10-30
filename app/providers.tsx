'use client';

import { SessionProvider } from 'next-auth/react';
// Import any other providers you have, like Toaster, ThemeProvider, etc.
// import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {/* If NextAuth's <SessionProvider> is the only one you need, 
        you can remove the <AuthProvider> wrapper. 
        But if you still use <AuthProvider> for other things, keep it.
      */}
     
        {children}
        {/* <Toaster /> */}
     
    </SessionProvider>
  );
}