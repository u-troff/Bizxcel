"use client";

import Link from "next/link";
import { useSyncExternalStore, type ReactNode } from "react";

/** The address bar's query string. It never changes while the page is open. */
const subscribe = () => () => {};
const getSearch = () => window.location.search;
const getServerSearch = () => "";

/**
 * Link to /sars/apply that carries the ad's tags (utm_*, fbclid) along, so the
 * lead can be tied back to the ad that sent it.
 */
export default function ApplyCta({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);

  return (
    <Link
      id={id}
      href={`/sars/apply${search}`}
      prefetch
      className={`inline-flex items-center justify-center gap-2 rounded-[6px] bg-gold px-8 py-5 font-sans text-lg font-semibold text-white transition-colors duration-200 hover:bg-gold-hover ${className}`}
    >
      {children}
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
