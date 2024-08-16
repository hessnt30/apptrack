import { ReactElement, useEffect, useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import { useMyApps } from "@/hooks/useMyApps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar as regularFaStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidFaStar } from "@fortawesome/free-solid-svg-icons";
import { Application } from "@/types/types";
import DetailedView from "./DetailedView";

// Add icons to the library
library.add(regularFaStar, solidFaStar);

export default function MyApplications() {
  const { isLoading, myApps, fetchMyApps } = useMyApps();
  const [isDetailedViewOpen, setIsDetailedViewOpen] = useState(false);
  const [detailedView, setDetailedView] = useState<ReactElement | null>(null);

  useEffect(() => {
    fetchMyApps();
  }, []);

  const handleCardClicked = (app: Application) => {
    // open detailed view of application
    setIsDetailedViewOpen(true);
    setDetailedView(
      <DetailedView closeModal={() => setIsDetailedViewOpen(false)} app={app} />
    );
  };

  return (
    <>
      <div>My Applications</div>
      <div>
        {isLoading ? (
          <LoadingOverlay />
        ) : myApps.length > 0 ? (
          myApps.map((app) => (
            <div
              key={app.id}
              className="border border-gray hover:bg-lightgray hover:cursor-pointer p-4 mb-4 rounded bg-gray"
              onClick={() => handleCardClicked(app)}
            >
              <h2 className="text-xl font-bold">{app.title}</h2>
              <p>Company: {app.company}</p>
              <p>Description: {app.description}</p>
              <p>Application Date: {app.application_date}</p>
              <p>Stage: {app.stage}</p>

              <FontAwesomeIcon
                icon={app.is_favorite ? solidFaStar : regularFaStar}
                className="text-yellow-500"
                title="Favorite"
              />
            </div>
          ))
        ) : (
          <p>none</p>
        )}
      </div>
      {isDetailedViewOpen && detailedView}
    </>
  );
}
