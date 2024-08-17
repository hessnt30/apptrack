import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBuilding,
  faCalendar,
  faStar as regularFaStar,
} from "@fortawesome/free-regular-svg-icons";
import { faStar as solidFaStar } from "@fortawesome/free-solid-svg-icons";
import { Application } from "@/types/types";

// Add icons to the library
library.add(regularFaStar, solidFaStar);

type ApplicationCardProps = {
  app: Application;
  handleCardClicked: (app: Application) => void;
  toggleFavorite: (app: Application) => void;
};

export default function ApplicationCard({
  app,
  handleCardClicked,
  toggleFavorite,
}: ApplicationCardProps) {
  return (
    <div
      key={app.id}
      className="border border-lightgray hover:bg-lightestgray hover:cursor-pointer p-4 mb-4 rounded bg-lightgray"
      onClick={() => handleCardClicked(app)}
      title={`${app.title} at ${app.company}`}
      draggable="true"
    >
      <div className="flex justify-between items-center text-center">
        <h2 className="text-xl truncate">{app.title}</h2>
        <FontAwesomeIcon
          icon={app.is_favorite ? solidFaStar : regularFaStar}
          className="text-yellow-500"
          title="Favorite"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(app);
          }}
        />
      </div>
      <div className="flex flex-row items-center text-center pt-2 text-whitegray">
        <FontAwesomeIcon icon={faBuilding} />{" "}
        <p className="pl-2 truncate">{app.company}</p>
      </div>
      {/* <p>Description: {app.description}</p> */}
      <div className="flex flex-row items-center text-center pt-2 text-whitegray">
        <FontAwesomeIcon icon={faCalendar} />{" "}
        <p className="pl-2 truncate">{app.application_date}</p>
      </div>
    </div>
  );
}
