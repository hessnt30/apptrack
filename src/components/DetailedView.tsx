import { Application } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar as regularFaStar } from "@fortawesome/free-regular-svg-icons";
import {
  faXmark,
  faStar as solidFaStar,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ConfirmDelete from "./ConfirmDelete";

// Add icons to the library
library.add(regularFaStar, solidFaStar);

type DetailedViewProps = {
  closeModal: () => void;
  app: Application;
};

export default function DetailedView({ closeModal, app }: DetailedViewProps) {
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  useEffect(() => {
    console.log(app);
  }, []);

  const handleDelete = async () => {
    setIsDeleteClicked(true);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <div className="bg-gray p-8 rounded-lg shadow-lg w-1/2">
          <div className="flex justify-between">
            <h1 className="text-2xl mb-4">{app.title}</h1>
            <button>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={closeModal}
                className="text-2xl"
              />
            </button>
          </div>
          <hr></hr>
          <div className="flex flex-col">
            <div className="flex justify-between items-center mt-4">
              <p>Company: {app.company}</p>{" "}
              <FontAwesomeIcon
                icon={app.is_favorite ? solidFaStar : regularFaStar}
                className="text-yellow-500"
                title="Favorite"
              />
            </div>
            <p>Description: {app.description}</p>
            <p>Application Date: {app.application_date}</p>
            <p>Stage: {app.stage}</p>

            <button
              className="mt-8 bg-red-500 p-2 border rounded border-red-500 hover:border-red-600 hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {isDeleteClicked && (
        <ConfirmDelete
          closeModal={closeModal}
          closeDeleteModal={() => setIsDeleteClicked(false)}
          app={app}
        />
      )}
    </>
  );
}
