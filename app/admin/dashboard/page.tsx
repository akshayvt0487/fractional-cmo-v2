'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { databases } from '@/lib/appwrite';

import { Mail, FileCheck, BookOpen } from 'lucide-react';
import Link from 'next/link';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    strategyFormSubmissions: 0,
    contactFormSubmissions: 0,
    totalBlogPosts: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const dbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
      const strategyCol = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_STRATEGY_FORM_ID;
      const contactCol = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CONTACT_SUBMISSION_ID;
      const blogCol = 80;

      // Log environment variables (excluding actual values for security)
      console.log('Environment Variables Status:', {
        dbId: !!dbId,
        strategyCol: !!strategyCol,
        contactCol: !!contactCol,
        blogCol: !!blogCol
      });

      // If env vars are missing, avoid calling Appwrite and return 0
      if (!dbId || !strategyCol || !contactCol || !blogCol) {
        console.error('Missing environment variables:', {
          dbId: !dbId,
          strategyCol: !strategyCol,
          contactCol: !contactCol,
          blogCol: !blogCol
        });
        setStats({ strategyFormSubmissions: 0, contactFormSubmissions: 0, totalBlogPosts: 0 });
        return;
      }

      const [strategySubmissions, contactSubmissions, blogPosts] = await Promise.all([
        databases.listDocuments(String(dbId), String(strategyCol))
          .catch(err => {
            console.error('Error fetching strategy submissions:', err);
            return { total: 0, documents: [] };
          }),
        databases.listDocuments(String(dbId), String(contactCol))
          .catch(err => {
            console.error('Error fetching contact submissions:', err);
            return { total: 0, documents: [] };
          }),
        databases.listDocuments(String(dbId), String(blogCol))
          .catch(err => {
            console.error('Error fetching blog posts:', err);
            return { total: 0, documents: [] };
          })
      ]);

      console.log('Fetched Data:', {
        strategy: {
          total: strategySubmissions?.total,
          docsLength: strategySubmissions?.documents?.length
        },
        contact: {
          total: contactSubmissions?.total,
          docsLength: contactSubmissions?.documents?.length
        },
        blog: {
          total: blogPosts?.total,
          docsLength: blogPosts?.documents?.length
        }
      });

      setStats({
        strategyFormSubmissions: strategySubmissions?.total || strategySubmissions?.documents?.length || 0,
        contactFormSubmissions: contactSubmissions?.total || contactSubmissions?.documents?.length || 0,
        totalBlogPosts: blogPosts?.total || blogPosts?.documents?.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here&apos;s what&apos;s happening with your site.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/submissions?tab=strategy">
          <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Strategy Form Submissions</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.strategyFormSubmissions}</div>
              <p className="text-xs text-muted-foreground">
                Growth strategy consultation requests
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/submissions?tab=contact">
          <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Form Submissions</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.contactFormSubmissions}</div>
              <p className="text-xs text-muted-foreground">
                General contact form inquiries
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/blog-posts">
          <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">80</div>
              <p className="text-xs text-muted-foreground">
                Published and draft articles
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>);

};

export default Dashboard;