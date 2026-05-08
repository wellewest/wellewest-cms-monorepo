import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { WelleWestBlocks } from '../blocks'

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
              name: 'blocks',
              type: 'blocks',
              label: 'Seiten-Blöcke',
              labels: { singular: { de: 'Block', en: 'Block' }, plural: { de: 'Blöcke', en: 'Blocks' } },
              admin: {
                description: 'Stelle die Seite aus vorgefertigten Bausteinen zusammen. Reihenfolge per Drag & Drop ändern.',
                initCollapsed: true,
              },
              blocks: WelleWestBlocks,
            },
            {
              name: 'body',
              type: 'richText',
              label: 'Zusatz-Inhalt (optional, falls Blöcke nicht reichen)',
              admin: {
                description: 'Wird unter den Blöcken angezeigt. Lass dieses Feld leer wenn du nur mit Blöcken arbeitest.',
              },
              editor: lexicalEditor({}),
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
