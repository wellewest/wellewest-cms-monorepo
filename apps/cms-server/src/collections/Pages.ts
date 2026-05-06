import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: { de: 'Seite', en: 'Page' },
    plural: { de: 'Seiten', en: 'Pages' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description: 'Inhaltsseiten. Jede Seite kann aus Blöcken zusammengestellt werden.',
    group: { de: 'Inhalte', en: 'Content' },
  },
  versions: {
    drafts: {
      autosave: { interval: 2000 },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Inhalt',
          fields: [
            { name: 'title', type: 'text', required: true, label: 'Seitentitel' },
            {
              name: 'slug',
              type: 'text',
              required: true,
              index: true,
              admin: {
                description: 'URL-Pfad (z.B. "ueber-uns")',
              },
            },
            {
              name: 'body',
              type: 'richText',
              editor: lexicalEditor({}),
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text' },
            { name: 'metaDescription', type: 'textarea' },
            { name: 'metaImage', type: 'upload', relationTo: 'media' },
            {
              name: 'noindex',
              type: 'checkbox',
              label: 'Suchmaschinen ausschließen (noindex)',
            },
          ],
        },
        {
          label: 'Veröffentlichung',
          fields: [
            {
              name: 'publishAt',
              type: 'date',
              admin: { date: { pickerAppearance: 'dayAndTime' } },
              label: 'Automatisch veröffentlichen ab',
            },
            {
              name: 'unpublishAt',
              type: 'date',
              admin: { date: { pickerAppearance: 'dayAndTime' } },
              label: 'Automatisch verstecken ab',
            },
          ],
        },
      ],
    },
  ],
}
