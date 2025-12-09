import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  credits: number;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isConfigured: boolean;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create Supabase client safely
function createSupabaseClient(): SupabaseClient<Database> | null {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  
  if (!url || !key) {
    console.warn('Supabase environment variables not configured');
    return null;
  }
  
  return createClient<Database>(url, key, {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    }
  });
}

const supabaseClient = createSupabaseClient();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  
  const isConfigured = supabaseClient !== null;

  const fetchProfile = async (userId: string) => {
    if (!supabaseClient) return null;
    
    const { data, error } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data as Profile | null;
  };

  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
    }
  };

  useEffect(() => {
    if (!supabaseClient) {
      setLoading(false);
      return;
    }

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer profile fetch with setTimeout to avoid deadlock
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id).then(setProfile);
          }, 0);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id).then(setProfile);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    if (!supabaseClient) return { error: new Error('Supabase not configured') };
    
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    return { error };
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (!supabaseClient) return { error: new Error('Supabase not configured') };
    
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUpWithEmail = async (email: string, password: string, fullName?: string) => {
    if (!supabaseClient) return { error: new Error('Supabase not configured') };
    
    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          full_name: fullName,
        },
      },
    });
    return { error };
  };

  const signOut = async () => {
    if (supabaseClient) {
      await supabaseClient.auth.signOut();
    }
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      profile, 
      loading, 
      isConfigured,
      signInWithGoogle, 
      signInWithEmail,
      signUpWithEmail,
      signOut,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Export a getter for the Supabase client for use elsewhere
export function getSupabase() {
  return supabaseClient;
}