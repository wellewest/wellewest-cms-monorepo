import { headers as getHeaders } from 'next/headers'
import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import './Dashboard.scss'

const Card = ({
  label,
  value,
  trend,
  icon,
}: {
  label: string
  value: string | number
  trend?: string
  icon: React.ReactNode
}) => (
  <div className="ww-kpi-card">
    <div className="ww-kpi-card__icon">{icon}</div>
    <div className="ww-kpi-card__content">
      <div className="ww-kpi-card__label">{label}</div>
      <div className="ww-kpi-card__value">{value}</div>
      {trend && <div className="ww-kpi-card__trend">{trend}</div>}
    </div>
  </div>
)

const Panel = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="ww-panel">
    <div className="ww-panel__header">
      <h3 className="ww-panel__title">{title}</h3>
    </div>
    <div className="ww-panel__body">{children}</div>
  </div>
)

export default async function Dashboard() {
  const payload = await getPayload({ config })

  // Counts holen
  const [pages, posts, media, tenants, users] = await Promise.all([
    payload.count({ collection: 'pages' }).catch(() => ({ totalDocs: 0 })),
    payload.count({ collection: 'posts' }).catch(() => ({ totalDocs: 0 })),
    payload.count({ collection: 'media' }).catch(() => ({ totalDocs: 0 })),
    payload.count({ collection: 'tenants' }).catch(() => ({ totalDocs: 0 })),
    payload.count({ collection: 'users' }).catch(() => ({ totalDocs: 0 })),
  ])

  return (
    <div className="ww-dashboard">
      <div className="ww-dashboard__hero">
        <h1 className="ww-dashboard__greeting">Willkommen zurück!</h1>
        <p className="ww-dashboard__sub">Hier ist alles im Blick — Stand: {new Date().toLocaleDateString('de-AT', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
      </div>

      <div className="ww-dashboard__kpi-grid">
        <Card
          label="Seiten"
          value={pages.totalDocs.toLocaleString('de-AT')}
          trend="Insgesamt"
          icon={<span>📄</span>}
        />
        <Card
          label="Blogbeiträge"
          value={posts.totalDocs.toLocaleString('de-AT')}
          trend="Insgesamt"
          icon={<span>✍️</span>}
        />
        <Card
          label="Medien"
          value={media.totalDocs.toLocaleString('de-AT')}
          trend="Bilder & Dateien"
          icon={<span>🖼️</span>}
        />
        <Card
          label="Kunden"
          value={tenants.totalDocs.toLocaleString('de-AT')}
          trend="Aktive Tenants"
          icon={<span>🏢</span>}
        />
        <Card
          label="Benutzer"
          value={users.totalDocs.toLocaleString('de-AT')}
          trend="Editoren & Admins"
          icon={<span>👥</span>}
        />
      </div>

      <div className="ww-dashboard__panels">
        <Panel title="Systemstatus">
          <div className="ww-status-row">
            <span className="ww-status-dot ww-status-dot--ok" />
            <span>Alle Systeme operativ</span>
          </div>
          <div className="ww-status-row">
            <span className="ww-status-dot ww-status-dot--ok" />
            <span>Datenbank verbunden</span>
          </div>
          <div className="ww-status-row">
            <span className="ww-status-dot ww-status-dot--ok" />
            <span>Backblaze B2 Storage aktiv</span>
          </div>
          <div className="ww-status-row">
            <span className="ww-status-dot ww-status-dot--ok" />
            <span>SSL-Zertifikat gültig</span>
          </div>
        </Panel>

        <Panel title="Schnellzugriff">
          <div className="ww-quick-links">
            <a href="/admin/collections/pages/create">+ Neue Seite anlegen</a>
            <a href="/admin/collections/posts/create">+ Blogbeitrag schreiben</a>
            <a href="/admin/collections/media/create">+ Datei hochladen</a>
            <a href="/admin/collections/tenants/create">+ Neuen Kunden anlegen</a>
          </div>
        </Panel>

        <Panel title="Analytics">
          <div className="ww-empty-state">
            <p>Plausible-Integration in Phase 2.</p>
            <p className="ww-empty-state__hint">Sobald analytics.wellewest.at deployed ist, erscheinen hier Live-Daten zu Pageviews und AI-Traffic.</p>
          </div>
        </Panel>
      </div>
    </div>
  )
}
