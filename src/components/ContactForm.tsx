"use client";

import { useState } from "react";
import { company } from "@/lib/company";
import { submitToFormSubmit } from "@/lib/formsubmit";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  return (
    <form
      className="mt-10 space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        if (honeypot.trim()) return;
        setStatus("sending");
        try {
          await submitToFormSubmit({
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            _subject: "Contact form - Dazzle Your Eyes",
            _replyto: email.trim(),
          });
          setStatus("sent");
          setName("");
          setEmail("");
          setMessage("");
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
      <div>
        <label htmlFor="name" className="text-sm">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-2 h-11 w-full border border-line px-3"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 h-11 w-full border border-line px-3"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="mt-2 w-full border border-line px-3 py-2"
        />
      </div>
      <button type="submit" className="btn btn-solid" disabled={status === "sending"}>
        {status === "sending" ? "Sending" : "Send"}
      </button>
      {status === "sent" ? (
        <p className="text-sm text-olive">
          Thanks. Your message has been sent to {company.email}. We will reply to the address you entered. If this is
          the first message from the site, check {company.email} for a FormSubmit activation email and click the link
          once so future messages arrive normally.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-800">
          We could not send your message just now. Please try again or write directly to{" "}
          <a className="underline" href={`mailto:${company.email}`}>
            {company.email}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
