ARG WORKSPACE
FROM node:alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

FROM base AS pruner
ARG WORKSPACE
RUN pnpm add -g turbo
COPY . .
RUN turbo prune --scope=${WORKSPACE} --docker

FROM base AS installer
ARG WORKSPACE
ARG NEXT_PUBLIC_STAGE
ARG NEXT_PUBLIC_BLOG_URL
ARG NEXT_PUBLIC_PORTFOLIO_URL
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build the project with environment variables
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm add -g turbo

# Set environment variables for build
ENV NEXT_PUBLIC_STAGE=$NEXT_PUBLIC_STAGE
ENV NEXT_PUBLIC_BLOG_URL=$NEXT_PUBLIC_BLOG_URL
ENV NEXT_PUBLIC_PORTFOLIO_URL=$NEXT_PUBLIC_PORTFOLIO_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=$NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY

RUN turbo run build --filter=${WORKSPACE}

FROM node:alpine AS runner
ARG WORKSPACE
ENV WORKSPACE=${WORKSPACE}

WORKDIR /app

# 환경 변수 설정
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the built application
COPY --from=installer --chown=nextjs:nodejs /app/apps/${WORKSPACE}/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/${WORKSPACE}/.next/static ./apps/${WORKSPACE}/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/${WORKSPACE}/public ./apps/${WORKSPACE}/public

USER nextjs

EXPOSE 3000

CMD node apps/${WORKSPACE}/server.js
