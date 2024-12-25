import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
// const channel = supabase
//   .channel("links")
//   .on(
//     "postgres_changes",
//     {
//       event: "INSERT",
//       schema: "public",
//     },
//     (payload) => console.log(payload)
//   )
//   .subscribe();


export { supabase };
