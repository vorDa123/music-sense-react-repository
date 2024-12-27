import "App.css";

//Components
import Player from "components/Player.js";
import Queue from "components/Queue.js";

export default function PlayerAndQueue() {
  return (
    <section className="nowPlayingQueue">
      <Player />
      <Queue />
    </section>
  );
}
