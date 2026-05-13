# Patrick Katholnig — Bus-Faktor-Briefing

**Status:** zweite Person mit technischem Vollzugang zum WelleWest-Stack.
**Stand:** 2026-05-13

Dieses Dokument fasst zusammen, was Patrick wissen + können muss, um im Notfall die WelleWest-Infrastruktur übernehmen zu können. Im Alltag muss Patrick nichts davon tun — das ist reine **break-glass-Absicherung** falls Niki länger nicht verfügbar ist.

---

## 0. Übersicht — was läuft wo

```
                            ┌─────────────────────────────────────┐
                            │   Hetzner CX33 (178.105.75.15)      │
                            │   Falkenstein, DE                   │
                            │                                      │
                            │   Coolify (verwaltet alles)         │
                            │     ├─ Payload CMS (cms.wellewest.at) │
                            │     ├─ Postgres (für Payload)       │
                            │     ├─ n8n (n8n.wellewest.at)       │
                            │     ├─ Plausible (analytics.wellewest.at) │
                            │     ├─ Caddy Dev-Sandbox (dev.wellewest.at) │
                            │     └─ Kunden-Sites (rechtsanwaelte-villach.wellewest.at, ...) │
                            └─────────────────────────────────────┘
                                        │
                                        ├─→ Backblaze B2
                                        │   - wellewest-cms-assets (Bilder)
                                        │   - wellewest-backups (immutable, Object Lock 31d)
                                        │
                                        ├─→ Resend (Form-Mails)
                                        │   forms@wellewest.at
                                        │
                                        └─→ GitHub Org "wellewest"
                                            - wellewest-cms-monorepo (Code)
                                            - wellewest-customer-* (Kunden-Repos)
```

---

## 1. Zugänge die du bekommst

| System | URL | E-Mail | Initial-Passwort | Was du machen kannst |
|---|---|---|---|---|
| **Coolify** | http://178.105.75.15:8000 | patrick.katholnig@wellewest.at | `WW_wt1aegRyvGvO` | Alle Container starten/stoppen, deployen, Logs lesen |
| **Payload CMS** | https://cms.wellewest.at/admin | patrick.katholnig@wellewest.at | `WW_da9NlCAePaoN` | Super-Admin: alle Kunden-Inhalte editieren, User verwalten |
| **n8n** | https://n8n.wellewest.at | patrick.katholnig@wellewest.at | siehe Invite-Link unten | Workflows lesen + bauen (Member-Rolle) |
| **n8n Notfall-Owner** | https://n8n.wellewest.at | info@wellewest.at | siehe 1Password | Vollzugriff inkl. User-Verwaltung |
| **Slack** | nordsteg.slack.com | patrick.katholnig@... | dein bestehender Slack-Account | Backup-Status, Uptime-Alerts in #coworkvonniki |
| **GitHub** | github.com/wellewest | dein GitHub-Account | Org-Invite kommt von Niki | Code lesen + committen |

**n8n-Invite:** Öffne https://n8n.wellewest.at/signup?inviterId=0525a259-7f04-4c97-9131-2f0fd186f6e0&inviteeId=02ba99ae-4d62-4829-ab75-bce159325000 und setze dein Passwort.

**WICHTIG bei erster Anmeldung:** Sofort alle Initial-Passwörter ändern. Idealerweise in 1Password speichern.

### Zugänge die nicht-Self-Service sind

Folgende Credentials liegen in **Nikis 1Password** und müssen bei Niki angefragt werden (oder im Notfall auf seinem Mac in `~/.claude/keys.env` gesucht werden):

