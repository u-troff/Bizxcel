# /sars tracking

Every browser event goes to ONE Meta dataset, "BizXcel SARS Funnel"
(`NEXT_PUBLIC_META_SARS_PIXEL_ID`), with `trackSingle` / `trackSingleCustom`,
never a bare `fbq('track')`. With no dataset ID set, every call is skipped.

Server events go through `/api/meta-event`. The browser only names the pixel
("sars"); the server looks up the dataset and token (`META_SARS_CAPI_TOKEN`).
It accepts `Lead` and `Contact` only.

| Event | Type | Where | Fires when | Dedupe |
|---|---|---|---|---|
| `PageView` | standard | `layout.tsx` | Every /sars page load | none |
| `VSL_Play`, `VSL_25` `VSL_40` `VSL_50` `VSL_75` `VSL_95` | custom | `useWistiaMilestones`, /sars | Playing with sound, at least half on screen, no seeks | once per page load |
| `Apply_Start` | custom | `ApplyFlow`, /sars (embedded) and /sars/apply | First answer on /sars (the form is on every page view, so page load is not a start). On /sars/apply, the first visit. | once per visitor (sessionStorage) |
| `Apply_Step` `{ step, key }` | custom | `ApplyFlow` | Each answer, and the contact screen | per answer |
| `Apply_JustLooking` | custom | `ApplyFlow` | Submitted with "Just looking" | once |
| `Lead` | standard, browser + server | `ApplyFlow` | Submitted with "This week" or "This month" | the flow's `eventId`, also stored on the sars_leads row |
| `Contact` | standard, browser + server | `trackWhatsAppContact`, /sars/next-step | WhatsApp button tap | `wa_` + the `eid` URL param |

**Optimise the campaign for `Lead`.** "Just looking" never fires it, so Meta
learns from people who want it sorted. The VSL and Apply events are for
audiences and diagnosis, never the optimisation goal.

## Where the answers go

`/api/sars-lead` saves every step to `sars_leads` in the CRM's Supabase project
(`supabase/sars-leads.sql`), so drop-off per question is visible:

```sql
select last_step, count(*) from sars_leads group by 1 order by 1;
```

On the final submit (first time only), after the response is sent:
1. the lead goes into the CRM through `/api/leads/intake` (`CRM_INTAKE_URL`, `CRM_INTAKE_SECRET`),
   and the row is marked `crm_synced` with the CRM's client id,
2. an email goes to `LEAD_NOTIFICATION_EMAIL`,
3. a backup record goes to KV (or the log).

## Personal data

First name, WhatsApp number and email are kept in sessionStorage
(`bizxcel_lead`) for the thank-you page, never in a URL. The only thing in the
URL is the random `eid`. The server hashes them before they go to Meta.

## Testing

1. Set `META_SARS_TEST_EVENT_CODE` and watch Events Manager > Test Events. Remove it before ads go live.
2. Go through the form on /sars once with "This month" (Lead fires once, browser + server, deduplicated) and once with "Just looking" (no Lead).
3. Check the two rows in `sars_leads`, and the lead in the CRM pipeline.
