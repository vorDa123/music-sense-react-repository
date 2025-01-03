import "App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

export default function Queue({
  queueSongId,
  queueSongName,
  queueSongArtist,
  queueSongImage,
}) {
  return (
    <div className="songInQueue" key={queueSongId}>
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
      <FontAwesomeIcon icon={faPlay} className="playIconQueue" />
    </div>
  );
}
