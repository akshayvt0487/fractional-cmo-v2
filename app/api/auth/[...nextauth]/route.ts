import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getAdminTeams, verifyUserCredentials } from "@/integrations/appwrite/server"; // Assuming these imports are correct for your project
import type { User } from "next-auth";

interface ExtendedUser extends User {
  isAdmin: boolean;
}

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

        // --- DEVELOPMENT BYPASS ---
        // Checks if the process is in 'development' mode
        // if (process.env.NODE_ENV === 'development') {
        //   console.warn("--- DEV MODE: AUTHENTICATION BYPASSED ---");
        //   // Return a mock admin user to bypass login
        //   return {
        //     id: "dev-admin-user-id",
        //     email: "dev@admin.com",
        //     name: "Dev Admin",
        //     isAdmin: true,
        //   } as ExtendedUser;
        // }
        // // --- END DEVELOPMENT BYPASS ---


        // --- PRODUCTION AUTH LOGIC ---
        // This code will run if NODE_ENV is not 'development'
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        try {
          // STEP 1: Verify credentials using JWT-based authentication
          const { userId, userEmail, userName } = await verifyUserCredentials(
            credentials.email,
            credentials.password
          );

          // STEP 2: Check admin status using the server-side API key
          const adminTeams = await getAdminTeams();
          const teamId = process.env.APPWRITE_ADMIN_TEAM_ID;
          
          if (!teamId) {
            throw new Error("APPWRITE_ADMIN_TEAM_ID is not configured in environment variables.");
          }

          const memberships = await adminTeams.listMemberships(teamId);
          
          const isAdmin = memberships.memberships.some(
            membership => membership.userId === userId
          );

          if (!isAdmin) {
            console.warn(`User ${userEmail} is not in the admin team.`);
            throw new Error("Access Denied: You are not an admin.");
          }

          // Return authenticated admin user
          return {
            id: userId,
            email: userEmail,
            name: userName,
            isAdmin: true,
          } as ExtendedUser;

        } catch (error: any) {
          // Pass through specific error messages
          if (error.message?.includes("Access Denied") || 
              error.message?.includes("Invalid email") ||
              error.message?.includes("not configured")) {
            throw error;
          }
          
          console.error("Authentication error:", error);
          throw new Error("Authentication failed. Please try again.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const extendedUser = user as ExtendedUser;
        token.id = extendedUser.id;
        token.isAdmin = extendedUser.isAdmin;
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




