import "App.css";
import MusicSenseLogo from "assets/MusicSenseLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

//Components
import SignInRegister from "components/SignInRegister.js";
import SignedInUserMenu from "components/SignedInUserMenu.js";

export default function Navigation() {
  let [menuClicked, setMenuClicked] = useState(false);
  let [signedInUser, setSignedInUser] = useState("");

  let handleSidebarMenu = () => {
    setMenuClicked((prevState) => !prevState);
  };

  useEffect(() => {
    if (localStorage.getItem("signedIn")) {
      setSignedInUser(localStorage.getItem("signedIn"));
    }
  }, []);

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
      {menuClicked && signedInUser == "true" ? (
        <SignedInUserMenu />
      ) : menuClicked && signedInUser !== "true" ? (
        <SignInRegister />
      ) : null}
    </>
  );
}
