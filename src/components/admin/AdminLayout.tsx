'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js App Router navigation
import { useAuth } from '@/src/contexts/AuthContext';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Loader2 } from 'lucide-react';

// This component acts as a protected layout for all routes under /admin
interface AdminLayoutProps {
  children: React.ReactNode; // Replaces react-router-dom's <Outlet />
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  
  // State to manage the visibility of the content, preventing flashing
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 1. Check if loading is complete
    if (!isLoading) {
      // 2. Check for authentication status
      if (!user || !isAdmin) {
        // Unauthorized or logged out: redirect
        console.warn("Unauthorized access attempted. Redirecting to /admin/login.");
        router.push('/admin/login');
      } else {
        // Authorized: show content
        setIsAuthorized(true);
      }
    }
  }, [user, isAdmin, isLoading, router]);

  // Show a loading spinner while authentication status is unknown
  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // The component structure is now the layout wrapper
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full" style={{ backgroundColor: 'hsl(var(--background))' }}>
        <AdminSidebar />
        <div className="flex-1 flex flex-col w-full">
          <AdminHeader />
          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {children} {/* This renders the nested page content (the Outlet replacement) */}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
