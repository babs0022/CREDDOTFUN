import Link from 'next/link';
import { Zap } from 'lucide-react';
import { ConnectWalletButton } from './connect-wallet-button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-bold inline-block font-headline">CRED</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Dashboard
            </Link>
            <Link
              href="/claim"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Claim
            </Link>
             <Link
              href="/settings"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Settings
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
}
