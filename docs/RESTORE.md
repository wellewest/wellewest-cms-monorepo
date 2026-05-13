# WelleWest Disaster Recovery — Restore Runbook

**Stand:** 2026-05-13
**Verantwortlich:** Patrick (primär), [zweite Person noch zu benennen]

Dieses Runbook beschreibt, was zu tun ist wenn der WelleWest-CMS-Server kompromittiert oder zerstört wurde. Ziel: **vollständige Wiederherstellung in <30 Min**.

---

## 0. Bevor du anfängst — Lage einschätzen

| Symptom | Wahrscheinliche Ursache | Erste Maßnahme |
|---|---|---|
| Kein HTTPS-Zertifikat | Let's Encrypt-Rate-Limit oder DNS-Problem | `dig +short cms.wellewest.at` prüfen |
| 503 Bad Gateway | Container down | SSH + `docker ps` |
| 500 Server Error | Postgres-Verbindung weg | Logs vom CMS-Container |
| 401 unerwartet | fail2ban hat dich gebannt | Server-IP prüfen, `fail2ban-client unban <ip>` |
| **Server komplett down (Ping-Timeout)** | Hetzner-Hardware-Ausfall, Hack, OS-Tot | → Full Restore (Punkt 4) |
| **Daten kompromittiert (Verschlüsselung, Manipulation)** | Ransomware, Insider | → Full Restore mit altem Backup (Punkt 5) |

---

## 1. Zugang prüfen

```bash
# SSH
ssh -i ~/.ssh/wellewest_cms_ed25519 root@178.105.75.15

# Falls SSH down: Hetzner-Konsole
# https://console.hetzner.cloud — Server WelleWest CMS — Console
# Login als root (Passwort steht in 1Password)
```

**Wenn beide nicht gehen:** Hetzner-Support kontaktieren (rebuild from snapshot, falls aktiviert) oder neuen Server provisioneren.

---

## 2. Was alles gesichert ist

| Komponente | Speicherort | Aufbewahrung |
|---|---|---|
| Payload Postgres | `b2:wellewest-cms-assets/backups/daily/payload-cms_*.pgdump` | 30 Tage |
| n8n SQLite + Workflows | `b2:.../backups/daily/n8n_*.tar.gz` | 30 Tage |
| Plausible Postgres | `b2:.../backups/daily/plausible-pg_*.pgdump` | 30 Tage |
| Plausible ClickHouse | `b2:.../backups/daily/plausible-ch_*.tar.gz` | 30 Tage |
| Bilder/Medien (B2-Bucket) | `b2:wellewest-cms-assets/media/...` | unbegrenzt |
| Code | GitHub `wellewest/wellewest-cms-monorepo` | unbegrenzt |
| DNS-Einträge | bei easyname dokumentiert (siehe HANDOVER.md) | — |
| Coolify-Config | Server-local (kein offsite-Backup) | siehe Punkt 6 |

**NICHT gesichert (TODO):**
- Coolify-Datenbank selbst (Service-Configs)
- Letsencrypt-Cert-Cache (wird neu geholt)

---

## 3. Wiederherstellung — Einzelner Service kaputt

### 3a. CMS down, DB intakt

```bash
# Container neu starten
ssh root@178.105.75.15
docker restart tw2o5k2zsa80s44dyu19axnf-<id>

# Oder via Coolify-API
TOKEN=$(grep '^COOLIFY_API_TOKEN' ~/.claude/keys.env | cut -d'=' -f2- | tr -d "'")
curl -s "http://178.105.75.15:8000/api/v1/deploy?uuid=tw2o5k2zsa80s44dyu19axnf&force=true" \
  -H "Authorization: Bearer $TOKEN"
```

### 3b. CMS-Postgres korrupt — Restore aus B2

```bash
ssh root@178.105.75.15

# Letztes Backup aus B2 holen
LATEST=$(rclone ls b2:wellewest-cms-assets/backups/daily/ | grep payload-cms | sort -k2 | tail -1 | awk '{print $2}')
mkdir -p /tmp/restore && rclone copy "b2:wellewest-cms-assets/backups/daily/$LATEST" /tmp/restore/

# Postgres-Container stoppen + DB neu erstellen
PG=o4goc0u80gpnpbvq55tyrrbu  # aus HANDOVER.md
docker exec $PG psql -U payload -d postgres -c 'DROP DATABASE payload;'
docker exec $PG psql -U payload -d postgres -c 'CREATE DATABASE payload;'

# Restore einspielen
docker cp /tmp/restore/$LATEST $PG:/tmp/dump
docker exec $PG pg_restore -U payload -d payload --no-owner /tmp/dump

# CMS neu starten
docker restart tw2o5k2zsa80s44dyu19axnf-<id>
```

