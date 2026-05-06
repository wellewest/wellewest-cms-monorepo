import { withPayload } from '@payloadcms/next/withPayload'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../../'),
  // TS-Build-Errors werden lokal vor jedem Push geprüft (passt bei uns), Docker-Builder
  // nutzt evtl. abweichende TS-Resolutionsstrategie. Build muss in Container reibungslos laufen.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    reactCompiler: false,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@payload-config': path.resolve(__dirname, './src/payload.config.ts'),
      '@': path.resolve(__dirname, './src'),
    }
    return config
  },
}

export default withPayload(nextConfig)
