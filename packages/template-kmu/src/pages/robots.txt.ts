import type { APIRoute } from 'astro'
import { findGlobal } from '../lib/payload'

export const GET: APIRoute = async ({ site }) => {
  const settings: any = await findGlobal('site-settings').catch(() => null)
  const baseUrl = site?.toString() || 'https://example.at'

  const lines: string[] = []

  // AI-Bot-Steuerung pro Bot
  const botMap: Record<string, string> = {
    GPTBot: 'allowGptBot',
    'OAI-SearchBot': 'allowOaiSearchBot',
    PerplexityBot: 'allowPerplexityBot',
    ClaudeBot: 'allowClaudeBot',
    'Claude-Web': 'allowClaudeBot',
    'Google-Extended': 'allowGoogleExtended',
    'Applebot-Extended': 'allowApplebotExtended',
    CCBot: 'allowCcBot',
    Bytespider: 'allowBytespider',
  }

  for (const [bot, settingKey] of Object.entries(botMap)) {
    const allowed = settings?.[settingKey] !== false
    lines.push(`User-agent: ${bot}`)
    lines.push(`${allowed ? 'Allow' : 'Disallow'}: /`)
    lines.push('')
  }

  // Default für alle anderen Bots
  lines.push('User-agent: *')
  if (settings?.hideFromSearchEngines) {
    lines.push('Disallow: /')
  } else {
    lines.push('Allow: /')
  }

  lines.push('')
  lines.push(`Sitemap: ${baseUrl.replace(/\/$/, '')}/sitemap-index.xml`)

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain' },
  })
}
