import "App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faRepeat,
  faForwardStep,
  faShuffle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegStar } from "@fortawesome/free-regular-svg-icons";

export default function Player() {
  return (
    <article className="nowPlayingSection">
      <h1 className="title">Now playing</h1>
      <div className="centering">
        <div className="record">
          <div className="labelImage">
            <div className="label"></div>
          </div>
        </div>
        <div className="songAndArtist">
          <FontAwesomeIcon icon={faRegStar} className="favoriteSongIcon" />
          <span className="songName">Plave noći bez tebe</span>
          <br />
          <span className="artistName">Divlje Jagode</span>
        </div>
        <div className="songLengthDuration">
          <div className="songLength">
            <div className="songLengthPoint"></div>
          </div>
          <span className="songDuration">3:45</span>
        </div>
        <div className="playerControls">
          <FontAwesomeIcon icon={faShuffle} className="playerIcon" />
          <FontAwesomeIcon
            icon={faForwardStep}
            className="playerIcon"
            rotation={180}
          />
          <FontAwesomeIcon icon={faPlay} className="playerIcon" />
          <FontAwesomeIcon icon={faForwardStep} className="playerIcon" />
          <FontAwesomeIcon icon={faRepeat} className="playerIcon" />
        </div>
      </div>
    </article>
  );
}
