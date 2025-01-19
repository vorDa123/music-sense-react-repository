import "App.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSongIsPlaying } from "../SongIsPlayingContext";
import { motion, AnimatePresence } from "motion/react";

//Components
import QueueSong from "components/QueueSong.js";

export default function Queue({
  token,
  player,
  pausePlayback,
  playSong,
  queueSongs,
  playlistID,
  deviceId,
  isSdkReady,
  loading,
  currentSong,
  songIsPlaying,
}) {
  let defaultQueueSongs = [
    {
      id: 1,
      name: "London",
      artist: "Divlje Jagode",
    },
    {
      id: 2,
      name: "Davno ljeto 89'",
      artist: "Divlje Jagode",
    },
    {
      id: 3,
      name: "Plave noći bez tebe",
      artist: "Divlje Jagode",
    },
    {
      id: 4,
      name: "Virtualni svijet",
      artist: "Divlje Jagode",
    },
    {
      id: 5,
      name: "Kap po kap",
      artist: "Divlje Jagode",
    },
  ];

  const [playerQueue, setPlayerQueue] = useState([]);
  const { playing, setPlaying } = useSongIsPlaying();
  const hasFetchedQueue = useRef(false); // Track if queue fetch has been triggered

  const isFetchingQueue = useRef(false);

  console.log("Queue: isPlaying =", playing);
  const playerQueueFetch = async () => {
    if (isFetchingQueue.current) return;

    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/me/player/queue`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetched player queue:", data);

      setPlayerQueue(data.queue);
    } catch (error) {
      if (error.response?.status === 429) {
        const retryAfter = error.response.headers["retry-after"];
        console.log(
          `Rate limit exceeded. Retrying after ${retryAfter} seconds.`
        );
        setTimeout(playerQueueFetch, retryAfter * 1000); // Retry after the suggested time
      } else {
        console.error(
          "Error fetching queue:",
          error.response?.data || error.message
        );
      }
    } finally {
      isFetchingQueue.current = false;
    }
  };

  useEffect(() => {
    console.log("useEffect triggered: setPlaying =", setPlaying);
    if (setPlaying && !hasFetchedQueue.current) {
      console.log("Fetching player queue...");
      hasFetchedQueue.current = true; // Mark as fetched
      playerQueueFetch();
      setTimeout(() => {
        console.log("Resetting setPlaying and fetch tracking");
        setPlaying(false); // Reset setPlaying to avoid endless loop
        hasFetchedQueue.current = false; // Reset fetch tracking for future calls
        playerQueueFetch(); // Fetch again after reset
      }, 10000); // Adjust delay as needed
    } // eslint-disable-next-line
  }, [playing, token]); // Run effect when setPlaying or token changes

  const queueSongVariants = {
    loaded: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
      },
    },
    notLoaded: {
      y: 250,
      opacity: 0,
      transition: {
        duration: 0.7,
      },
    },
    exit: {
      y: 250,
      opacity: 0,
      transition: {
        duration: 0.7,
      },
    },
  };

  if (token && isSdkReady && playerQueue.length > 0) {
    return (
      <article className="inQueueSection">
        <h1 className="title">In queue</h1>
        <motion.div class="queueList">
          <AnimatePresence>
            {playerQueue.slice(0, 5).map((playerQueueSong) => (
              <QueueSong
                queueSongId={playerQueueSong.id}
                queueSongName={playerQueueSong.name}
                queueSongArtist={playerQueueSong.artists[0].name}
                queueSongImage={playerQueueSong.album.images[0].url}
                queueSongUri={playerQueueSong.uri}
                token={token}
                player={player}
                queueSongs={queueSongs}
                playSong={playSong}
                pausePlayback={pausePlayback}
                deviceId={deviceId}
                isSdkReady={isSdkReady}
                currentSong={currentSong}
                songIsPlaying={songIsPlaying}
                queueSongVariants={queueSongVariants}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </article>
    );
  } else if (token && queueSongs.length > 0 && !loading) {
    return (
      <article className="inQueueSection">
        <h1 className="title">In queue</h1>
        <motion.div class="queueList">
          <AnimatePresence>
            {queueSongs.slice(1, 6).map((queueSong) => (
              <QueueSong
                queueSongId={queueSong.track?.id}
                queueSongName={queueSong.track?.name}
                queueSongArtist={queueSong.track?.artists[0].name}
                queueSongImage={queueSong.track?.album.images[0].url}
                queueSongUri={queueSong.track?.uri}
                token={token}
                player={player}
                queueSongs={queueSongs}
                playSong={playSong}
                pausePlayback={pausePlayback}
                deviceId={deviceId}
                isSdkReady={isSdkReady}
                currentSong={currentSong}
                songIsPlaying={songIsPlaying}
                queueSongVariants={queueSongVariants}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </article>
    );
  } else {
    return (
      <article className="inQueueSection">
        <h1 className="title">In queue</h1>
        <motion.div class="queueList">
          <AnimatePresence>
            {defaultQueueSongs.slice(0, 5).map((song) => (
              <QueueSong
                queueSongId={song.id}
                queueSongName={song.name}
                queueSongArtist={song.artist}
                queueSongVariants={queueSongVariants}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </article>
    );
  }
}
