import type { Metadata } from "next";

import { hero } from "@/lib/sars-content";
import { SARS_PIXEL_ID } from "./sars-pixel";

export const metadata: Metadata = {
  title: "Behind with SARS? | BizXcel Kuils River",
  description: hero.sub,
  // Paid-traffic landing page: reachable by direct URL only, kept out of search
  // results and out of the sitemap.
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: "/sars" },
};

export default function SarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only the SARS dataset is initialised here. PageView goes out with
  // trackSingle so it can never fire into another pixel.
  return (
    <>
      {SARS_PIXEL_ID ? (
        <>
          <script
            id="meta-pixel-base"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${SARS_PIXEL_ID}');
                fbq('trackSingle', '${SARS_PIXEL_ID}', 'PageView');
              `,
            }}
          />
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${SARS_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      ) : null}

      {children}
    </>
  );
}
