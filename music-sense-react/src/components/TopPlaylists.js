import "App.css";
import axios from "axios";
import { useEffect, useState } from "react";

//Components
import Playlist from "components/Playlist.js";

export default function TopPlaylists({token}) {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const playlistFetch = async () => {
      if (!token) return;

      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fecthed playlists:", data);
        setPlaylists(data.items);
      } catch (error) {
        console.error("Error fetching palylists:", error);
      } finally {
        setLoading(false);
      }
    };

    playlistFetch();
  }, [token]);

  let playlistDefault = [
    {
      id: 1,
      name: "Rock",
      image: "",
    },
    {
      id: 2,
      name: "Pop",
      image: "",
    },
    {
      id: 3,
      name: "Metal",
      image: "",
    },
    {
      id: 4,
      name: "Country",
      image: "",
    },
    {
      id: 5,
      name: "Hip hop",
      image: "",
    },
  ];


  if (token && playlists.length > 0 && !loading) {
    return (
      <section className="topPlaylists">
        <h1 className="title">Top playlists</h1>
        <div className="playListsList">
          {playlists.slice(0, 5).map((playlist) => (
            <Playlist
              playlistId={playlist.id}
              playlistName={playlist.name}
              playlistImage={playlist.images[1].url}
            />
          ))}
        </div>
      </section>
    );
  } else {
    return (
      <section className="topPlaylists">
        <h1 className="title">Top playlists</h1>
        <div className="playListsList">
          {playlistDefault.map((playlist) => (
            <Playlist playlistId={playlist.id} playlistName={playlist.name} />
          ))}
        </div>
      </section>
    );
  }
}
