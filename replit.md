# OpenSpec - Enterprise AI-Powered Development Platform

## Overview
An enterprise AI development workspace that helps organizations manage the software development lifecycle. Features include project management, AI-assisted coding, specification tracking, lifecycle management, and enterprise topology visualization.

## Architecture
- **Frontend**: React + Vite + TailwindCSS + shadcn/ui
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Auth**: Replit Auth (OpenID Connect) - supports Google, GitHub, Apple, X, email/password
- **Routing**: wouter (frontend), Express (backend)
- **State Management**: TanStack React Query

## Key Files
- `shared/schema.ts` - Database schema (re-exports auth models, defines projects)
- `shared/models/auth.ts` - Auth schema (users, sessions tables - DO NOT MODIFY)
- `server/db.ts` - Database connection (Drizzle + pg pool)
- `server/replit_integrations/auth/` - Replit Auth module (DO NOT MODIFY)
- `server/routes.ts` - API routes (projects CRUD + auth wiring)
- `server/storage.ts` - Storage interface (DatabaseStorage with Drizzle)
- `client/src/hooks/use-auth.ts` - Auth hook (provided by Replit Auth)
- `client/src/lib/auth-utils.ts` - Auth utility functions
- `client/src/App.tsx` - Main app with routing and auth protection

## Pages
- `/` - Landing/Login page (unauthenticated) or Dashboard (authenticated)
- `/login` - Landing page with sign-in button
- `/executive` - Executive C-Level metrics dashboard (protected)
- `/topology` - Global enterprise topology visualization (protected)
- `/editor/:id` - Project editor/workspace (protected)

## API Endpoints
### Auth (Replit Auth - DO NOT MODIFY)
- `GET /api/login` - Begin login flow (redirects to Replit OIDC)
- `GET /api/callback` - OIDC callback
- `GET /api/logout` - Logout and end session
- `GET /api/auth/user` - Get current authenticated user

### Projects
- `GET /api/projects` - List user's projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## Database Tables
- `users` - id (varchar PK), email, first_name, last_name, profile_image_url, created_at, updated_at (managed by Replit Auth)
- `sessions` - sid (varchar PK), sess (jsonb), expire (managed by Replit Auth)
- `projects` - id (serial PK), name, description, type, status, user_id (varchar), created_at, updated_at
