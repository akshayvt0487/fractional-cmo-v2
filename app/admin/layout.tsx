'use client';

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  
  const isLoading = status === "loading";
  const isAdmin = (session?.user as any)?.isAdmin;
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!isLoading) {
      // If NOT loading and NOT on the login page...
      if (!isLoginPage) {
        // ...check if user is not an admin
        if (!session || !isAdmin) {
          // Not an admin, redirect to login
          console.warn("Unauthorized access, redirecting to login.");
          router.push('/admin/login');
        }
      }
      // If user is on the login page but IS logged in as admin
      else if (isLoginPage && session && isAdmin) {
        // Redirect them to the dashboard
        router.push('/admin');
      }
    }
  }, [session, isAdmin, isLoading, router, isLoginPage, pathname]);

  // Case 1: If on the login page, just show the login form
  // The layout will be a blank screen, allowing the login page to take over.
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Case 2: Show a full-screen loader while checking session
  // OR if we're about to redirect
  if (isLoading || (!isAdmin && !isLoginPage)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Case 3: User is an authorized admin, show the full layout
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col w-full">
          <AdminHeader />
          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
