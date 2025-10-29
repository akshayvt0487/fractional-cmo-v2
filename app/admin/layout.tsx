import { AuthProvider } from '@/src/contexts/AuthContext'; // 1. Import the provider
import AdminLayout from '@/components/admin/AdminLayout'; // (or wherever it's located)

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider> {/* 2. Add the provider wrapper */}
      <AdminLayout>
        {children}
      </AdminLayout>
    </AuthProvider>
  );
}