import "App.css";

import { useEffect, useState } from "react";

//Components
import Navigation from "components/Navigation.js";
import PlayerAndQueue from "components/PlayerAndQueue.js";
import TopPlaylists from "components/TopPlaylists.js";
import Footer from "components/Footer.js";
import SignInRegister from "components/SignInRegister.js";
import SignedInUser from "components/SignedInUserMenu.js";

// Ovako prikazujem fontawesome ikonice: <FontAwesomeIcon icon={faPlay} className="playIcon" />

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    // Load token from localStorage when the app starts
    const storedToken = window.localStorage.getItem("token");
    setToken(storedToken || "");
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      const tokenFromHash = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      if (tokenFromHash) {
        window.localStorage.setItem("token", tokenFromHash);
        setToken(tokenFromHash);
      }
      window.location.hash = "";
    } else if (token) {
      setToken(token);
    }
  }, []);

  const handleTokenUpdate = (newToken) => {
    // Update the token state when it changes
    setToken(newToken);
    if (newToken) {
      window.localStorage.setItem("token", newToken);
    } else {
      window.localStorage.removeItem("token");
    }
  };

  return (
    <main className="App">
      <Navigation token={token} onTokenUpdate={handleTokenUpdate} />
      <div className="wrapper">
        <PlayerAndQueue />
        <TopPlaylists token={token} />
      </div>
      <Footer />
    </main>
  );
}

export default App;
