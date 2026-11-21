# Claude Code prompt: website leads into the CRM, with the WhatsApp welcome

Paste everything under PROMPT into Claude Code inside `~/Desktop/bizxcel automation`
(the Expert Partner CRM). Pull the latest main first and work on a new branch.

Why: the new /sars page on bizxcelkr.com no longer uses Tally. Its server posts
each finished lead to `POST /api/leads/intake`. That route creates the lead but,
by design, does not send the WhatsApp welcome. The website now sends
`sendWelcome: true`, so the route needs an opt-in to send it.

---

## PROMPT

Read `src/app/api/leads/intake/route.ts`, `src/app/api/webhooks/tally/route.ts`
and `src/lib/services/lead-welcome.ts` first.

1. **Opt-in welcome on /api/leads/intake.** Extend `leadIntakeSchema` with three
   optional fields:
   - `sendWelcome: z.boolean().optional().default(false)`
   - `problem: z.string().max(500).optional().nullable()`
   - `whatsappConsent: z.boolean().optional().nullable()`

   After `intakeLead` succeeds and only when `result.source === "live"`,
   `sendWelcome` is true and `whatsappConsent !== false`, call
   `sendLeadWelcome({ clientId, phoneE164, displayName: name, problem })`, the same
   way `/api/webhooks/tally` does. Keep the existing `after()` work (OneDrive
   folder, notification) exactly as it is.

   Unlike the Tally route, a failed welcome must NOT return 500: the website does
   not retry. Return `{ ok: true, clientId, isNewLead, source, welcome: { ... } }`,
   with `welcome.error` set and a `console.error` when it failed.

   Without `sendWelcome`, the route behaves exactly as now (Make.com fallbacks
   must never start texting people).

2. **Show the source.** Leads from the website arrive with
   `source: "website_sars_landing"`. Wherever `lead_source` is shown as a label
   (pipeline chips, client profile), show it as "Website: SARS page". Leave the
   raw value in the database.

3. **Show the answers.** The website sends `answers` with these keys:
   "What do you need help with most?", "How soon do you want it sorted?" and
   "Where are you based?",
   plus `qualified`,
   `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `fbclid`,
   `event_id`, `website_session_id`. Make sure the client profile's intake
   section shows the three questions with their answers, and hides the tracking
   keys behind a "Show details" toggle.

4. **Migration.** Copy `~/Desktop/Bizxcel/supabase/sars-leads.sql` into
   `supabase/migrations/<timestamp>_sars_leads.sql` unchanged (it is idempotent),
   so this project's schema history includes the website's table. Do not edit
   its grants: the website uses the anon key and must only be able to run the
   two `sars_lead_*` functions.

5. **Tests.** Extend the intake route tests (or add them) for:
   - `sendWelcome: true` sends the welcome once,
   - `whatsappConsent: false` creates the lead and sends nothing,
   - no `sendWelcome` sends nothing,
   - a failing `sendLeadWelcome` still returns 200 with `welcome.error`.

Done means `npm run build`, `npm run lint` and the tests pass. Commit as
`feat(leads): opt-in WhatsApp welcome on /api/leads/intake`.

---

## After the build (for you)

1. Deploy the CRM. Check `LEADS_INTAKE_SECRET` is set in its Vercel environment.
2. Run the migration (or the SQL file) in the CRM's Supabase project.
3. In the **BizXcel website** Vercel project, add:
   - `SARS_SUPABASE_URL` = the CRM project's URL
   - `SARS_SUPABASE_ANON_KEY` = its anon (publishable) key. Never the service role key.
   - `CRM_INTAKE_URL` = `https://<crm-domain>/api/leads/intake`
   - `CRM_INTAKE_SECRET` = the same value as `LEADS_INTAKE_SECRET`
4. Submit one test lead on the preview link with your own number. You should get
   the WhatsApp welcome, see the lead in the pipeline as "new", see a row in
   `sars_leads` with `crm_synced = true`, and get the email.
