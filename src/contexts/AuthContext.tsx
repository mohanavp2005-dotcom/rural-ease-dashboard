import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: { full_name: string; phone: string; role: "owner" | "customer" } | null;
  business: { id: string; name: string; business_type: string; store_code: string } | null;
  loading: boolean;
  signUp: (email: string, password: string, meta: Record<string, string>) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<AuthContextType["profile"]>(null);
  const [business, setBusiness] = useState<AuthContextType["business"]>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("full_name, phone, role")
      .eq("user_id", userId)
      .single();
    if (data) setProfile(data);
    return data;
  };

  const fetchBusiness = async (userId: string) => {
    const { data } = await supabase
      .from("businesses")
      .select("id, name, business_type, store_code")
      .eq("owner_id", userId)
      .single();
    if (data) setBusiness(data);
    return data;
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(async () => {
            const p = await fetchProfile(session.user.id);
            if (p?.role === "owner") {
              await fetchBusiness(session.user.id);
            }
          }, 0);
        } else {
          setProfile(null);
          setBusiness(null);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id).then((p) => {
          if (p?.role === "owner") fetchBusiness(session.user.id);
        });
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, meta: Record<string, string>) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: meta },
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setBusiness(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, business, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
