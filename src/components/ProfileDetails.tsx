"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function ProfileDetails() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  return (
    <div className="fixed right-7 bg-lightergray p-2 border rounded border-lightergray ">
      <div className="flex flex-col items-start">
        <button
          className="w-full p-2 px-4 hover:bg-lightestgray border border-lightergray rounded"
          onClick={() => router.push("/profile")}
        >
          Profile
        </button>
        <hr className="w-5/6 ml-2 my-2 text-lightestgray" />
        <button
          onClick={signOut}
          className="w-full p-2 px-4 hover:bg-red-500 hover:border-red-500 border border-red-700 bg-red-700 rounded"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
