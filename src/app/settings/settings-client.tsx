"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from 'lucide-react';
import { usePrivy } from '@privy-io/react-auth';

export function SettingsClient() {
    const { authenticated } = usePrivy();
    const [tipAmount, setTipAmount] = useState('10');

    return (
        <div className="grid gap-8 max-w-xl">
             <Card>
                <CardHeader>
                    <CardTitle>Tipping Rules</CardTitle>
                    <CardDescription>Set the conditions for automatic tips.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="tip-amount">Tip Amount per Like ($DEGEN)</Label>
                        <Input 
                            id="tip-amount" 
                            type="number" 
                            placeholder="e.g., 10" 
                            value={tipAmount}
                            onChange={(e) => setTipAmount(e.target.value)}
                            disabled={!authenticated}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" disabled={!authenticated}>
                        <Settings className="mr-2 h-4 w-4" /> Save Rules
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
