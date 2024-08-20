"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <>
      <div>
        <button onClick={() => router.back()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>
    </>
  );
}
