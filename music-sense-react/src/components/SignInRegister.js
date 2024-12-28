import "App.css";
import MusicSenseLogo from "assets/MusicSenseLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function SignInRegister() {
  return (
    <section className="signInRegister">
      <div className="titleAndIcon">
        <h1 className="title">Menu</h1>
        <FontAwesomeIcon icon={faXmark} className="hamburgerMenu" />
      </div>
      <div className="buttons">
        <button>Sign in</button>
        <br />
        <button>Register</button>
        <p>OR</p>
        <button>Sign in with Spotify</button>
      </div>
      <img src={MusicSenseLogo} alt="logo" width={150} className="paddingBottom"/>
    </section>
  );
}
