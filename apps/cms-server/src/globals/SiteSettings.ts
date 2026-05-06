import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: { de: 'Site-Einstellungen', en: 'Site Settings' },
  admin: {
    description: { de: 'Globale Einstellungen pro Tenant: SEO-Defaults, Tracking, AI-Bots, Suchmaschinen', en: 'Global settings per tenant' },
    group: { de: 'Verwaltung', en: 'Administration' },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { de: 'Allgemein', en: 'General' },
          fields: [
            { name: 'siteName', type: 'text', label: { de: 'Website-Name', en: 'Site Name' }, required: true },
            { name: 'siteUrl', type: 'text', label: { de: 'Live-URL', en: 'Live URL' } },
            { name: 'defaultMetaImage', type: 'upload', relationTo: 'media', label: { de: 'Standard-OG-Bild', en: 'Default OG Image' } },
            { name: 'logoLight', type: 'upload', relationTo: 'media', label: { de: 'Logo (Hell)', en: 'Logo (Light)' } },
            { name: 'logoDark', type: 'upload', relationTo: 'media', label: { de: 'Logo (Dunkel)', en: 'Logo (Dark)' } },
            { name: 'favicon', type: 'upload', relationTo: 'media', label: { de: 'Favicon', en: 'Favicon' } },
            {
              name: 'primaryColor',
              type: 'text',
              label: { de: 'Primärfarbe (Hex)', en: 'Primary Color (Hex)' },
              admin: { description: { de: 'z.B. #004AAD', en: 'e.g. #004AAD' } },
            },
          ],
        },
        {
          label: { de: 'SEO & Suchmaschinen', en: 'SEO & Search' },
          fields: [
            { name: 'metaTitleSuffix', type: 'text', label: { de: 'Meta-Titel-Suffix', en: 'Meta Title Suffix' }, admin: { description: { de: 'Wird an alle Seitentitel angehängt, z.B. „| Hotel Sonne"', en: 'Appended to all page titles' } } },
            { name: 'metaDescription', type: 'textarea', label: { de: 'Standard Meta-Beschreibung', en: 'Default Meta Description' } },
            {
              name: 'hideFromSearchEngines',
              type: 'checkbox',
              label: { de: 'Komplette Site vor Suchmaschinen verstecken (noindex)', en: 'Hide from search engines' },
              admin: { description: { de: 'Praktisch in der Bauphase', en: 'Useful during construction' } },
            },
            {
              name: 'searchConsoleVerification',
              type: 'text',
              label: { de: 'Google Search Console Verifizierung', en: 'Google Search Console Verification' },
              admin: { description: { de: 'Inhalt des Verifizierungs-Meta-Tags', en: 'Content of verification meta tag' } },
            },
          ],
        },
        {
          label: { de: 'AI-Bots', en: 'AI Bots' },
          description: { de: 'Steuere, welche AI-Crawler deine Inhalte für ihre Antworten nutzen dürfen', en: '' },
          fields: [
            { name: 'allowGptBot', type: 'checkbox', label: { de: 'OpenAI GPTBot erlauben (für ChatGPT-Suche und Training)', en: 'Allow GPTBot' }, defaultValue: true },
            { name: 'allowOaiSearchBot', type: 'checkbox', label: { de: 'OpenAI SearchBot erlauben (ChatGPT Search/Browse)', en: 'Allow OAI-SearchBot' }, defaultValue: true },
            { name: 'allowPerplexityBot', type: 'checkbox', label: { de: 'PerplexityBot erlauben', en: 'Allow PerplexityBot' }, defaultValue: true },
            { name: 'allowClaudeBot', type: 'checkbox', label: { de: 'ClaudeBot (Anthropic) erlauben', en: 'Allow ClaudeBot' }, defaultValue: true },
            { name: 'allowGoogleExtended', type: 'checkbox', label: { de: 'Google-Extended erlauben (Gemini Training)', en: 'Allow Google-Extended' }, defaultValue: true },
            { name: 'allowApplebotExtended', type: 'checkbox', label: { de: 'Applebot-Extended erlauben (Apple Intelligence)', en: 'Allow Applebot-Extended' }, defaultValue: true },
            { name: 'allowCcBot', type: 'checkbox', label: { de: 'CCBot erlauben (Common Crawl)', en: 'Allow CCBot' }, defaultValue: true },
            { name: 'allowBytespider', type: 'checkbox', label: { de: 'Bytespider erlauben (ByteDance)', en: 'Allow Bytespider' }, defaultValue: false },
          ],
        },
        {
          label: { de: 'Analytics & Tracking', en: 'Analytics & Tracking' },
          fields: [
            { name: 'plausibleEnabled', type: 'checkbox', label: { de: 'Plausible Analytics aktivieren (cookielos)', en: 'Enable Plausible Analytics' }, defaultValue: true },
            { name: 'plausibleDomain', type: 'text', label: { de: 'Plausible Domain', en: 'Plausible Domain' }, admin: { description: { de: 'z.B. hotel-sonne.at', en: '' } } },
            { name: 'ga4MeasurementId', type: 'text', label: { de: 'GA4 Measurement ID (mit Consent)', en: 'GA4 Measurement ID' }, admin: { description: { de: 'Format: G-XXXXXXXXXX', en: '' } } },
            { name: 'gtmContainerId', type: 'text', label: { de: 'Google Tag Manager Container ID', en: 'GTM Container ID' }, admin: { description: { de: 'Format: GTM-XXXXXXX', en: '' } } },
            { name: 'metaPixelId', type: 'text', label: { de: 'Meta Pixel ID', en: 'Meta Pixel ID' } },
            { name: 'metaCapiToken', type: 'text', label: { de: 'Meta Conversion API Token', en: 'Meta CAPI Token' } },
            { name: 'linkedInInsightTag', type: 'text', label: { de: 'LinkedIn Insight Tag Partner ID', en: 'LinkedIn Insight Partner ID' } },
            { name: 'tiktokPixelId', type: 'text', label: { de: 'TikTok Pixel ID', en: 'TikTok Pixel ID' } },
            { name: 'pinterestTagId', type: 'text', label: { de: 'Pinterest Tag ID', en: 'Pinterest Tag ID' } },
            {
              name: 'customHeadCode',
              type: 'code',
              label: { de: 'Custom Code <head>', en: 'Custom Head Code' },
              admin: { language: 'html', description: { de: 'HTML/Script-Tags für sehr spezielle Tools (Hotjar, Clarity etc.). Nur bei Bedarf nutzen.', en: '' } },
            },
            {
              name: 'customBodyCode',
              type: 'code',
              label: { de: 'Custom Code Ende </body>', en: 'Custom Body Code' },
              admin: { language: 'html' },
            },
          ],
        },
        {
          label: { de: 'Kontakt & Adresse', en: 'Contact & Address' },
          fields: [
            { name: 'companyName', type: 'text', label: { de: 'Firmenname', en: 'Company Name' } },
            { name: 'street', type: 'text', label: { de: 'Straße + Hausnummer', en: 'Street' } },
            { name: 'zip', type: 'text', label: { de: 'PLZ', en: 'ZIP' } },
            { name: 'city', type: 'text', label: { de: 'Ort', en: 'City' } },
            { name: 'country', type: 'text', label: { de: 'Land', en: 'Country' }, defaultValue: 'Österreich' },
            { name: 'phone', type: 'text', label: { de: 'Telefon', en: 'Phone' } },
            { name: 'email', type: 'email', label: { de: 'E-Mail', en: 'Email' } },
            { name: 'latitude', type: 'number', label: { de: 'Breitengrad', en: 'Latitude' } },
            { name: 'longitude', type: 'number', label: { de: 'Längengrad', en: 'Longitude' } },
          ],
        },
        {
          label: { de: 'Social Media', en: 'Social Media' },
          fields: [
            { name: 'facebookUrl', type: 'text', label: 'Facebook URL' },
            { name: 'instagramUrl', type: 'text', label: 'Instagram URL' },
            { name: 'linkedinUrl', type: 'text', label: 'LinkedIn URL' },
            { name: 'youtubeUrl', type: 'text', label: 'YouTube URL' },
            { name: 'tiktokUrl', type: 'text', label: 'TikTok URL' },
            { name: 'xUrl', type: 'text', label: 'X / Twitter URL' },
            { name: 'pinterestUrl', type: 'text', label: 'Pinterest URL' },
          ],
        },
      ],
    },
  ],
}
