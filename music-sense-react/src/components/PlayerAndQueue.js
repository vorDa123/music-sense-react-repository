import "App.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

//Components
import Player from "components/Player.js";
import Queue from "components/Queue.js";

export default function PlayerAndQueue({ token }) {
  const player = useRef(new Audio());
  const [currentSong, setCurrentSong] = useState(null);
  const [songQueue, setSongQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const playerQueueFetch = async () => {
      if (!token) return;

      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://api.spotify.com/v1/me/player/queue",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched queue:", data);
        setCurrentSong(data.currently_playing);
        setSongQueue(data.queue);
      } catch (error) {
        console.error("Error fetching queue:", error);
      } finally {
        setLoading(false);
      }
    };

    playerQueueFetch();
  }, [token]);

  return (
    <section className="nowPlayingQueue">
      <Player token={token} player={player.current} currentSong = {currentSong} />
      <Queue token={token} queueSongs = {songQueue}/>
    </section>
  );
}
