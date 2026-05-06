import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { de: 'Medien-Datei', en: 'Media' },
    plural: { de: 'Medien', en: 'Media' },
  },
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 400, position: 'centre' },
      { name: 'medium', width: 800, position: 'centre' },
      { name: 'hero', width: 1600, position: 'centre' },
    ],
    formatOptions: {
      format: 'webp',
      options: { quality: 88 },
    },
    // Hartes Limit: 10 MB
    // Wird via S3-Adapter (Backblaze B2) gehostet
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alternativtext (Pflicht für Barrierefreiheit)',
      admin: {
        description: 'Beschreibe das Bild kurz — wichtig für Sehbehinderte und SEO',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Bildunterschrift (optional)',
    },
  ],
}
