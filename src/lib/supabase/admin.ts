import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { assertSupabasePublicConfig } from "@/lib/auth/config";

/**
 * Server-only Supabase admin client (service role).
 * Bypasses RLS for trusted writes such as subscription persistence.
 * Never import this module from client components or browser code.
 * Never expose SUPABASE_SERVICE_ROLE_KEY via NEXT_PUBLIC_*.
 */

let adminClient: SupabaseClient | null = null;

export function getSupabaseServiceRoleKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";
  if (!key) {
    throw new Error(
      "Supabase is not configured. Missing: SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  return key;
}

export function assertSupabaseAdminConfigured() {
  const { url } = assertSupabasePublicConfig();
  const serviceRoleKey = getSupabaseServiceRoleKey();
  return { url, serviceRoleKey };
}

/** Singleton service-role client for server routes / trusted workers only. */
export function getSupabaseAdminClient(): SupabaseClient {
  if (adminClient) return adminClient;

  const { url, serviceRoleKey } = assertSupabaseAdminConfigured();
  adminClient = createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
  return adminClient;
}
