# WelleWest Stack — Handover

Stand: 2026-05-07. Vollständiger Multi-Tenant-Stack live, eine Demo-Site live.

## 🌐 Live-Services

| Service | URL | Login |
|---|---|---|
| **Payload CMS** | https://cms.wellewest.at/admin | `info@wellewest.at` (Passwort wurde geändert nach Initial-Setup) |
| **Plausible Analytics** | https://analytics.wellewest.at | Noch kein Admin angelegt — `/register` |
| **Coolify Admin** | http://178.105.75.15:8000 | (eigener Admin von Patrick) |
| **Demo Reif und Partner** | https://rechtsanwaelte-villach.wellewest.at | Basic-Auth: `demo` / s. `~/.claude/keys.env` (`DEMO_BASIC_AUTH_PASS`) |

## 🔑 Credentials

Alle Tokens in `~/.claude/keys.env` (chmod 600):
- `HETZNER_API_TOKEN` — Hetzner Cloud (Projekt „WelleWest CMS")
- `COOLIFY_API_TOKEN` — Coolify (Root-Permissions, never expires)
- `COOLIFY_BASE_URL=http://178.105.75.15:8000`
- `B2_KEY_ID`, `B2_APPLICATION_KEY`, `B2_BUCKET=wellewest-cms-assets`, `B2_REGION=eu-central-003`, `B2_ENDPOINT=https://s3.eu-central-003.backblazeb2.com`
- `PAYLOAD_SECRET` — random hex
- `POSTGRES_PAYLOAD_PASSWORD` — Postgres in Coolify
- `WELLEWEST_HETZNER_SERVER_IP=178.105.75.15`
- `WELLEWEST_HETZNER_SSH_KEY_ID`, `WELLEWEST_HETZNER_FIREWALL_ID`, `WELLEWEST_HETZNER_SERVER_ID`
- `DEMO_BASIC_AUTH_USER=demo`, `DEMO_BASIC_AUTH_PASS`
- `PLAUSIBLE_SECRET_KEY_BASE`, `PLAUSIBLE_TOTP_VAULT_KEY`
- SSH-Key für Hetzner: `~/.ssh/wellewest_cms_ed25519`

## 📦 Repos (alle public)

- **Code-Monorepo:** https://github.com/wellewest/wellewest-cms-monorepo
- **Demo Reif und Partner:** https://github.com/wellewest/wellewest-customer-rechtsanwaelte-villach
- GitHub-Org-Owner: `nicolasfabjan` (Personal-Account `wellewest-acc` ist secondary)

## 🖥️ Infrastruktur

**Hetzner CX33** in Falkenstein (DE):
- 4 vCPU, 8 GB RAM, 80 GB SSD
- IP: `178.105.75.15`
- Kosten: ~6,49 €/Monat
- OS: Ubuntu 24.04 LTS, Coolify-managed
- Hardening: SSH-Passwort-Login aus, fail2ban, unattended-upgrades

**Container auf dem Server:**
| Container | Zweck |
|---|---|
| `coolify`, `coolify-db`, `coolify-redis`, `coolify-realtime`, `coolify-proxy` (Traefik), `coolify-sentinel` | Coolify-Stack |
| `o4goc0u80gpnpbvq55tyrrbu` | **Postgres 16** für Payload-CMS |
| `tw2o5k2zsa80s44dyu19axnf-*` | **Payload-CMS** Application |
| `plausible`, `plausible_db`, `plausible_events_db` (Clickhouse) | **Plausible Analytics** |
| `sligctlqx2fqptgqxaulidfh-*` | **Reif-und-Partner Demo-Site** |

**DNS** bei easyname auf `wellewest.at`:
- `cms.wellewest.at` → 178.105.75.15
- `analytics.wellewest.at` → 178.105.75.15
- `cal.wellewest.at` → 178.105.75.15 (Cal.com noch nicht deployed)
- `rechtsanwaelte-villach.wellewest.at` → 178.105.75.15

**Storage:** Backblaze B2 Bucket `wellewest-cms-assets` (EU-Central, S3-kompatibel)

## 📁 Lokale Pfade

```
~/Projects/wellewest-cms-monorepo/             # CMS + Templates
  apps/cms-server/                              # Payload Next.js App (deployed)
  apps/cms-server/src/payload.config.ts         # Hauptkonfig
  apps/cms-server/src/collections/              # Tenants, Users, Media, Pages, Posts
  apps/cms-server/src/globals/                  # SiteSettings, LaunchChecklist
  apps/cms-server/src/components/views/Dashboard.tsx  # Custom Dashboard
  apps/cms-server/src/components/graphics/      # Logo + Icon
  apps/cms-server/src/migrations/               # Payload-Migrations (drizzle)
  packages/template-kmu/                        # Astro KMU-Boilerplate (Skelett)
  HANDOVER.md                                   # diese Datei
  PLAN.md / Plan-File in ~/.claude/plans/       # Architektur-Plan

~/Projects/wellewest-customer-rechtsanwaelte-villach/   # Demo-Site
  src/lib/content.ts                            # alle Inhalte (10 Rechtsgebiete)
  src/components/Header.astro
  src/components/Footer.astro
  src/layouts/BaseLayout.astro
  src/pages/                                    # Home, [slug], kontakt, anfahrt, impressum, 404
  public/images/                                # 13 Bilder vom Original
  Dockerfile + Caddyfile                        # Static-Site-Hosting via Caddy
```

## ✅ Was funktioniert (Phase 1+2 abgeschlossen)

- [x] Payload-CMS multi-tenant, deutsch, WelleWest-Branding
- [x] Custom Dashboard mit KPIs, Sparkline-Charts, Pageviews-Chart, Top-Seiten, Status-Panels
- [x] Sidebar gruppiert (Verwaltung / Inhalte)
- [x] Globals: SiteSettings (SEO, AI-Bots, Tracking, Adresse, Social), LaunchChecklist mit 14 Items
- [x] Plugins: Multi-Tenant, SEO, Lexical, S3-Storage (B2), Redirects
- [x] Versions/Drafts/Schedule-Publish auf Pages/Posts
- [x] Plausible Analytics self-hosted mit SSL
- [x] Demo-Site Reif und Partner: 15 Seiten, mit Bildern, Basic Auth, noindex
- [x] Lighthouse Demo: Perf 85, LCP 3.7s vs. Wix Original Perf 60, LCP 10.7s
- [x] Astro-Template-Skelett @wellewest/template-kmu (Base-Layout liest SiteSettings)

## 🔲 Was als Nächstes ansteht (Phase 3)

1. **Cal.com self-hosted** unter cal.wellewest.at (Termin-Booker)
2. **Block-System** ausbauen: Hero, Text+Bild, Galerie, FAQ, CTA, Team, Leistungs-Grid (in `@wellewest/blocks` package)
3. **Hotel-Template** (`@wellewest/template-hotel`)
4. **Gastro-Template** (`@wellewest/template-gastro`)
5. **CMS → Astro-Bridge:** generischer `[...slug].astro` Renderer der Pages/Posts aus dem CMS holt
6. **Webhook von Payload → Netlify-Build** bei Content-Save (für CMS-driven Sites)
7. **Brevo + Close-CRM** Integration für Forms-Block
8. **Backup-Pipeline**: täglicher pg_dump → B2 mit Object-Lock + Restore-Test
9. **Master-Dashboard** für WelleWest-Admins (alle Kunden-Übersicht)
10. **WelleWest-Werbebanner-System** (Banner-Collection global)
11. **Onboarding-Checkliste-Widget** im Tenant-CMS
12. **Reif-und-Partner Demo:**
    - Bilder zu AVIF/WebP konvertieren (Astro Image-Optimization) für besseren LCP
    - Kontaktformular an Brevo binden (aktuell nicht funktional)
    - Wenn Kunde grünes Licht gibt: noindex weg, Basic Auth weg, A-Record umziehen

## 🛠️ Häufige Operationen

**Coolify-Deploy triggern:**
```bash
source ~/.claude/keys.env
TOKEN=$(grep '^COOLIFY_API_TOKEN' ~/.claude/keys.env | sed "s/^COOLIFY_API_TOKEN=//;s/^'//;s/'$//")
APP_UUID=tw2o5k2zsa80s44dyu19axnf  # CMS, oder andere UUID
curl -s "http://178.105.75.15:8000/api/v1/deploy?uuid=$APP_UUID&force=true" \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
```

**Coolify-App-UUIDs:**
- `tw2o5k2zsa80s44dyu19axnf` — wellewest-cms (Payload)
- `sligctlqx2fqptgqxaulidfh` — rechtsanwaelte-villach-demo

**Payload-Migrations gegen Prod-DB ausführen** (bei Schema-Änderungen):
```bash
ssh -i ~/.ssh/wellewest_cms_ed25519 root@178.105.75.15 \
  "cd /tmp/payload-migrate && git pull && \
   docker run --rm --network coolify -e DATABASE_URL=... -e PAYLOAD_SECRET=... \
   -w /app/apps/cms-server wellewest-cms-migrate \
   bash -c 'pnpm payload migrate:create <name> && pnpm payload migrate'"
```

**SSH zum Server:**
```bash
ssh -i ~/.ssh/wellewest_cms_ed25519 root@178.105.75.15
```

## ⚠️ Wichtige Hinweise

1. **Postgres-Adapter `push: true`** funktioniert nur in dev mode — in prod muss `migrate:create` + `migrate` manuell laufen (über migrate-Image im Coolify-Network).
2. **Coolify-Repo muss public sein** für Build (Deploy-Keys waren auf Org-Level disabled, kann später aktiviert werden).
3. **Browser-Cache:** beim Demo-Site-Update Cmd+Shift+R für Hard-Reload, Caddy hat jetzt aber `Cache-Control: max-age=0` für HTML.
4. **Multi-Tenant-Plugin:** crashed bei leerer Tenants-Tabelle. Default-Tenant „WelleWest Demo" mit ID 1 muss existieren.
5. **Plan-Datei** mit voller Architektur-Doku liegt in `~/.claude/plans/die-wellewest-erstellt-aktuell-agile-moore.md` und als PDF auf dem Desktop.
6. **🚨 Test-Mails — Empfänger-Regel:** Test-E-Mails (Forms-Gateway, Brevo, etc.) dürfen **ausschließlich** an Nordsteg- oder WelleWest-Adressen geschickt werden. **Nie** an Kunden-Postfächer (z.B. `villach@reifundpartner.at`) oder beliebige Test-Adressen, auch nicht zu Validierungs-Zwecken. Beim Bauen/Testen Empfänger im n8n-Workflow / Code immer auf `info@wellewest.at` o.ä. setzen, erst beim echten Go-Live des Kunden auf die Kunden-Adresse umstellen.
