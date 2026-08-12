# ==========================================
# STAGE 1: Base - Setup Node & PNPM
# ==========================================
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache openssl libc6-compat
RUN corepack enable
WORKDIR /app

# ==========================================
# STAGE 2: Dependencies - Install packages
# ==========================================
FROM base AS dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml prisma.config.ts ./
COPY prisma ./prisma/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm prisma generate

# ==========================================
# STAGE 3: Build - Compile the application
# ==========================================
FROM dependencies AS build
COPY . .
RUN pnpm run build

# ==========================================
# STAGE 4: Production - Lean image for run
# ==========================================
FROM base AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml prisma.config.ts ./
COPY prisma ./prisma/
COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
