"use client";
import AppTracker from "@/components/AppTracker";
import CreateApplication from "@/components/CreateApplication";
import LoadingOverlay from "@/components/LoadingOverlay";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [isCreateAppOpen, setIsCreateOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signup");
    } else {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleCreateAppClicked = () => {
    setIsCreateOpen(!isCreateAppOpen);
  };

  return (
    <>
      {loading ? (
        <LoadingOverlay />
      ) : (
        <>
          <NavBar />

          <AppTracker handleCreateAppClicked={handleCreateAppClicked} />

          {isCreateAppOpen && (
            <CreateApplication closeModal={() => setIsCreateOpen(false)} />
          )}
        </>
      )}
    </>
  );
}
