# IPTV Turkey

Turkish-language IPTV subscription site for **iptv-turkey.site**.

Next.js 15 (App Router) · TypeScript · Tailwind CSS · static export.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then edit the values
npm run dev                  # http://localhost:3000
```

Other commands:

```bash
npm run build      # production build -> ./out
npm run lint       # ESLint
npm run typecheck  # TypeScript, no emit
```

---

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project → Import** the repo.
3. Framework preset is detected automatically (Next.js). Leave build settings alone.
4. Add the environment variables below under **Settings → Environment Variables**.
5. Deploy, then attach `iptv-turkey.site` under **Settings → Domains**.

The site is a static export (`output: 'export'` in `next.config.mjs`), so the
build also runs on ordinary shared hosting: upload the contents of `out/`.

> Want Vercel's image optimization? Remove `output: 'export'` and
> `images.unoptimized` from `next.config.mjs`. The trade-off is that the build
> then needs a Node runtime and can no longer be dropped onto static hosting.

---

## Environment variables

Copy `.env.example` to `.env.local` for local work, and add the same keys in
Vercel for production.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, no trailing slash. Used for canonicals, Open Graph and JSON-LD. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Country code + number, digits only (`447412836986`). Drives every WhatsApp link and the order handoff. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional. Leave unset to keep support on WhatsApp only — nothing renders when empty. |
| `NEXT_PUBLIC_CHECKOUT_URL` | Optional external checkout. When empty, orders go to WhatsApp instead. |
| `NEXT_PUBLIC_ORDER_ENDPOINT` | Apps Script web-app URL that records orders in the Google Sheet. Empty disables logging. |
| `NEXT_PUBLIC_ANALYTICS_ID` | Optional. Only loaded after the visitor accepts analytics cookies. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console token. Rendered as `<meta name="google-site-verification">`. Leave empty to omit the tag. |

---

## Common edits

### Prices and packages

`src/data/pricing-data.ts` — the single source of truth.

```ts
{
  id: 'gold',
  name: 'Gold',
  months: 15,          // paid months
  bonusMonths: 3,      // free months on top
  price: 49.99,
  featured: true,      // red ring, crown badge
  solid: true,         // solid red card (used by Exclusive)
  badge: 'EN POPÜLER',
}
```

Per-month figures and the "%17 daha uygun" chips are **calculated** from these
numbers against the shortest plan — change a price and they update themselves.

Other switches in the same file:

- `extraConnectionDiscount` — each extra simultaneous connection, default `0.15`
- `maxConnections` — stepper ceiling, default `5`
- `showBadges` — set `false` to hide all plan badges
- `showChannelCounts` — `false` by default. Set `true` to swap the honest
  feature lists for the numeric ones (`25.000+ TV kanalı`, etc.). Those claims
  are unverifiable, are a common spam signal, and invite rights complaints —
  turn them on only if the figures are accurate.

### WhatsApp number

Set `NEXT_PUBLIC_WHATSAPP_NUMBER`. It flows to the header pill, footer, floating
button, device grid and the order form with no other edits.

### Adding a blog post

1. Create `src/data/articles/<slug>.ts`, exporting an `Article`.
2. Register it in the `articles` array in `src/data/blog-data.ts`.

Body blocks: `p`, `h2` (needs an `id` for the table of contents), `h3`, `ul`,
`ol`, `note`, `table`. `BlogPosting` schema, reading time and related links are
generated from the object.

### FAQ

`src/data/faq-data.ts`. Questions are rendered visibly **and** feed the
`FAQPage` schema — never add an entry that isn't shown on the page.

### Site name, navigation, legal text

`src/data/site-config.ts`.

---

## Project layout

```
src/
  app/
    layout.tsx          root shell, fonts, header/footer, JSON-LD
    page.tsx            homepage
    globals.css         design tokens and component classes
  components/
    Logo, Header, Footer, Section, Eyebrow
    PricingCard, PricingGrid           packages
    OrderForm, OrderModal, CheckoutTrigger, CountrySelect   checkout
    DeviceGrid, HowItWorks, TurkishFlag, FAQAccordion, BlogCard
    CookieBanner, WhatsAppButton, StructuredData, Breadcrumbs
  data/
    site-config.ts      brand, contact, navigation
    pricing-data.ts     plans and pricing rules
    faq-data.ts         FAQ + FAQPage schema source
    blog-data.ts        article registry and helpers
    articles/           one file per post
    countries.ts        245 dial codes, generated (see below)
    device-brands.ts    compatibility logos
  lib/seo.ts            metadata builder and schema helpers
