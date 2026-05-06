/**
 * Payload-API-Client für Astro-Templates
 * Tenant-aware: jedes Repo setzt PAYLOAD_TENANT_ID env-var
 */

const CMS_URL = import.meta.env.CMS_URL || process.env.CMS_URL || 'https://cms.wellewest.at'
const TENANT_ID = import.meta.env.PAYLOAD_TENANT_ID || process.env.PAYLOAD_TENANT_ID

if (!TENANT_ID) {
  console.warn('⚠️  PAYLOAD_TENANT_ID is not set. CMS queries will fail.')
}

type FindOpts = {
  collection: string
  where?: Record<string, any>
  limit?: number
  depth?: number
  draft?: boolean
  sort?: string
}

export async function find<T = any>({ collection, where = {}, limit = 100, depth = 2, draft = false, sort }: FindOpts): Promise<{ docs: T[]; totalDocs: number }> {
  const tenantWhere = TENANT_ID ? { tenant: { equals: TENANT_ID }, ...where } : where
  const params = new URLSearchParams({
    where: JSON.stringify(tenantWhere),
    limit: String(limit),
    depth: String(depth),
    draft: String(draft),
  })
  if (sort) params.set('sort', sort)

  const url = `${CMS_URL}/api/${collection}?${params.toString()}`
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } })
  if (!res.ok) {
    console.error(`Fetch failed: ${url} (${res.status})`)
    return { docs: [], totalDocs: 0 } as any
  }
  return res.json()
}

export async function findOne<T = any>({ collection, where, depth = 2, draft = false }: FindOpts): Promise<T | null> {
  const result = await find<T>({ collection, where, limit: 1, depth, draft })
  return result.docs[0] || null
}

export async function findGlobal<T = any>(slug: string, depth = 2): Promise<T | null> {
  const url = `${CMS_URL}/api/globals/${slug}?depth=${depth}`
  const res = await fetch(url)
  if (!res.ok) return null
  return res.json()
}

/** Bild-URL aus B2 holen (Payload Media-Doc → URL) */
export function mediaUrl(media: any, size?: 'thumbnail' | 'medium' | 'hero'): string {
  if (!media) return ''
  if (typeof media === 'string') return media
  if (size && media.sizes?.[size]?.url) return media.sizes[size].url
  return media.url || ''
}
