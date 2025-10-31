// Temporary shim for removed Supabase dependency.
// Purpose: keep imports working until the code is migrated to Appwrite.
// All methods throw at runtime to force migration; update call-sites to use Appwrite.

/* eslint-disable @typescript-eslint/no-explicit-any */
export const supabase: any = {
  from: () => ({
    select: async () => ({ data: null }),
    insert: async () => ({ error: new Error('Supabase removed. Migrate to Appwrite') }),
  }),
  functions: {
    invoke: async () => {
      throw new Error('Supabase functions are removed. Migrate to Appwrite Functions or server-side endpoints.');
    },
  },
  auth: {
    getSession: async () => ({ data: { session: null } }),
    updateUser: async () => ({ error: new Error('Supabase removed. Migrate to Appwrite') }),
  },
};

// TODO: Replace usage of `supabase` with Appwrite SDK (`src/integrations/appwrite/*`).
