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
import { useState } from "react";

export default function Player({ token, player, currentSong }) {
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlaySong = () => {
    if (!currentSong?.uri) {
      console.error("currentSong.uri is undefined");
      return;
    }
    console.log("Playing song:", currentSong.external_urls.spotify);
    player.src = currentSong.external_urls.spotify;
    player.play();
    setIsPlaying((prevState) => !prevState);
  };

  const handlePauseSong = () => {
    player.pause();
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <article className="nowPlayingSection">
      <h1 className="title">Now playing</h1>
      <div className="centering">
        <div className="record">
          <div
            className="labelImage"
            style={{
              backgroundImage: `url( ${currentSong.album.images[0].url} )`,
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
              onClick={handlePlaySong}
            />
          ) : (
            <FontAwesomeIcon
              icon={faPause}
              className="playerIcon"
              onClick={handlePauseSong}
            />
          )}
          <FontAwesomeIcon icon={faForwardStep} className="playerIcon" />
          <FontAwesomeIcon icon={faRepeat} className="playerIcon" />
        </div>
      </div>
    </article>
  );
}
