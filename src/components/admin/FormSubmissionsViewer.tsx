'use client';

import React, { useEffect, useState } from 'react';
import { databases } from '@/lib/appwrite';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Mail, Phone, Building2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Models } from 'appwrite';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// --------------------------
// 🧩 INTERFACES
// --------------------------
interface BaseSubmission extends Models.Document {
  name: string;
  email: string;
  company?: string;
  phone?: string;
}

interface StrategyFormSubmission extends BaseSubmission {
  service?: string;
  revenue?: string;
  budget?: string;
  timeline?: string;
  challenge: string;
}

interface ContactFormSubmission extends BaseSubmission {
  message: string;
}

// --------------------------
// ⚙️ COMPONENT
// --------------------------
const FormSubmissionsViewer = () => {
  const [strategySubmissions, setStrategySubmissions] = useState<StrategyFormSubmission[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactFormSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const STRATEGY_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_STRATEGY_FORM_ID!;
  const CONTACT_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CONTACT_SUBMISSION_ID!;

  // --------------------------
  // 📦 Fetch form submissions
  // --------------------------
  const fetchAllSubmissions = async () => {
    try {
      const [strategyResponse, contactResponse] = await Promise.all([
        databases.listDocuments<StrategyFormSubmission>(
          DATABASE_ID,
          STRATEGY_COLLECTION_ID,
          []
        ),
        databases.listDocuments<ContactFormSubmission>(
          DATABASE_ID,
          CONTACT_COLLECTION_ID,
          []
        ),
      ]);

      setStrategySubmissions(strategyResponse.documents);
      setContactSubmissions(contactResponse.documents);
    } catch (error) {
      console.error('❌ Error fetching submissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSubmissions();
  }, []);

  // --------------------------
  // 🎨 Badge color helper
  // --------------------------
  const getServiceBadgeColor = (service?: string) => {
    if (!service) return 'default';
    if (service.toLowerCase().includes('cmo')) return 'default';
    if (service.toLowerCase().includes('google')) return 'secondary';
    if (service.toLowerCase().includes('content')) return 'outline';
    return 'default';
  };

  // --------------------------
  // 📱 Render Submission Card
  // --------------------------
  const SubmissionCard = ({ submission, type }: { submission: BaseSubmission, type: 'strategy' | 'contact' }) => {
    const strategySubmission = type === 'strategy' ? submission as StrategyFormSubmission : null;
    const contactSubmission = type === 'contact' ? submission as ContactFormSubmission : null;

    return (
      <Card className="hover:bg-accent/50 transition-colors">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Left Column - Basic Info */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{submission.name}</h3>
                <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${submission.email}`} className="hover:underline">
                    {submission.email}
                  </a>
                </div>
                {submission.phone && (
                  <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <a href={`tel:${submission.phone}`} className="hover:underline">
                      {submission.phone}
                    </a>
                  </div>
                )}
                {submission.company && (
                  <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    <span>{submission.company}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {format(new Date(submission.$createdAt), 'MMM d, yyyy h:mm a')}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Submission Type Specific Info */}
            <div className="space-y-4">
              {strategySubmission && (
                <>
                  {strategySubmission.service && (
                    <Badge variant={getServiceBadgeColor(strategySubmission.service)}>
                      {strategySubmission.service}
                    </Badge>
                  )}
                  <div className="space-y-2">
                    {strategySubmission.revenue && (
                      <div>
                        <span className="text-sm font-medium">Revenue: </span>
                        <span className="text-muted-foreground">{strategySubmission.revenue}</span>
                      </div>
                    )}
                    {strategySubmission.budget && (
                      <div>
                        <span className="text-sm font-medium">Budget: </span>
                        <span className="text-muted-foreground">{strategySubmission.budget}</span>
                      </div>
                    )}
                    {strategySubmission.timeline && (
                      <div>
                        <span className="text-sm font-medium">Timeline: </span>
                        <span className="text-muted-foreground">{strategySubmission.timeline}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-sm font-medium">Challenge: </span>
                      <p className="text-muted-foreground mt-1">{strategySubmission.challenge}</p>
                    </div>
                  </div>
                </>
              )}
              {contactSubmission && (
                <div>
                  <span className="text-sm font-medium">Message: </span>
                  <p className="text-muted-foreground mt-1">{contactSubmission.message}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // --------------------------
  // ⏳ Loading State
  // --------------------------
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  // --------------------------
  // 🖥️ Render Submissions
  // --------------------------
  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Submissions</CardTitle>
        <CardDescription>
          Strategy call requests and contact form submissions
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="strategy" className="space-y-4">
          <TabsList>
            <TabsTrigger value="strategy">
              Strategy Form ({strategySubmissions.length})
            </TabsTrigger>
            <TabsTrigger value="contact">
              Contact Form ({contactSubmissions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="strategy" className="space-y-4">
            {strategySubmissions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No strategy form submissions yet
              </div>
            ) : (
              <div className="space-y-4">
                {strategySubmissions.map((submission) => (
                  <SubmissionCard 
                    key={submission.$id} 
                    submission={submission} 
                    type="strategy" 
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            {contactSubmissions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No contact form submissions yet
              </div>
            ) : (
              <div className="space-y-4">
                {contactSubmissions.map((submission) => (
                  <SubmissionCard 
                    key={submission.$id} 
                    submission={submission} 
                    type="contact" 
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

FormSubmissionsViewer.displayName = "FormSubmissionsViewer";

export default FormSubmissionsViewer;