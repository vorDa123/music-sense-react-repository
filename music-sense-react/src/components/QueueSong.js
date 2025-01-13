import "App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSongIsPlaying } from "../SongIsPlayingContext";

export default function Queue({
  queueSongId,
  queueSongName,
  queueSongArtist,
  queueSongImage,
  queueSongUri,
  player,
  pausePlayback,
  playSong,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { setPlaying } = useSongIsPlaying();

  const handleTogglePlay = async () => {
    if (isPlaying) {
      try {
        pausePlayback();
      } catch {
        player.togglePlay();
      }
      setIsPlaying(false);
      setPlaying(false);
    } else {
      const songToPlay = queueSongUri;
      try {
        playSong(songToPlay);
      } catch {
        player.togglePlay();
      }
      setIsPlaying(true);
      setPlaying(true);
      console.log("setPlaying set to true");
    }
  };
  return (
    <div className="songInQueue" key={queueSongId}>
      <div
        className="songImage"
        style={{
          backgroundImage: `url( ${queueSongImage} )`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="songAndArtistInQueue">
        <span className="songNameInQueue">{queueSongName || "London"}</span>
        <br />
        <span className="artistNameInQueue">
          {queueSongArtist || "Divlje Jagode"}
        </span>
      </div>
      {isPlaying ? (
        <FontAwesomeIcon
          icon={faPause}
          className="playIconQueue"
          onClick={handleTogglePlay}
        />
      ) : (
        <FontAwesomeIcon
          icon={faPlay}
          className="playIconQueue"
          onClick={handleTogglePlay}
        />
      )}
    </div>
  );
}
