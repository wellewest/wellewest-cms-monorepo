# Datenschutzerklärung — Template für WelleWest-Kunden-Sites

> ⚠️ **ENTWURF — vor produktiver Verwendung anwaltlich anpassen.**
> Diese Vorlage ist ein Grundgerüst. Sie muss vom Kunden auf konkrete Verarbeitungstätigkeiten angepasst werden (z.B. ob Newsletter, GA4, Meta-Pixel, Shopify usw. eingesetzt werden). Platzhalter `{{...}}` sind kundenspezifisch zu ersetzen.

Stand der Vorlage: 2026-05-13

---

# Datenschutzerklärung

## 1. Verantwortlicher

Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:

{{KUNDE_FIRMA}}
{{KUNDE_STRASSE}}
{{KUNDE_PLZ}} {{KUNDE_ORT}}
{{KUNDE_LAND}}

E-Mail: {{KUNDE_EMAIL}}
Telefon: {{KUNDE_TELEFON}}

UID-Nummer / USt-IdNr.: {{KUNDE_UID}}
Firmenbuch-Nummer: {{KUNDE_FB_NR}}

---

## 2. Hosting und technische Bereitstellung

Diese Website wird im Auftrag des Verantwortlichen technisch betrieben durch:

**Nordsteg OnlineMarketing eU** (Marke: WelleWest)
{{NORDSTEG_ANSCHRIFT}}
E-Mail: info@wellewest.at

Mit WelleWest besteht ein Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO.

### Eingesetzte Sub-Auftragsverarbeiter

| Anbieter | Zweck | Verarbeitungsort |
|---|---|---|
| Hetzner Online GmbH | Server-Hosting | Falkenstein, Deutschland |
| Backblaze Inc. (B2) | Backup-Speicher | Amsterdam, Niederlande (EU-Region) |
| Resend Inc. | Versand von E-Mails aus Kontaktformularen | Frankfurt, Deutschland (EU-Region) |
| easyname GmbH | DNS-Verwaltung | Wien, Österreich |

Bei sämtlichen Anbietern werden Daten ausschließlich in EU-Rechenzentren verarbeitet, soweit dies technisch möglich ist. Bei Drittland-Übermittlungen werden Standardvertragsklauseln gemäß Art. 46 DSGVO eingesetzt.

---

## 3. Server-Logfiles

Beim Aufruf dieser Website werden durch den Hosting-Provider technische Daten in Server-Logfiles gespeichert:

- IP-Adresse (anonymisiert nach 24 Stunden)
- Datum und Uhrzeit des Zugriffs
- Aufgerufene URL
- Übertragene Datenmenge
- User-Agent (Browser-Identifizierung)
- Referrer-URL (vorherige Seite)

**Zweck:** Sicherstellung des stabilen Betriebs, Erkennung und Abwehr von Angriffen.
**Rechtsgrundlage:** Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem fehlerfreien und sicheren Betrieb der Website).
**Speicherdauer:** 14 Tage. Eine Zusammenführung mit anderen Datenquellen erfolgt nicht.

---

## 4. Kontaktformular

Wenn Sie unser Kontaktformular nutzen, werden folgende Daten erhoben und an uns übermittelt:

- Vor- und Nachname
- E-Mail-Adresse
- Telefonnummer (sofern angegeben)
- Inhalt Ihrer Nachricht
- Zeitpunkt der Absendung

**Zweck:** Bearbeitung Ihrer Anfrage.
**Rechtsgrundlage:** Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Kommunikation mit Interessenten).
**Speicherdauer:** Bis zur abschließenden Bearbeitung Ihrer Anfrage und darüber hinaus, soweit eine gesetzliche Aufbewahrungspflicht besteht (in Österreich z.B. 7 Jahre für geschäftliche Korrespondenz).

