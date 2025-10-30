'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { databases } from '@/lib/appwrite';
import { Query } from 'appwrite';
import { Users, FileText, Settings, BarChart3 } from 'lucide-react';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSubmissions: 0,
   
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const dbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
      const submissionsCol = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_STRATEGY_FORM_ID;
     
      // Fetch form submissions count
      const submissions = await databases.listDocuments(dbId, submissionsCol);
      const totalSubmissions = submissions?.total || submissions?.documents?.length || 0;

    
      setStats({
        totalSubmissions,
      
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

        
      </div>
    </div>
  );
};
