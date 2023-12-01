import { createClient } from '@supabase/supabase-js';

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNva25ua256bWd2aWN0Z3VkYXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMzQyMTEsImV4cCI6MjAxNTYxMDIxMX0.S2eGK1K1Jabk5kVC018zYdqYmKINV69kdZbHOkSAed8';

export const SUPABASE_URL = 'https://coknnknzmgvictgudawq.supabase.co';

const supabase = createClient(SUPABASE_URL, supabaseKey);

export default supabase;
