import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { de: 'Benutzer', en: 'User' },
    plural: { de: 'Benutzer', en: 'Users' },
  },
  auth: {
    tokenExpiration: 7200, // 2 Stunden
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 Min Lockout
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'tenants'],
    group: { de: 'Verwaltung', en: 'Administration' },
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'super-admin') return true
      // Editor: nur eigene User der gleichen Tenant
      return {
        tenants: {
          in: user.tenants?.map((t: any) => (typeof t === 'object' ? t.id : t)) ?? [],
        },
      }
    },
    create: ({ req: { user } }) =>
      user?.role === 'super-admin' || user?.role === 'tenant-owner',
    update: ({ req: { user } }) =>
      user?.role === 'super-admin' || user?.role === 'tenant-owner',
    delete: ({ req: { user } }) => user?.role === 'super-admin',
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'WelleWest Super-Admin', value: 'super-admin' },
        { label: 'Kunde — Owner', value: 'tenant-owner' },
        { label: 'Kunde — Editor', value: 'editor' },
        { label: 'Kunde — Author', value: 'author' },
        { label: 'Kunde — Viewer', value: 'viewer' },
      ],
    },
    // Hinweis: Das `tenants`-Feld wird vom multiTenantPlugin automatisch hinzugefügt.
  ],
}
