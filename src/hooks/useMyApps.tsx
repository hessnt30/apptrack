"use client";

import { Application } from "@/types/types";
import { supabase } from "@/utils/supabaseClient";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type MyAppsContext = {
  isLoading: boolean;
  myApps: Application[];
  fetchMyApps: () => Promise<Application[] | null>;
  updateApplicationInState: (app: Application) => void;
};

const MyAppsContext = createContext<MyAppsContext | undefined>(undefined);

export function MyAppsProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [unsortedApps, setUnsortedApps] = useState<Application[]>([]);
  const [myApps, setMyApps] = useState<Application[]>([]);

  const fetchMyApps = async () => {
    setIsLoading(true);
    // get user
    if (unsortedApps.length === 0) {
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

        setUnsortedApps(applications);
        setIsLoading(false);
        return applications;
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        return null;
      }
    } else {
      setIsLoading(false);
      return unsortedApps;
    }
  };

  useEffect(() => {
    const appsCopy = unsortedApps;
    appsCopy.sort((app) => {
      if (app.is_favorite) return 1;
      else return 0;
    });

    setMyApps(appsCopy);
  }, [unsortedApps]);

  function updateApplicationInState(updatedApplication: Application) {
    setUnsortedApps((prevApplications) =>
      prevApplications.map((app) =>
        app.id === updatedApplication.id ? updatedApplication : app
      )
    );
  }

  return (
    <MyAppsContext.Provider
      value={{ isLoading, myApps, fetchMyApps, updateApplicationInState }}
    >
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
