import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  role: 'super_super_admin' | 'hospital_super_admin' | 'department_sub_admin' | 'engineer' | 'clinical_staff' | 'external_stakeholder';
  hospital_id?: string;
  department_id?: string;
  is_active: boolean;
}

interface AuthContextType {
  user: SupabaseUser | null;
  profile: Profile | null;
  session: Session | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: any }>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role?: Profile['role']
  ) => Promise<{ error?: any }>;
  requestPasswordReset: (email: string) => Promise<{ error?: any }>;
  resendConfirmationEmail: (email: string) => Promise<{ error?: any }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<Pick<Profile, 'first_name' | 'last_name' | 'phone'>>) => Promise<{ error?: any }>;
  deactivateProfile: () => Promise<{ error?: any }>;
  showWelcomePopup: boolean;
  setShowWelcomePopup: (show: boolean) => void;
  showRestrictedPopup: boolean;
  setShowRestrictedPopup: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [showRestrictedPopup, setShowRestrictedPopup] = useState(false);

  const isLoggedIn = !!user && !!session;

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Fetch user profile (deferred to avoid auth callback deadlocks)
          setTimeout(() => {
            supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()
              .then(({ data: profileData }) => {
                if (profileData) {
                  setProfile(profileData);
                }
              });
          }, 0);
        } else {
          setProfile(null);
        }

        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profileData }) => {
            if (profileData) {
              setProfile(profileData);
            }
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { error };
  };

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: Profile['role'] = 'clinical_staff'
  ) => {
    // Use root URL for maximum compatibility with Supabase "Redirect URLs" settings
    const redirectUrl = `${window.location.origin}/`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: firstName,
          last_name: lastName,
          role: role,
        },
      },
    });

    if (!error) {
      setShowWelcomePopup(true);
    }

    return { error };
  };

  const requestPasswordReset = async (email: string) => {
    // Use root URL for maximum compatibility with Supabase "Redirect URLs" settings
    const redirectTo = `${window.location.origin}/`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    return { error };
  };

  const resendConfirmationEmail = async (email: string) => {
    // Use root URL for maximum compatibility with Supabase "Redirect URLs" settings
    const emailRedirectTo = `${window.location.origin}/`;

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo,
      },
    });

    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
    setShowWelcomePopup(false);
    setShowRestrictedPopup(false);
  };

  const updateProfile = async (updates: Partial<Pick<Profile, 'first_name' | 'last_name' | 'phone'>>) => {
    if (!user) return { error: new Error('Not authenticated') };

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select('*')
      .maybeSingle();

    if (!error && data) {
      setProfile(data as Profile);
    }

    if (!error && !data) {
      return { error: new Error('Profile update returned no data. Please ensure the database update policy is applied.') };
    }

    return { error };
  };

  // "Delete" user info safely: deactivate + clear optional fields.
  // We avoid deleting auth.users (requires server-side admin privileges).
  const deactivateProfile = async () => {
    if (!user) return { error: new Error('Not authenticated') };

    const { data, error } = await supabase
      .from('profiles')
      .update({ is_active: false, phone: null })
      .eq('id', user.id)
      .select('*')
      .maybeSingle();

    if (!error && data) {
      setProfile(data as Profile);
    }

    if (!error && !data) {
      return { error: new Error('Profile update returned no data. Please ensure the database update policy is applied.') };
    }

    return { error };
  };

  const value = {
    user,
    profile,
    session,
    isLoggedIn,
    loading,
    login,
    signup,
    requestPasswordReset,
    resendConfirmationEmail,
    logout,
    updateProfile,
    deactivateProfile,
    showWelcomePopup,
    setShowWelcomePopup,
    showRestrictedPopup,
    setShowRestrictedPopup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};