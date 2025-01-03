import "App.css";

//Components
import QueueSong from "components/QueueSong.js";

export default function Queue({ token, queueSongs }) {
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
}
