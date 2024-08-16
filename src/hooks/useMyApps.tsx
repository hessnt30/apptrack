"use client";

import { Application } from "@/types/types";
import { supabase } from "@/utils/supabaseClient";
import { createContext, ReactNode, useContext, useState } from "react";

type MyAppsContext = {
  isLoading: boolean;
  myApps: Application[];
  fetchMyApps: () => Promise<Application[] | null>;
};

const MyAppsContext = createContext<MyAppsContext | undefined>(undefined);

export function MyAppsProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [myApps, setMyApps] = useState<Application[]>([]);

  const fetchMyApps = async () => {

    setIsLoading(true);
    // get user
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("User Error:", userError);
        setIsLoading(false);
        return null;
      }

      if (!user) {
        console.error("No user found");
        setIsLoading(false);
        return null;
      }

      const { data: applications, error: applicationsError } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", user.id);

      if (applicationsError) {
        console.error("Applications Error:", applicationsError);
        setIsLoading(false);
        return null;
      }

      if (!applications) {
        console.error("No applications found");
        setIsLoading(false);
        return null;
      }

      setMyApps(applications);
      setIsLoading(false);
      return applications;
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return null;
    }
  };

  return (
    <MyAppsContext.Provider value={{ isLoading, myApps, fetchMyApps }}>
      {children}
    </MyAppsContext.Provider>
  );
}

export const useMyApps = () => {
  const context = useContext(MyAppsContext);
  if (!context) {
    throw new Error("useMyApps must used within an MyAppsProvider");
  }
  return context;
};
