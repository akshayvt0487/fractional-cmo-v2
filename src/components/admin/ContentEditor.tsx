import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Save, Eye, Edit3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ContentEditor = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Changes Saved",
      description: "Your content changes have been saved successfully.",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Content Editor</h2>
          <p className="text-muted-foreground">Manage your website content with ease</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={isEditing ? "default" : "secondary"}>
            {isEditing ? "Editing" : "View Mode"}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <Eye className="h-4 w-4 mr-2" /> : <Edit3 className="h-4 w-4 mr-2" />}
            {isEditing ? "Preview" : "Edit"}
          </Button>
          {isEditing && (
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="homepage" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
        </TabsList>

        <TabsContent value="homepage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Main banner content and call-to-action</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-title">Hero Title</Label>
                <Input
                  id="hero-title"
                  defaultValue="Scale Your Service Business with Fractional CMO Expertise"
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
                <Textarea
                  id="hero-subtitle"
                  defaultValue="Transform your marketing strategy with expert guidance that delivers measurable results without the executive price tag."
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-button">Call-to-Action Button Text</Label>
                <Input
                  id="hero-button"
                  defaultValue="Get Your Free Strategy Session"
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
              <CardDescription>Company introduction and value proposition</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="about-title">Section Title</Label>
                <Input
                  id="about-title"
                  defaultValue="Why Choose Fractional CMO Services?"
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-content">Section Content</Label>
                <Textarea
                  id="about-content"
                  defaultValue="Get the strategic marketing leadership your business needs without the full-time executive cost. Our fractional CMO services provide expert guidance tailored to service-based businesses."
                  disabled={!isEditing}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Page Content</CardTitle>
              <CardDescription>Detailed company information and team details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="about-page-title">Page Title</Label>
                <Input
                  id="about-page-title"
                  defaultValue="About Our Fractional CMO Services"
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-page-content">Page Content</Label>
                <Textarea
                  id="about-page-content"
                  defaultValue="Our team brings decades of marketing expertise to help service businesses grow strategically..."
                  disabled={!isEditing}
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Services Configuration</CardTitle>
              <CardDescription>Manage your service offerings and descriptions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="services-title">Services Section Title</Label>
                <Input
                  id="services-title"
                  defaultValue="Our Fractional CMO Services"
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="services-subtitle">Services Subtitle</Label>
                <Textarea
                  id="services-subtitle"
                  defaultValue="Comprehensive marketing leadership tailored to your business needs"
                  disabled={!isEditing}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="navigation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Navigation Menu</CardTitle>
              <CardDescription>Configure main navigation links and labels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nav-home">Home Link Text</Label>
                  <Input
                    id="nav-home"
                    defaultValue="Home"
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nav-about">About Link Text</Label>
                  <Input
                    id="nav-about"
                    defaultValue="About"
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nav-services">Services Link Text</Label>
                  <Input
                    id="nav-services"
                    defaultValue="Services"
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nav-contact">Contact Link Text</Label>
                  <Input
                    id="nav-contact"
                    defaultValue="Contact"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};