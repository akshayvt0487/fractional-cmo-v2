import React from 'react';
import FormSubmissionsViewer from '@/components/admin/FormSubmissionsViewer';

export const Submissions = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Form Submissions</h1>
        <p className="text-muted-foreground mt-2">
          View and manage all form submissions from your website.
        </p>
      </div>
      <FormSubmissionsViewer />
    </div>
  );
};
