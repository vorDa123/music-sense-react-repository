import "App.css";
import MusicSenseLogo from "assets/MusicSenseLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faUser,
  faMusic,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

export default function Navigation() {
  return (
    <nav>
      <img src={MusicSenseLogo} id="logoStyle" alt="logo" />
      <FontAwesomeIcon icon={faBars} className="hamburgerMenu" />
    </nav>
  );
}
