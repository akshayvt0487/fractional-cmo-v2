// app/not-found.tsx
import Link from 'next/link';
import { headers } from 'next/headers'; // Use headers for path if absolutely necessary, but not for client logging

export default function NotFound() {
  // You cannot use 'usePathname' or 'useEffect' here.
  // The route that failed is not directly accessible this way.
  
  // If you *must* log the path on the server, you can use headers:
  // const headersList = headers();
  // const fullUrl = headersList.get('referer') || 'Unknown Path';
  // console.error("404 Error (Server): User attempted to access non-existent route:", fullUrl);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
        <p className="text-xl text-gray-800 mb-6">We couldn't find that page.</p>
        <p className="text-md text-gray-600 mb-4">The resource you requested doesn't exist.</p>
        <Link 
          href="/" 
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}