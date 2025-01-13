import "App.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { usePlaylist } from "../PlaylistProvider";
import { SongIsPlaying } from "../SongIsPlayingContext";

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
  const [deviceId, setDeviceId] = useState(null);
  const { playlistId } = usePlaylist();

  const minimumSongIndex = 0;

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

  console.log("Playlist ID in PlayerAndQueue:", playlistId);

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
      if (!token || !playlistId) return;

      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched queue:", data);
        const numberOfSongs = data.items.length;

        const queueWithRandomSongs = [];

        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(
            Math.random() * (numberOfSongs - minimumSongIndex) +
              minimumSongIndex
          );
          queueWithRandomSongs.push(data.items[randomIndex]);
        }

        console.log("Number of songs:", numberOfSongs);

        const queue = queueWithRandomSongs;

        console.log("Initial fetch - Current Song:", queue[0]);
        console.log("Initial fetch - Queue:", queue);
        setCurrentSong(queue[0]);
        setSongQueue(queue.slice(0));
      } catch (error) {
        console.error("Error fetching queue:", error);
      } finally {
        setLoading(false);
      }
    };

    playerQueueFetch();

    const fetchDevices = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/devices",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Available devices:", response.data.devices);
      } catch (error) {
        console.error(
          "Error fetching devices:",
          error.response ? error.response.data : error.message
        );
      }
    };

    // Call fetchDevices to check the available devices
    fetchDevices();

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
        setDeviceId(device_id);
        console.log("Fetched queue:", songQueue);
        // Ensure the device is active before adding tracks to the queue
        const checkDeviceState = async () => {
          try {
            const response = await axios.get(
              "https://api.spotify.com/v1/me/player",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (
              response.data &&
              response.data.device &&
              response.data.device.id === device_id
            ) {
              console.log("Device is active:", response.data.device);
            } else {
              console.error("Device is not active or not found");
            }
          } catch (error) {
            console.error(
              "Error checking device state:",
              error.response ? error.response.data : error.message
            );
          }
        };

        checkDeviceState();
      });
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
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
        if (!state || !state.track_window) {
          console.error("Player state or track_window is null or undefined");
          return; // Exit early if the state or track_window is not available
        }
        console.log("Player state changed:", state);
        const currentTrack = state.track_window.current_track;
        const nextTracks = state.track_window.next_tracks || [];

        console.log("Current Track:", currentTrack);
        console.log("Next Tracks:", nextTracks);
        setCurrentSong(currentTrack);
        setSongQueue(nextTracks);
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
  }, [isSdkReady, token, playlistId]);

  const playSong = async (uri) => {
    if (!deviceId) {
      console.error("Device ID is not set");
      return;
    }
    try {
      await axios.put(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        { uris: [uri] }, // Specify the track URI
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Playback started");
    } catch (error) {
      console.error("Error starting playback:", error.response?.data || error);
    }
  };

  const pausePlayback = async () => {
    try {
      await axios.put(
        `https://api.spotify.com/v1/me/player/pause`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Playback paused");
    } catch (error) {
      console.error("Error pausing playback:", error.response?.data || error);
    }
  };

  const repeatPlayback = async () => {
    try {
      await axios.put(
        `https://api.spotify.com/v1/me/player/repeat`,
        {},
        {
          params: {
            state: "track",
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Playback on repeat");
    } catch (error) {
      console.error("Error repeating playback:", error.response?.data || error);
    }
  };

  const cancelRepeatPlayback = async () => {
    try {
      await axios.put(
        `https://api.spotify.com/v1/me/player/repeat`,
        {},
        {
          params: {
            state: "off",
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Repeat cancelled");
    } catch (error) {
      console.error("Error cancelling repeat:", error.response?.data || error);
    }
  };

  const addToQueue = async (uri, device_id) => {
    try {
      console.log("Adding to queue with device_id:", deviceId);
      const response = await axios.post(
        `https://api.spotify.com/v1/me/player/queue`,
        "",
        {
          params: {
            uri: uri,
            device_id: device_id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Track added to queue:", response);
    } catch (error) {
      console.error(
        "Error adding track to queue:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <section className="nowPlayingQueue">
      <SongIsPlaying>
        <Player
          token={token}
          player={spotifyPlayer}
          currentSong={currentSong}
          queueSongs={songQueue}
          playSong={playSong}
          pausePlayback={pausePlayback}
          repeatPlayback={repeatPlayback}
          cancelRepeat={cancelRepeatPlayback}
          playlistID={playlistId}
          deviceId={deviceId}
          addSongsToQueue={addToQueue}
          isSdkReady={isSdkReady}
        />
        <Queue
          token={token}
          player={spotifyPlayer}
          currentSong={currentSong}
          queueSongs={songQueue}
          playSong={playSong}
          pausePlayback={pausePlayback}
          playlistID={playlistId}
          deviceId={deviceId}
          isSdkReady={isSdkReady}
          loading={loading}
        />
      </SongIsPlaying>
    </section>
  );
}
