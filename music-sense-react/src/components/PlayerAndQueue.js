import "App.css";

//Components
import Player from "components/Player.js";
import Queue from "components/Queue.js";

export default function PlayerAndQueue({ token }) {
  return (
    <section className="nowPlayingQueue">
      <Player token={token} />
      <Queue token={token} />
    </section>
  );
}
