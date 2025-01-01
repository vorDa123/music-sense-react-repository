import "App.css";

//Components
import QueueSong from "components/QueueSong.js";

export default function Queue({ token }) {
  return (
    <article className="inQueueSection">
      <h1 className="title">In queue</h1>
      <div class="queueList">
        <QueueSong />
        <QueueSong />
        <QueueSong />
        <QueueSong />
        <QueueSong />
      </div>
    </article>
  );
}
