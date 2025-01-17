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
import { motion, useAnimation } from "motion/react";

export default function Player({
  player,
  currentSong,
  pausePlayback,
  playSong,
  repeatPlayback,
  cancelRepeat,
  queueSongs,
  addSongsToQueue,
  deviceId,
  isSdkReady,
  songIsPlaying,
}) {
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [addedToFavorites, setAddedToFavorites] = useState(false);
  const { playing, setPlaying } = useSongIsPlaying();
  const vinylControls = useAnimation();
  const currentRotation = useRef(0);

  const handleTogglePlay = async () => {
    if (playing) {
      try {
        pausePlayback();
      } catch {
        player.togglePlay();
      }
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
      setPlaying(true);
      console.log("setPlaying set to true");
    }
  };

  useEffect(() => {
    console.log("Playing state from context:", playing);
  }, [playing]);

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

  const handleToggleShuffle = () => {
    if (isShuffle) {
      console.log("Shuffle is off");
      setIsShuffle(false);
    } else {
      console.log("Shuffle is on");
      setIsShuffle(true);
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

  const [value, setValue] = useState(0); // Initialize the slider value

  const handleInput = (e) => {
    setValue(e.target.value); // Update state with the slider value
    // Optionally, seek to a specific time if the user manually moves the slider
    if (player) {
      const newPosition = (e.target.value / 100) * duration;
      player.seek(newPosition); // Seek to the new position in the song
    }
  };

  const getBackgroundStyle = () => {
    const percentage = (value / 100) * 100; // Calculate percentage for gradient
    return {
      background: `linear-gradient(to right, #ffe204 0%, #ffe204 ${percentage}%, #ffffff ${percentage}%, #ffffff 100%)`,
    };
  };

  useEffect(() => {
    if (songIsPlaying) {
      // Start looping rotation
      vinylControls.start({
        rotate: [currentRotation.current, currentRotation.current + 360],
        transition: {
          duration: 5, // Time for one full rotation (adjust as needed)
          ease: "linear",
          repeat: Infinity, // Loop indefinitely
        },
      });
    } else {
      // Stop the rotation
      vinylControls.stop();
    }
  }, [songIsPlaying, vinylControls]);

  const handleUpdate = (latest) => {
    currentRotation.current = latest.rotate % 360; // Keep track of the rotation value
  };
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    // Get the song duration when the song is loaded or changed
    if (currentSong) {
      setDuration(currentSong?.duration_ms);
    }
  }, [currentSong]);

  // Sync the slider value with song progress
  useEffect(() => {
    if (songIsPlaying && player) {
      const interval = setInterval(async () => {
        const state = await player.getCurrentState();
        if (state && state.track_window.current_track) {
          const position = state.position; // current playback position in ms
          const duration = state.track_window.current_track.duration_ms; // song duration in ms

          // Update slider value based on current position in the song
          setValue((position / duration) * 100);
        }
      }, 1000); // Update every 1 second

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [songIsPlaying, player, duration]);

  if (isSdkReady && playing) {
    return (
      <article className="nowPlayingSection">
        <h1 className="title">Now playing</h1>
        <div className="centering">
          <motion.div
            className="record"
            animate={vinylControls}
            onUpdate={handleUpdate}
          >
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
          </motion.div>
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
            <input
              type="range"
              id="slider"
              className="songLength"
              min={0}
              max={100}
              value={value}
              onChange={handleInput}
              style={getBackgroundStyle()}
            ></input>
            <span className="songDuration">{formattedDuration()}</span>
          </div>
          <div className="playerControls">
            <FontAwesomeIcon
              icon={faShuffle}
              className="playerIcon"
              style={
                isShuffle
                  ? {
                      color: "#ffe204",
                    }
                  : {}
              }
              onClick={handleToggleShuffle}
            />
            <FontAwesomeIcon
              icon={faForwardStep}
              className="playerIcon"
              rotation={180}
              onClick={handlePlayPrevious}
            />
            {songIsPlaying ? (
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
          <motion.div className="record" animate={vinylControls}>
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
          </motion.div>
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
            <input
              type="range"
              id="slider"
              className="songLength"
              min={0}
              max={100}
              value={value}
              onChange={handleInput}
              style={getBackgroundStyle()}
            ></input>
            <span className="songDuration">{formattedDuration()}</span>
          </div>
          <div className="playerControls">
            <FontAwesomeIcon
              icon={faShuffle}
              className="playerIcon"
              style={
                isShuffle
                  ? {
                      color: "#ffe204",
                    }
                  : {}
              }
              onClick={handleToggleShuffle}
            />
            <FontAwesomeIcon
              icon={faForwardStep}
              className="playerIcon"
              rotation={180}
              onClick={handlePlayPrevious}
            />
            {songIsPlaying ? (
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
  }
}
