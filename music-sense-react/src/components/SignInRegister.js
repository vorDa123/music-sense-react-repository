import "App.css";
import MusicSenseLogo from "assets/MusicSenseLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function SignInRegister() {
  const CLIENT_ID = "727a7c097cfb4ec4997132e3824c3a6d";
  const CLIENT_SECRET = "96548f701f594b1b980d1d33ef2fd04b";
  const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URI_AFTER_LOGIN = "http://localhost:3000";

  let [menuClicked, setMenuClicked] = useState(true);
  let [token, setToken] = useState("");
  
  let handleSidebarMenu = () => {
    setMenuClicked((prevState) => !prevState);
  };  
  
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
      window.location.reload();
    }
    setToken(token);
  }, []);

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI_AFTER_LOGIN}&response_type=token&show_dialog=true`;
  };

  if (menuClicked) {
    return (
      <>
        <section className="signInRegister">
          <div className="titleAndIcon">
            <h1 className="title">Menu</h1>
            <FontAwesomeIcon
              icon={faXmark}
              className="hamburgerMenu"
              onClick={handleSidebarMenu}
            />
          </div>
          <div className="buttons">
            <button>Sign in</button>
            <br />
            <button>Register</button>
            <p>OR</p>
            <button onClick={handleLogin}>Sign in with Spotify</button>
          </div>
          <img
            src={MusicSenseLogo}
            alt="logo"
            width={150}
            className="paddingBottom"
          />
        </section>
      </>
    );
  } else {
    return <></>;
  }
}
