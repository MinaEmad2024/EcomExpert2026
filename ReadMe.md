# Bundle Builder

A two-column, 4-step bundle builder (Cameras → Plan → Sensors → Add extra protection) with a live review panel that stays in sync as you configure a home-security system. Client-side React, data-driven from a local JSON file, with quantity/variant state, live totals, and "save my system for later" persistence.

## Run it

Requires Node 18+.

```bash
npm install
npm run dev
```

Open the printed local URL (defaults to `http://localhost:5173`).

Other commands:

```bash
npm run build     # type-check + production build
npm run preview   # serve the production build locally
npm test          # run the test suite (Vitest)
npm run lint      # oxlint
```

## Stack

Vite + React + TypeScript, Tailwind CSS, React Context + `useReducer` for state, plain `localStorage` for persistence, Vitest + Testing Library for tests. No backend — product data is a local JSON file (`public/bundle.json`), fetched at startup.

## Structure

```
src/
  App.tsx                  # two-column shell
  components/
    builder/                # StepAccordion, ProductCard, VariantSelector, QtyStepper
    review/                 # ReviewPanel, LineItem, Totals, Checkout
    Icons.tsx, PriceDisplay.tsx
  state/
    BundleContext.tsx        # fetches bundle.json, restores localStorage, exposes useBundle()
    reducer.ts                # the single source of truth for quantities/active variant/expanded steps
  lib/
    pricing.ts                # pure pricing/derivation helpers (unit-tested)
    storage.ts                 # localStorage load/save
    steps.ts                    # the 4 step definitions
  types.ts
public/
  bundle.json                 # product data
  products/                    # product images
```

## Decisions, tradeoffs, and things worth knowing

**Pan v3 pricing is deliberately not what the card screenshot shows.** The Figma mock is internally inconsistent: the Cam Pan v3 *card* shows $34.98/$39.98, but the *review-panel line* for the same product (qty 2) totals $47.98/$57.98 — which only works out to a $23.99/$28.99 unit price, not $34.98/$39.98. Rather than reproduce a cart that doesn't add up, Pan v3 is seeded at $23.99/$28.99 everywhere (card and review), which makes the whole system internally consistent *and* reproduces the mock's headline numbers exactly: **$187.89 active / $238.81 compare-at / $50.92 savings**. The "Save 17%" badge on that card is computed from this price, not hardcoded — so it correctly differs from the mock's stale "Save 12%" (which was computed from the old, inconsistent price).

**Where the actual job description and the actual Figma screenshots disagreed, the screenshots won** (per explicit instruction — "match the design precisely" is itself the stated top requirement):
- The Plan line ("Cam Unlimited") in the review panel has no quantity stepper, even though the brief's prose says every review line has one. Every screenshot (desktop and mobile) shows it that way — a subscription isn't really a countable quantity the way a physical product is.
- On mobile, a collapsed step still shows its "N selected" count (the brief's text reads as chevron-only when collapsed). The `mobile.png` screenshot shows the count persisting; it's arguably better UX for a quick scan on a small screen, too.
- Variant chip active/selected styling is intentionally minimal (a border color change only) — both the brief and the screenshots are ambiguous/low-priority here, and the brief explicitly says not to worry about it.

**Sensors, Plan, and Accessories have interactive product cards, even though the Figma only shows expanded product cards for the Cameras step** (the other three steps are always shown collapsed in every provided screenshot, pre-seeded with values only). Rather than leave those steps inert, they use the same data-driven `ProductCard` component as Cameras, so "N selected," quantity syncing, and card ↔ review sync all work identically everywhere.

**Font:** the design specifies a paid font; Manrope (self-hosted via `@fontsource/manrope`, latin subset only) is used as a free substitute, matching the weights the design calls for (400/500/600/700).

**Branding:** product names, photos, and the Wyze brand are reproduced as designed, straight from the provided Figma/screenshots — this is a demo/take-home, not an affiliated or endorsed Wyze product.

**Financing line** ("as low as $19.19/mo") is static display text matching the mock — no formula for it appears anywhere in the design spec, and it doesn't divide cleanly out of the total by any term length I tried, so it isn't computed from state.

**Checkout** is a placeholder, as the brief allows: clicking it shows an inline "no order was placed" confirmation — no navigation, no backend.

## Not finished / known gaps

- No automated visual regression / true pixel-diff tooling — fidelity was checked by eye against the provided screenshots, plus targeted crops for icons and small details.
- A true 390px phone-width screenshot wasn't captured during development (the available testing environment's browser viewport didn't go narrower than ~600px), though the responsive CSS was verified directly via computed layout measurements at the widths that were available, and one real single-column-stacking bug was caught and fixed this way.
- No backend/API for the product data (a local JSON file, as the brief allows) and no bonus deployment link.