### 3c. n8n down

```bash
docker restart n8n-ks8xc039jjc3otu5a4qgl6xh
# Oder volle Coolify-Redeploy via API (UUID: ks8xc039jjc3otu5a4qgl6xh)
```

### 3d. n8n-Daten verloren

```bash
# Letztes n8n-Backup holen
LATEST=$(rclone ls b2:wellewest-cms-assets/backups/daily/ | grep n8n | sort -k2 | tail -1 | awk '{print $2}')
rclone copy "b2:wellewest-cms-assets/backups/daily/$LATEST" /tmp/

# Volume neu befüllen
VOL=$(docker volume ls -q | grep ks8xc039jjc3otu5a4qgl6xh_n8n-data)
docker stop n8n-ks8xc039jjc3otu5a4qgl6xh
docker run --rm -v ${VOL}:/dst -v /tmp:/src alpine \
  sh -c "rm -rf /dst/* && tar xzf /src/$LATEST -C /dst"
docker start n8n-ks8xc039jjc3otu5a4qgl6xh
```

---

## 4. Vollständiger Server-Restore (worst case)

**Annahme:** Hetzner-Server tot, neuer Server muss aufgesetzt werden.

### Schritt 1: Neuer Hetzner-Server
```bash
# Hetzner-Konsole: neuer CX33 in Falkenstein
# Ubuntu 24.04 LTS
# SSH-Key: wellewest_cms_ed25519
# Notiere die neue IP
NEW_IP=<neue-ip>
```

### Schritt 2: DNS umstellen
- easyname.com → wellewest.at → DNS verwalten
- Alle A-Records von alter IP `178.105.75.15` auf `$NEW_IP` umstellen:
  - `cms.wellewest.at`
  - `analytics.wellewest.at`
  - `n8n.wellewest.at`
  - `cal.wellewest.at`
  - `dev.wellewest.at`
  - `rechtsanwaelte-villach.wellewest.at`
  - (alle Kunden-Subdomains)
- **TTL:** auf 300 setzen während Migration

### Schritt 3: Coolify installieren
```bash
ssh -i ~/.ssh/wellewest_cms_ed25519 root@$NEW_IP
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
# Coolify läuft jetzt auf http://$NEW_IP:8000
```

### Schritt 4: Coolify-Setup
- Browser http://$NEW_IP:8000 → Admin-Account anlegen
- API-Token erstellen → in `keys.env` aktualisieren
- Projekt "WelleWest" anlegen

### Schritt 5: Postgres, n8n, Plausible neu deployen
Service-UUIDs aus HANDOVER.md:
- Payload-Postgres: aus `apps/cms-server/docker-compose.yml`
- n8n: docker-compose mit `n8n.wellewest.at`
- Plausible: docker-compose

### Schritt 6: Backups einspielen
```bash
# Tools auf neuem Server
apt-get install -y rclone

# rclone konfigurieren (aus keys.env)
mkdir -p /root/.config/rclone
cat > /root/.config/rclone/rclone.conf <<EOF
[b2]
type = b2
account = <B2_KEY_ID>
key = <B2_APPLICATION_KEY>
EOF

# Backups runterladen
mkdir -p /tmp/restore
rclone copy b2:wellewest-cms-assets/backups/daily/ /tmp/restore/

# Pro Backup-Datei: Punkt 3b/3d-Schritte durchgehen
```

### Schritt 7: CMS-App deployen
```bash
# Via Coolify-API neue App anlegen mit GitHub-Repo wellewest/wellewest-cms-monorepo
# Branch: main
# Build-Pack: nixpacks (oder Dockerfile)
# Env-Vars: DATABASE_URL, PAYLOAD_SECRET, B2_*, SERVER_URL aus keys.env
```

### Schritt 8: Backup-Pipeline reaktivieren
```bash
# /opt/wellewest-backup neu anlegen (aus Repo kopieren)
scp -r ~/Projects/wellewest-cms-monorepo/scripts/backup/ root@$NEW_IP:/opt/wellewest-backup/
ssh root@$NEW_IP "chmod +x /opt/wellewest-backup/backup.sh"

# Cron
echo "15 3 * * * root /opt/wellewest-backup/backup.sh" | ssh root@$NEW_IP "tee /etc/cron.d/wellewest-backup"
```

