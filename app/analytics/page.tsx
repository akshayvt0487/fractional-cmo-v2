import React from 'react';
// import BlogAccessViewer from '@/components/admin/BlogAccessViewer';

export const metadata = {
  robots: { index: false, follow: false },
};


export const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Blog Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Track blog access and engagement metrics.
        </p>
      </div>
      {/* <BlogAccessViewer /> */}
      <div className="p-4 border rounded-md bg-muted/50 text-center text-muted-foreground">
        Analytics dashboard component is currently unavailable.
      </div>
    </div>
  );
};

export default Analytics;

