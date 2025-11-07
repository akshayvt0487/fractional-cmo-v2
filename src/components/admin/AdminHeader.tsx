'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export const AdminHeader = () => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const router = useRouter();

  // 🔹 Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      toast({
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      });
      router.push('/admin/login');
    } catch (err) {
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
          {session?.user && (
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="max-w-[150px] md:max-w-none truncate">{session.user.email}</span>
            </div>
          )}

          <Button
            onClick={handleSignOut}
            size="sm"
            className={cn(
              "flex items-center gap-2",
              "bg-gradient-to-r from-blue-500 to-blue-600",
              "hover:from-blue-600 hover:to-blue-700",
              "text-white border-0 shadow-lg",
              "transition-all duration-200"
            )}
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline cursor-pointer">Sign Out</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
