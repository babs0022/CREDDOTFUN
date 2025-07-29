import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import { PrivyProvider } from './privy-provider';

export const metadata: Metadata = {
  title: 'CRED',
  description: 'Tip creators on X with on-chain micro-payments.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased h-full bg-background")}>
        <PrivyProvider>
          <div className="relative flex flex-col h-full">
            {children}
          </div>
          <Toaster />
        </PrivyProvider>
      </body>
    </html>
  );
}
