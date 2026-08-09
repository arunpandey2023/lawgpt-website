/**
 * Launch notify signup — storage architecture only.
 * Swap the provider implementation later without changing the UI.
 */

export interface LaunchNotifyInput {
  email: string;
  source?: string;
}

export interface LaunchNotifyResult {
  ok: boolean;
  message: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface LaunchNotifyStore {
  save(input: LaunchNotifyInput): Promise<void>;
}

/** Placeholder store — replace with DB / ESP later. */
class MemoryLaunchNotifyStore implements LaunchNotifyStore {
  private readonly emails = new Set<string>();

  async save(input: LaunchNotifyInput): Promise<void> {
    this.emails.add(input.email.toLowerCase());
    if (process.env.NODE_ENV !== "production") {
      console.info("[launch:notify]", {
        email: input.email,
        source: input.source ?? "coming-soon",
        total: this.emails.size,
      });
    }
  }
}

const store: LaunchNotifyStore = new MemoryLaunchNotifyStore();

export async function subscribeLaunchNotify(
  input: LaunchNotifyInput,
): Promise<LaunchNotifyResult> {
  const email = input.email.trim().toLowerCase();

  if (!emailPattern.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  await store.save({ email, source: input.source });

  return {
    ok: true,
    message: "You are on the list. We will notify you when LawGPT launches.",
  };
}
