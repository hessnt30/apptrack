import { ReactElement, useEffect, useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import { useMyApps } from "@/hooks/useMyApps";
import { Application } from "@/types/types";
import DetailedView from "./DetailedView";
import ApplicationCard from "./ApplicationCard";
import { supabase } from "@/utils/supabaseClient";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type MyApplicationsProps = {
  title: string;
  handleCreateAppClicked: () => void;
};

export default function MyApplications({
  title,
  handleCreateAppClicked,
}: MyApplicationsProps) {
  const { isLoading, myApps, fetchMyApps, updateApplicationInState } =
    useMyApps();
  const [isDetailedViewOpen, setIsDetailedViewOpen] = useState(false);
  const [detailedView, setDetailedView] = useState<ReactElement | null>(null);

  useEffect(() => {
    console.log(myApps);
    fetchMyApps();
  }, []);

  const handleCardClicked = (app: Application) => {
    // open detailed view of application
    setIsDetailedViewOpen(true);
    setDetailedView(
      <DetailedView closeModal={() => setIsDetailedViewOpen(false)} app={app} />
    );
  };

  const toggleFavorite = async (app: Application) => {
    const updatedApp = { ...app, is_favorite: !app.is_favorite };

    // Optimistically update the UI
    updateApplicationInState(updatedApp);

    // Update the database
    const { data, error } = await supabase
      .from("applications")
      .update({ is_favorite: updatedApp.is_favorite })
      .eq("id", app.id);

    if (error) {
      console.error("Error updating favorite status:", error.message);
      updateApplicationInState(app);
    }
  };

  return (
    <>
      <div>
        {isLoading ? (
          <LoadingOverlay />
        ) : myApps.length > 0 ? (
          myApps.map(
            (app) =>
              title === app.stage && (
                <ApplicationCard
                  key={app.id}
                  app={app}
                  handleCardClicked={handleCardClicked}
                  toggleFavorite={toggleFavorite}
                />
              )
          )
        ) : (
          <p>none</p>
        )}
        <button
          onClick={handleCreateAppClicked}
          className="w-full flex flex-row justify-center items-center border rounded border-lightergray bg-lightergray hover:bg-lightestgray"
        >
          <FontAwesomeIcon icon={faPlus} className="pr-4 py-2" />
          <p>Add App</p>
        </button>
      </div>
      {isDetailedViewOpen && detailedView}
    </>
  );
}
