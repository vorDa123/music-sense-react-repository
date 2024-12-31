import "App.css";

export default function Playlist({ playlistId, playlistName, playlistImage }) {
  return (
    <div
      className="playlist"
      key={playlistId}
      style={{ backgroundImage: `url( ${playlistImage} )` }}
    >
      <span className="playlistName">{playlistName}</span>
    </div>
  );
}
