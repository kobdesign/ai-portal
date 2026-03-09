import dotenv from "dotenv";
import path from "path";

// Load .env.local before anything else
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config(); // fallback to .env

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const databaseUrl = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "SUPABASE_DATABASE_URL or DATABASE_URL must be set.",
  );
}

export const pool = new pg.Pool({
  connectionString: databaseUrl,
  ssl: databaseUrl.includes("supabase.co") ? { rejectUnauthorized: false } : undefined,
});

export const db = drizzle(pool, { schema });
