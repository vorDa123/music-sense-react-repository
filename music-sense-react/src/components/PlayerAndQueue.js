import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faRepeat,
  faForwardStep,
  faShuffle,
  faStar,
  faBars,
  faXmark,
  faUser,
  faMusic,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegStar } from "@fortawesome/free-regular-svg-icons";

//Components
import Player from "./Player.js";
import Queue from "./Queue.js";

export default function PlayerAndQueue() {
  return (
    <section className="nowPlayingQueue">
      <Player />
      <Queue />
    </section>
  );
}
