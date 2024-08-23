"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faClock,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <>
      <div className="border border-lightgray bg-lightgray m-32 rounded p-12">
        <div className="flex flex-row">
          <button className="" onClick={() => router.back()}>
            <FontAwesomeIcon className="" icon={faChevronLeft} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="">
            <div className="flex flex-row items-center mb-4" title="Email">
              <FontAwesomeIcon className="mr-2" icon={faEnvelope} />
              <p>{user?.email || "none"}</p>
            </div>
            {user?.phone && (
              <div className="flex flex-row items-center mb-4" title="Phone Number">
                <FontAwesomeIcon className="mr-2" icon={faPhone} />
                <p>{user?.phone || "none"}</p>
              </div>
            )}
            <div className="flex flex-row items-center mb-4" title="Created At">
              <FontAwesomeIcon className="mr-2" icon={faClock} />
              <p>
                {user?.created_at && new Date(user?.created_at).toUTCString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
