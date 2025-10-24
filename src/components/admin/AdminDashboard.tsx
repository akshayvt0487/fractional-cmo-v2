import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { Users, FileText, Settings, BarChart3 } from 'lucide-react';
import AdminContentManager from './AdminContentManager';
import BlogAccessViewer from './BlogAccessViewer';
import FormSubmissionsViewer from './FormSubmissionsViewer';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';

const AdminDashboard = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    totalBlogPosts: 0,
    publishedPosts: 0,
  });

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, isLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchStats();
    }
  }, [user, isAdmin]);

  const fetchStats = async () => {
    try {
      // Fetch form submissions count
      const { count: submissionsCount } = await supabase
        .from('form_submissions')
        .select('*', { count: 'exact', head: true });

      // Fetch blog posts stats
      const { data: blogPosts } = await supabase
        .from('blog_posts')
        .select('published');

      const totalBlogPosts = blogPosts?.length || 0;
      const publishedPosts = blogPosts?.filter(post => post.published).length || 0;

      setStats({
        totalSubmissions: submissionsCount || 0,
        totalBlogPosts,
        publishedPosts,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Welcome back, {user.email}. Manage your website content and settings.
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Form Submissions</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
                  <p className="text-xs text-muted-foreground">
                    Total contact form submissions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalBlogPosts}</div>
                  <p className="text-xs text-muted-foreground">
                    Total blog posts created
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Published Posts</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.publishedPosts}</div>
                  <p className="text-xs text-muted-foreground">
                    Currently published
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Draft Posts</CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalBlogPosts - stats.publishedPosts}</div>
                  <p className="text-xs text-muted-foreground">
                    Unpublished drafts
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Content Management - Now in Tabs */}
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="content">Content Management</TabsTrigger>
                <TabsTrigger value="submissions">Form Submissions</TabsTrigger>
                <TabsTrigger value="blog-access">Blog Analytics</TabsTrigger>
                <TabsTrigger value="analytics">General Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="content">
                <AdminContentManager />
              </TabsContent>
              <TabsContent value="submissions">
                <FormSubmissionsViewer />
              </TabsContent>
              <TabsContent value="blog-access">
                <BlogAccessViewer />
              </TabsContent>
              <TabsContent value="analytics">
                <div className="text-center py-8">
                  <p>General analytics dashboard coming soon...</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export { AdminDashboard };