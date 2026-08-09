"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { launchPage } from "@/lib/launch/config";

export function LaunchNotifyForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch("/api/launch-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "coming-soon" }),
      });
      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
      };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(data.message || launchPage.notify.success);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p
        className="rounded-2xl bg-accent-soft px-5 py-4 text-sm leading-relaxed text-foreground ring-1 ring-accent/15"
        role="status"
      >
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={id}
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={launchPage.notify.placeholder}
          className="h-12 w-full flex-1 rounded-xl bg-white px-4 text-sm text-foreground shadow-sm ring-1 ring-border outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-accent/30"
        />
        <Button type="submit" size="lg" disabled={status === "loading"}>
          {status === "loading" ? "Saving…" : launchPage.notify.submitLabel}
        </Button>
      </div>
      {message && status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
