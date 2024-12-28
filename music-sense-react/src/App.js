import "App.css";

//Components
import Navigation from "components/Navigation.js";
import PlayerAndQueue from "components/PlayerAndQueue.js";
import TopPlaylists from "components/TopPlaylists.js";
import Footer from "components/Footer.js";
import SignInRegister from "components/SignInRegister.js";
import SignedInUser from "components/SignedInUserMenu.js";

// Ovako prikazujem fontawesome ikonice: <FontAwesomeIcon icon={faPlay} className="playIcon" />

function App() {
  return (
    <main className="App">
      <Navigation />
      <div className="wrapper">
        <PlayerAndQueue />
        <TopPlaylists />
      </div>
      <Footer />
    </main>
  );
}

export default App;
