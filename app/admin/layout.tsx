import AdminLayout from '@/components/admin/AdminLayout';

// Since AdminLayout uses client hooks, it must be imported and wrapped here.
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // AdminLayout provides the full protected frame and redirects if unauthorized.
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}
