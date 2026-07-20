# ==========================================
# STAGE 1: Base - Setup Node & PNPM
# ==========================================
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Enable corepack to use pnpm automatically
RUN corepack enable
WORKDIR /app

# ==========================================
# STAGE 2: Dependencies - Install packages
# ==========================================
FROM base AS dependencies
# Copy package manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Copy prisma schema so we can generate Prisma Client
COPY prisma ./prisma/
# Install all dependencies (including devDependencies)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# Generate Prisma Client code
RUN pnpm prisma generate

# ==========================================
# STAGE 3: Build - Compile the application
# ==========================================
FROM dependencies AS build
# Copy all source files
COPY . .
# Build the NestJS app (outputs to /dist)
RUN pnpm run build

# ==========================================
# STAGE 4: Production - Lean image for run
# ==========================================
FROM base AS production
ENV NODE_ENV=production
# Copy package manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Copy prisma folder (needed for migrations and client)
COPY prisma ./prisma/
# Install ONLY production dependencies to keep the image small
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
# Copy compiled NestJS code and generated Prisma Client from the Build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/generated ./generated

# Expose NestJS port
EXPOSE 3000

# Start NestJS backend
CMD ["node", "dist/src/main.js"]
