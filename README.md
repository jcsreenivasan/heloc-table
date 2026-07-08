# HELOC Rate Table

An interactive, white-label HELOC (Home Equity Line of Credit) rate comparison table built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**.

## What We Built

A client-shareable rate comparison tool that mirrors the Bankrate-style HELOC table with:

- **Personalize Your Search** — filter bar with ZIP code, loan type, property value, mortgage balance, and loan amount inputs
- **Interactive Rate Table** — sortable rows with lender logo, rate, APR, loan term, loan amount range, and editorial score
- **Hover CTA** — hovering any rate row smoothly slides in a branded "Next →" call-to-action button from the right
- **Expandable Details** — "Show more details" reveals draw period, repayment period, fees, credit score requirements, and max LTV per lender
- **Tooltips** — APR, Loan amount, and Score columns show contextual info on icon hover

## White-Labeling (Rebranding for Clients)

All colors and interactive states are controlled by **CSS custom properties** in a single file:

```
src/app/globals.css
```

To rebrand for any client, change only these variables at the top of `globals.css`:

```css
:root {
  /* Primary brand color — buttons, links, icons, hover highlights */
  --brand-primary: #2563eb;        /* Change to client's brand color */
  --brand-primary-dark: #1d4ed8;   /* Darker shade for hover states */
  --brand-primary-light: #eff6ff;  /* Very light tint for row hover bg */
  --brand-primary-border: #bfdbfe; /* Subtle border tint */

  /* Table header bar */
  --brand-header-bg: #111827;      /* Dark header background */
  --brand-header-text: #f9fafb;    /* Header text color */

  /* CTA Button */
  --brand-cta-bg: var(--brand-primary);
  --brand-cta-text: #ffffff;
  --brand-cta-hover-bg: var(--brand-primary-dark);
  --brand-cta-radius: 8px;         /* Border radius — 4px for square, 999px for pill */

  /* Score star */
  --brand-star-color: var(--brand-primary);
}
```

### Example: Green brand

```css
:root {
  --brand-primary: #16a34a;
  --brand-primary-dark: #15803d;
  --brand-primary-light: #f0fdf4;
  --brand-primary-border: #bbf7d0;
  --brand-header-bg: #052e16;
  --brand-star-color: #16a34a;
}
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # ← White-label CSS variables (edit here to rebrand)
│   ├── layout.tsx           # Page title, metadata, font
│   └── page.tsx             # Root page — composes SearchFilters + RateTable
├── components/
│   ├── SearchFilters.tsx    # Top filter bar (ZIP, loan type, values, More filters)
│   └── RateTable.tsx        # Main table with all rows, hover CTA, expandable details
└── data/
    └── lenders.ts           # Mock lender data — swap with real API data later
```

## Lender Data

Mock data lives in `src/data/lenders.ts`. Each lender record has:

| Field | Description |
|-------|-------------|
| `productName` | Display name above the logo |
| `lenderName` | Lender company name |
| `logoInitials` | Short text shown in the colored logo placeholder |
| `logoColor` | Hex color for the logo placeholder background |
| `nmls` | NMLS license number |
| `rate` | Current interest rate (string, e.g. `"5.625"`) |
| `apr` | Annual Percentage Rate |
| `loanTerm` | e.g. `"10 year"` |
| `loanAmountMin/Max` | Range display strings (e.g. `"$15K"`, `"$700K"`) |
| `score` | Editorial score out of 5 |
| `details` | Expandable details: draw/repayment periods, fees, LTV, credit score |

To connect real data, replace the static array in `lenders.ts` with an API call in `page.tsx` or a Server Component fetch.

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → Open http://localhost:3000

# Production build
npm run build
npm start
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Icons | lucide-react |
| Fonts | Geist (via next/font) |
| Deploy | Vercel |

## Deployment

Deployed on Vercel. Every push to `main` triggers an automatic redeploy.

To redeploy manually:
```bash
git add -A && git commit -m "update" && git push
```
