# Cal.com Embed in wellewest.at (Netlify Marketing-Site)

**Stand:** 2026-05-13
**Cal-Instanz:** https://cal.wellewest.at (self-hosted auf Hetzner)
**Patrick-Slug:** `patrick/erstgespraech`

---

## Live-Setup-Schritt (einmalig, vor Embed)

Patrick muss sich einmal einloggen und den Onboarding-Wizard durchklicken, damit seine Public-Booking-Page aktiv wird:

1. https://cal.wellewest.at/auth/login öffnen
2. Einloggen mit `patrick.katholnig@wellewest.at` (Passwort siehe 1Password / `keys.env`)
3. Onboarding-Wizard durchklicken — Optionen wählen:
   - **Zeitzone:** Europe/Vienna
   - **Welcher Schritt auch immer:** schnell durchklicken, ist alles bereits in DB
4. Profile → Username muss `patrick` bleiben (sonst ändert sich URL)
5. Event Types prüfen: „Erstgespräch" (30 Min) sollte da sein

Test: https://cal.wellewest.at/patrick/erstgespraech sollte die Public-Booking-Page zeigen.

Wenn Slot-Picker ohne Termine zeigt: Schedule prüfen (Settings → Availability → Mo-Fr 9-17 Uhr aktiv).

---

## Variante A — Floating "Termin buchen"-Button (am einfachsten)

Den unten stehenden Code im **Layout** der Netlify-Site einbauen (z.B. `<Layout>`-Komponente oder `_app.tsx`/Footer), erscheint dann auf jeder Seite als floating Button rechts unten.

```html
<!-- Cal.com Embed Code — WelleWest Termin-Buchung -->
<script type="text/javascript">
(function (C, A, L) {
  let p = function (a, ar) { a.q.push(ar); };
  let d = C.document;
  C.Cal = C.Cal || function () {
    let cal = C.Cal;
    let ar = arguments;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      d.head.appendChild(d.createElement("script")).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1];
      api.q = api.q || [];
      if(typeof namespace === "string"){
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace], ar);
        p(cal, ["initNamespace", namespace]);
      } else p(cal, ar);
      return;
    }
    p(cal, ar);
  };
})(window, "https://cal.wellewest.at/embed/embed.js", "init");

Cal("init", "wellewest", {
  origin: "https://cal.wellewest.at"
});

Cal.ns.wellewest("floatingButton", {
  calLink: "patrick/erstgespraech",
  config: {
    layout: "month_view",
    theme: "auto"
  },
  buttonText: "Termin buchen",
  buttonColor: "#000000",
  buttonTextColor: "#ffffff",
  buttonPosition: "bottom-right"
});

Cal.ns.wellewest("ui", {
  hideEventTypeDetails: false,
  layout: "month_view"
});
</script>
```

**Style anpassen:** `buttonColor` / `buttonTextColor` mit den WelleWest-Brand-Farben tauschen (z.B. WelleWest-Orange).

---

## Variante B — Buchungs-Button irgendwo in der Seite

