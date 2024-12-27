import "App.css";

//Components
import Playlist from "components/Playlist.js";

export default function TopPlaylists() {
  return (
    <section className="topPlaylists">
      <h1 className="title">Top playlists</h1>
      <div className="playListsList">
        <Playlist />
        <Playlist />
        <Playlist />
        <Playlist />
        <Playlist />
      </div>
    </section>
  );
}
