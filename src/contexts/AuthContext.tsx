'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import { Models, AppwriteException } from "appwrite";
import { account } from "@/integrations/appwrite/client";
import { useRouter } from "next/navigation";

// Define the shape of the user and session from Appwrite
type AppwriteUser = Models.User<Models.Preferences>;
type AppwriteSession = Models.Session;

interface AuthContextType {
  user: AppwriteUser | null;
  session: AppwriteSession | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AppwriteException | null }>;
  signUp: (email: string, password: string) => Promise<{ error: AppwriteException | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AppwriteException | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppwriteUser | null>(null);
  const [session, setSession] = useState<AppwriteSession | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Reusable function to check auth state and admin status
  const checkAuthState = async () => {
    try {
      const currentUser = await account.get();
      const currentSession = await account.getSession("current");
      
      setUser(currentUser);
      setSession(currentSession);

      // Check for admin status by looking for 'admin' team
      try {
        const teamList = await account.listTeams();
        const adminTeam = teamList.teams.find(team => team.name === 'admin');
        setIsAdmin(!!adminTeam);
      } catch (adminError) {
        console.error("Error checking admin status:", adminError);
        setIsAdmin(false);
      }

    } catch (error) {
      // Not logged in
      setUser(null);
      setSession(null);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Check session on initial load
  useEffect(() => {
    checkAuthState();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      await checkAuthState(); // Update context state
      return { error: null };
    } catch (error) {
      return { error: error as AppwriteException };
    }
  };

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/admin`;

    try {
      // 1. Create the user
      // We use the email prefix as their name, as Appwrite's 'create' can take a name
      const name = email.split('@')[0];
      await account.create('unique()', email, password, name);

      // 2. Log the new user in
      await account.createEmailPasswordSession(email, password);

      // 3. Send a verification email
      await account.createVerification(redirectUrl);
      
      await checkAuthState(); // Update context state
      return { error: null };
    } catch (error) {
      return { error: error as AppwriteException };
    }
  };

  const signOut = async () => {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      // Clear state regardless of error
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      // Optional: Redirect to home page after sign out
      // router.push('/');
    }
  };

  const resetPassword = async (email: string) => {
    const redirectUrl = `${window.location.origin}/admin/reset-password`;
    try {
      await account.createRecovery(email, redirectUrl);
      return { error: null };
    } catch (error) {
      return { error: error as AppwriteException };
    }
  };

  const value = {
    user,
    session,
    isAdmin,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};