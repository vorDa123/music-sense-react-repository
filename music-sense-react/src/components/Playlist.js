import "App.css";

export default function Playlist({ playlistId, playlistName, playlistImage }) {
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
