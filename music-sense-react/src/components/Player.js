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

export default function Player({ token, player, currentSong }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlaySong = () => {
    if (!currentSong?.uri) {
      console.error("currentSong.uri is undefined");
      return;
    }
    console.log("Playing song:", currentSong.uri);
    player.src = currentSong.uri;
    player.play();
    setIsPlaying((prevState) => !prevState);
  };

  const handlePauseSong = () => {
    player.pause();
    setIsPlaying((prevState) => !prevState);
  };

  const handleTogglePlay = () => {
    if (player) {
      player.togglePlay(); // Use togglePlay to switch between play and pause
      setIsPlaying((prev) => !prev); // Toggle the isPlaying state
    }
  };

  // useEffect(() => {
  //   if (currentSong?.uri) {
  //     player.play({
  //       uris: [currentSong.uri], // Play the new song by its URI
  //     }).then(() => {
  //       setIsPlaying(true); // Make sure the song is playing
  //     }).catch(error => {
  //       console.error("Error playing the track:", error);
  //     });
  //   }
  // }, [currentSong, player]);

  const handlePlayPause = () => {
    if (isPlaying) {
      player.pause(); // Pause the track if it's currently playing
      setIsPlaying(false); // Update the state to paused
    } else {
      player.resume(); // Resume the track if it's currently paused
      setIsPlaying(true); // Update the state to playing
    }
  };

  return (
    <article className="nowPlayingSection">
      <h1 className="title">Now playing</h1>
      <div className="centering">
        <div className="record">
          <div
            className="labelImage"
            style={{
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="label"></div>
          </div>
        </div>
        <div className="songAndArtist">
          <FontAwesomeIcon icon={faRegStar} className="favoriteSongIcon" />
          <span className="songName">
            {currentSong?.name || "Plave noći bez tebe"}
          </span>
          <br />
          <span className="artistName">
            {currentSong?.artists?.[0]?.name || "Divlje Jagode"}
          </span>
        </div>
        <div className="songLengthDuration">
          <div className="songLength">
            <div className="songLengthPoint"></div>
          </div>
          <span className="songDuration">3:45</span>
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
              icon={faPlay}
              className="playerIcon"
              onClick={handleTogglePlay}
            />
          ) : (
            <FontAwesomeIcon
              icon={faPause}
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
