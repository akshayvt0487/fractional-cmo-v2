import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, Phone, Building2, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface FormSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  service?: string;
  revenue?: string;
  budget?: string;
  timeline?: string;
  challenge: string;
  created_at: string;
}

const FormSubmissionsViewer = () => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getServiceBadgeColor = (service?: string) => {
    if (!service) return 'default';
    if (service.includes('cmo')) return 'default';
    if (service.includes('google-ads')) return 'secondary';
    if (service.includes('content')) return 'outline';
    return 'default';
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Submissions</CardTitle>
        <CardDescription>
          All strategy call requests and contact form submissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submissions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No form submissions yet
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <Card key={submission.id} className="hover:bg-accent/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Left Column */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg">{submission.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Building2 className="h-4 w-4" />
                          {submission.company}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <a href={`mailto:${submission.email}`} className="text-primary hover:underline">
                            {submission.email}
                          </a>
                        </div>
                        {submission.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <a href={`tel:${submission.phone}`} className="text-primary hover:underline">
                              {submission.phone}
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(submission.created_at), 'PPp')}
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-3">
                      {submission.service && (
                        <div>
                          <span className="text-xs text-muted-foreground">Service:</span>
                          <Badge variant={getServiceBadgeColor(submission.service)} className="ml-2">
                            {submission.service}
                          </Badge>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {submission.revenue && (
                          <div>
                            <span className="text-xs text-muted-foreground block">Revenue:</span>
                            <span className="font-medium">{submission.revenue}</span>
                          </div>
                        )}
                        {submission.budget && (
                          <div>
                            <span className="text-xs text-muted-foreground block">Budget:</span>
                            <span className="font-medium">{submission.budget}</span>
                          </div>
                        )}
                        {submission.timeline && (
                          <div>
                            <span className="text-xs text-muted-foreground block">Timeline:</span>
                            <span className="font-medium">{submission.timeline}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <span className="text-xs text-muted-foreground block mb-1">Challenge:</span>
                        <p className="text-sm">{submission.challenge}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormSubmissionsViewer;
