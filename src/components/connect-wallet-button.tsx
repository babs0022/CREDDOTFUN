"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Button } from './ui/button';
import { Wallet, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useToast } from '@/hooks/use-toast';

export function ConnectWalletButton() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { toast } = useToast();

  const wallet = user?.wallet;

  if (!ready) {
    return null;
  }

  if (authenticated && wallet) {
    return (
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
             <Avatar className="h-6 w-6">
                <AvatarImage src={user?.x?.profilePictureUrl || `https://placehold.co/40x40.png`} alt="Wallet Avatar" data-ai-hint="avatar abstract" />
                <AvatarFallback>{wallet.address.substring(2, 4).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span>{`${wallet.address.substring(0, 6)}...${wallet.address.substring(wallet.address.length - 4)}`}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
           {user?.x && <DropdownMenuItem>
            Connected as @{user.x.username}
          </DropdownMenuItem>}
           {user?.email && <DropdownMenuItem>
            {user.email.address}
          </DropdownMenuItem>}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button onClick={login}>
      <Wallet className="mr-2 h-4 w-4" />
      Connect
    </Button>
  );
}
