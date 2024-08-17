import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ProfileDetails from "./ProfileDetails";

type NavBarProps = {};

export default function NavBar() {
  const [isUserClicked, setIsUserClicked] = useState(false);
  return (
    <nav className="flex justify-between flex-row px-16 pt-8 bg-darkgray">
      <div className="flex flex-row items-center mb-4">
        <h1 className="text-2xl">AppTrack</h1>
        <ul className="flex flex-row">
          <li className="nav-item">
            <button>Dashboard</button>
          </li>
          <li className="nav-item">
            <button>Help</button>
          </li>
        </ul>
      </div>
      <div className="">
        <FontAwesomeIcon
          icon={faUser}
          className="bg-gray border border-gray rounded-full py-2 px-2.5 hover:cursor-pointer"
          onClick={() => setIsUserClicked(!isUserClicked)}
        />
        {isUserClicked && <ProfileDetails />}
      </div>
    </nav>
  );
}