Die Übermittlung des E-Mail-Versands erfolgt über **Resend Inc.** (EU-Region Frankfurt). Hierbei werden die genannten Daten zur Auslieferung an unsere Empfangs-Postfächer weitergeleitet.

---

## 5. Web-Analyse mit Plausible

Diese Website nutzt **Plausible Analytics**, ein datenschutzfreundliches Open-Source-Analytics-Tool, das auf eigenen Servern in Falkenstein, Deutschland betrieben wird.

Plausible Analytics:
- ✅ verwendet **keine Cookies**
- ✅ speichert **keine IP-Adressen**
- ✅ erfasst **keine personenbezogenen Daten**
- ✅ ermöglicht **kein** Cross-Site-Tracking
- ✅ ist **DSGVO-konform ohne Cookie-Banner-Pflicht** (Empfehlung des französischen CNIL)

Erfasst werden lediglich anonyme, aggregierte Daten zur Nutzung der Website:
- Aufgerufene Seiten
- Verweildauer (anonymisiert)
- Herkunftsland (über Geolocation der IP, ohne IP-Speicherung)
- Geräte-Typ (Mobile / Desktop)
- Verweisende Quelle (z.B. Google, andere Websites)

**Rechtsgrundlage:** Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Auswertung des Nutzerverhaltens zur Optimierung des Webangebots).

---

## 6. Cookies

Diese Website verwendet:

{{IF_NUR_PLAUSIBLE}}
**Ausschließlich technisch notwendige Cookies**, falls überhaupt — die Basis-Analyse (Plausible) verwendet keine Cookies.
{{ELSE_IF_MARKETING_COOKIES}}
- **Technisch notwendige Cookies:** für die Funktion der Website unverzichtbar (z.B. Session-Cookies)
- **Marketing-Cookies:** für Werbe- und Tracking-Zwecke (z.B. Google Analytics, Meta-Pixel)

Marketing-Cookies werden nur gesetzt, wenn Sie diesen über unser Cookie-Banner ausdrücklich zugestimmt haben (Art. 6 Abs. 1 lit. a DSGVO). Sie können Ihre Einwilligung jederzeit über den Cookie-Banner widerrufen.
{{END_IF}}

---

{{IF_GA4}}
## 7. Google Analytics 4 (nur mit Einwilligung)

Bei erteilter Einwilligung nutzt diese Website **Google Analytics 4**, einen Webanalyse-Dienst von Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.

**Verarbeitete Daten:** Anonymisierte IP-Adresse (IP-Anonymisierung aktiviert), Geräte- und Browser-Informationen, Nutzungsverhalten auf der Website, Conversions.

**Rechtsgrundlage:** Art. 6 Abs. 1 lit. a DSGVO (Einwilligung über Cookie-Banner).

**Drittland-Übermittlung:** Daten werden an Google LLC in den USA übermittelt. Google ist nach dem EU-US Data Privacy Framework zertifiziert. Standardvertragsklauseln gemäß Art. 46 DSGVO werden ergänzend genutzt.

**Widerruf der Einwilligung:** über den Cookie-Banner jederzeit möglich. Zusätzlich Browser-Add-on: https://tools.google.com/dlpage/gaoptout

Datenschutzhinweise Google: https://policies.google.com/privacy
{{END_IF}}

---

{{IF_META_PIXEL}}
## 8. Meta-Pixel und Conversions API (nur mit Einwilligung)

Bei erteilter Einwilligung nutzt diese Website das **Meta-Pixel** und die **Conversions API** der Meta Platforms Ireland Limited zur Messung von Werbeerfolg und zur Ausspielung gezielter Werbung auf Facebook und Instagram.

**Verarbeitete Daten:** anonymisierte Geräte-Informationen, Nutzungsverhalten, Conversion-Ereignisse. Bei Conversions API zusätzlich gehashte E-Mail/Telefon (Server-Side, verschlüsselt).

**Rechtsgrundlage:** Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).

**Drittland-Übermittlung:** USA, SCC + EU-US Data Privacy Framework.

