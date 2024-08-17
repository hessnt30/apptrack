"use client";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Supabase password: Wd2mWzxU9LYW14if

// Public API Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kcm9kdnJqbHB3ZnN4ZXZxa3dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3MzQ1NjAsImV4cCI6MjAzOTMxMDU2MH0.hF2J_O_VpVdzGFXkBiOWvSLX3AQN4CmY-aIDOfmlYJg

// Row Level Secret: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kcm9kdnJqbHB3ZnN4ZXZxa3dtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMzczNDU2MCwiZXhwIjoyMDM5MzEwNTYwfQ.1pBDUxqHdYtHVRC75P_hR3Sbz-HGOyP8bKyptXMobzg

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signup");
    } else {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <>
      <NavBar />
      <div className="h-screen flex justify-center items-center">AppTrack</div>
    </>
  );
}
