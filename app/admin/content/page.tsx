import React from 'react';
import AdminContentManager from '@/components/admin/AdminContentManager';
import { GenerateSnapshots } from '@/components/admin/GenerateSnapshots';

export const Content = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage your website content and pages.
        </p>
      </div>
      <GenerateSnapshots />
      <AdminContentManager />
    </div>
  );
};

export default Content;

export const metadata = {
  robots: { index: false, follow: false },
};

