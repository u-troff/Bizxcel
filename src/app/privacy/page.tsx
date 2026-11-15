import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Notice",
  description:
    "How BizXcel Kuils River collects, uses and protects your personal information when you contact us through our website.",
  path: "/privacy",
});

const LAST_UPDATED = "16 November 2026";

const sections: Array<{ title: string; body: React.ReactNode }> = [
  {
    title: "Who we are",
    body: (
      <>
        <p>
          {site.fullName} is an accounting practice and registered SARS Tax Practitioner. We are
          the responsible party for the personal information described in this notice, under the
          Protection of Personal Information Act (POPIA).
        </p>
        <address className="mt-3 not-italic leading-relaxed">
          {site.address.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="block">Phone: {site.phone}</span>
          <span className="block">Email: {site.email}</span>
        </address>
      </>
    ),
  },
  {
    title: "What we collect",
    body: (
      <>
        <p>When you fill in a form on our website, we collect:</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>your first name, email address and WhatsApp number,</li>
          <li>your answers to the form questions, such as what you need help with and how soon,</li>
          <li>
            basic visit information from Google Analytics and Meta, such as which page you visited
            and which advert brought you here.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Why we collect it",
    body: (
      <p>
        We use your details to respond to your enquiry and to arrange a consultation. We use the
        visit information to understand whether our website and adverts are working. We do not use
        your details for anything else without asking you first.
      </p>
    ),
  },
  {
    title: "Who we share it with",
    body: (
      <>
        <p>We do not sell your information. We share it only with:</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>the service providers who host our forms and website, and our messaging,</li>
          <li>
            Meta, for advertising measurement. Your name, email address and phone number are
            scrambled (hashed) before they are sent, so Meta does not receive them in readable
            form.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "How long we keep it",
    body: (
      <p>
        We keep your details for as long as we need them to deal with your enquiry and to meet our
        legal obligations. After that we delete or anonymise them. If you would like them deleted
        sooner, ask us.
      </p>
    ),
  },
  {
    title: "Your rights",
    body: (
      <>
        <p>You have the right to:</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>ask what personal information we hold about you,</li>
          <li>ask us to correct it,</li>
          <li>ask us to delete it,</li>
          <li>object to us using it,</li>
          <li>
            complain to the Information Regulator at{" "}
            <a
              href="https://inforegulator.org.za"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-gold"
            >
              inforegulator.org.za
            </a>
            .
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "How to contact us",
    body: (
      <p>
        To use any of these rights, or to ask a question about this notice, email{" "}
        <a href={`mailto:${site.email}`} className="underline underline-offset-2 hover:text-gold">
          {site.email}
        </a>{" "}
        or phone{" "}
        <a href={site.phoneHref} className="underline underline-offset-2 hover:text-gold">
          {site.phone}
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <section className="bg-white py-14 md:py-20">
      <Container className="max-w-3xl">
        <Eyebrow>Privacy</Eyebrow>
        <h1 className="mt-3 text-[2rem] font-semibold leading-[1.15] text-ink md:text-5xl">
          Privacy notice
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: {LAST_UPDATED}</p>

        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-2xl font-semibold text-ink">{section.title}</h2>
              <div className="mt-3 leading-relaxed text-body">{section.body}</div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm text-muted">
          <Link href="/contact" className="underline underline-offset-2 hover:text-gold">
            Contact us
          </Link>
        </p>
      </Container>
    </section>
  );
}
