/**
 * Payload CMS API Client für Astro-Templates.
 * Liest Pages, Posts und Globals beim Build aus dem CMS.
 */

export interface PayloadMedia {
  id: string | number
  url: string
  alt?: string
  width?: number
  height?: number
  mimeType?: string
}

export interface PayloadBlock {
  blockType: string
  blockName?: string
  id?: string
  [key: string]: any
}

export interface PayloadPage {
  id: string | number
  title: string
  slug: string
  blocks?: PayloadBlock[]
  body?: any // Lexical JSON
  metaTitle?: string
  metaDescription?: string
  metaImage?: PayloadMedia
  noindex?: boolean
  publishAt?: string
  unpublishAt?: string
  _status?: 'draft' | 'published'
  tenant?: { id: string | number; name: string; slug: string }
}

export interface PayloadClientOptions {
  /** z.B. "https://cms.wellewest.at" */
  baseURL: string
  /** Tenant-Slug oder ID, um Content zu filtern */
  tenant: string
  /** Optional: API-Key für nicht-öffentliche Reads */
  apiKey?: string
  /** Drafts/Published — default: published */
  drafts?: boolean
}

export class PayloadClient {
  constructor(private opts: PayloadClientOptions) {}

  private headers() {
    const h: Record<string, string> = { 'Content-Type': 'application/json' }
    if (this.opts.apiKey) h.Authorization = `users API-Key ${this.opts.apiKey}`
    return h
  }

  private async fetch<T>(path: string, params: Record<string, any> = {}): Promise<T> {
    const url = new URL(this.opts.baseURL + '/api' + path)
    if (this.opts.drafts) url.searchParams.set('draft', 'true')
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined) url.searchParams.set(k, String(v))
    }
    const res = await fetch(url.toString(), { headers: this.headers() })
    if (!res.ok) {
      throw new Error(`Payload API ${res.status}: ${url.toString()}`)
    }
    return res.json() as Promise<T>
  }

  /** Holt eine einzelne Seite per Slug. Tenant-Filter automatisch. */
  async getPage(slug: string): Promise<PayloadPage | null> {
    const where = encodeURIComponent(
      JSON.stringify({
        and: [
          { slug: { equals: slug } },
          { 'tenant.slug': { equals: this.opts.tenant } },
        ],
      }),
    )
    const data = await this.fetch<{ docs: PayloadPage[] }>('/pages', { where, depth: 2, limit: 1 })
    return data.docs[0] ?? null
  }

  /** Listet alle veröffentlichten Seiten (für statische Routen-Generierung). */
  async listPages(): Promise<PayloadPage[]> {
    const where = encodeURIComponent(
      JSON.stringify({
        'tenant.slug': { equals: this.opts.tenant },
      }),
    )
    const data = await this.fetch<{ docs: PayloadPage[] }>('/pages', {
      where,
      depth: 1,
      limit: 200,
    })
    return data.docs
  }

  /** Holt Site-Settings für den Tenant. */
  async getSiteSettings(): Promise<any> {
    const where = encodeURIComponent(
      JSON.stringify({ 'tenant.slug': { equals: this.opts.tenant } }),
    )
    const data = await this.fetch<{ docs: any[] }>('/site-settings', { where, depth: 1, limit: 1 })
    return data.docs[0] ?? null
  }
}
