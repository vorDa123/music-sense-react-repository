import "App.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { usePlaylist } from "../PlaylistProvider";

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
        const randomNumberOfSong = Math.floor(
          Math.random() * (numberOfSongs - minimumSongIndex) + minimumSongIndex
        );

        const queueWithRandomSongs = [];

        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(
            Math.random() * (numberOfSongs - minimumSongIndex) +
              minimumSongIndex
          );
          queueWithRandomSongs.push(data.items[randomIndex]);
        }

        console.log("Number of songs:", numberOfSongs);
        console.log("Random song number is:", randomNumberOfSong);

        const currentlyPlaying = data.items[randomNumberOfSong];
        const queue = queueWithRandomSongs;

        console.log("Initial fetch - Current Song:", currentlyPlaying);
        console.log("Initial fetch - Queue:", queue);
        setCurrentSong(currentlyPlaying);
        setSongQueue(queue);
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

    const addToQueue = async (uri) => {
      try {
        console.log("Adding to queue with device_id:", deviceId);
        const response = await axios.post(
          `https://api.spotify.com/v1/me/player/queue`,
          "",
          {
            params: {
              uri: uri,
              device_id: deviceId,
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
              // Add each song in songQueue to Spotify's playback queue
              for (const song of songQueue) {
                const songUri = song.track.uri;
                console.log("Adding song to queue:", songUri); // Log the song URI
                addToQueue(songUri); // Add track to Spotify queue
              }
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

  return (
    <section className="nowPlayingQueue">
      <Player
        token={token}
        player={spotifyPlayer}
        currentSong={currentSong}
        queueSongs={songQueue}
        playSong={playSong}
        pausePlayback={pausePlayback}
        playlistID={playlistId}
      />
      <Queue
        token={token}
        queueSongs={songQueue}
        loading={loading}
        playlistID={playlistId}
      />
    </section>
  );
}
