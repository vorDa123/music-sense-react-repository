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

// Ovako prikazujem fontawesome ikonice <FontAwesomeIcon icon={faPlay} className="playIcon" />

function App() {
  return (
    <main className="App">
      <div className="wrapper">
        <nav>
          <img src={MusicSenseLogo} id="logoStyle" alt="logo" />
          <FontAwesomeIcon icon={faBars} className="hamburgerMenu" />
        </nav>
        <section className="nowPlayingQueue">
          <article className="nowPlayingSection">
            <h1 className="title">Now playing</h1>
          </article>
          <article className="inQueueSection">
            <h1 className="title">In queue</h1>
          </article>
        </section>
        <section className="topPlaylists">
          <h1 className="title">Top playlists</h1>
        </section>
        {/* <footer>
        </footer> */}
      </div>
    </main>
  );
}

export default App;