Datenschutzhinweise Meta: https://www.facebook.com/policy.php
{{END_IF}}

---

{{IF_NEWSLETTER}}
## 9. Newsletter

Bei Anmeldung zu unserem Newsletter werden Ihre E-Mail-Adresse und der Anmeldezeitpunkt gespeichert.

**Zweck:** Versand des Newsletters.
**Rechtsgrundlage:** Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
**Speicherdauer:** Bis zum Widerruf der Einwilligung.

Versand erfolgt über **{{NEWSLETTER_PROVIDER}}**. Die Daten werden im Rahmen eines AVV-Vertrags verarbeitet.

**Widerruf:** Über den Abmelde-Link in jeder Newsletter-E-Mail oder per E-Mail an {{KUNDE_EMAIL}}.
{{END_IF}}

---

## 10. Rechte der Betroffenen

Sie haben das Recht:

- **Auskunft** über die zu Ihrer Person gespeicherten Daten zu verlangen (Art. 15 DSGVO)
- **Berichtigung** unrichtiger Daten zu fordern (Art. 16 DSGVO)
- **Löschung** Ihrer Daten zu verlangen (Art. 17 DSGVO), soweit keine Aufbewahrungspflicht entgegensteht
- **Einschränkung der Verarbeitung** zu verlangen (Art. 18 DSGVO)
- **Datenübertragbarkeit** zu fordern (Art. 20 DSGVO)
- **Widerspruch gegen die Verarbeitung** einzulegen (Art. 21 DSGVO)
- bei der zuständigen **Aufsichtsbehörde Beschwerde** einzulegen:
  - **Österreich:** Österreichische Datenschutzbehörde, Barichgasse 40-42, 1030 Wien, https://www.dsb.gv.at
  - **Deutschland:** Zuständige Landesdatenschutzbehörde

Zur Wahrnehmung Ihrer Rechte wenden Sie sich bitte an: **{{KUNDE_EMAIL}}**

---

## 11. Datensicherheit

Wir setzen technische und organisatorische Maßnahmen (TOM) ein, um Ihre Daten gegen unbefugten Zugriff, Verlust oder Manipulation zu schützen:

- TLS-Verschlüsselung (HTTPS) für die gesamte Website
- Tägliche verschlüsselte Backups
- Zugriffsschutz auf Verwaltungs-Systeme (Bcrypt-Passwort-Hashing, Account-Lockout, Rate-Limiting)
- Regelmäßige Sicherheits-Updates und Wartung
- Zertifizierte EU-Rechenzentren (ISO 27001)

---

## 12. Änderungen dieser Datenschutzerklärung

Wir behalten uns vor, diese Datenschutzerklärung an geänderte rechtliche oder tatsächliche Verhältnisse anzupassen. Die jeweils aktuelle Version ist unter {{KUNDE_WEBSITE}}/datenschutz abrufbar.

Stand: **{{DATUM_LETZTE_AKTUALISIERUNG}}**

---

## Hinweis zur Verwendung dieser Vorlage

Diese Vorlage wurde von WelleWest erstellt und ist als Ausgangspunkt für die Datenschutzerklärung von Kunden-Websites gedacht. **Vor produktivem Einsatz muss die Datenschutzerklärung an die konkreten Verarbeitungstätigkeiten des Kunden angepasst und idealerweise anwaltlich geprüft werden.**

Mögliche zusätzliche Themen, die zu ergänzen sind (je nach Kunden-Setup):
- Online-Shop-Funktionen (Bezahldienstleister, Versanddienstleister)
- Buchungssysteme (Hotelbird, Cultuzz, Aleno)
- Termin-Tools (Cal.com)
- Social-Media-Plugins
- Karten-Dienste (Google Maps, OpenStreetMap)
- Video-Embeds (YouTube, Vimeo)
- Schriftarten (Google Fonts vs. self-hosted)
