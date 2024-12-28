import "App.css";
import MusicSenseLogo from "assets/MusicSenseLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function SignInRegister() {
  const CLIENT_ID = "727a7c097cfb4ec4997132e3824c3a6d";
  const CLIENT_SECRET = "96548f701f594b1b980d1d33ef2fd04b";

  useEffect(() => {
    // API Access Token
    let authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => console.log(data));
  }, []);

  let [menuClicked, setMenuClicked] = useState(true);

  let handleSidebarMenu = () => {
    setMenuClicked((prevState) => !prevState);
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
            <button>Sign in with Spotify</button>
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
