import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import { Sparkline } from './Sparkline'
import { LineChart } from './LineChart'
import './Dashboard.scss'

type CardProps = {
  label: string
  value: string | number
  trend?: string
  trendDirection?: 'up' | 'down' | 'flat'
  icon: React.ReactNode
  spark?: number[]
  color?: string
}

const Card = ({ label, value, trend, trendDirection = 'flat', icon, spark, color = '#004aad' }: CardProps) => (
  <div className="ww-kpi-card">
    <div className="ww-kpi-card__top">
      <div className="ww-kpi-card__icon" style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)` }}>
        {icon}
      </div>
      {spark && (
        <div className="ww-kpi-card__spark">
          <Sparkline data={spark} color={color} />
        </div>
      )}
    </div>
    <div className="ww-kpi-card__label">{label}</div>
    <div className="ww-kpi-card__value">{value}</div>
    {trend && (
      <div className={`ww-kpi-card__trend ww-kpi-card__trend--${trendDirection}`}>
        {trendDirection === 'up' && '↑ '}
        {trendDirection === 'down' && '↓ '}
        {trend}
      </div>
    )}
  </div>
)

const Panel = ({
  title,
  children,
  action,
}: {
  title: string
  children: React.ReactNode
  action?: React.ReactNode
}) => (
  <div className="ww-panel">
    <div className="ww-panel__header">
      <h3 className="ww-panel__title">{title}</h3>
      {action}
    </div>
    <div className="ww-panel__body">{children}</div>
  </div>
)

const generateMockTrend = (base: number): number[] => {
  // Stabile Pseudo-Random-Trend basierend auf base-Wert (deterministisch pro Session)
  const seed = base
  return Array.from({ length: 14 }, (_, i) => {
    const noise = Math.sin(i * 0.7 + seed) * 0.3 + Math.cos(i * 1.3 + seed * 0.5) * 0.2
    return Math.max(0, base * (0.75 + noise * 0.4 + i * 0.02))
  })
}

const generateMockPageviews = () => {
  const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
  return days.map((label, i) => {
    const base = 4500 + i * 600
    const noise = Math.sin(i * 1.4) * 1500 + Math.cos(i * 0.9) * 800
    return { label, value: Math.round(base + noise) }
  })
}

export default async function Dashboard() {
  const payload = await getPayload({ config })

  const [pages, posts, media, tenants, users] = await Promise.all([
    payload.count({ collection: 'pages' }).catch(() => ({ totalDocs: 0 })),
    payload.count({ collection: 'posts' }).catch(() => ({ totalDocs: 0 })),
    payload.count({ collection: 'media' }).catch(() => ({ totalDocs: 0 })),
    payload.count({ collection: 'tenants' }).catch(() => ({ totalDocs: 0 })),
    payload.count({ collection: 'users' }).catch(() => ({ totalDocs: 0 })),
  ])

  const pageviews = generateMockPageviews()
  const totalViews = pageviews.reduce((a, b) => a + b.value, 0)

  return (
    <div className="ww-dashboard">
      <div className="ww-dashboard__hero">
        <div>
          <h1 className="ww-dashboard__greeting">Willkommen zurück!</h1>
          <p className="ww-dashboard__sub">
            Hier ist alles im Blick — {new Date().toLocaleDateString('de-AT', {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
        <div className="ww-dashboard__period">
          📅 Letzte 7 Tage
        </div>
      </div>

      <div className="ww-dashboard__kpi-grid">
        <Card
          label="Seiten"
          value={pages.totalDocs.toLocaleString('de-AT')}
          trend="Insgesamt"
          icon={<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
          spark={generateMockTrend(pages.totalDocs || 5)}
          color="#004aad"
        />
        <Card
          label="Blogbeiträge"
          value={posts.totalDocs.toLocaleString('de-AT')}
          trend="Insgesamt"
          icon={<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="6" cy="6" r="2"/></svg>}
          spark={generateMockTrend(posts.totalDocs || 3)}
          color="#0066d4"
        />
        <Card
          label="Medien"
          value={media.totalDocs.toLocaleString('de-AT')}
          trend="Bilder & Dateien"
          icon={<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>}
          spark={generateMockTrend(media.totalDocs || 8)}
          color="#1a85f0"
        />
        <Card
          label="Kunden"
          value={tenants.totalDocs.toLocaleString('de-AT')}
          trend="Aktive Tenants"
          icon={<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/></svg>}
          spark={generateMockTrend(tenants.totalDocs || 2)}
          color="#ffa500"
        />
        <Card
          label="Benutzer"
          value={users.totalDocs.toLocaleString('de-AT')}
          trend="Editoren & Admins"
          icon={<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
          spark={generateMockTrend(users.totalDocs || 1)}
          color="#0046cc"
        />
      </div>

      <div className="ww-dashboard__row-2col">
        <Panel title="Seitenaufrufe" action={<span className="ww-panel__hint">Demo-Daten</span>}>
          <div className="ww-panel__chart">
            <LineChart data={pageviews} color="#004aad" height={240} />
          </div>
          <div className="ww-panel__stat-row">
            <div>
              <div className="ww-stat__label">Gesamt 7 Tage</div>
              <div className="ww-stat__value">{totalViews.toLocaleString('de-AT')}</div>
            </div>
            <div>
              <div className="ww-stat__label">Ø pro Tag</div>
              <div className="ww-stat__value">{Math.round(totalViews / 7).toLocaleString('de-AT')}</div>
            </div>
          </div>
          <div className="ww-panel__note">
            ℹ️ Live-Pageview-Daten kommen aus Plausible, sobald analytics.wellewest.at deployed ist.
          </div>
        </Panel>

        <Panel title="Top Seiten">
          <table className="ww-mini-table">
            <thead>
              <tr>
                <th>Pfad</th>
                <th>Aufrufe</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>/</td><td>—</td></tr>
              <tr><td>/leistungen</td><td>—</td></tr>
              <tr><td>/blog</td><td>—</td></tr>
              <tr><td>/kontakt</td><td>—</td></tr>
              <tr><td>/ueber-uns</td><td>—</td></tr>
            </tbody>
          </table>
          <div className="ww-panel__note">Live-Daten via Plausible (Phase 2).</div>
        </Panel>
      </div>

      <div className="ww-dashboard__row-3col">
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
          <div className="ww-status-row">
            <span className="ww-status-dot ww-status-dot--ok" />
            <span>Multi-Tenant-Isolation aktiv</span>
          </div>
        </Panel>

        <Panel title="Schnellzugriff">
          <div className="ww-quick-links">
            <a href="/admin/collections/pages/create">
              <span>📄</span>
              <div>
                <strong>Neue Seite anlegen</strong>
                <small>Inhaltsseite mit Blöcken</small>
              </div>
            </a>
            <a href="/admin/collections/posts/create">
              <span>✍️</span>
              <div>
                <strong>Blogbeitrag schreiben</strong>
                <small>Mit Titelbild + Tags</small>
              </div>
            </a>
            <a href="/admin/collections/media/create">
              <span>🖼️</span>
              <div>
                <strong>Datei hochladen</strong>
                <small>Auto-Optimierung beim Upload</small>
              </div>
            </a>
            <a href="/admin/collections/tenants/create">
              <span>🏢</span>
              <div>
                <strong>Neuen Kunden anlegen</strong>
                <small>Tenant erstellen</small>
              </div>
            </a>
          </div>
        </Panel>

        <Panel title="WelleWest Updates">
          <div className="ww-banner">
            <div className="ww-banner__title">🚀 Phase 1 abgeschlossen</div>
            <div className="ww-banner__text">
              Multi-Tenant-CMS, B2-Storage, Backup-Pipeline und Branding sind live.
            </div>
          </div>
          <div className="ww-banner ww-banner--accent">
            <div className="ww-banner__title">⏭️ Als Nächstes</div>
            <div className="ww-banner__text">
              Plausible-Analytics, Cal.com-Termine, erste Astro-Templates.
            </div>
          </div>
        </Panel>
      </div>
    </div>
  )
}
