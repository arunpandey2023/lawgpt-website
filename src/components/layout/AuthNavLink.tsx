"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  buildOrdinaryLawgptLoginUrl,
  getLawgptAppUrl,
} from "@/lib/auth/config";
import { getBrowserSession, getBrowserSupabase } from "@/lib/auth/browser";

/**
 * Auth-aware header CTA:
 * - Logged out → Login (ordinary app login, no checkout return_to)
 * - Logged in → Open LawGPT (app home)
 *
 * Does not affect Upgrade checkout login (buildLawgptLoginUrl + return_to).
 */
export function AuthNavLink({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const appUrl = getLawgptAppUrl();
  const loginUrl = buildOrdinaryLawgptLoginUrl();

  useEffect(() => {
    let cancelled = false;
    const supabase = getBrowserSupabase();

    void (async () => {
      const session = await getBrowserSession();
      if (!cancelled) {
        setSignedIn(Boolean(session?.access_token));
      }
    })();

    if (!supabase) {
      return () => {
        cancelled = true;
      };
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session?.access_token));
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  // Avoid layout jump: show Login until session resolves (optimistic logged-out CTA).
  const href = signedIn ? appUrl : loginUrl;
  const label = signedIn ? "Open LawGPT" : "Login";

  return (
    <Button
      href={href}
      size="sm"
      variant="outline"
      className={className}
      onClick={onNavigate}
    >
      {label}
    </Button>
  );
}
