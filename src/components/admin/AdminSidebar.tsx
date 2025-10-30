'use client'; // 👈 MUST be a client component to use navigation hooks

import React from 'react';
// ✅ ADD: Link component for navigation
import Link from 'next/link';
// ✅ ADD: usePathname for getting the current URL/location
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  FileText,
  BookOpen,
  Settings,
  MessageSquare,
  BarChart3
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'; // Assuming these are client components with 'use client'

// Define navigation items
const navItems = [
  {
    title: 'Dashboard',
    icon: Home,
    path: '/admin', // Root admin path
  },

  {
    title: 'Form Submissions',
    icon: MessageSquare,
    path: '/admin/submissions',
  },

  {
    title: 'Settings',
    icon: Settings,
    path: '/admin/settings',
  },
];

export const AdminSidebar = () => {

  // ✅ Next.js App Router equivalent of useLocation().pathname
  const currentPath = usePathname();

  const isActive = (path: string) => {
    if (path === '/admin') {
      // Must match exactly for the dashboard root to avoid matching all /admin/* routes
      return currentPath === '/admin';
    }
    // Use startsWith for nested routes, e.g., /admin/content, /admin/content/edit
    return currentPath.startsWith(path);
  };

  return (
    // FIX: Removed "top-25" (not a standard Tailwind class) and "bg-white" (redundant, let the Sidebar component handle its bg)
    <Sidebar collapsible="icon" className="border-r" variant='sidebar'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <SidebarMenuItem key={item.path}>
                    {/* Use the Next.js standard 'asChild' pattern: 
                        The Button renders as the Next.js Link, 
                        passing the 'active' state and custom classes to the Link.
                        We use 'href' instead of 'to'.
                    */}
                    <SidebarMenuButton asChild isActive={active}>
                      <Link href={item.path}>
                        {/* FIX: Removed redundant <div>. 
                            SidebarMenuButton is already a flex container with a gap. 
                        */}
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
