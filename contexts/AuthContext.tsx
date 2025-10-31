// Minimal stub for AuthContext/useAuth at project root to match tsconfig paths
export type AuthUser = {
  email?: string;
  name?: string;
  id?: string;
};

export type SignInResult = { error?: { message?: string } | null };

export function useAuth() {
  return {
    user: null as AuthUser | null,
    isAdmin: false,
    isLoading: false,
    signIn: async (_email: string, _password: string): Promise<SignInResult> => {
      return { error: { message: 'Auth not configured in this environment' } };
    },
    signOut: async () => {},
  };
}
