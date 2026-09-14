"use client";

import { useState } from "react";
import { company } from "@/lib/company";
import { submitToFormSubmit } from "@/lib/formsubmit";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  return (
    <form
      className="mt-6"
      onSubmit={async (event) => {
        event.preventDefault();
        if (honeypot.trim()) return;
        if (!email.trim()) return;
        setStatus("sending");
        try {
          await submitToFormSubmit({
            email: email.trim(),
            _subject: "Newsletter signup - Dazzle Your Eyes",
            _replyto: email.trim(),
            form: "Newsletter",
          });
          setStatus("done");
          setEmail("");
        } catch {
          setStatus("error");
        }
      }}
    >
      <input
        type="text"
        name="_honey"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
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
          disabled={status === "sending"}
        />
        <button type="submit" className="btn btn-solid" disabled={status === "sending"}>
          {status === "sending" ? "Joining" : "Join"}
        </button>
      </div>
      {status === "done" ? (
        <p className="mt-2 text-sm text-olive">
          You are on the list. If this is the first signup from the site, open {company.email} once and activate the
          FormSubmit link so future signups arrive normally.
        </p>
      ) : status === "error" ? (
        <p className="mt-2 text-sm text-red-800">
          We could not save your email just now. Try again or write to{" "}
          <a className="underline" href={`mailto:${company.email}`}>
            {company.email}
          </a>
          .
        </p>
      ) : (
        <p className="mt-2 text-[13px] text-muted">Unsubscribe at any time. See our privacy policy.</p>
      )}
    </form>
  );
}
