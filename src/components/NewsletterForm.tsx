"use client";

import { useState } from "react";
import { company } from "@/lib/company";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [opened, setOpened] = useState(false);

  return (
    <form
      className="mt-6"
      onSubmit={(event) => {
        event.preventDefault();
        if (!email.trim()) return;
        const body = [
          "Please add this address to the Dazzle Your Eyes newsletter list:",
          email.trim(),
        ].join("\n");
        const href = `mailto:${company.inboxEmail}?subject=${encodeURIComponent(
          "Newsletter signup - Dazzle Your Eyes",
        )}&body=${encodeURIComponent(body)}`;
        window.location.href = href;
        setOpened(true);
      }}
    >
      <label htmlFor="newsletter-email" className="text-sm">
        Email address
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-11 flex-1 border border-line bg-white px-3"
          placeholder="you@example.com"
          autoComplete="email"
        />
        <button type="submit" className="btn btn-solid">
          Join
        </button>
      </div>
      {opened ? (
        <p className="mt-2 text-sm text-olive">
          Your email app should open with a short signup message. Press send there to finish.
        </p>
      ) : (
        <p className="mt-2 text-[13px] text-muted">
          Join opens your email app with a request for {company.email}. Unsubscribe at any time.
        </p>
      )}
    </form>
  );
}
