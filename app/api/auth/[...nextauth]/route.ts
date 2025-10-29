import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// 🟢 CORRECTED IMPORTS:
// 'account' comes from the client-safe file
import { account } from "@/integrations/appwrite/client";
// 'adminTeams' comes from the new server-only file
import { adminTeams } from "@/integrations/appwrite/server";
import { AppwriteException } from "appwrite";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        let user; // To store user data

        try {
          // ---
          // STEP 1: Validate the user's password.
          // ---
          await account.createEmailPasswordSession(
            credentials.email,
            credentials.password
          );
          
          user = await account.get();

          // Log out the temporary session
          await account.deleteSession('current');

        } catch (error) {
          if (error instanceof AppwriteException) {
            console.error("Appwrite login failed:", error.message);
          }
          throw new Error("Invalid email or password.");
        }

        // ---
        // 🟢 STEP 2: Securely check admin status using the API Key.
        // ---
        if (!user) {
          throw new Error("User data not found after login.");
        }

        try {
          // Use the secure 'adminTeams' client (from server.ts)
          const memberships = await adminTeams.listMemberships(user.$id);

          const isAdmin = memberships.memberships.some(
            (membership) => membership.teamName === 'admin'
          );

          if (!isAdmin) {
            console.warn(`Login successful, but user ${user.email} is not an admin.`);
            throw new Error("Access Denied: You are not an admin.");
          }

          // 4. Return the user object to NextAuth
          return {
            id: user.$id,
            email: user.email,
            name: user.name,
            isAdmin: true,
          };

        } catch (error) {
          console.error("Failed to check admin status:", error);
          throw new Error("Server error: Could not verify admin status.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = (user as any).isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
});

export { handler as GET, handler as POST };

