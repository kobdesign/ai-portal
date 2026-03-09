import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn(
    "Missing Supabase env vars. Set VITE_SUPABASE_URL and SUPABASE_SERVICE_KEY.",
  );
}

export const supabaseAdmin = createClient(supabaseUrl ?? "", supabaseServiceKey ?? "");
