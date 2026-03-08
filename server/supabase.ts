import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config();

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn(
    "Missing Supabase env vars. Set VITE_SUPABASE_URL and SUPABASE_SERVICE_KEY in .env.local",
  );
}

export const supabaseAdmin = createClient(supabaseUrl ?? "", supabaseServiceKey ?? "");