- **SSH-Key zum Hetzner-Server** — Patrick muss seinen eigenen Public-Key liefern, Niki fügt ihn `/root/.ssh/authorized_keys` hinzu. Bis dahin: SSH-Key in 1Password als „WelleWest Hetzner SSH Key" geteilt.
- **B2-Master-Key + Restricted-Backup-Key** — in 1Password als „WelleWest Backblaze"
- **Resend-Account-Login** — in 1Password als „WelleWest Resend"
- **easyname-Login** (DNS-Verwaltung) — in 1Password als „WelleWest easyname"
- **Hetzner-Cloud-Login** — in 1Password als „WelleWest Hetzner"
- **GitHub-Org-Admin** — Niki muss Patrick als Org-Owner einladen (https://github.com/orgs/wellewest/people)

---

## 2. Was im Notfall zu tun ist

### Szenario A: Kunde meldet „Website geht nicht"

1. **Slack-Channel `#coworkvonniki`** öffnen — gab's eine Uptime-Alert-Nachricht?
2. Falls ja: Service neu starten via Coolify-UI (siehe Übersicht: jeder Service hat „Deploy"-Button)
3. Falls Site offline aber kein Alert: https://uptimerobot.com (oder so ähnlich) — wir haben **eigenes n8n-basiertes Monitoring**, das pingt alle 5 Min. Wenn das auch nicht reagiert, ist evtl. der Server selbst down.

### Szenario B: Server selbst down

1. https://console.hetzner.cloud → WelleWest CMS Server → Status checken
2. Wenn down: Hetzner-Konsole (Rescue-Mode) → Server starten
3. Wenn DB korrupt → Restore via `docs/RESTORE.md`

### Szenario C: Niki ist länger weg + irgendwas geht kaputt

**Lies zuerst:** `docs/RESTORE.md` — das ist das Hauptdokument für alle DR-Szenarien.

**Wichtigste Befehle:**

```bash
# SSH (mit deinem eigenen Key, sobald Niki den autorisiert hat)
ssh -i ~/.ssh/wellewest_cms_ed25519 root@178.105.75.15

# Alle Container auflisten
docker ps

# Logs eines Containers
docker logs <container-name>

# Letztes Backup aus B2 holen
ssh root@178.105.75.15
rclone ls b2-backup:wellewest-backups/daily/ | tail -10
```

**Coolify-API für Re-Deploys:**

```bash
# .env auf Nikis Mac: COOLIFY_API_TOKEN
# Alle Services siehe Coolify-UI

# Beispiel: CMS neu deployen
TOKEN=<token>
curl -s "http://178.105.75.15:8000/api/v1/deploy?uuid=tw2o5k2zsa80s44dyu19axnf&force=true" \
  -H "Authorization: Bearer $TOKEN"
```

### Szenario D: Datenleck / Hack

1. **Sofort:** alle API-Tokens rotieren (Liste in `docs/RESTORE.md` Punkt 5)
2. Server vom Netz nehmen: Hetzner-Konsole → Firewall „deny all incoming" temporär
3. Backups VOR Kompromittierung holen (Object Lock schützt automatisch 31 Tage)
4. Sicherheitsbehörden + betroffene Kunden informieren (siehe AVV § 3 Abs. 5: 24h-Meldefrist)

---

## 3. Was Patrick im Alltag tun könnte

Falls Patrick aktiv mit-betreut (statt nur Notfall-Backup):

- Kundenanfragen via CMS bearbeiten (Inhalte updaten)
- Neue Kunden anlegen (siehe Cloning-Workflow, Phase 3 in HANDOVER.md)
- Slack-Channel `#coworkvonniki` auf Backup-Reports + Uptime-Alerts beobachten
- Bei kritischen Updates (Coolify, Hetzner-OS): mit Niki abstimmen, Pre-Snapshot, dann installieren

---

## 4. Was Patrick NIEMALS tun darf

- ❌ Master-B2-Key auf den Hetzner-Server packen (nur restricted Key dort)
- ❌ Backup-Bucket-Object-Lock deaktivieren (wäre Compliance-Verstoß, würde 30-Tage-Schutz brechen)
- ❌ Production-DB direkt editieren ohne Backup vorher
- ❌ Coolify auto-Update ungeprüft installieren (immer Pre-Snapshot)
- ❌ CMS-User mit Super-Admin-Rolle für Kunden erstellen (Kunden = Owner-Rolle auf ihrem Tenant)
- ❌ Test-Mails an Kunden-E-Mail-Adressen senden (Resend-Test nur an wellewest.at / nordsteg.at-Mails)

---

## 5. Wichtige Dokumente

| Dokument | Ort | Was |
|---|---|---|
| **HANDOVER.md** | Repo-Root | Komplette Übersicht aller Systeme, Container, Domains, Pfade |
| **RESTORE.md** | docs/ | DR-Runbook für jeden Ausfall-Typ |
| **AVV-ENTWURF.md** | docs/legal/ | Auftragsverarbeitungsvertrag (in anwaltlicher Prüfung) |
| **AGB-ENTWURF.md** | docs/legal/ | Service-AGB (in anwaltlicher Prüfung) |
| **Sub-Auftragsverarbeiter.md** | docs/legal/ | Liste aller Sub-Prozessoren |

---

## 6. Was Niki noch für dich vorbereiten muss

Bevor du voll einsatzfähig bist:

- [ ] **GitHub-Org-Invite** schicken (Niki → github.com/orgs/wellewest/people → „Invite member")
- [ ] **SSH-Key** von Patrick einsammeln (`~/.ssh/id_ed25519.pub`) und auf Server hochladen
- [ ] **1Password-Vault „WelleWest"** mit Patrick teilen, enthält:
  - Hetzner-Cloud-Login
  - easyname-Login (DNS)
  - Backblaze-Login (B2)
  - Resend-Login
  - WelleWest-Brevo-Login (falls aktiv)
  - SSH-Private-Key
  - Coolify-API-Token + alle Service-UUIDs
- [ ] **Slack-Channel `#coworkvonniki`** Patrick als Member adden
- [ ] **30-Min-Walkthrough** mit Patrick: Coolify-UI, CMS-Admin, RESTORE.md durchspielen

---

## 7. Kontakt im Notfall

| Kategorie | Wer | Wie |
|---|---|---|
| **Hetzner-Hardware** | Hetzner-Support | console.hetzner.cloud (Ticket) |
| **DNS-Notfall** | easyname-Support | support@easyname.at, +43 1 343 27 67 |
| **Backblaze-Notfall** | B2-Support | support@backblaze.com |
| **Coolify-Notfall** | Coolify Discord | https://coolify.io/discord |
| **Niki** | Nicolas Fabjan | siehe interner Kontaktliste |

---

**Letzter Schritt:** Dieses Dokument lesen + Niki bestätigen dass du es verstanden hast. Dann seid ihr offiziell Bus-Faktor-2. 🚌👍
