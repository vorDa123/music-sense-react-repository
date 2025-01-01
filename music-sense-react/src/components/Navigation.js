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
  const [token, setToken] = useState("");

  let handleSidebarMenu = () => {
    setMenuClicked((prevState) => !prevState);
  };

  useEffect(() => {
    let token = window.localStorage.getItem("token");
    setToken(token || "");
  }, []);

  const handleTokenUpdate = (newToken) => {
    setToken(newToken);
  };
  
  let handleLogOut = () => {
    window.localStorage.removeItem("token");
    setToken("");
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
        <SignInRegister onTokenUpdate = {handleTokenUpdate}/>
      ) : null}
    </>
  );
}
