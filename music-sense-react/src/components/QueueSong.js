import "App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { useSongIsPlaying } from "../SongIsPlayingContext";
import { motion } from "motion/react";

export default function Queue({
  queueSongId,
  queueSongName,
  queueSongArtist,
  queueSongImage,
  queueSongUri,
  player,
  pausePlayback,
  playSong,
  currentSong,
  songIsPlaying,
  queueSongVariants,
}) {
  const { playing, setPlaying } = useSongIsPlaying();

  const handleTogglePlay = async () => {
    if (playing) {
      try {
        pausePlayback();
      } catch {
        player.togglePlay();
      }
      setPlaying(false);
    } else {
      const songToPlay = queueSongUri;
      try {
        playSong(songToPlay);
      } catch {
        player.togglePlay();
      }
      setPlaying(true);
      console.log("setPlaying set to true");
    }
  };
  return (
    <motion.div
      className="songInQueue"
      key={queueSongId}
      variants={queueSongVariants}
      initial="notLoaded"
      animate="loaded"
      exit="exit"
    >
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
      {songIsPlaying && queueSongId === currentSong.id ? (
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
    </motion.div>
  );
}
