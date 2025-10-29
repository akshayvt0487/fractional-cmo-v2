import { Client, Account, Databases } from 'appwrite';

const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const appwriteProjectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!appwriteEndpoint || !appwriteProjectId) {
  throw new Error("Appwrite endpoint or project ID is not set in .env.local");
}

// --- 1. REGULAR CLIENT (for client-side use) ---
// This is for your login page and forms
const client = new Client()
    .setEndpoint(appwriteEndpoint)
    .setProject(appwriteProjectId);

export const account = new Account(client);
export const databases = new Databases(client);

// Export IDs for forms
export const APPWRITE_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
export const APPWRITE_COLLECTION_STRATEGY_FORM_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_STRATEGY_FORM_ID;
export const APPWRITE_COLLECTION_CONTACT_SUBMISSION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CONTACT_SUBMISSION_ID;

