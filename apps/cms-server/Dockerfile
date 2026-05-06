# Build-Context: Repo-Root (Monorepo)
# Coolify-Setup: Base Directory = / , Dockerfile Path = apps/cms-server/Dockerfile
# syntax=docker/dockerfile:1
FROM node:22.13-bookworm-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends \
    libc6 ca-certificates dumb-init python3 build-essential \
    && rm -rf /var/lib/apt/lists/*
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate
WORKDIR /app

# ----- Build (single stage to avoid pnpm modules dir conflicts) -----
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1

# Copy workspace + cms-server package definitions
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/cms-server/package.json ./apps/cms-server/

# Install ALL deps (including devDependencies for build)
RUN pnpm install --filter=@wellewest/cms-server... --no-frozen-lockfile

# Copy source code
COPY . .

WORKDIR /app/apps/cms-server

# Build-time placeholders so payload init doesn't fail
ENV PAYLOAD_SECRET=build-time-placeholder
ENV DATABASE_URL=postgres://placeholder:placeholder@localhost:5432/placeholder
ENV S3_BUCKET=placeholder
ENV S3_ACCESS_KEY_ID=placeholder
ENV S3_SECRET_ACCESS_KEY=placeholder
ENV S3_ENDPOINT=https://placeholder
ENV S3_REGION=eu-central-003
ENV NODE_ENV=production

RUN pnpm payload generate:importmap
RUN pnpm build

# ----- Runner -----
FROM base AS runner
RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 nextjs
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Standalone Next.js output (compiled by `output: 'standalone'`)
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms-server/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms-server/.next/static ./apps/cms-server/.next/static

USER nextjs
EXPOSE 3000

CMD ["dumb-init", "node", "apps/cms-server/server.js"]