### Schritt 9: Verify
- https://cms.wellewest.at/admin — Login funktioniert
- Pages-Inhalte da
- Bilder werden geladen (B2-Storage testen)
- Forms via Demo-Site testen
- Backup manuell triggern: `/opt/wellewest-backup/backup.sh` → Slack-Notification kommt

**Geschätzte Gesamt-Zeit:** 20–30 Min (Hetzner-Provisioning + DNS-Propagation als längste Posten).

---

## 5. Ransomware / Manipulation — Restore aus altem Backup

Falls aktuelle Backups kompromittiert sind (Angreifer hatte Zugriff vor dem ersten Backup-Schaden):

```bash
# Älteres Backup wählen (z.B. 7 Tage alt)
rclone ls b2:wellewest-cms-assets/backups/daily/ | grep payload-cms | sort -k2 | tail -8 | head -1
# Datum prüfen, sicherstellen dass es VOR Kompromittierung war

# Alle Application-Keys rotieren BEVOR Restore:
# - Hetzner-Cloud-API-Token
# - Coolify-API-Token
# - B2-Application-Keys
# - Resend-API-Key
# - n8n-API-Key + Owner-Passwort
# - Slack-Bot-Token
# - GitHub-Tokens
# - SSH-Keys (alle wellewest_cms_*)

# Server neu (Punkt 4)
```

---

## 6. Backup-Hygiene (regelmäßig)

### Wöchentlich (Patrick)
- [ ] Slack-Notifications aus `#coworkvonniki` schaut: gab's Backup-Fehler?
- [ ] Uptime-Alerts: gab's Down-Zeiten?

### Monatlich
- [ ] **Restore-Test wiederholen** mit aktuellem Backup (siehe Quick-Test unten)
- [ ] B2-Speicherverbrauch checken: `rclone size b2:wellewest-cms-assets/backups/`
- [ ] Coolify-Update installieren (manuell, mit Snapshot-Pre)
- [ ] Hetzner-Server-OS-Updates: `apt update && apt upgrade -y && reboot`

### Quick-Test (5 Min)
```bash
ssh root@178.105.75.15
LATEST=$(rclone ls b2:wellewest-cms-assets/backups/daily/ | grep payload-cms | sort -k2 | tail -1 | awk '{print $2}')
mkdir -p /tmp/restore-test
rclone copy "b2:wellewest-cms-assets/backups/daily/$LATEST" /tmp/restore-test/

docker rm -f restore-test-pg 2>/dev/null
docker run -d --name restore-test-pg \
  -e POSTGRES_PASSWORD=test -e POSTGRES_USER=payload -e POSTGRES_DB=payload \
  -v /tmp/restore-test:/restore:ro postgres:16-alpine

sleep 5
docker exec restore-test-pg pg_restore -U payload -d payload --clean --if-exists --no-owner /restore/$LATEST 2>&1 | tail
docker exec restore-test-pg psql -U payload -d payload -tAc "SELECT count(*) AS table_count FROM pg_tables WHERE schemaname='public';"

docker rm -f restore-test-pg
rm -rf /tmp/restore-test
```

---

## 7. Notfall-Kontakte

| Was | Wer | Wie |
|---|---|---|
| **Server-Notfall** | Hetzner-Support | https://console.hetzner.cloud (Ticket) |
| **DNS-Notfall** | easyname | support@easyname.at |
| **Backblaze-Notfall** | B2-Support | support@backblaze.com |
| **Coolify-Notfall** | Discord | https://coolify.io/discord |
| **Code-Repo** | GitHub `wellewest`-Org | nicolasfabjan, patrick |
| **Zweite Person mit Zugang** | **NOCH ZU BENENNEN** | |

⚠️ **TODO Bus-Faktor:** zweite Person mit Coolify-Admin, SSH-Key, keys.env-Zugang einrichten. Aktuell Single-Point-of-Failure.

---

## 8. Lessons Learned (Stand: erster Restore-Test, 13.05.2026)

- ✅ Backup-Pipeline funktioniert (4 Files täglich, Lifecycle, Slack-Notification)
- ✅ Restore in <5 Sek für CMS-Postgres (153 KB Dump) — DB-Größe wird mit Kunden wachsen
- ✅ 38 Tabellen + Block-Daten + Users + Tenants vollständig wiederhergestellt
- ⏳ B2 Object-Lock noch nicht aktiv (Bucket war ohne erstellt) — restricted Application-Key als Mitigation geplant
- ⏳ Coolify-Config selbst nicht gesichert — TODO: cron + B2-Upload von `/data/coolify/source/.env`
- ⏳ Repo-JSON-Snapshot als 3. Backup-Schicht noch nicht implementiert
