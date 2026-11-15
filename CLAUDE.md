@AGENTS.md

# BizXcel landing page rules

## Who reads the /sars pages
South African business owners and individual taxpayers, mostly in Cape Town, reading on a phone after tapping a Facebook or Instagram ad. Many are behind with SARS and a bit anxious about it. They are not accountants. They think in "SARS letters", "outstanding returns", "penalties", "eFiling", "my accountant", "WhatsApp".

## Copy rules (non-negotiable)
- No em-dashes or en-dashes in any copy. Use full stops or commas.
- Short sentences. Plain words. One idea per sentence. Calm, not scary.
- Never invent numbers. Every figure shown comes from src/lib/sars-content.ts, where each one has its source and date.
- Never promise a refund, a penalty waiver or an outcome from SARS.
- No hype words: revolutionary, game-changing, unlock, supercharge, skyrocket, leverage, seamless, cutting-edge, hassle-free.
- Banned on public pages: Next.js, React, Vercel, Tally, pixel, dataset, funnel, conversion, CRM, API, AI, chatbot, automation.
- South African English (realise, organise, enquiry). Rand as R16,000 with a comma.

## Colours and type (match bizxcelkr.com exactly)
Use only the tokens in src/app/globals.css, through their Tailwind classes. Never type a hex value in a /sars component.
- navy #13293D (bg-navy, text-navy): headings, dark bands, the final CTA band
- gold #B4813C (bg-gold, hover:bg-gold-hover #9C6E30): buttons, numbers, links
- cream #F7F4EE (bg-cream): alternate section backgrounds
- white #FFFFFF: page background. ink #1E2A35: strong text. body #4A5560: paragraphs. muted #6B7580: small print. border #E9E4DA: lines and inputs
- on-navy rgba(255,255,255,0.78): text on navy
- Headings font-serif (Lora). Body font-sans (Inter). Buttons and inputs use the site's 6px radius.
- The only colour outside the tokens is WhatsApp green #25D366 on the next-step button.
- Components copied from U-Flow bring their own "trade" theme classes, shadcn variables and lucide icons. Replace every one of them with the tokens above before committing. If a copied file still contains a hex value or a U-Flow colour class, it fails review.

## Build rules
- Mobile first. Check every section at 375px wide.
- Respect prefers-reduced-motion for every animation.
- /sars and /sars/next-step are noindex and stay out of sitemap.ts.
- All /sars copy lives in src/lib/sars-content.ts, never hardcoded in components.
- Do not change the existing site pages, header, footer, chat widget or GA setup except where a step says so.
