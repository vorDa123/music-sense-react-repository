import "App.css";
import MusicSenseLogo from "assets/MusicSenseLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";

//Components
import SignInRegister from "components/SignInRegister.js";
import SignedInUserMenu from "components/SignedInUserMenu.js";

export default function Navigation({ token, onTokenUpdate }) {
  let [menuClicked, setMenuClicked] = useState(false);
  let [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["rgba(14, 14, 14, 0)", "rgba(14, 14, 14, 1)"]
  );

  let handleSidebarMenu = () => {
    setMenuClicked((prevState) => !prevState);
    setIsVisible((prevState) => !prevState);
  };

  let handleLogOut = () => {
    window.sessionStorage.removeItem("token");
    onTokenUpdate("");
    setMenuClicked((prevState) => !prevState);
    setIsVisible((prevState) => !prevState);
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
      <AnimatePresence initial={false}>
        {menuClicked && token && isVisible ? (
          <SignedInUserMenu onLogOut={handleLogOut} onExit={handleSidebarMenu} menuClicked={menuClicked} />
        ) : menuClicked && !token && isVisible ? (
          <SignInRegister onTokenUpdate={onTokenUpdate} onExit={handleSidebarMenu} menuClicked={menuClicked} />
        ) : null}
      </AnimatePresence>
    </>
  );
}
