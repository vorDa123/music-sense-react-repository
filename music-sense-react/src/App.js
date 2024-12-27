import "App.css";

//Components
import Navigation from "components/Navigation.js";
import PlayerAndQueue from "components/PlayerAndQueue.js";
import TopPlaylists from "components/TopPlaylists.js";

// Ovako prikazujem fontawesome ikonice: <FontAwesomeIcon icon={faPlay} className="playIcon" />

function App() {
  return (
    <main className="App">
      <div className="wrapper">
        <Navigation />
        <PlayerAndQueue />
        <TopPlaylists />
        {/* <footer>
        </footer> */}
      </div>
    </main>
  );
}

export default App;
