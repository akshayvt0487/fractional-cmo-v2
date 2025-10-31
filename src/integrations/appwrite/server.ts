import 'server-only';
import { Client, Users, Teams, Account } from 'node-appwrite';

const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const appwriteProjectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const appwriteApiKey = process.env.APPWRITE_API_KEY;

if (!appwriteEndpoint || !appwriteProjectId) {
    throw new Error("Appwrite endpoint or project ID is not set in environment variables");
}

if (!appwriteApiKey) {
  throw new Error("APPWRITE_API_KEY is not set. Admin operations require an API key.");
}

// Create admin client with API key
const adminClient = new Client()
  .setEndpoint(appwriteEndpoint)
  .setProject(appwriteProjectId)
  .setKey(appwriteApiKey);

export const adminUsers = new Users(adminClient);
export const adminTeams = new Teams(adminClient);

export async function getAdminUsers() {
  return adminUsers;
}

export async function getAdminTeams() {
  return adminTeams;
}

/**
 * Verify user credentials by creating a session and JWT token
 * This is the proper way to authenticate on the server side
 */
export async function verifyUserCredentials(email: string, password: string) {
  // Create a fresh client for this authentication attempt
  const userClient = new Client()
    .setEndpoint(appwriteEndpoint!)
    .setProject(appwriteProjectId!);

  const account = new Account(userClient);

  try {
    // Step 1: Create email session to verify credentials
    const session = await account.createEmailPasswordSession(email, password);

    // Try to extract userId from session (SDK versions vary)
    const userId =
      (session as any).userId ??
      (session as any).user_id ??
      (session as any).user?.$id ??
      (session as any).user?.id ??
      null;

    if (!userId) {
      throw new Error("Unable to determine user id from session.");
    }

    // Use the admin Users service (admin API key) to fetch the user information
    const user = await adminUsers.get(userId);

    // Step: Clean up - delete the session (best-effort)
    try {
      const sessionId = (session as any).$id ?? (session as any).id;
      if (sessionId) {
        await account.deleteSession(sessionId);
      }
    } catch (err) {
      console.error("Failed to cleanup session:", err);
    }

    return {
      userId: user.$id,
      userEmail: user.email,
      userName: user.name,
    };

  } catch (error: any) {
    console.error("Credential verification failed:", error);

    // Provide specific error messages
    if (error.code === 401 || error.message?.includes("Invalid credentials")) {
      throw new Error("Invalid email or password.");
    }

    if (error.message?.includes("missing scope")) {
      throw new Error("Authentication error. Please try again.");
    }

    throw new Error("Authentication failed. Please try again.");
  }
}