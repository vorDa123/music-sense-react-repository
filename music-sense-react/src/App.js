import MusicSenseLogo from "./assets/MusicSenseLogo.svg";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faRepeat,
  faForwardStep,
  faShuffle,
  faStar,
  faBars,
  faXmark,
  faUser,
  faMusic,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegStar } from "@fortawesome/free-regular-svg-icons"; //ista ikonica drugaciji stil, pozivat cu je sa faRegStar

//Components
import PlayerAndQueue from "./components/PlayerAndQueue.js";
import TopPlaylists from "./components/TopPlaylists.js";

// Ovako prikazujem fontawesome ikonice: <FontAwesomeIcon icon={faPlay} className="playIcon" />

function App() {
  return (
    <main className="App">
      <div className="wrapper">
        <nav>
          <img src={MusicSenseLogo} id="logoStyle" alt="logo" />
          <FontAwesomeIcon icon={faBars} className="hamburgerMenu" />
        </nav>
        <PlayerAndQueue />
        <TopPlaylists />
        {/* <footer>
        </footer> */}
      </div>
    </main>
  );
}

export default App;
