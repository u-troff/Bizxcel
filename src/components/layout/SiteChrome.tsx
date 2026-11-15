"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/** Paid-traffic landing pages that run without the site header, footer or floating buttons. */
function isLandingPath(pathname: string | null) {
  return pathname === "/sars" || Boolean(pathname?.startsWith("/sars/"));
}

/**
 * Wraps the page in the site's header, footer and floating widgets, except on
 * the /sars landing pages, where the only way forward is the form. Those pages
 * render their own <main id="main-content">, so the skip link still lands.
 */
export function SiteChrome({
  header,
  footer,
  floating,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  floating: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();

  if (isLandingPath(pathname)) return <>{children}</>;

  return (
    <>
      {header}
      <main id="main-content" className="flex-1">
        {children}
      </main>
      {footer}
      {floating}
    </>
  );
}
