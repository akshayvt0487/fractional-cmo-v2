import { Client, Account, Databases } from 'appwrite';

// Ensure environment variables are not undefined
const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const appwriteProjectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const appwriteDatabaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

const appwriteCollectionStrategyFormId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_STRATEGY_FORM_ID;
const appwriteCollectionContactSubmissionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CONTACT_SUBMISSION_ID;


if (!appwriteEndpoint) {
  throw new Error("NEXT_PUBLIC_APPWRITE_ENDPOINT is not set");
}
if (!appwriteProjectId) {
  throw new Error("NEXT_PUBLIC_APPWRITE_PROJECT_ID is not set");
}
if (!appwriteDatabaseId) {
  throw new Error("NEXT_PUBLIC_APPWRITE_DATABASE_ID is not set");
}

const client = new Client();

client
    .setEndpoint(appwriteEndpoint)
    .setProject(appwriteProjectId);

export const account = new Account(client);
export const databases = new Databases(client);

// Export IDs for use in other parts of the app
export const APPWRITE_DATABASE_ID = appwriteDatabaseId;
// Note: You also had COLLECTION_ID in your .env, you can export it too
export const APPWRITE_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

// NEW: Export the specific IDs
export const APPWRITE_COLLECTION_STRATEGY_FORM_ID = appwriteCollectionStrategyFormId;
export const APPWRITE_COLLECTION_CONTACT_SUBMISSION_ID = appwriteCollectionContactSubmissionId;