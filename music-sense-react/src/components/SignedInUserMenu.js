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

export default function SignedInUserMenu({ onLogOut }) {
  let [menuClicked, setMenuClicked] = useState(true);

  let handleSidebarMenu = () => {
    setMenuClicked((prevState) => !prevState);
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
          <div className="alignCenter pointerCursor">
            <FontAwesomeIcon
              icon={faHome}
              className="hamburgerMenu paddingRight"
            />
            <br />
            <span>Home</span>
          </div>
          <br />
          <div className="alignCenter pointerCursor">
            <FontAwesomeIcon
              icon={faUser}
              className="hamburgerMenu paddingRight"
            />
            <br />
            <span>My profile</span>
          </div>
          <br />
          <div className="alignCenter pointerCursor">
            <FontAwesomeIcon
              icon={faMusic}
              className="hamburgerMenu paddingRight"
            />
            <br />
            <span>My playlists</span>
          </div>
          <br />
          <div className="alignCenter pointerCursor">
            <FontAwesomeIcon
              icon={faStar}
              className="hamburgerMenu paddingRight"
            />
            <br />
            <span>My favorites</span>
          </div>
        </div>
        <div className="buttons paddingBottom">
          <button onClick={onLogOut}>Log out</button>
        </div>
      </section>
    );
  } else {
    return <></>;
  }
}
