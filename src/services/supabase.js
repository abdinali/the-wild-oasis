import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://qqbcpexxbprfhtxjahpc.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxYmNwZXh4YnByZmh0eGphaHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NzA3MzAsImV4cCI6MjA1OTQ0NjczMH0.Tni1IBPuc-XGDflKd-sz7WLwO8qSvM7dq8Rmvv6oN48';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
