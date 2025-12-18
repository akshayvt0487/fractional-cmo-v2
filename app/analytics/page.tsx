import React from 'react';
import BlogAccessViewer from '@/components/admin/BlogAccessViewer';

export const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Blog Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Track blog access and engagement metrics.
        </p>
      </div>
      <BlogAccessViewer />
    </div>
  );
};

export default Analytics;

export const metadata = {
  robots: { index: false, follow: false },
};

