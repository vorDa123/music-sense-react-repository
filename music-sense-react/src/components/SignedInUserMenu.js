import "App.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faXmark,
  faUser,
  faMusic,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

export default function SignedInUserMenu() {
  let [menuClicked, setMenuClicked] = useState(true);

  let handleSidebarMenu = () => {
    setMenuClicked((prevState) => !prevState);
  };

  let handleLogOut = () => {
    setMenuClicked((prevState) => !prevState);
    localStorage.clear();
  };

  if (menuClicked) {
    return (
      <section className="signInRegister">
        <div className="titleAndIcon">
          <h1 className="title">Menu</h1>
          <FontAwesomeIcon
            icon={faXmark}
            className="hamburgerMenu"
            onClick={handleSidebarMenu}
          />
        </div>
        <div className="menuList">
          <FontAwesomeIcon
            icon={faHome}
            className="hamburgerMenu paddingRight"
          />
          <span>Home</span>
          <br />
          <FontAwesomeIcon
            icon={faUser}
            className="hamburgerMenu paddingRight"
          />
          <span>My profile</span>
          <br />
          <FontAwesomeIcon
            icon={faMusic}
            className="hamburgerMenu paddingRight"
          />
          <span>My playlists</span>
          <br />
          <FontAwesomeIcon
            icon={faStar}
            className="hamburgerMenu paddingRight"
          />
          <span>My favorites</span>
          <br />
        </div>
        <div className="buttons paddingBottom">
          <button onClick={handleLogOut}>Log out</button>
        </div>
      </section>
    );
  } else {
    return <></>;
  }
}
