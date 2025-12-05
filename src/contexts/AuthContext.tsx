// Minimal stub for AuthContext/useAuth to satisfy build.
// This provides a safe default while the real auth implementation is added or restored.

export type AuthUser = {
  email?: string;
  name?: string;
  id?: string;
};

export type SignInResult = { error?: { message?: string } | null };

export function useAuth() {
  // Return a stable object (no hooks) so this can be used in both client and server contexts
  return {
    user: null as AuthUser | null,
    isAdmin: false,
    isLoading: false,
    // simple signIn stub
    signIn: async (email: string, password: string): Promise<SignInResult> => {
      // No-op: production auth should replace this
      return { error: { message: 'Auth not configured in this environment' } };
    },
    // simple signUp stub (matches expected shape in some pages)
    signUp: async (email: string, password: string): Promise<SignInResult> => {
      return { error: { message: 'Auth not configured in this environment' } };
    },
    // simple resetPassword stub
    resetPassword: async (email: string): Promise<SignInResult> => {
      return { error: { message: 'Auth not configured in this environment' } };
    },
    signOut: async () => {},
  };
}
