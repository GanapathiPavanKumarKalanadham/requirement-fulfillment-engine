import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string;
  github_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Roadmap = {
  id: string;
  user_id: string;
  title: string;
  topic: string;
  nodes: any[];
  edges: any[];
  created_at: string;
  updated_at: string;
};

export type CodeSubmission = {
  id: string;
  user_id: string;
  problem_id: number;
  code: string;
  language: string;
  status: string;
  output: string | null;
  execution_time: number;
  memory_used: number;
  created_at: string;
};
