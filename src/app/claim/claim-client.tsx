"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Twitter, Wallet, CheckCircle2, Gift } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';
import { useSearchParams } from 'next/navigation';

export function ClaimClient() {
    const { login, user, authenticated } = usePrivy();
    const searchParams = useSearchParams();
    const [claimed, setClaimed] = useState(false);
    
    const tipper = searchParams.get('tipper') || '@somebody';
    const tipAmount = searchParams.get('amount') || '10';

    const handleClaim = () => {
        // In a real app, this would trigger a transaction to claim the tip.
        setTimeout(() => setClaimed(true), 1500);
    };

    const isXConnected = !!user?.x;
    const isWalletConnected = authenticated;

    if (claimed) {
        return (
             <Card className="w-full max-w-md text-center shadow-lg">
                <CardHeader>
                    <div className="mx-auto bg-green-100 dark:bg-green-900 p-3 rounded-full w-fit">
                        <Gift className="h-10 w-10 text-green-500" />
                    </div>
                    <CardTitle className="text-2xl font-headline mt-4">Tip Claimed!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        {tipAmount} $DEGEN has been sent to your wallet. Welcome to CRED!
                    </p>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                    <Button className="w-full" asChild>
                        <a href="/">Go to your Dashboard</a>
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-headline">You've Got a Tip!</CardTitle>
                <CardDescription>
                    <span className="font-bold text-primary">{tipper}</span> just tipped you <span className="font-bold text-primary">{tipAmount} $DEGEN</span> for your post!
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                            <Twitter className={`h-6 w-6 ${isXConnected ? 'text-green-500' : 'text-primary'}`} />
                            <span className="font-medium">Verify your X Account</span>
                        </div>
                        {isXConnected ? (
                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                        ) : (
                            <Button size="sm" onClick={login}>Verify</Button>
                        )}
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                            <Wallet className={`h-6 w-6 ${isWalletConnected ? 'text-green-500' : 'text-muted-foreground'}`} />
                            <span className={`font-medium ${!isXConnected && 'text-muted-foreground'}`}>Connect your Wallet</span>
                        </div>
                        {isXConnected && isWalletConnected ? (
                             <CheckCircle2 className="h-6 w-6 text-green-500" />
                        ) : (
                             <Button size="sm" onClick={login} disabled={!isXConnected}>Connect</Button>
                        )}
                    </div>
                </div>

            </CardContent>
            <CardFooter>
                <Button 
                    className="w-full" 
                    size="lg"
                    disabled={!isXConnected || !isWalletConnected}
                    onClick={handleClaim}
                >
                    Claim {tipAmount} $DEGEN
                </Button>
            </CardFooter>
        </Card>
    );
}
