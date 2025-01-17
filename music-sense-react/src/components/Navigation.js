import "App.css";
import MusicSenseLogo from "assets/MusicSenseLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

//Components
import SignInRegister from "components/SignInRegister.js";
import SignedInUserMenu from "components/SignedInUserMenu.js";

export default function Navigation({ token, onTokenUpdate }) {
  let [menuClicked, setMenuClicked] = useState(false);
  const { scrollYProgress } = useScroll();

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["rgba(10, 10, 10, 0)", "rgba(10, 10, 10, 1)"]
  );

  let handleSidebarMenu = () => {
    setMenuClicked((prevState) => !prevState);
  };

  let handleLogOut = () => {
    window.sessionStorage.removeItem("token");
    onTokenUpdate("");
    setMenuClicked((prevState) => !prevState);
  };

  return (
    <>
      <motion.nav style={{ backgroundColor }}>
        <div className="navContent">
          <img src={MusicSenseLogo} id="logoStyle" alt="logo" />
          <FontAwesomeIcon
            icon={faBars}
            className="hamburgerMenu"
            onClick={handleSidebarMenu}
          />
        </div>
      </motion.nav>
      {menuClicked && token ? (
        <SignedInUserMenu onLogOut={handleLogOut} />
      ) : menuClicked && !token ? (
        <SignInRegister onTokenUpdate={onTokenUpdate} />
      ) : null}
    </>
  );
}
