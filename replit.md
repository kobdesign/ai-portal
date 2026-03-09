# OpenSpec - Enterprise AI-Powered Development Platform

## Overview
An enterprise AI development workspace that helps organizations manage the software development lifecycle. Features include project management, AI-assisted coding, specification tracking, lifecycle management, and enterprise topology visualization.

## Architecture
- **Frontend**: React + Vite + TailwindCSS + shadcn/ui
- **Backend**: Express.js + TypeScript
- **Database**: Supabase PostgreSQL (via connection pooler) with Drizzle ORM
- **Auth**: Supabase Auth (Google OAuth) - JWT-based, Bearer token validation
- **Routing**: wouter (frontend), Express (backend)
- **State Management**: TanStack React Query

## Key Files
- `shared/schema.ts` - Database schema (re-exports auth models, defines projects)
- `shared/models/auth.ts` - Auth schema (users table)
- `server/db.ts` - Database connection (Drizzle + pg pool, uses SUPABASE_DATABASE_URL)
- `server/supabase.ts` - Supabase admin client (service role key)
- `server/auth/middleware.ts` - JWT auth middleware (validates Supabase Bearer tokens)
- `server/routes.ts` - API routes (projects CRUD with auth)
- `server/storage.ts` - Storage interface (DatabaseStorage with Drizzle)
- `client/src/lib/supabase.ts` - Supabase client (anon key)
- `client/src/hooks/use-auth.ts` - Auth hook (Supabase session/OAuth)
- `client/src/lib/queryClient.ts` - API client (sends Bearer token from Supabase session)
- `client/src/App.tsx` - Main app with routing and auth protection

## Pages
- `/` - Landing/Login page (unauthenticated) or Dashboard (authenticated)
- `/login` - Landing page with sign-in button
- `/auth/callback` - OAuth callback handler
- `/executive` - Executive C-Level metrics dashboard (protected)
- `/topology` - Global enterprise topology visualization (protected)
- `/editor/:id` - Project editor/workspace (protected)

## API Endpoints
### Auth (Supabase OAuth - handled client-side)
- Login/logout handled by Supabase JS client on frontend
- Backend validates JWT via `server/auth/middleware.ts`

### Projects
- `GET /api/projects` - List user's projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## Database Tables (Supabase PostgreSQL)
- `users` - id (varchar PK), email, first_name, last_name, profile_image_url, created_at, updated_at
- `projects` - id (serial PK), name, description, type, status, user_id (varchar), created_at, updated_at
- `conversations` - (pre-existing in Supabase)
- `messages` - (pre-existing in Supabase)

## Environment Variables
- `VITE_SUPABASE_URL` - Supabase project URL (shared env var)
- `VITE_SUPABASE_ANON_KEY` - Supabase anon/public key (shared env var)
- `SUPABASE_SERVICE_KEY` - Supabase service role key (secret)
- `SUPABASE_DATABASE_URL` - Supabase PostgreSQL pooler connection string (shared env var)
- `DATABASE_URL` - Replit-managed PostgreSQL (fallback, runtime-managed)
