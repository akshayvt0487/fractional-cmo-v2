'use client'
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Search, Download, Eye, Calendar, User, FileText } from "lucide-react";
import { format } from "date-fns";

interface BlogAccessData {
  id: string;
  email: string;
  blog_slug: string;
  blog_title: string;
  accessed_at: string;
  user_agent: string;
  ip_address: string;
  created_at: string;
}

interface ContentUnlockData {
  id: string;
  email: string;
  blog_slug: string;
  blog_title: string;
  unlock_method: string;
  created_at: string;
}

const BlogAccessViewer = () => {
  const [blogAccess, setBlogAccess] = useState<BlogAccessData[]>([]);
  const [contentUnlocks, setContentUnlocks] = useState<ContentUnlockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [activeTab, setActiveTab] = useState<"access" | "unlocks">("access");
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch blog access data
      const { data: accessData, error: accessError } = await supabase
        .from("blog_access")
        .select("*")
        .order("accessed_at", { ascending: false });

      if (accessError) throw accessError;

      // Fetch content unlock data
      const { data: unlockData, error: unlockError } = await supabase
        .from("content_unlocks")
        .select("*")
        .order("created_at", { ascending: false });

      if (unlockError) throw unlockError;

      setBlogAccess(accessData || []);
      setContentUnlocks(unlockData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch blog access data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogAccess = blogAccess.filter((access) => {
    const matchesSearch = !searchTerm || 
      access.blog_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      access.blog_slug.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEmail = !filterEmail || 
      access.email.toLowerCase().includes(filterEmail.toLowerCase());
    
    return matchesSearch && matchesEmail;
  });

  const filteredContentUnlocks = contentUnlocks.filter((unlock) => {
    const matchesSearch = !searchTerm || 
      unlock.blog_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unlock.blog_slug.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEmail = !filterEmail || 
      unlock.email.toLowerCase().includes(filterEmail.toLowerCase());
    
    return matchesSearch && matchesEmail;
  });

  const exportToCsv = (data: any[], filename: string) => {
    if (!data.length) {
      toast({
        title: "No Data",
        description: "No data available to export",
        variant: "destructive",
      });
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map(row => 
        headers.map(header => `"${row[header] || ''}"`).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const getUniqueEmails = () => {
    const accessEmails = blogAccess.map(item => item.email);
    const unlockEmails = contentUnlocks.map(item => item.email);
    return [...new Set([...accessEmails, ...unlockEmails])].filter(email => email !== "anonymous");
  };

  const getAccessStats = () => {
    const totalAccess = blogAccess.length;
    const uniqueEmails = new Set(blogAccess.map(item => item.email)).size;
    const totalUnlocks = contentUnlocks.length;
    const topBlogs = blogAccess.reduce((acc, item) => {
      acc[item.blog_slug] = (acc[item.blog_slug] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostAccessedBlog = Object.entries(topBlogs).sort(([,a], [,b]) => b - a)[0];

    return {
      totalAccess,
      uniqueEmails,
      totalUnlocks,
      mostAccessedBlog: mostAccessedBlog ? { slug: mostAccessedBlog[0], count: mostAccessedBlog[1] } : null
    };
  };

  const stats = getAccessStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading blog access data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats.totalAccess}</p>
                <p className="text-xs text-muted-foreground">Total Blog Access</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{stats.uniqueEmails}</p>
                <p className="text-xs text-muted-foreground">Unique Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{stats.totalUnlocks}</p>
                <p className="text-xs text-muted-foreground">Content Unlocks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-lg font-bold">
                  {stats.mostAccessedBlog ? stats.mostAccessedBlog.count : 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stats.mostAccessedBlog ? "Most Accessed" : "No Access Yet"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Access & Unlock Analytics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search blog titles or slugs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex-1">
              <Input
                placeholder="Filter by email..."
                value={filterEmail}
                onChange={(e) => setFilterEmail(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeTab === "access" ? "default" : "outline"}
                onClick={() => setActiveTab("access")}
              >
                Blog Access ({filteredBlogAccess.length})
              </Button>
              <Button
                variant={activeTab === "unlocks" ? "default" : "outline"}
                onClick={() => setActiveTab("unlocks")}
              >
                Unlocks ({filteredContentUnlocks.length})
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={() => 
                activeTab === "access" 
                  ? exportToCsv(filteredBlogAccess, "blog-access.csv")
                  : exportToCsv(filteredContentUnlocks, "content-unlocks.csv")
              }
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Unique Emails Summary */}
          {getUniqueEmails().length > 0 && (
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2">Active Users ({getUniqueEmails().length})</h4>
              <div className="flex flex-wrap gap-1">
                {getUniqueEmails().slice(0, 10).map((email) => (
                  <Badge
                    key={email}
                    variant="secondary"
                    className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setFilterEmail(email)}
                  >
                    {email}
                  </Badge>
                ))}
                {getUniqueEmails().length > 10 && (
                  <Badge variant="outline" className="text-xs">
                    +{getUniqueEmails().length - 10} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Tables */}
      <Card>
        <CardContent className="p-0">
          {activeTab === "access" ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Blog Title</TableHead>
                    <TableHead>Blog Slug</TableHead>
                    <TableHead>Accessed At</TableHead>
                    <TableHead>User Agent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBlogAccess.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No blog access data found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBlogAccess.map((access) => (
                      <TableRow key={access.id}>
                        <TableCell>
                          <Badge variant={access.email === "anonymous" ? "secondary" : "default"}>
                            {access.email}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{access.blog_title}</TableCell>
                        <TableCell className="font-mono text-sm">{access.blog_slug}</TableCell>
                        <TableCell>{format(new Date(access.accessed_at), "MMM dd, yyyy HH:mm")}</TableCell>
                        <TableCell className="max-w-xs truncate text-xs text-muted-foreground">
                          {access.user_agent}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Blog Title</TableHead>
                    <TableHead>Blog Slug</TableHead>
                    <TableHead>Unlock Method</TableHead>
                    <TableHead>Unlocked At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContentUnlocks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No content unlock data found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredContentUnlocks.map((unlock) => (
                      <TableRow key={unlock.id}>
                        <TableCell>
                          <Badge variant="default">{unlock.email}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{unlock.blog_title}</TableCell>
                        <TableCell className="font-mono text-sm">{unlock.blog_slug}</TableCell>
                        <TableCell>
                          <Badge variant={unlock.unlock_method === "code" ? "secondary" : "default"}>
                            {unlock.unlock_method}
                          </Badge>
                        </TableCell>
                        <TableCell>{format(new Date(unlock.created_at), "MMM dd, yyyy HH:mm")}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogAccessViewer;