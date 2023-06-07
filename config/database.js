const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://vvivrtywfxzzjrnepzmm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2aXZydHl3Znh6empybmVwem1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE3Mzk3MDUsImV4cCI6MTk5NzMxNTcwNX0.K1glzkpERU0zS0dGvDx-RMoceIEJ0OKZh8-eWs1V4bk";

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
