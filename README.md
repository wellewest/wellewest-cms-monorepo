# WelleWest CMS Monorepo

Multi-Tenant Payload CMS + Astro Templates für das WelleWest Website-Abo.

## Struktur

- `apps/cms-server/` — Payload-CMS-Server (deployed nach `cms.wellewest.at`)
- `packages/cms-core/` — Geteilte Payload-Collections (Page, BlogPost, SiteSettings, Navigation, SEO, Author, Media)
- `packages/cms-hotel/` — Hotel-Collections (Room, Offer, Amenity)
- `packages/cms-gastro/` — Gastro-Collections (MenuItem, MenuCategory, OpeningHours)
- `packages/cms-kmu/` — KMU-Collections (Service, TeamMember, Testimonial)
- `packages/blocks/` — Astro-Komponenten für Templates
- `packages/payload-config/` — Zentrale Payload-Server-Konfiguration
- `packages/template-{hotel,gastro,kmu}/` — Astro-Boilerplates
- `tools/create-customer/` — Cloning-Skript für neue Kunden

## Setup

```bash
pnpm install
pnpm dev:cms
```
