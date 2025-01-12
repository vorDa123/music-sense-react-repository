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
import { useState, useEffect, useRef } from "react";
import { useSongIsPlaying } from "../SongIsPlayingContext";

export default function Player({
  token,
  player,
  currentSong,
  pausePlayback,
  playSong,
  repeatPlayback,
  cancelRepeat,
  queueSongs,
  playlistID,
  addSongsToQueue,
  deviceId,
  isSdkReady,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [addedToFavorites, setAddedToFavorites] = useState(false);
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
      const songToPlay = currentSong?.track?.uri;
      try {
        playSong(songToPlay);
        // Add each song in songQueue to Spotify's playback queue
        for (const song of queueSongs) {
          const songUri = song.track.uri;
          console.log("Adding song to queue:", songUri); // Log the song URI
          await addSongsToQueue(songUri, deviceId); // Add track to Spotify queue
        }
      } catch {
        player.togglePlay();
      }
      setIsPlaying(true);
      setPlaying(true);
      console.log("setPlaying set to true");
    }
  };

  const handleToggleRepeat = () => {
    if (isRepeat) {
      console.log("Repeat is off");
      cancelRepeat();
      setIsRepeat(false);
    } else {
      console.log("Repeat is on");
      repeatPlayback();
      setIsRepeat(true);
    }
  };

  const handlePlayNext = () => {
    player.nextTrack();
  };

  const handlePlayPrevious = () => {
    player.previousTrack();
  };

  const handleAddToFavorites = () => {
    setAddedToFavorites((prevState) => !prevState);
  };

  const songDuration =
    currentSong?.duration_ms || currentSong?.track?.duration_ms;

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

  if (isSdkReady && isPlaying) {
    return (
      <article className="nowPlayingSection">
        <h1 className="title">Now playing</h1>
        <div className="centering">
          <div className="record">
            <div
              className="labelImage"
              style={
                currentSong?.album?.images[0]?.url
                  ? {
                      backgroundImage: `url(${currentSong?.album?.images[0]?.url})`,
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
            {addedToFavorites ? (
              <FontAwesomeIcon
                icon={faStar}
                className="favoriteSongIcon"
                onClick={handleAddToFavorites}
              />
            ) : (
              <FontAwesomeIcon
                icon={faRegStar}
                className="favoriteSongIcon"
                onClick={handleAddToFavorites}
              />
            )}
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
            <span className="songDuration">{formattedDuration()}</span>
          </div>
          <div className="playerControls">
            <FontAwesomeIcon icon={faShuffle} className="playerIcon" />
            <FontAwesomeIcon
              icon={faForwardStep}
              className="playerIcon"
              rotation={180}
              onClick={handlePlayPrevious}
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
            <FontAwesomeIcon
              icon={faForwardStep}
              className="playerIcon"
              onClick={handlePlayNext}
            />
            <FontAwesomeIcon
              icon={faRepeat}
              className="playerIcon"
              style={
                isRepeat
                  ? {
                      color: "#ffe204",
                    }
                  : {}
              }
              onClick={handleToggleRepeat}
            />
          </div>
        </div>
      </article>
    );
  } else {
    return (
      <article className="nowPlayingSection">
        <h1 className="title">Now playing</h1>
        <div className="centering">
          <div className="record">
            <div
              className="labelImage"
              style={
                currentSong?.track?.album?.images[0]?.url ||
                currentSong?.album?.images[0]?.url
                  ? {
                      backgroundImage: `url(${
                        currentSong?.track?.album?.images[0]?.url ||
                        currentSong?.album?.images[0]?.url
                      })`,
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
              {currentSong?.track?.name ||
                currentSong?.name ||
                "Plave noći bez tebe"}
            </span>
            <br />
            <span className="artistName">
              {currentSong?.track?.artists?.[0]?.name ||
                currentSong?.artists?.[0]?.name ||
                "Divlje Jagode"}
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
            <FontAwesomeIcon
              icon={faRepeat}
              className="playerIcon"
              style={
                isRepeat
                  ? {
                      color: "#ffe204",
                    }
                  : {}
              }
              onClick={handleToggleRepeat}
            />
          </div>
        </div>
      </article>
    );
  }
}
