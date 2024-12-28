import "App.css";
import MusicSenseLogo from "assets/MusicSenseLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

//Components
import SignInRegister from "components/SignInRegister.js";

export default function Navigation() {
  let [menuClicked, setMenuClicked] = useState(false);

  let handleSidebarMenu = () => {
    setMenuClicked((prevState) => !prevState);
  };

  return (
    <>
      <nav>
        <img src={MusicSenseLogo} id="logoStyle" alt="logo" />
        <FontAwesomeIcon
          icon={faBars}
          className="hamburgerMenu"
          onClick={handleSidebarMenu}
        />
      </nav>
      {menuClicked ? <SignInRegister /> : null}
    </>
  );
}
