'use client';
import React, { useEffect, useState } from 'react';
import { Client, Databases, Account, Functions } from 'appwrite';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye } from 'lucide-react';

// --------------------------
// 🔧 CONFIG
// --------------------------
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // e.g. 'https://cloud.appwrite.io/v1'
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);
const account = new Account(client);
const functions = new Functions(client);

// --------------------------
// 🧩 INTERFACES
// --------------------------
interface BlogPost {
  $id: string;
  title: string;
  slug: string;
  published: boolean;
  category: string;
  created_at: string;
  updated_at: string;
}

// --------------------------
// ⚙️ COMPONENT
// --------------------------
export default function BlogPosts () {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_BLOG_COLLECTION_ID!;

  useEffect(() => {
    fetchPosts();
  }, []);

  // --------------------------
  // 📦 Fetch posts from Appwrite
  // --------------------------
  const fetchPosts = async () => {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        // optional: sorting/filtering
      ]);

      const mappedPosts = response.documents.map((doc) => ({
        $id: doc.$id,
        title: doc.title,
        slug: doc.slug,
        published: doc.published,
        category: doc.category,
        created_at: doc.$createdAt,
        updated_at: doc.$updatedAt,
      }));

      setPosts(mappedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch blog posts.',
      });
    } finally {
      setLoading(false);
    }
  };

  // --------------------------
  // 🧠 Toggle publish status
  // --------------------------
  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, {
        published: !currentStatus,
      });

      toast({
        title: 'Success',
        description: `Post ${!currentStatus ? 'published' : 'unpublished'} successfully.`,
      });

      fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update post status.',
      });
    }
  };

  // --------------------------
  // ☁️ Import blog posts via Appwrite Function
  // --------------------------
  const importBlogPosts = async () => {
    try {
      setLoading(true);

      const session = await account.get(); // get current logged-in user
      if (!session) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'You must be logged in to import blog posts.',
        });
        return;
      }

      const execution = await functions.createExecution(
        'import-blog-posts', // Your Appwrite function ID
        JSON.stringify({}), // payload if needed
        false // synchronous execution
      );

      const responseData = JSON.parse(execution.responseBody || '{}');

      toast({
        title: 'Success',
        description: `Imported ${responseData.stats?.imported || 0} posts, skipped ${
          responseData.stats?.skipped || 0
        } duplicates.`,
      });

      fetchPosts();
    } catch (error) {
      console.error('Error importing posts:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to import blog posts.',
      });
    } finally {
      setLoading(false);
    }
  };

  // --------------------------
  // ⏳ Loader
  // --------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // --------------------------
  // 🖥️ Render UI
  // --------------------------
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground mt-2">
            Manage all your blog posts and their publication status.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={importBlogPosts} disabled={loading}>
            Import Blog Posts
          </Button>
          <Button>Create New Post</Button>
        </div>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.$id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <div className="flex gap-2 items-center">
                    <Badge variant={post.published ? 'default' : 'secondary'}>
                      {post.published ? 'Published' : 'Draft'}
                    </Badge>
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">/{post.slug}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => togglePublish(post.$id, post.published)}
                  >
                    {post.published ? 'Unpublish' : 'Publish'}
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
