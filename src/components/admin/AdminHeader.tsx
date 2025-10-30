'use client';

import React, { useEffect, useState } from 'react';
import { account } from '@/lib/appwrite'; // your Appwrite client setup file
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SidebarTrigger } from '@/components/ui/sidebar';

export const AdminHeader = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  // 🔹 Fetch the logged-in user's info
  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        console.warn('No active session found');
      }
    };
    getUser();
  }, []);

  // 🔹 Handle sign out
  const handleSignOut = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      toast({
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      });
      // Optional: redirect to login
      window.location.href = '/login';
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
      });
    }
  };

  return (
    // FIX: Removed "bg-gray-100". "bg-card" is the correct semantic class to use.
    <header className="bg-card border-b border-border px-4 md:px-6 py-3 md:py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 md:gap-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-lg md:text-xl font-semibold">Admin Dashboard</h1>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {user && (
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="max-w-[150px] md:max-w-none truncate">{user.email}</span>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            // FIX: Removed custom classes: "bg-gray-800 text-white hover:bg-gray-700 border-gray-300"
            // "variant='outline'" will now apply its proper styles.
            // Kept "cursor-pointer" although it's redundant on a <button>.
            className="flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="h-4 w-4 " />
            <span className="hidden sm:inline ">Sign Out</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
