import "App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faRepeat,
  faForwardStep,
  faShuffle,
  faStar,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegStar } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect } from "react";

export default function Player({
  token,
  player,
  currentSong,
  pausePlayback,
  playSong,
  queueSongs,
  playlistID,
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    if (isPlaying) {
      pausePlayback();
      setIsPlaying(false);
    } else {
      playSong(currentSong?.track?.uri);
      setIsPlaying(true);
    }
  };

  const songDuration = currentSong?.track?.duration_ms;

  const formattedDuration = () => {
    console.log("Song Duration:", songDuration); // Debug log
    if (!songDuration) return "0:00";
    const totalSeconds = Math.floor(songDuration / 1000); // Convert to seconds
    const minutes = Math.floor(totalSeconds / 60); // Get whole minutes
    const seconds = totalSeconds % 60; // Get remaining seconds

    // Format the result to ensure seconds are always two digits (e.g., "01", "09")
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <article className="nowPlayingSection">
      <h1 className="title">Now playing</h1>
      <div className="centering">
        <div className="record">
          <div
            className="labelImage"
            style={
              currentSong?.track?.album?.images[0]?.url
                ? {
                    backgroundImage: `url(${currentSong?.track?.album?.images[0]?.url})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }
                : {}
            }
          >
            <div className="label"></div>
          </div>
        </div>
        <div className="songAndArtist">
          <FontAwesomeIcon icon={faRegStar} className="favoriteSongIcon" />
          <span className="songName">
            {currentSong?.track?.name || "Plave noći bez tebe"}
          </span>
          <br />
          <span className="artistName">
            {currentSong?.track?.artists?.[0]?.name || "Divlje Jagode"}
          </span>
        </div>
        <div className="songLengthDuration">
          <div className="songLength">
            <div className="songLengthPoint"></div>
          </div>
          <span className="songDuration">{formattedDuration()}</span>
        </div>
        <div className="playerControls">
          <FontAwesomeIcon icon={faShuffle} className="playerIcon" />
          <FontAwesomeIcon
            icon={faForwardStep}
            className="playerIcon"
            rotation={180}
          />
          {isPlaying ? (
            <FontAwesomeIcon
              icon={faPause}
              className="playerIcon"
              onClick={handleTogglePlay}
            />
          ) : (
            <FontAwesomeIcon
              icon={faPlay}
              className="playerIcon"
              onClick={handleTogglePlay}
            />
          )}
          <FontAwesomeIcon icon={faForwardStep} className="playerIcon" />
          <FontAwesomeIcon icon={faRepeat} className="playerIcon" />
        </div>
      </div>
    </article>
  );
}
