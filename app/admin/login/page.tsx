'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the 'callbackUrl' if NextAuth sent one (e.g., from a protected page)
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // This is the NextAuth.js sign-in function
    // It calls your `app/api/auth/[...nextauth]/route.ts` file
    const result = await signIn("credentials", {
      redirect: false, // We will handle the redirect manually
      email: email,
      password: password,
    });

    setIsLoading(false);

    if (result?.ok) {
      // Login was successful!
      // Redirect to the page they were trying to access, or the admin dashboard
      router.push(callbackUrl); 
    } else {
      // Login failed
      setError(result?.error || "Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-200">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-center text-sm font-medium text-red-500">
                {error}
              </p>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer duration-200" variant="hero" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Log In'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
