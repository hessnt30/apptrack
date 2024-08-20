"use client";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
