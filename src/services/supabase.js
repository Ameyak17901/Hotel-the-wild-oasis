import { createClient } from "@supabase/supabase-js";
if (!import.meta.env.VITE_APP_SUPABASE_URL)
  throw new Error("Missing env var: VITE_APP_SUPABASE_URL");
export const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
