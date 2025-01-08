import "App.css";
import { usePlaylist } from "../PlaylistProvider";

export default function Playlist({ playlistId, playlistName, playlistImage }) {
  const { setPlaylistId } = usePlaylist();
  const handleCardClick = () => {
    setPlaylistId(playlistId);
  };
  return (
    <div
      className="playlist"
      key={playlistId}
      style={{
        backgroundImage: `url( ${playlistImage} )`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        cursor: "pointer",
      }}
      onClick={handleCardClick}
    >
      <div
        style={{
          height: "inherit",
          background:
            "linear-gradient(360deg, rgba(10,10,10,0.8) 50%, rgba(250,250,250,0) 100%)",
          borderRadius: "8px",
        }}
      >
        <span className="playlistName">{playlistName}</span>
      </div>
    </div>
  );
}
