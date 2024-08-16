"use client";
import CreateApplication from "@/components/CreateApplication";
import LoadingOverlay from "@/components/LoadingOverlay";
import MyApplications from "@/components/MyApplications";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Supabase password: Wd2mWzxU9LYW14if

// Public API Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kcm9kdnJqbHB3ZnN4ZXZxa3dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3MzQ1NjAsImV4cCI6MjAzOTMxMDU2MH0.hF2J_O_VpVdzGFXkBiOWvSLX3AQN4CmY-aIDOfmlYJg

// Row Level Secret: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kcm9kdnJqbHB3ZnN4ZXZxa3dtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMzczNDU2MCwiZXhwIjoyMDM5MzEwNTYwfQ.1pBDUxqHdYtHVRC75P_hR3Sbz-HGOyP8bKyptXMobzg

export default function Home() {
  const [isCreateAppOpen, setIsCreateOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  const handleCreateAppClicked = () => {
    setIsCreateOpen(!isCreateAppOpen);
  };

  useEffect(() => {
    if (!user) {
      router.push("/signup");
    }
  }, [user, router]);

  return (
    <>
      {loading ? (
        <LoadingOverlay />
      ) : (
        <>
          <div className="flex flex-col items-center justify-center min-h-screen py-2 z-0">
            <h1 className="text-2xl font-bold mb-4">
              Welcome to the Dashboard!
            </h1>
            <p>{user?.email}</p>
            <button
              className="p-4 mt-4 bg-blue-500 rounded-full w-12 h-12 text-center"
              onClick={handleCreateAppClicked}
            >
              +
            </button>
            <MyApplications />
            <button
              onClick={signOut}
              className="p-2 mt-4 bg-red-500 text-white rounded"
            >
              Sign Out
            </button>
          </div>

          {isCreateAppOpen && (
            <CreateApplication closeModal={() => setIsCreateOpen(false)} />
          )}
        </>
      )}
    </>
  );
}
