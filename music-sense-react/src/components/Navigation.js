import "App.css";
import MusicSenseLogo from "assets/MusicSenseLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

//Components
import SignInRegister from "components/SignInRegister.js";
import SignedInUserMenu from "components/SignedInUserMenu.js";

export default function Navigation({token, onTokenUpdate}) {
  let [menuClicked, setMenuClicked] = useState(false);

  let handleSidebarMenu = () => {
    setMenuClicked((prevState) => !prevState);
  };
  
  let handleLogOut = () => {
    window.localStorage.removeItem("token");
    onTokenUpdate("");
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
      {menuClicked && token ? (
        <SignedInUserMenu onLogOut={handleLogOut} />
      ) : menuClicked && !token ? (
        <SignInRegister onTokenUpdate = {onTokenUpdate}/>
      ) : null}
    </>
  );
}
