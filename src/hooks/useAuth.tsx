"use client";

import { supabase } from "@/utils/supabaseClient";
import { User } from "@supabase/supabase-js";
import {
  ReactNode,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<User | null>;
  signIn: (email: string, password: string) => Promise<User | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // set user
    const session = supabase.auth.getSession();
    session.then(({ data }) => {
      setUser(data.session?.user || null);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    if (isSubmitting) return null;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error || !data.user) {
        console.error("Sign-up error:", error?.message);
        return null;
      }

      console.log("User signed up successfully:", data.user);
      return data.user;
    } catch (error) {
      // Catch any unexpected errors
      console.error("Unexpected error:", (error as Error).message);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const user = await supabase.auth.signInWithPassword({ email, password });
    return user.data?.user || null;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must used within an AuthProvider");
  }
  return context;
};
