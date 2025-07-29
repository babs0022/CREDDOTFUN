import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Twitter, Wallet, Gift, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48 text-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                <Zap className="inline-block w-4 h-4 mr-2 text-primary" />
                The Future of Creator Support
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                CRED
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Reward your favorite X creators with seamless on-chain micro-payments.
                Bridge your Web2 identity with the Web3 value layer.
              </p>
              <div className="flex gap-4">
                <Button asChild size="lg">
                  <Link href="/dashboard">
                    Launch App <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                   <Link href="/claim">Claim a Tip</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">How It Works</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A simple, automated loop to reward content you love on X.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-background rounded-full mb-4 shadow-md">
                   <Wallet className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-headline">1. Connect & Fund</h3>
                <p className="text-muted-foreground">
                  Connect your wallet and X account. Deposit funds into your personal, secure Tipping Vault.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-background rounded-full mb-4 shadow-md">
                  <Twitter className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-headline">2. Set Rules & Like</h3>
                <p className="text-muted-foreground">
                  Define your tipping rules, like "10 $DEGEN for every post I like". Then, just use X as you normally would.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                 <div className="p-4 bg-background rounded-full mb-4 shadow-md">
                   <Gift className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-headline">3. Tip & Notify</h3>
                <p className="text-muted-foreground">
                  Our system automatically sends a tip and notifies the creator, onboarding them into the new creator economy.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Join the Revolution</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start rewarding creators and become part of a viral loop that's building the future of the creator economy.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
               <Button asChild size="lg" className="w-full">
                  <Link href="/dashboard">Get Started Now</Link>
                </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 CRED Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
