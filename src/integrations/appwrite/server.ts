import 'server-only';

// This file contains the server-side-only admin client
// It uses environment variables that are NOT exposed to the public.

const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const appwriteProjectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const appwriteApiKey = process.env.APPWRITE_API_KEY;

if (!appwriteEndpoint || !appwriteProjectId) {
    throw new Error("Appwrite endpoint or project ID is not set in .env.local");
}

if (!appwriteApiKey) {
  console.warn("WARNING: APPWRITE_API_KEY is not set. Admin login will fail.");
}

// 🟢 CHANGED: Use a dynamic import() in an async function.
// This is the most robust way to ensure the Node.js SDK is loaded by Next.js/Turbopack.
async function getSdk() {
  const { Client, Users, Teams } = await import('appwrite');
  
  if (!Client || !Users || !Teams) {
    throw new Error(
      "Failed to load Appwrite server SDK. Client, Users, or Teams is undefined."
    );
  }
  
  return { Client, Users, Teams };
}

// We cache the client instance so we don't create a new one on every request
let adminClient: any = null;

async function getAdminClient() {
  if (adminClient) return adminClient;

  const { Client } = await getSdk();
  adminClient = new Client();
  adminClient.setEndpoint(appwriteEndpoint);
  adminClient.setProject(appwriteProjectId);
  adminClient.setKey(appwriteApiKey || '');
  
  return adminClient;
}

// 🟢 CHANGED: Export async functions that return the services
export async function getAdminUsers() {
  const { Users } = await getSdk();
  const client = await getAdminClient();
  return new Users(client);
}

export async function getAdminTeams() {
  const { Teams } = await getSdk();
  const client = await getAdminClient();
  return new Teams(client);
}

