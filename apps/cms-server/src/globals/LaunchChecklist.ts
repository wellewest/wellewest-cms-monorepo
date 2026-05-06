import type { GlobalConfig } from 'payload'

export const LaunchChecklist: GlobalConfig = {
  slug: 'launch-checklist',
  label: { de: 'Launch-Checkliste', en: 'Launch Checklist' },
  admin: {
    description: { de: 'To-dos für Pre- und Post-Launch jedes Kunden. Status mit grünem Haken markieren.', en: 'Pre- and post-launch tasks' },
    group: { de: 'Verwaltung', en: 'Administration' },
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: { de: 'Aufgaben', en: 'Tasks' },
      defaultValue: [
        { title: 'Google Search Console verifizieren + Sitemap einreichen', status: 'open', responsible: 'wellewest' },
        { title: 'Bing Webmaster Tools verifizieren', status: 'open', responsible: 'wellewest' },
        { title: 'Google My Business / Unternehmensprofil aktualisieren', status: 'open', responsible: 'kunde' },
        { title: 'Plausible-Site eingerichtet, Tracking-Test durchgeführt', status: 'open', responsible: 'wellewest' },
        { title: 'GA4-Property + Conversion-Events (falls aktiv)', status: 'open', responsible: 'wellewest' },
        { title: 'Meta Business Manager Domain verifiziert (falls Meta Ads)', status: 'open', responsible: 'beide' },
        { title: 'Impressum + Datenschutz + AGB im CMS eingetragen', status: 'open', responsible: 'kunde' },
        { title: 'Cookie-Banner-Einstellungen geprüft', status: 'open', responsible: 'wellewest' },
        { title: 'Newsletter-Anbindung getestet', status: 'open', responsible: 'wellewest' },
        { title: '404-Seite und Favicon gesetzt', status: 'open', responsible: 'wellewest' },
        { title: 'OG-Images für Hauptseiten gepflegt', status: 'open', responsible: 'wellewest' },
        { title: 'Backup-Restore-Test bestanden', status: 'open', responsible: 'wellewest' },
        { title: 'Kunden-Schulung absolviert', status: 'open', responsible: 'wellewest' },
        { title: 'Lighthouse-Score > 90 (Performance, SEO, Accessibility)', status: 'open', responsible: 'wellewest' },
      ],
      fields: [
        { name: 'title', type: 'text', required: true, label: { de: 'Aufgabe', en: 'Task' } },
        { name: 'description', type: 'textarea', label: { de: 'Beschreibung / Hinweise', en: 'Description' } },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'open',
          options: [
            { label: { de: '⬜ Offen', en: 'Open' }, value: 'open' },
            { label: { de: '🟡 In Bearbeitung', en: 'In Progress' }, value: 'in-progress' },
            { label: { de: '✅ Erledigt', en: 'Done' }, value: 'done' },
            { label: { de: '⏭️ Übersprungen', en: 'Skipped' }, value: 'skipped' },
          ],
        },
        {
          name: 'responsible',
          type: 'select',
          required: true,
          defaultValue: 'wellewest',
          options: [
            { label: 'WelleWest', value: 'wellewest' },
            { label: { de: 'Kunde', en: 'Customer' }, value: 'kunde' },
            { label: { de: 'Beide', en: 'Both' }, value: 'beide' },
          ],
        },
        { name: 'dueDate', type: 'date', label: { de: 'Fälligkeit', en: 'Due Date' }, admin: { date: { pickerAppearance: 'dayOnly' } } },
        { name: 'helpLink', type: 'text', label: { de: 'Hilfe-Link', en: 'Help Link' } },
        { name: 'completedAt', type: 'date', label: { de: 'Erledigt am', en: 'Completed At' }, admin: { date: { pickerAppearance: 'dayOnly' } } },
      ],
    },
  ],
}
