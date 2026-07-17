# Resources Page — Stage 1 (UI live now, payment later)

Patch: `paid-resources-feature.patch` — apply with:
```
cd my-website
git apply paid-resources-feature.patch
```

## What this patch does right now
- Adds `/resources` page + nav link — matches your existing design system
  (`design-system.css` tokens: colors, spacing, radius, Poppins, dark/light
  mode all inherited automatically, no separate theme needed).
- Adds `Document` model + `GET /api/documents` — lists brochures/catalogues/
  SOPs/recipe books with title, price, description, category.
- Cards show a "Coming Soon" disabled button instead of a buy button —
  the page is fully live and useful today, nothing is gated or broken.
- Zero payment dependency — no Razorpay package, no API keys needed to
  deploy this. Safe to ship immediately.

## Steps to get it live
1. `git apply paid-resources-feature.patch`
2. `cd backend && npm install` (no new deps this stage)
3. Edit `backend/scripts/seedDocuments.js` with your real titles/prices/
   descriptions (leave `fileName` as-is, it's not used yet).
4. Run `node scripts/seedDocuments.js` to push them into MongoDB.
5. Commit, push, let Render/Vercel redeploy.
6. Visit `/resources` — cards should show with "Coming Soon" buttons.

## Stage 2 — turning payment on later
When you're ready:
- The full Razorpay-gated version is already written and parked at
  `backend/routes/future/documents.payment-gated.js` (with the matching
  `Purchase` model already in `backend/models/Purchase.js`).
- Swap `backend/routes/documents.js` for that file, add `razorpay` back to
  `package.json`, set the Razorpay env vars, and swap the "Coming Soon"
  button in `Resources.js` for the checkout flow (already built earlier —
  just say the word and I'll re-merge it in).
- Nothing about the catalogue data or page layout needs to change — only
  the button behavior and the download route.

## Design note
The card/hero styling now pulls directly from your `design-system.css`
tokens (--chdk-sky, --chdk-accent-20, --radius-sm, u-surface-card, spacing
scale, etc.) instead of generic placeholder colors, so it sits consistently
with Careers/Contact/Gallery. If you want thumbnail images on the cards,
say so — the Document model already has a `thumbnail` field ready for it.