```

### Generated files

`src/data/countries.ts` was produced at build time from `libphonenumber-js`
metadata plus Turkish region names from `Intl.DisplayNames`. The library is
**not** a dependency — the data is static so nothing extra ships to the browser.
Regenerate only if dial codes change.

---

## Notes

- **Fonts are self-hosted** (`@fontsource-variable/outfit` and `inter`). No
  Google Fonts request, which matters because that would send visitor IPs to a
  third party before the cookie banner obtains consent.
- **No payment details are collected anywhere.** The order form hands off to
  WhatsApp or to `NEXT_PUBLIC_CHECKOUT_URL`.
- **The device grid shows third-party brand marks** purely to signal
  compatibility, with the required notice rendered underneath. Keep that notice.
- **The Türkiye flag** follows Flag Law No. 2893 proportions and Pantone 186 C.
- Cookie consent stores nothing optional until the visitor accepts; analytics
  stay unloaded until then.

## Recording orders in Google Sheets

Orders can be written to the **IPTV Turkey - commandes** spreadsheet as well as
sent to WhatsApp.

1. Open the spreadsheet → **Extensions → Apps Script**.
2. Paste `google-apps-script/checkout-backend.gs` over `Code.gs`, then Save.
3. **Deploy → New deployment → Web app**, with *Execute as: Me* and
   *Who has access: Anyone*.
4. Copy the `/exec` URL into `NEXT_PUBLIC_ORDER_ENDPOINT` in Vercel and redeploy.

The row order matches the existing columns: Date · Nom · Email · Téléphone ·
Formule · Prix (€) · Connexions · Paiement · Statut. New rows arrive with
Paiement `En attente` and Statut `Nouvelle`.

Notes worth knowing:

- The write is **fire-and-forget**. Apps Script sends no CORS headers, so the
  browser cannot read the response. If the write fails the customer never sees
  an error and the WhatsApp handoff still happens — WhatsApp remains the record
  that matters, the sheet is a convenience.
- The endpoint URL is visible in the page source. That is unavoidable on a
  static site, and it means anyone could post junk rows. The optional `SECRET`
  in the script deters casual abuse but is not authentication, since the value
  would also be public. Treat the sheet as untrusted input.
- Re-deploy the script (**Manage deployments → Edit → New version**) after any
  edit, or the old code keeps running.
- Run `diagnose` first if rows are not appearing: it logs the name and URL of
  the spreadsheet the script is actually writing to. A standalone script writes
  somewhere else entirely — set `SPREADSHEET_ID` to fix that.
- `testAppend` writes a row and logs where it went. `testNotify` sends one
  alert. `testWebhook` simulates a full website order.

### Order alerts

`NOTIFY_EMAIL` in the script sends an email on every order, with the package,
duration, connections, total and the customer's details. Set it to `''` to turn
alerts off.

The alert is best-effort: the sheet row is written first, and a mail failure is
logged rather than raised, so a Gmail quota problem can never cost you an order.
Free Gmail accounts allow roughly 100 messages a day.

## Google Search Console

The verification token ships in `src/data/site-config.ts` and renders into
`<head>` on every page, so the **HTML tag** method works as soon as the site is
live on the domain. Verify in Search Console, then submit the sitemap once it
exists.

Keep the tag in place after verification — Google re-checks periodically and
removing it can drop the property.

## Still to build

Homepage, blog index data and three articles are done. Remaining from the
original brief: packages page, installation hub and four device guides, FAQ
page, contact, about, five legal pages, copyright complaint page, blog index and
article template, sitemap, robots, RSS, and articles 4–10.
