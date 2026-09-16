"use client";

import { useState } from "react";
import { company } from "@/lib/company";

function openMail(subject: string, body: string) {
  const href = `mailto:${company.inboxEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [opened, setOpened] = useState(false);

  return (
    <form
      className="mt-10 space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const body = [
          `Name: ${name.trim()}`,
          `Reply-to: ${email.trim()}`,
          "",
          message.trim(),
        ].join("\n");
        openMail("Contact form - Dazzle Your Eyes", body);
        setOpened(true);
      }}
    >
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
      <button type="submit" className="btn btn-solid">
        Open email to send
      </button>
      <p className="text-sm text-muted">
        This opens your email app with a message for{" "}
        <a className="underline" href={`mailto:${company.inboxEmail}`}>
          {company.email}
        </a>
        . Press send in that app to deliver it. No account or activation is required.
      </p>
      {opened ? (
        <p className="text-sm text-olive">
          If your email app did not open, write to us at {company.email}.
        </p>
      ) : null}
    </form>
  );
}
