import "App.css";

//Components
import Navigation from "components/Navigation.js";
import PlayerAndQueue from "components/PlayerAndQueue.js";
import TopPlaylists from "components/TopPlaylists.js";
import Footer from "components/Footer.js";

// Ovako prikazujem fontawesome ikonice: <FontAwesomeIcon icon={faPlay} className="playIcon" />

function App() {
  return (
    <main className="App">
      <div className="wrapper">
        <Navigation />
        <PlayerAndQueue />
        <TopPlaylists />
        <Footer />
      </div>
    </main>
  );
}

export default App;
