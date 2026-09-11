"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      className="mt-6"
      onSubmit={(event) => {
        event.preventDefault();
        if (!email.trim()) return;
        setDone(true);
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
      {done ? (
        <p className="mt-2 text-sm text-olive">You are on the list. We will write when there is something worth sending.</p>
      ) : (
        <p className="mt-2 text-[13px] text-muted">Unsubscribe at any time. See our privacy policy.</p>
      )}
    </form>
  );
}
