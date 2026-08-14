import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import { assertSupabasePublicConfig } from "@/lib/auth/config";

export interface AuthenticatedLawgptUser {
  id: string;
  email: string | null;
}

let authClient: SupabaseClient | null = null;

function getAuthClient(): SupabaseClient {
  if (authClient) return authClient;
  const { url, anonKey } = assertSupabasePublicConfig();
  authClient = createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
  return authClient;
}

export class AuthError extends Error {
  readonly status: number;

  constructor(message: string, status = 401) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}

export function extractBearerToken(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (!header) return null;
  const [scheme, token] = header.split(" ");
  if (!scheme || scheme.toLowerCase() !== "bearer" || !token?.trim()) {
    return null;
  }
  return token.trim();
}

function toAuthenticatedUser(user: User): AuthenticatedLawgptUser {
  return {
    id: user.id,
    email: user.email ?? null,
  };
}

/**
 * Resolve the authenticated LawGPT Supabase user from the request Bearer token.
 * Never trusts a client-supplied user_id.
 */
export async function requireAuthenticatedUser(
  request: Request,
): Promise<AuthenticatedLawgptUser> {
  const token = extractBearerToken(request);
  if (!token) {
    throw new AuthError("Authentication required. Please sign in to continue.");
  }

  const supabase = getAuthClient();
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user?.id) {
    throw new AuthError("Invalid or expired session. Please sign in again.");
  }

  return toAuthenticatedUser(data.user);
}
