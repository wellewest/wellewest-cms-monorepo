import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedDate', '_status', 'updatedAt'],
    description: 'Blogbeiträge',
  },
  versions: {
    drafts: { autosave: { interval: 2000 }, schedulePublish: true },
    maxPerDoc: 50,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Inhalt',
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              name: 'slug',
              type: 'text',
              required: true,
              index: true,
            },
            { name: 'excerpt', type: 'textarea', label: 'Kurzbeschreibung' },
            { name: 'heroImage', type: 'upload', relationTo: 'media' },
            {
              name: 'body',
              type: 'richText',
              editor: lexicalEditor({}),
            },
            { name: 'publishedDate', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
            {
              name: 'tags',
              type: 'array',
              fields: [{ name: 'label', type: 'text' }],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text' },
            { name: 'metaDescription', type: 'textarea' },
            { name: 'metaImage', type: 'upload', relationTo: 'media' },
            { name: 'noindex', type: 'checkbox' },
          ],
        },
      ],
    },
  ],
}
