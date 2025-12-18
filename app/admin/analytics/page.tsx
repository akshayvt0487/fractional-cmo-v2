import React from 'react';
import AdminContentManager from '@/components/admin/AdminContentManager';

export const metadata = {
  robots: { index: false, follow: false },
};


export default function Content ()  {

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage your website content and pages.
        </p>
      </div>
      <AdminContentManager />
    </div>
  );
};
