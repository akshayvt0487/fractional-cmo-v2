'use client';

import React, { useEffect, useState } from 'react';
import { databases, account } from '@/lib/appwrite';
import { Query } from 'appwrite';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const BLOG_COLLECTION = 'blog_posts';
const WEBSITE_COLLECTION = 'website_content';
const UNLOCK_COLLECTION = 'content_unlocks';

export default function AdminContentManager() {
  const [websiteContent, setWebsiteContent] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [unlocks, setUnlocks] = useState<any[]>([]);
  const [selectedPage, setSelectedPage] = useState('home');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // BLOG FORM
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '', slug: '', excerpt: '', content: '', hero_image_url: '',
    category: '', read_time: '', published: false, seo_title: '', seo_description: '',
  });

  useEffect(() => {
    Promise.all([fetchWebsiteContent(), fetchBlogPosts(), fetchUnlocks()])
      .then(() => setLoading(false));
  }, []);

  const fetchWebsiteContent = async () => {
    try {
      const res = await databases.listDocuments(DB_ID, WEBSITE_COLLECTION);
      setWebsiteContent(res.documents);
    } catch (err) {
      toast({ title: "Error", description: "Failed to fetch website content", variant: "destructive" });
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const res = await databases.listDocuments(DB_ID, BLOG_COLLECTION, [Query.orderDesc('$createdAt')]);
      setBlogPosts(res.documents);
    } catch (err) {
      toast({ title: "Error", description: "Failed to fetch blog posts", variant: "destructive" });
    }
  };

  const fetchUnlocks = async () => {
    try {
      const res = await databases.listDocuments(DB_ID, UNLOCK_COLLECTION, [Query.orderDesc('$createdAt')]);
      setUnlocks(res.documents);
    } catch (err) {
      console.error('Error fetching content unlocks', err);
    }
  };

  const updateSEOContent = async () => {
    try {
      const existing = websiteContent.find(
        c => c.page_slug === selectedPage && c.section_key === 'seo'
      );

      if (existing) {
        await databases.updateDocument(DB_ID, WEBSITE_COLLECTION, existing.$id, {
          content: { title: seoTitle, description: seoDescription }
        });
      } else {
        await databases.createDocument(DB_ID, WEBSITE_COLLECTION, 'unique()', {
          page_slug: selectedPage,
          section_key: 'seo',
          content_type: 'seo',
          content: { title: seoTitle, description: seoDescription },
        });
      }

      toast({ title: "Success", description: "SEO content saved successfully" });
      fetchWebsiteContent();
    } catch (err) {
      toast({ title: "Error", description: "Failed to update SEO content", variant: "destructive" });
    }
  };

  const saveBlogPost = async () => {
    try {
      const user = await account.get();
      const data = { ...blogForm, author_id: user.$id };

      if (selectedPost) {
        await databases.updateDocument(DB_ID, BLOG_COLLECTION, selectedPost.$id, data);
      } else {
        await databases.createDocument(DB_ID, BLOG_COLLECTION, 'unique()', data);
      }

      toast({ title: "Success", description: `Blog post ${selectedPost ? 'updated' : 'created'} successfully` });
      fetchBlogPosts();
      resetBlogForm();
    } catch (err) {
      toast({ title: "Error", description: "Failed to save blog post", variant: "destructive" });
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      await databases.deleteDocument(DB_ID, BLOG_COLLECTION, id);
      toast({ title: "Deleted", description: "Blog post removed successfully" });
      fetchBlogPosts();
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete blog post", variant: "destructive" });
    }
  };

  const resetBlogForm = () => {
    setSelectedPost(null);
    setBlogForm({
      title: '', slug: '', excerpt: '', content: '', hero_image_url: '',
      category: '', read_time: '', published: false, seo_title: '', seo_description: '',
    });
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="seo" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="seo">SEO Management</TabsTrigger>
          <TabsTrigger value="blog">Blog Management</TabsTrigger>
          <TabsTrigger value="unlocks">Content Unlocks</TabsTrigger>
        </TabsList>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Manage SEO content per page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <select
                value={selectedPage}
                onChange={(e) => setSelectedPage(e.target.value)}
                className="border rounded-md px-3 py-2 w-full"
              >
                <option value="home">Home</option>
                <option value="about">About</option>
                <option value="contact">Contact</option>
                <option value="blog">Blog</option>
              </select>

              <Input placeholder="SEO Title" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} />
              <Textarea placeholder="SEO Description" value={seoDescription} onChange={e => setSeoDescription(e.target.value)} />
              <Button onClick={updateSEOContent}><Save className="w-4 h-4 mr-2" />Save SEO</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog">
          {/* You can reuse your same Blog Management JSX here; logic unchanged */}
        </TabsContent>

        <TabsContent value="unlocks">
          <Card>
            <CardHeader><CardTitle>Content Unlocks</CardTitle></CardHeader>
            <CardContent>
              {unlocks.length === 0 ? (
                <p>No unlocks yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr><th>Email</th><th>Article</th><th>Method</th><th>Date</th></tr>
                    </thead>
                    <tbody>
                      {unlocks.map(u => (
                        <tr key={u.$id}>
                          <td>{u.email}</td>
                          <td>{u.blog_title}</td>
                          <td>{u.unlock_method}</td>
                          <td>{new Date(u.$createdAt).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
