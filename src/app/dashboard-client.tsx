"use client";

import { useState, useTransition } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Twitter, Wallet, Coins, Settings, User, MessageSquare, Loader2, Info } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from '@/hooks/use-toast';
import { handleTipAction } from './actions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const StatCard = ({ title, value, icon: Icon }: { title: string, value: string, icon: React.ElementType }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const recentActivity: any[] = [];

export function DashboardClient() {
  const [isXConnected, setIsXConnected] = useState(false);
  const [tipAmount, setTipAmount] = useState('10');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleTipAndNotify = (activity: any) => {
    startTransition(async () => {
      const result = await handleTipAction({
        xActivity: `User liked a post from ${activity.xUsername}: "${activity.post}"`,
        tippingRules: `For every post I like, send ${tipAmount} $DEGEN.`
      });

      if (result.shouldTip) {
        toast({
          title: "🚀 Tip Sent!",
          description: `AI analysis: ${result.reason}`,
        });
      } else {
         toast({
          title: "ℹ️ Tip Not Sent",
          description: `AI analysis: ${result.reason}`,
          variant: "default",
        });
      }
    });
  };

  return (
    <div className="grid gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Tipping Vault Balance" value="0 $DEGEN" icon={Wallet} />
            <StatCard title="Total Tipped" value="0 $DEGEN" icon={Coins} />
            <StatCard title="X Account" value={isXConnected ? "@user" : "Not Connected"} icon={Twitter} />
            <StatCard title="Creators Tipped" value="0" icon={User} />
        </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Account Setup</CardTitle>
                    <CardDescription>Connect your accounts to get started.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full" disabled>
                        <Wallet className="mr-2 h-4 w-4" /> Wallet Connected
                    </Button>
                    <Button 
                        variant={isXConnected ? "secondary" : "default"}
                        className="w-full mt-4" 
                        onClick={() => setIsXConnected(!isXConnected)}
                    >
                        <Twitter className="mr-2 h-4 w-4" /> {isXConnected ? 'X Account Connected' : 'Connect X Account'}
                    </Button>
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                           <Button className="w-full">Deposit</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Deposit Funds</DialogTitle>
                            <DialogDescription>
                                Add funds to your Tipping Vault.
                            </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                               <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount" className="text-right">
                                    Amount
                                </Label>
                                <Input id="amount" defaultValue="1000" className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Confirm Deposit</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full">Withdraw</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Withdraw Funds</DialogTitle>
                            <DialogDescription>
                                Withdraw funds from your Tipping Vault.
                            </DialogDescription>
                            </DialogHeader>
                             <div className="grid gap-4 py-4">
                               <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount-withdraw" className="text-right">
                                    Amount
                                </Label>
                                <Input id="amount-withdraw" defaultValue="500" className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" variant="destructive">Confirm Withdraw</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
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
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">
                        <Settings className="mr-2 h-4 w-4" /> Save Rules
                    </Button>
                </CardFooter>
            </Card>
        </div>
        <div className="md:col-span-2">
            <Card className="h-full">
                <CardHeader>
                    <CardTitle>Recent X Activity (Likes)</CardTitle>
                    <CardDescription>
                        Manually trigger tips and notifications for your recent likes. Automation coming soon!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Creator</TableHead>
                            <TableHead>Post Snippet</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentActivity.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-24 text-center">
                                         <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                            <Info className="h-8 w-8" />
                                            <p className="font-medium">No recent activity found.</p>
                                            <p className="text-sm">Like some posts on X to get started.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                recentActivity.map((activity) => (
                                    <TableRow key={activity.xUserId}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Avatar>
                                                    <AvatarImage src={activity.avatar} alt={activity.xUsername} data-ai-hint="avatar abstract" />
                                                    <AvatarFallback>{activity.xUsername.substring(1, 3).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{activity.xUsername}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate">{activity.post}</TableCell>
                                        <TableCell className="text-right">
                                            <Button 
                                                size="sm" 
                                                variant="outline"
                                                onClick={() => handleTipAndNotify(activity)}
                                                disabled={isPending}
                                            >
                                                {isPending ? (
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                ) : (
                                                    <MessageSquare className="mr-2 h-4 w-4" />
                                                )}
                                                Tip & Notify
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
