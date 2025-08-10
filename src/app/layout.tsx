import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { siteMetadata } from '@/app/data/metadata';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.className,
          'antialiased'
        )}
      >
          <Toaster />
          {children}
      </body>
    </html>
  );
}
