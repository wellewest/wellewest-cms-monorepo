# @wellewest/template-kmu

Astro-Template-Boilerplate für **KMU-Kunden** (kleine Unternehmen, Anwälte, Coaches, Handwerker).

## Setup pro Kunde

```bash
# 1. Repo aus diesem Template clonen
gh repo create wellewest/wellewest-customer-{kunde} --template wellewest/template-kmu --private

# 2. Env-Datei
cp .env.example .env
# Trage PAYLOAD_TENANT_ID + SITE_URL ein

# 3. Lokal testen
pnpm install && pnpm dev

# 4. Auf Netlify deployen
# Verbinde mit github.com/wellewest/wellewest-customer-{kunde}
# Setze ENV-Variablen in Netlify
```

## Struktur

- `src/layouts/Base.astro` — globales Layout, Site-Settings (SEO, Analytics, Custom-Code) automatisch eingebunden
- `src/pages/` — Seiten-Routen
- `src/pages/robots.txt.ts` — Auto-generated robots.txt mit AI-Bot-Steuerung (CMS-konfigurierbar)
- `src/lib/payload.ts` — Payload-API-Client, tenant-aware
- `src/components/blocks/` — wiederverwendbare Astro-Bausteine

## Webhook für Auto-Builds

Coolify/Payload sendet bei Inhaltsänderung einen Webhook → Netlify-Build.
Setup in Coolify-CMS-Settings: `https://api.netlify.com/build_hooks/<HOOK_ID>`
