import "App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

export default function Queue() {
  return (
    <div className="songInQueue">
      <div className="songImage"></div>
      <div className="songAndArtistInQueue">
        <span className="songNameInQueue">London</span>
        <br />
        <span className="artistNameInQueue">Divlje Jagode</span>
      </div>
      <FontAwesomeIcon icon={faPlay} className="playIconQueue" />
    </div>
  );
}
