'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, Edit, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface WebsiteContent {
  id: string;
  page_slug: string;
  section_key: string;
  content_type: string;
  content: any;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  hero_image_url: string;
  category: string;
  read_time: string;
  published: boolean;
  seo_title: string;
  seo_description: string;
  created_at: string;
  updated_at: string;
}

const AdminContentManager = () => {
  const [websiteContent, setWebsiteContent] = useState<WebsiteContent[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPage, setSelectedPage] = useState('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Form states for SEO content
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  // Form states for blog posts
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    hero_image_url: '',
    category: '',
    read_time: '',
    published: false,
    seo_title: '',
    seo_description: '',
  });

  useEffect(() => {
    fetchWebsiteContent();
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    // Load SEO content for selected page
    const pageContent = websiteContent.find(
      item => item.page_slug === selectedPage && item.section_key === 'seo'
    );
    if (pageContent) {
      setSeoTitle(pageContent.content.title || '');
      setSeoDescription(pageContent.content.description || '');
    }
  }, [selectedPage, websiteContent]);

  const fetchWebsiteContent = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .order('page_slug');

      if (error) throw error;
      setWebsiteContent(data || []);
    } catch (error) {
      console.error('Error fetching website content:', error);
      toast({
        title: "Error",
        description: "Failed to fetch website content",
        variant: "destructive",
      });
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSEOContent = async () => {
    try {
      const contentData = {
        title: seoTitle,
        description: seoDescription
      };

      const { error } = await supabase
        .from('website_content')
        .upsert({
          page_slug: selectedPage,
          section_key: 'seo',
          content_type: 'seo',
          content: contentData
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "SEO content updated successfully",
      });
      
      fetchWebsiteContent();
    } catch (error) {
      console.error('Error updating SEO content:', error);
      toast({
        title: "Error",
        description: "Failed to update SEO content",
        variant: "destructive",
      });
    }
  };

  const saveBlogPost = async () => {
    try {
      const postData = {
        ...blogForm,
        author_id: (await supabase.auth.getUser()).data.user?.id,
        published_at: blogForm.published ? new Date().toISOString() : null
      };

      let error;
      if (selectedPost?.id) {
        // Update existing post
        ({ error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', selectedPost.id));
      } else {
        // Create new post
        ({ error } = await supabase
          .from('blog_posts')
          .insert([postData]));
      }

      if (error) throw error;

      toast({
        title: "Success",
        description: `Blog post ${selectedPost?.id ? 'updated' : 'created'} successfully`,
      });
      
      fetchBlogPosts();
      resetBlogForm();
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive",
      });
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
      
      fetchBlogPosts();
      if (selectedPost?.id === id) {
        resetBlogForm();
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    }
  };

  const editBlogPost = (post: BlogPost) => {
    setSelectedPost(post);
    setBlogForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      hero_image_url: post.hero_image_url,
      category: post.category,
      read_time: post.read_time,
      published: post.published,
      seo_title: post.seo_title,
      seo_description: post.seo_description,
    });
  };

  const resetBlogForm = () => {
    setSelectedPost(null);
    setBlogForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      hero_image_url: '',
      category: '',
      read_time: '',
      published: false,
      seo_title: '',
      seo_description: '',
    });
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
        <Tabs defaultValue="seo" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="seo">SEO Management</TabsTrigger>
            <TabsTrigger value="blog">Blog Management</TabsTrigger>
            <TabsTrigger value="unlocks">Content Unlocks</TabsTrigger>
          </TabsList>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page SEO Settings</CardTitle>
              <CardDescription>
                Manage SEO titles and descriptions for each page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="page-select">Select Page</Label>
                <select
                  id="page-select"
                  value={selectedPage}
                  onChange={(e) => setSelectedPage(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="home">Home Page</option>
                  <option value="about">About Page</option>
                  <option value="contact">Contact Page</option>
                  <option value="blog">Blog Page</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seo-title">SEO Title</Label>
                <Input
                  id="seo-title"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Enter SEO title"
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground">
                  {seoTitle.length}/60 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seo-description">SEO Description</Label>
                <Textarea
                  id="seo-description"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Enter SEO description"
                  maxLength={160}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {seoDescription.length}/160 characters
                </p>
              </div>

              <Button onClick={updateSEOContent} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Update SEO Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Blog Posts List */}
            <Card>
              <CardHeader>
                <CardTitle>Blog Posts</CardTitle>
                <CardDescription>
                  Manage your blog posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium line-clamp-2">{post.title}</h4>
                          <p className="text-xs text-muted-foreground">{post.category}</p>
                          <p className="text-xs text-muted-foreground">
                            {post.published ? 'Published' : 'Draft'}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => editBlogPost(post)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteBlogPost(post.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button onClick={resetBlogForm} className="w-full mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  New Blog Post
                </Button>
              </CardContent>
            </Card>

            {/* Blog Post Editor */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedPost ? 'Edit Blog Post' : 'Create New Blog Post'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="blog-title">Title</Label>
                  <Input
                    id="blog-title"
                    value={blogForm.title}
                    onChange={(e) => {
                      setBlogForm({ ...blogForm, title: e.target.value });
                      if (!selectedPost) {
                        setBlogForm(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                      }
                    }}
                    placeholder="Blog post title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blog-slug">URL Slug</Label>
                  <Input
                    id="blog-slug"
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                    placeholder="url-friendly-slug"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="blog-category">Category</Label>
                    <Input
                      id="blog-category"
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      placeholder="e.g. Digital Marketing"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="blog-read-time">Read Time</Label>
                    <Input
                      id="blog-read-time"
                      value={blogForm.read_time}
                      onChange={(e) => setBlogForm({ ...blogForm, read_time: e.target.value })}
                      placeholder="e.g. 5 min read"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blog-excerpt">Excerpt</Label>
                  <Textarea
                    id="blog-excerpt"
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    placeholder="Brief description of the blog post"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blog-hero-image">Hero Image URL</Label>
                  <Input
                    id="blog-hero-image"
                    value={blogForm.hero_image_url}
                    onChange={(e) => setBlogForm({ ...blogForm, hero_image_url: e.target.value })}
                    placeholder="URL to hero image"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blog-content">Content</Label>
                  <Textarea
                    id="blog-content"
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    placeholder="Blog post content (HTML supported)"
                    rows={8}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blog-seo-title">SEO Title</Label>
                  <Input
                    id="blog-seo-title"
                    value={blogForm.seo_title}
                    onChange={(e) => setBlogForm({ ...blogForm, seo_title: e.target.value })}
                    placeholder="SEO optimized title"
                    maxLength={60}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blog-seo-description">SEO Description</Label>
                  <Textarea
                    id="blog-seo-description"
                    value={blogForm.seo_description}
                    onChange={(e) => setBlogForm({ ...blogForm, seo_description: e.target.value })}
                    placeholder="SEO description"
                    maxLength={160}
                    rows={2}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="blog-published"
                    checked={blogForm.published}
                    onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="blog-published">Publish immediately</Label>
                </div>

                <Button onClick={saveBlogPost} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  {selectedPost ? 'Update Post' : 'Create Post'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="unlocks" className="space-y-6">
          <ContentUnlocksView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Content Unlocks component
const ContentUnlocksView = () => {
  const [unlocks, setUnlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUnlocks();
  }, []);

  const fetchUnlocks = async () => {
    try {
      const { data, error } = await supabase
        .from('content_unlocks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUnlocks(data || []);
    } catch (error) {
      console.error('Error fetching content unlocks:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading content unlocks...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Content Unlock Tracking</h3>
      <p className="text-sm text-muted-foreground">
        People who provided their email to access gated content
      </p>
      
      {unlocks.length === 0 ? (
        <p className="text-muted-foreground">No content unlocks yet.</p>
      ) : (
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Article</th>
                <th className="text-left p-3">Method</th>
                <th className="text-left p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {unlocks.map((unlock) => (
                <tr key={unlock.id} className="border-b">
                  <td className="p-3">{unlock.email}</td>
                  <td className="p-3">{unlock.blog_title}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      unlock.unlock_method === 'code' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {unlock.unlock_method === 'code' ? 'Access Code' : 'Discovery Call'}
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(unlock.created_at).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminContentManager;