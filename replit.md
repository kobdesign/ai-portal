# OpenSpec - Enterprise AI-Powered Development Platform

## Overview
An enterprise AI development workspace that helps organizations manage the software development lifecycle. Features include project management, AI-assisted coding, specification tracking, lifecycle management, and enterprise topology visualization.

## Architecture
- **Frontend**: React + Vite + TailwindCSS + shadcn/ui
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Auth**: Passport.js with session-based authentication (connect-pg-simple for session store)
- **Routing**: wouter (frontend), Express (backend)
- **State Management**: TanStack React Query

## Key Files
- `shared/schema.ts` - Database schema (users, projects)
- `server/db.ts` - Database connection (Drizzle + pg pool)
- `server/auth.ts` - Authentication setup (Passport local strategy, session management)
- `server/routes.ts` - API routes (projects CRUD)
- `server/storage.ts` - Storage interface (DatabaseStorage with Drizzle)
- `client/src/hooks/use-auth.tsx` - Auth context provider & hook
- `client/src/App.tsx` - Main app with AuthProvider and protected routes

## Pages
- `/login` - Login/Register page
- `/` - Dashboard (project listing with CRUD)
- `/executive` - Executive C-Level metrics dashboard
- `/topology` - Global enterprise topology visualization
- `/editor/:id` - Project editor/workspace

## API Endpoints
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/user` - Get current user
- `GET /api/projects` - List user's projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `PATCH /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## Database Tables
- `users` - id (serial PK), username, password
- `projects` - id (serial PK), name, description, type, status, user_id, created_at, updated_at
- `session` - auto-created by connect-pg-simple for session storage
