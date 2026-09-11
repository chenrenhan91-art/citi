"use client";

import { useState } from "react";
import { company } from "@/lib/company";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="mt-10 space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div>
        <label htmlFor="name" className="text-sm">
          Name
        </label>
        <input id="name" name="name" required className="mt-2 h-11 w-full border border-line px-3" />
      </div>
      <div>
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <input id="email" name="email" type="email" required className="mt-2 h-11 w-full border border-line px-3" />
      </div>
      <div>
        <label htmlFor="message" className="text-sm">
          Message
        </label>
        <textarea id="message" name="message" required rows={6} className="mt-2 w-full border border-line px-3 py-2" />
      </div>
      <button type="submit" className="btn btn-solid">
        Send
      </button>
      {sent ? (
        <p className="text-sm text-olive">
          Thanks. This preview does not transmit the message. Please email {company.email} if you need a reply.
        </p>
      ) : null}
    </form>
  );
}
