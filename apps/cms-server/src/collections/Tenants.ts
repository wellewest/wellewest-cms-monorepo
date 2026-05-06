import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'siteType', 'status'],
    description: 'Kunden / Tenants — jeder Kunde ist eine Tenant-Einheit',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => user?.role === 'super-admin',
    update: ({ req: { user } }) => user?.role === 'super-admin',
    delete: ({ req: { user } }) => user?.role === 'super-admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Kundenname',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Eindeutiger Kurzname (z.B. "hotel-sonne")',
      },
    },
    {
      name: 'siteType',
      type: 'select',
      required: true,
      defaultValue: 'kmu',
      options: [
        { label: 'Hotel', value: 'hotel' },
        { label: 'Gastro', value: 'gastro' },
        { label: 'KMU', value: 'kmu' },
        { label: 'Shop', value: 'shop' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'onboarding',
      options: [
        { label: 'Onboarding', value: 'onboarding' },
        { label: 'Aktiv', value: 'active' },
        { label: 'Pausiert', value: 'paused' },
        { label: 'Archiviert', value: 'archived' },
      ],
    },
    {
      name: 'launchDate',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
    {
      name: 'domain',
      type: 'text',
      admin: {
        description: 'Live-Domain des Kunden, z.B. hotel-sonne.at',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Interne WelleWest-Notizen (für Kunden nicht sichtbar)',
      },
      access: {
        read: ({ req: { user } }) => user?.role === 'super-admin',
      },
    },
  ],
}
