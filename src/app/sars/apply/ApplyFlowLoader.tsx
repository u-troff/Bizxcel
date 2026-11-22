"use client";

import dynamic from "next/dynamic";

/**
 * The flow reads sessionStorage and the address bar as it starts, so it only
 * runs in the browser. The server sends this empty frame, which keeps the
 * layout steady while the code loads.
 */
const ApplyFlow = dynamic(() => import("./ApplyFlow"), {
  ssr: false,
  loading: () => (
    <div aria-hidden className="min-h-[calc(100dvh-57px)] sm:min-h-[calc(100dvh-65px)]">
      <div className="h-1.5 w-full bg-cream" />
    </div>
  ),
});

/** The same frame at the size of the embedded card, so the page does not jump. */
const EmbeddedApplyFlow = dynamic(() => import("./ApplyFlow"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="min-h-[520px] overflow-hidden rounded-[10px] border border-border bg-white"
    >
      <div className="h-1.5 w-full bg-cream" />
    </div>
  ),
});

export default function ApplyFlowLoader({ embedded = false }: { embedded?: boolean }) {
  return embedded ? <EmbeddedApplyFlow embedded /> : <ApplyFlow />;
}
