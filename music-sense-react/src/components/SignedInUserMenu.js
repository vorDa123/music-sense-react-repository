import "App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faXmark,
  faUser,
  faMusic,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

export default function SignedInUserMenu() {
  return (
    <section className="signInRegister">
      <div className="titleAndIcon">
        <h1 className="title">Menu</h1>
        <FontAwesomeIcon icon={faXmark} className="hamburgerMenu" />
      </div>
      <div className="menuList">
        <FontAwesomeIcon icon={faHome} className="hamburgerMenu paddingRight" />
        <span>Home</span>
        <br />
        <FontAwesomeIcon icon={faUser} className="hamburgerMenu paddingRight" />
        <span>My profile</span>
        <br />
        <FontAwesomeIcon
          icon={faMusic}
          className="hamburgerMenu paddingRight"
        />
        <span>My playlists</span>
        <br />
        <FontAwesomeIcon icon={faStar} className="hamburgerMenu paddingRight" />
        <span>My favorites</span>
        <br />
      </div>
      <div className="buttons paddingBottom">
        <button>Log out</button>
      </div>
    </section>
  );
}
