# Liste der Sub-Auftragsverarbeiter — WelleWest Website-Abo

> ⚠️ **ENTWURF — anwaltlich zu prüfen.** Anlage 2 zum AVV.

Stand: 2026-05-13

Die folgenden Drittunternehmen (Sub-Auftragsverarbeiter) sind in die Verarbeitung personenbezogener Daten im Rahmen des Dienstes „WelleWest Website-Abo" eingebunden:

---

## 1. Server-Infrastruktur

| Anbieter | Hetzner Online GmbH |
|---|---|
| Sitz | Industriestr. 25, 91710 Gunzenhausen, Deutschland |
| Verarbeitete Daten | Alle vom Verantwortlichen eingebrachten Daten (Website-Inhalte, Kontaktformular-Eingänge, Benutzerkonten, Backups) |
| Verarbeitungsort | Rechenzentrum Falkenstein/Vogtland, Deutschland (EU) |
| Drittland-Übermittlung | nein |
| Rechtsgrundlage | AVV gemäß Art. 28 DSGVO direkt zwischen WelleWest und Hetzner |
| Garantien | ISO 27001 zertifiziert, DSGVO-konform |
| Datenschutz-Link | https://www.hetzner.com/legal/privacy-policy |

---

## 2. Backup- und Objekt-Speicher

| Anbieter | Backblaze Inc. |
|---|---|
| Sitz | 201 Baldwin Avenue, San Mateo, CA 94401, USA |
| Verarbeitete Daten | Verschlüsselte Backup-Dateien von Datenbanken und gehostete Mediendateien (Bilder, PDFs) |
| Verarbeitungsort | EU-Region (Amsterdam, Niederlande) — `eu-central-003` |
| Drittland-Übermittlung | Daten ausschließlich in EU-Region, Mutterunternehmen mit Sitz in USA |
| Rechtsgrundlage | Standardvertragsklauseln (SCC) der EU-Kommission |
| Garantien | TLS-verschlüsselte Übertragung, Verschlüsselung at-rest |
| Datenschutz-Link | https://www.backblaze.com/company/policies.html |

---

## 3. Transaktionale E-Mails (Kontaktformulare)

| Anbieter | Resend, Inc. |
|---|---|
| Sitz | 251 Little Falls Drive, Wilmington, DE 19808, USA |
| Verarbeitete Daten | Inhalte aus Kontaktformularen (Name, E-Mail, Telefon, freie Nachricht), die als E-Mail an den Verantwortlichen ausgeliefert werden |
| Verarbeitungsort | EU-Region (Frankfurt, Deutschland) — `eu-west-1` |
| Drittland-Übermittlung | Daten ausschließlich in EU-Region, Mutterunternehmen mit Sitz in USA |
| Rechtsgrundlage | Standardvertragsklauseln (SCC) der EU-Kommission |
| Garantien | DKIM/SPF-Signaturen, Logs maximal 90 Tage |
| Datenschutz-Link | https://resend.com/legal/privacy-policy |

---

## 4. Workflow-Automatisierung

| Anbieter | n8n GmbH (self-hosted) |
|---|---|
| Sitz | Erkrather Str. 401a, 40231 Düsseldorf, Deutschland |
| Verarbeitete Daten | Kontaktformular-Workflows, Form-Routing, Auto-Responder |
| Verarbeitungsort | Hetzner-Server (Falkenstein, DE) — keine Daten an n8n GmbH gesendet, da self-hosted |
| Drittland-Übermittlung | nein |
| Hinweis | Da n8n als Open-Source-Software auf eigener Infrastruktur (Hetzner) betrieben wird, fließen keine personenbezogenen Daten zu n8n GmbH. Diese Position dient lediglich der Transparenz über die eingesetzte Software. |

---

## 5. Analytics (DSGVO-konform, cookieless)

| Anbieter | Plausible Analytics (self-hosted) |
|---|---|
| Sitz | Plausible Insights OÜ, Estland (Software-Anbieter) |
| Verarbeitete Daten | Anonyme/pseudonyme Web-Analytics: keine IP-Speicherung, keine Cookies, kein Cross-Site-Tracking |
| Verarbeitungsort | Hetzner-Server (Falkenstein, DE) — Self-Hosted |
| Drittland-Übermittlung | nein |
| Hinweis | Plausible CE läuft auf eigener Infrastruktur. Keine personenbezogenen Daten verlassen den EU-Server. Da keine personenbezogenen Daten verarbeitet werden, ist Plausible CE im rechtlichen Sinne kein Sub-Auftragsverarbeiter — wird hier für Transparenz aufgeführt. |

