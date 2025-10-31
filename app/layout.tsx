import { Providers } from './providers'; // 1. Import your new client wrapper
import './globals.css'; // Your global styles
import { defaultMetadata } from '@/lib/seo';

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers> {/* 2. Use the wrapper component */}
          {children}
        </Providers>
      </body>
    </html>
  );
}