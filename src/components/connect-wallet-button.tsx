"use client";

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
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
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setWalletAddress(address);
            setIsConnected(true);
          }
        } catch (error) {
          console.error("Error checking for wallet connection:", error);
        }
      }
    };
    checkIfWalletIsConnected();

     if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        } else {
          setIsConnected(false);
          setWalletAddress('');
        }
      });
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        setIsConnected(true);
        toast({
          title: "Wallet Connected",
          description: `Connected to ${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
        });
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        toast({
          title: "Connection Failed",
          description: "Could not connect to the wallet.",
          variant: "destructive"
        })
      }
    } else {
       toast({
          title: "MetaMask Not Found",
          description: "Please install MetaMask to use this feature.",
          variant: "destructive"
        })
    }
  };

  const disconnectWallet = () => {
    // Note: True "disconnection" is managed by the user in their wallet extension.
    // This function will clear the app's state.
    setIsConnected(false);
    setWalletAddress('');
     toast({
      title: "Wallet Disconnected",
    });
  }

  if (isConnected) {
    return (
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
             <Avatar className="h-6 w-6">
                <AvatarImage src={`https://placehold.co/40x40.png`} alt="Wallet Avatar" data-ai-hint="avatar abstract" />
                <AvatarFallback>{walletAddress.substring(2, 4).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span>{`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={disconnectWallet} className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button onClick={connectWallet}>
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
}

declare global {
  interface Window {
    ethereum?: any;
  }
}
