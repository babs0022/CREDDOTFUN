"use client";

import { useState, useTransition, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Twitter, Wallet, Coins, User, MessageSquare, Loader2, Info, CheckCircle2 } from 'lucide-react';
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
import { handleTipAction, handleGetLikesAction } from './actions';
import type { Like } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { usePrivy } from '@privy-io/react-auth';


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

export function DashboardClient() {
  const { user, authenticated, login } = usePrivy();
  const [isPending, startTransition] = useTransition();
  const [isFetchingLikes, startFetchingLikesTransition] = useTransition();
  const { toast } = useToast();
  const [recentActivity, setRecentActivity] = useState<Like[]>([]);

  const isXConnected = !!user?.x;

  useEffect(() => {
    if (isXConnected && user?.x?.id) {
        startFetchingLikesTransition(async () => {
            const result = await handleGetLikesAction({ xId: user.x!.id });
            setRecentActivity(result.likes);
        });
    }
  }, [isXConnected, user?.x?.id]);


  const handleTipAndNotify = (activity: any) => {
    startTransition(async () => {
      // In a real app, the tip amount would be retrieved from user settings
      const tipAmount = '10'; // Placeholder
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
            <StatCard title="X Account" value={isXConnected ? `@${user?.x?.username}` : "Not Connected"} icon={Twitter} />
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
                    {!authenticated ? (
                        <Button className="w-full" onClick={login}>
                            <User className="mr-2 h-4 w-4" /> Sign In
                        </Button>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 border rounded-lg bg-secondary/50">
                                <div className="flex items-center gap-3">
                                    <Wallet className="h-5 w-5 text-primary" />
                                    <span className="font-medium text-sm">Wallet</span>
                                </div>
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg bg-secondary/50">
                                <div className="flex items-center gap-3">
                                    <Twitter className="h-5 w-5 text-primary" />
                                    <span className="font-medium text-sm">X Account</span>
                                </div>
                                {isXConnected ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                ) : (
                                     <Button size="sm" variant="outline" onClick={login}>Connect</Button>
                                )}
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                           <Button className="w-full" disabled={!authenticated}>Deposit</Button>
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
                            <Button variant="outline" className="w-full" disabled={!authenticated}>Withdraw</Button>
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
                            {isFetchingLikes ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-24 text-center">
                                        <div className="flex justify-center items-center">
                                            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                                            <p className="text-muted-foreground">Fetching your latest likes...</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : recentActivity.length === 0 ? (
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
