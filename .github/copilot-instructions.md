# Copilot Instructions for VadedTV (CINEXTMA)

## Project Overview
VadedTV is a Next.js 15 streaming platform for movies and TV shows using TMDB API for metadata and multiple video source providers. It uses the App Router, TanStack Query for data fetching, Supabase for auth/database, and HeroUI + Tailwind CSS 4 for UI.

## Architecture

### Key Directories
- `src/app/` - Next.js App Router pages (movie/tv detail pages use dynamic `[id]` segments)
- `src/actions/` - Server actions for Supabase mutations (auth, library, histories). Use `"use server"` directive
- `src/api/tmdb.ts` - Centralized TMDB client instance via `tmdb-ts` library
- `src/components/sections/` - Page-specific components organized by route (Movie/, TV/, Home/, etc.)
- `src/components/ui/` - Reusable UI primitives (button/, card/, input/, etc.)
- `src/hooks/` - Custom React hooks, many integrate with TanStack Query
- `src/libraries/vidsrc/` - Video source provider integrations (embed-su, vidsrcrip, vidlinkpro)
- `src/utils/` - Helpers, constants, Supabase clients, environment validation

### Data Flow
1. **TMDB data**: Use `tmdb` from `@/api/tmdb` directly in components via TanStack Query
2. **User data**: Server actions in `src/actions/` interact with Supabase tables (profiles, watchlist, histories)
3. **State**: Zustand stores for global state (`usePiPStore`), `nuqs` for URL query state (`useDiscoverFilters`)

## Patterns & Conventions

### Server Actions
```typescript
// Pattern: createAuthAction HOF for auth actions with captcha validation
const createAuthAction = <T extends { captchaToken?: string }>(
  schema: z.ZodSchema<T>,
  action: AuthAction<T>,
) => { /* validates schema, checks captcha, creates supabase client */ }
```
All actions return `ActionResponse<T>` type: `{ success: boolean; message?: string; data?: T }`

### Supabase Client Usage
- **Server**: `await createClient()` from `@/utils/supabase/server` (supports `admin` flag for service role)
- **Client**: `createClient()` from `@/utils/supabase/client`
- Types auto-generated: `src/utils/supabase/types.ts` (run `npm run sb-db-types`)

### Environment Variables
Use `@t3-oss/env-nextjs` for validated env access. Import `env` from `@/utils/env`:
```typescript
import { env } from "@/utils/env";
env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN // Type-safe access
```

### Component Organization
- Page sections in `src/components/sections/{PageName}/` (e.g., `Movie/Detail/`, `Movie/Cards/`)
- Use `dynamic()` imports for heavy components to reduce bundle size
- HeroUI components from `@heroui/react`, styled with Tailwind

### Styling
- `cn()` utility from `@/utils/helpers` for class merging (clsx + tailwind-merge)
- Global spacing via `SpacingClasses` from `@/utils/constants`
- Theme colors: primary (movies), warning (TV shows) - see progress bar theming in providers

### URL State Management
```typescript
// nuqs for URL search params with type-safe parsers
const [content, setContent] = useQueryState("content", parseAsStringLiteral(["movie", "tv"]))
```

## Developer Workflows

### Local Development
```bash
npm run dev          # Start with Turbopack
npm run sb-start     # Start local Supabase (requires Docker)
npm run sb-db-reset  # Reset DB and apply migrations
npm run sb-db-types  # Regenerate Supabase TypeScript types
```

### Database Schema
Located in `supabase/schemas/` - numbered files executed in order:
- `01_profiles.sql` - User profiles linked to auth.users
- `02_watchlist.sql` - User watchlist items
- `03_histories.sql` - Watch history with playback position

### Video Players
Configure in `src/utils/players.ts`. Each player has properties: `source`, `recommended`, `fast`, `ads`, `resumable`.
Video source APIs in `src/libraries/vidsrc/` - exports functions like `getVidLinkProVideo()`.

## Important Notes
- Content type distinction: "movie" vs "tv" affects routing, API calls, and theming
- Protected paths configured via `PROTECTED_PATHS` env var (comma-separated)
- PWA configured in `next.config.ts` - disabled in development
- Use TanStack Query for all data fetching; query keys follow pattern: `["entity-type", id]`
