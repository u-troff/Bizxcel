import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { site } from "@/lib/content";
import { localBusinessJsonLd } from "@/lib/seo";

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const shouldLoadGA = Boolean(gaId) && process.env.NODE_ENV === "production";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName}: Accounting, Tax & SARS Compliance`,
    template: `%s`,
  },
  description: site.description,
  keywords: [
    "accountant Kuils River",
    "SARS tax practitioner Cape Town",
    "bookkeeping Cape Town",
    "payroll administration Kuils River",
    "company registration South Africa",
  ],
  authors: [{ name: site.fullName }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" className={`${lora.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[6px] focus:bg-gold focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteChrome
          header={<Header />}
          footer={<Footer />}
          floating={
            <>
              <WhatsAppButton />
              <ChatWidget />
            </>
          }
        >
          {children}
        </SiteChrome>
      </body>
      {shouldLoadGA && <GoogleAnalytics gaId={gaId as string} />}
    </html>
  );
}