Für gezielte Buttons (z.B. „Beratung anfragen" auf der Kontakt-Seite). Cal-Embed-Script aus Variante A muss einmal global eingebunden sein, dann beliebig viele Buttons:

```html
<button data-cal-namespace="wellewest"
        data-cal-link="patrick/erstgespraech"
        data-cal-config='{"layout":"month_view","theme":"auto"}'>
  Jetzt 30-Min-Beratung buchen
</button>
```

Klick → Popup öffnet sich mit der Cal-Buchungs-UI.

---

## Variante C — Inline-Embed (eigene Termin-Seite)

Für eine dedizierte `wellewest.at/de/termin`-Seite, wo Cal direkt in die Seite eingebettet ist (kein Popup):

```html
<div style="width:100%;height:100%;overflow:scroll" id="cal-embed-erstgespraech"></div>

<script type="text/javascript">
(function (C, A, L) { /* ... gleicher Loader wie oben ... */ })(window, "https://cal.wellewest.at/embed/embed.js", "init");

Cal("init", "wellewest", { origin: "https://cal.wellewest.at" });

Cal.ns.wellewest("inline", {
  elementOrSelector: "#cal-embed-erstgespraech",
  calLink: "patrick/erstgespraech",
  config: {
    layout: "month_view",
    theme: "auto"
  }
});

Cal.ns.wellewest("ui", {
  hideEventTypeDetails: false,
  layout: "month_view"
});
</script>
```

---

## Für die Astro-Marketing-Site

Falls die wellewest.at-Site Astro nutzt, am besten als Astro-Komponente verpacken:

```astro
---
// src/components/CalEmbed.astro
export interface Props {
  calLink: string;        // z.B. "patrick/erstgespraech"
  mode?: 'floating' | 'inline' | 'button';
  buttonText?: string;
}
const { calLink = 'patrick/erstgespraech', mode = 'floating', buttonText = 'Termin buchen' } = Astro.props;
---

{mode === 'button' && (
  <button data-cal-namespace="wellewest"
          data-cal-link={calLink}
          data-cal-config='{"layout":"month_view","theme":"auto"}'
          class="btn btn-primary">
    {buttonText}
  </button>
)}

{mode === 'inline' && (
  <div id="cal-inline-embed" style="min-height:600px"></div>
)}

<script is:inline define:vars={{ calLink, mode }}>
  // Loader (once per page)
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal;
      let ar = arguments;
      if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const ns = ar[1];
        api.q = api.q || [];
        if (typeof ns === "string") { cal.ns[ns] = cal.ns[ns] || api; p(cal.ns[ns], ar); p(cal, ["initNamespace", ns]); } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, "https://cal.wellewest.at/embed/embed.js", "init");

  Cal("init", "wellewest", { origin: "https://cal.wellewest.at" });

  if (mode === 'floating') {
    Cal.ns.wellewest("floatingButton", {
      calLink: calLink,
      config: { layout: "month_view", theme: "auto" },
      buttonText: "Termin buchen",
      buttonColor: "#0e1f3d",
      buttonTextColor: "#ffffff",
      buttonPosition: "bottom-right"
    });
  } else if (mode === 'inline') {
    Cal.ns.wellewest("inline", {
      elementOrSelector: "#cal-inline-embed",
      calLink: calLink,
      config: { layout: "month_view", theme: "auto" }
    });
  }

  Cal.ns.wellewest("ui", {
    hideEventTypeDetails: false,
    layout: "month_view"
  });
</script>
```

Dann auf jeder Seite oder im Layout:

```astro
<CalEmbed mode="floating" />          <!-- Default: floating button überall -->
<CalEmbed mode="button" buttonText="Beratung anfragen" />  <!-- Inline-Button -->
```

---

## Branding-Optionen

Im Cal.com Admin unter Settings → Appearance kann gesetzt werden:
- Brand-Color (WelleWest-Orange)
- Logo (Cal-Buchungsseite zeigt WelleWest-Logo statt Cal.com)
- Dark/Light-Mode-Default
- White-Label (entfernt "powered by Cal.com")

---

## Test-URL

Nach Onboarding-Wizard-Abschluss prüfbar unter:

→ **https://cal.wellewest.at/patrick/erstgespraech**

Sollte zeigen:
- Patricks Profil (Name, Avatar)
- 30-Min-Erstgespräch-Event
- Verfügbare Slots Mo-Fr 9-17 Uhr nächsten 30 Tage
- Buchungs-Form (Name, E-Mail, Notizen)
- Bestätigungs-Mail kommt von `cal@wellewest.at` via Resend

---

## DNS-Records für Sender-Domain `cal@wellewest.at`

Bereits da (Resend nutzt `wellewest.at`-Domain die wir früher verifiziert haben):
- DKIM via `resend._domainkey.wellewest.at`
- SPF via `send.wellewest.at`
- Reply-Adresse: User-E-Mail (sodass Antworten beim Bucher landen)

Mails von Cal.com kommen also automatisch authentifiziert via Resend.
