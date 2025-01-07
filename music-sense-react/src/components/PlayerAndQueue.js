import "App.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

//Components
import Player from "components/Player.js";
import Queue from "components/Queue.js";

export default function PlayerAndQueue({ token }) {
  // const player = useRef(new Audio());
  const [currentSong, setCurrentSong] = useState(null);
  const [songQueue, setSongQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [spotifyPlayer, setSpotifyPlayer] = useState(null);
  const [isSdkReady, setIsSdkReady] = useState(false);
  const verifyToken = async (token) => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Token is valid. User data:", response.data);
    } catch (error) {
      console.error("Token verification failed:", error.response);
    }
  };

  useEffect(() => {
    // Verify the token when it's updated or the component mounts
    if (token) {
      verifyToken(token);
    }
  }, [token]);

  useEffect(() => {
    // Load Spotify Web Playback SDK
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    // Wait for Spotify SDK to be ready
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log("Spotify Web Playback SDK loaded");
      setIsSdkReady(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

    if (isSdkReady && token) {
      const player = new window.Spotify.Player({
        name: "Music Sense Web Player",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });
      console.log("Token:", token);
      console.log("isSdkReady:", isSdkReady);
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID:", device_id);
      });
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("player_state_changed", (state) => {
        console.log("Player state changed", state);
        console.log("Current track:", state.track_window.current_track);
        console.log("Next tracks:", state.track_window.next_tracks);
        setCurrentSong(state.track_window.current_track);
        setSongQueue(state.track_window.next_tracks);
      });

      player.connect().then((connected) => {
        if (connected) {
          console.log("Player successfully connected!");
        } else {
          console.log("Player failed to connect");
        }
      });
      setSpotifyPlayer(player);

      return () => {
        player.disconnect();
      };
    }
  }, [isSdkReady, token]);

  return (
    <section className="nowPlayingQueue">
      <Player token={token} player={spotifyPlayer} currentSong={currentSong} />
      <Queue token={token} queueSongs={songQueue} loading={loading} />
    </section>
  );
}
