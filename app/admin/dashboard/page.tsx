'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Settings, BarChart3 } from 'lucide-react';
// Import Appwrite SDK from a CDN to resolve the build error
import { Client, Databases, Query } from 'https://cdn.jsdelivr.net/npm/appwrite@15.0.0/dist/esm/appwrite.js';

// --- Appwrite Client Setup ---
// The build environment can't access your .env.local file or local modules.
// Please enter your Appwrite credentials here for the dashboard to work in this preview.
const APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'YOUR_APPWRITE_ENDPOINT';
const APPWRITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'YOUR_PROJECT_ID';
const APPWRITE_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'YOUR_DATABASE_ID';
const APPWRITE_COLLECTION_SUBMISSIONS = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SUBMISSIONS || 'YOUR_FORM_SUBMISSIONS_COLLECTION_ID';
const APPWRITE_COLLECTION_BLOGS = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BLOGS || 'YOUR_BLOG_POSTS_COLLECTION_ID';

// Initialize the Appwrite Client
const client = new Client();
client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

// Initialize Databases
const databases = new Databases(client);
// --- End Appwrite Client Setup ---


export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    totalBlogPosts: 0,
    publishedPosts: 0,
  });

  useEffect(() => {
    // Ensure we don't run this if credentials are just placeholders
    if (APPWRITE_PROJECT_ID === 'YOUR_PROJECT_ID') {
      console.warn("Appwrite credentials are not set. Please update the constants in Dashboard.jsx");
      return;
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch form submissions count
      // We use Query.limit(0) to only fetch the 'total' count, not the documents
      const submissionsPromise = databases.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_SUBMISSIONS,
        [Query.limit(0)]
      );

      // Fetch total blog posts count
      const totalBlogsPromise = databases.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_BLOGS,
        [Query.limit(0)]
      );

      // Fetch published blog posts count
      // We query for posts where 'published' is true and get the total
      const publishedBlogsPromise = databases.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_COLLECTION_BLOGS,
        [
          Query.equal('published', true),
          Query.limit(0)
        ]
      );

      // Wait for all promises to resolve
      const [
        submissionsResponse,
        totalBlogsResponse,
        publishedBlogsResponse
      ] = await Promise.all([
        submissionsPromise,
        totalBlogsPromise,
        publishedBlogsPromise
      ]);

      setStats({
        totalSubmissions: submissionsResponse.total || 0,
        totalBlogPosts: totalBlogsResponse.total || 0,
        publishedPosts: publishedBlogsResponse.total || 0,
      });

    } catch (error) {
      console.error('Error fetching stats from Appwrite:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's what's happening with your site.
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
    </div>
  );
};