---

## 6. Code-Versionsverwaltung

| Anbieter | GitHub, Inc. (Microsoft) |
|---|---|
| Sitz | 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA |
| Verarbeitete Daten | Quellcode der Kundenwebsite, Konfigurationen — **keine** personenbezogenen Daten der Endkunden des Verantwortlichen |
| Verarbeitungsort | USA |
| Drittland-Übermittlung | ja, USA |
| Rechtsgrundlage | Standardvertragsklauseln (SCC), Data Processing Addendum |
| Garantien | EU-US Data Privacy Framework (Microsoft zertifiziert) |
| Datenschutz-Link | https://docs.github.com/en/site-policy/privacy-policies/github-data-protection-agreement |

---

## 7. Hosting Live-Site (optional, Default-Konfiguration)

| Anbieter | Netlify, Inc. |
|---|---|
| Sitz | 512 2nd Street, San Francisco, CA 94107, USA |
| Verarbeitete Daten | Statische HTML/CSS/JS-Auslieferung an Endbenutzer, Logs (IP, User-Agent) für maximal 7 Tage |
| Verarbeitungsort | Globales CDN, EU-Edge-Server bevorzugt |
| Drittland-Übermittlung | ja, möglicherweise USA bei Cache-Misses |
| Rechtsgrundlage | Standardvertragsklauseln (SCC), DPA mit Netlify |
| Garantien | EU-US Data Privacy Framework |
| Datenschutz-Link | https://www.netlify.com/privacy/ |
| Alternative | Auf Wunsch des Verantwortlichen kann die Live-Site auf Hetzner-Server gehostet werden (rein in DE, kein US-Anbieter erforderlich). |

---

## 8. DNS-Verwaltung (für Subdomains von wellewest.at)

| Anbieter | easyname GmbH |
|---|---|
| Sitz | Canettistraße 5/10, 1100 Wien, Österreich |
| Verarbeitete Daten | DNS-Anfragen (technische Routing-Daten, keine personenbezogenen Daten) |
| Verarbeitungsort | EU |
| Drittland-Übermittlung | nein |
| Datenschutz-Link | https://www.easyname.at/de/datenschutz |
| Hinweis | Betrifft nur Subdomains unter `wellewest.at`. Die Hauptdomain des Verantwortlichen liegt bei dessen eigenem Anbieter und ist nicht Gegenstand dieses Dienstes. |

---

## 9. Optionale Marketing-Tools (nur bei aktiver Auswahl durch den Verantwortlichen)

Folgende Sub-Auftragsverarbeiter werden **ausschließlich bei expliziter Aktivierung** durch den Verantwortlichen eingebunden und erfordern entsprechende Einwilligung der Endkunden über Cookie-Banner:

| Anbieter | Zweck | Sitz | Drittland |
|---|---|---|---|
| Google LLC (Google Analytics 4) | Web-Analytics mit Cookies | USA | ja (SCC, DPF) |
| Meta Platforms Inc. (Meta-Pixel, CAPI) | Conversion-Tracking | USA | ja (SCC) |
| Brevo (Sendinblue) | Newsletter-Versand, Anmeldung | Frankreich | nein (EU) |
| Close.io Inc. (Close CRM) | Lead-Management | USA | ja (SCC) |
| Cal.com (self-hosted) | Termin-Buchung | Hetzner (DE) | nein |

Diese Anbieter werden je Verantwortlichem individuell freigeschaltet und in einer separaten Liste pro Mandant dokumentiert.

---

## Drittland-Übermittlungen — Zusammenfassung

| Anbieter | Drittland | Grundlage |
|---|---|---|
| Hetzner | nein | — |
| Backblaze | EU-Region | SCC für Mutterges. |
| Resend | EU-Region | SCC für Mutterges. |
| n8n | nein (self-hosted) | — |
| Plausible | nein (self-hosted) | — |
| GitHub | USA | SCC, DPF |
| Netlify | USA (möglich) | SCC, DPF |
| easyname | nein | — |

Alle Drittland-Übermittlungen sind durch Standardvertragsklauseln gemäß Beschluss (EU) 2021/914 und ggf. zusätzliche technische und organisatorische Maßnahmen abgesichert.

---

## Versionierung

| Version | Datum | Änderung |
|---|---|---|
| 1.0 | 2026-05-13 | Erstfassung — Hetzner, Backblaze, Resend, n8n, Plausible, GitHub, easyname |

Bei Änderungen werden Verantwortliche mindestens 14 Tage im Voraus per E-Mail informiert (siehe AVV § 4 Abs. 2).
