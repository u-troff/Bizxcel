"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { serviceDropdownOptions } from "@/lib/content";
import { trackContactFormSubmit } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-[6px] border border-border bg-white px-4 py-3 text-sm text-ink placeholder:text-muted focus-visible:border-gold";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      trackContactFormSubmit({ service: String(data.service ?? "") });
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[10px] border border-border bg-white p-8 text-center">
        <h3 className="font-serif text-xl font-semibold text-ink">Request received</h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-body">
          Thank you! We&apos;ve got your details and the team will be in touch shortly to
          confirm your free consultation.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus("idle")}>
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-ink">
            First name
          </label>
          <input id="firstName" name="firstName" required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-ink">
            Last name
          </label>
          <input id="lastName" name="lastName" required className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" className={inputClasses} />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-ink">
          Select a service
        </label>
        <select id="service" name="service" required defaultValue="" className={inputClasses}>
          <option value="" disabled>
            Choose a service
          </option>
          {serviceDropdownOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea id="message" name="message" rows={4} className={inputClasses} />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          {errorMessage}
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Request consultation"}
      </Button>
    </form>
  );
}
