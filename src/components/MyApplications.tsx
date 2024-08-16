import { Application } from "@/types/types";
import { useEffect, useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import { useMyApps } from "@/hooks/useMyApps";

export default function MyApplications() {
  const { isLoading, myApps, fetchMyApps } = useMyApps();
  // fetch user applications

  useEffect(() => {
    fetchMyApps();
  }, []);

  return (
    <>
      <div>My Applications</div>
      <div>
        {isLoading ? (
          <LoadingOverlay />
        ) : myApps.length > 0 ? (
          myApps.map((app) => (
            <div key={app.id} className="border p-4 mb-4">
              <h2 className="text-xl font-bold">{app.title}</h2>
              <p>Company: {app.company}</p>
              <p>Description: {app.description}</p>
              <p>Application Date: {app.application_date}</p>
              <p>Stage: {app.stage}</p>
              <p>Favorite: {app.is_favorite ? "Yes" : "No"}</p>
            </div>
          ))
        ) : (
          <p>none</p>
        )}
      </div>
    </>
  );
}
