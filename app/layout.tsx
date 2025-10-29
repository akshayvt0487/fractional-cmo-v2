import { Providers } from './providers'; // 1. Import your new client wrapper
import './globals.css'; // Your global styles

export const metadata = {
  title: 'Your Site Title',
  description: 'Your site description',
};

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