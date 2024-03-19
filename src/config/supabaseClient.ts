import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseKey = process.env.REACT_APP_ANON_KEY;

// if (!supabaseUrl || !supabaseKey) {
//     throw new Error("Something is wrong");
// }
const supabase = createClient("https://darsjopiyblhpyciduch.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhcnNqb3BpeWJsaHB5Y2lkdWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MDg2MzEsImV4cCI6MjAyMzA4NDYzMX0.RNqBKf1JLaiPcbcWwRTBdefKcyXdwcedLXiSvjp45tY");

export default supabase;
