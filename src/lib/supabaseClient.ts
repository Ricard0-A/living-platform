import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// No solo exportas componentes de UI, tambien esto
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
