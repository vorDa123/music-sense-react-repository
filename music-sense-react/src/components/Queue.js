import "App.css";

//Components
import QueueSong from "components/QueueSong.js";

export default function Queue({ token, queueSongs, loading }) {
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
  if (token && defaultQueueSongs.length > 0 && !loading) {
    return (
      <article className="inQueueSection">
        <h1 className="title">In queue</h1>
        <div class="queueList">
          {queueSongs.slice(0, 5).map((queueSong) => (
            <QueueSong
              queueSongId={queueSong.id}
              queueSongName={queueSong.name}
              queueSongArtist={queueSong.artists[0].name}
              queueSongImage={queueSong.album.images[0].url}
            />
          ))}
        </div>
      </article>
    );
  } else {
    return (
      <article className="inQueueSection">
        <h1 className="title">In queue</h1>
        <div class="queueList">
          {defaultQueueSongs.slice(0, 5).map((song) => (
            <QueueSong
              queueSongId={song.id}
              queueSongName={song.name}
              queueSongArtist={song.artist}
            />
          ))}
        </div>
      </article>
    );
  }
}
