'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from "next-auth/react";
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// This component acts as a protected layout for all routes under /admin
interface AdminLayoutProps {
  children: React.ReactNode; // Replaces react-router-dom's <Outlet />
}

// We need this separate component so it can access the useSidebar hook
// from the SidebarProvider context.
// FIX: Converted to a function declaration
function AdminLayoutContent({ children }: AdminLayoutProps): React.ReactElement {
  const { state: sidebarState } = useSidebar(); // Get the sidebar's state

  return (
    <div className="h-screen flex w-full" style={{ backgroundColor: 'hsl(var(--background))' }}>
      <AdminSidebar />
      {/*
        FIX: This is the content wrapper.
        We apply a margin-left that matches the sidebar's current state.
      */}
      <div
        className={cn(
          "flex-1 flex flex-col overflow-hidden",
          "transition-all duration-300 ease-out transform",
          // When sidebar is collapsed, use the icon width.
          // When expanded, use the full width.
          sidebarState === 'collapsed'
            ? "md:ml-(--sidebar-width-icon) md:w-[calc(100%-var(--sidebar-width-icon))]"
            : "md:ml-(--sidebar-width) md:w-[calc(100%-var(--sidebar-width))]"
        )}
        style={{
          willChange: 'margin-left, width'
        }}
      >
        <AdminHeader />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// FIX: Converted to a function declaration
function AdminLayout({ children }: AdminLayoutProps): React.ReactElement {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isLoading = status === "loading";
  const isAdmin = session?.user?.isAdmin as boolean | undefined;
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
  if (isLoginPage) {
    // We must return a ReactElement, so wrap children in a fragment
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
      {/* Render the content as a child of the provider */}
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </SidebarProvider>
  );
};

export default AdminLayout;

