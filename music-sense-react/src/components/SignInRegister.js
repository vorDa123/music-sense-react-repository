import "App.css";
import MusicSenseLogo from "assets/MusicSenseLogo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";

export default function SignInRegister({ onTokenUpdate, onExit, menuClicked }) {
  const CLIENT_ID = "727a7c097cfb4ec4997132e3824c3a6d";
  const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URI_AFTER_LOGIN = "http://localhost:3000";
  const SPACE_DELIMITER = "%20";
  const SCOPES = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-modify-playback-state",
    "streaming",
    "app-remote-control",
    "user-read-private",
    "user-read-email",
  ];
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  const menuVariants = {
    open: {
      x: "0%",
      opacity: 1,
      transition: {
        duration: 0.7,
        type: "tween",
        staggerChildren: 0.2, // Stagger animations for children
        delayChildren: 0.1,
      },
    },
    closed: {
      x: "200%",
      opacity: 0,
      transition: {
        duration: 0.7,
        type: "tween",
        staggerChildren: 0.2,
        staggerDirection: -1, // Reverse animation direction
      },
    },
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  if (menuClicked) {
    return (
      <>
        <motion.section
          className="signInRegister"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
        >
          <div className="titleAndIcon">
            <h1 className="title">Menu</h1>
            <FontAwesomeIcon
              icon={faXmark}
              className="hamburgerMenu"
              onClick={onExit}
            />
          </div>
          <motion.div className="buttons" variants={menuVariants}>
            <motion.button variants={itemVariants}>Sign in</motion.button>
            <br />
            <motion.button variants={itemVariants}>Register</motion.button>
            <p>OR</p>
            <motion.button variants={itemVariants} onClick={handleLogin}>Sign in with Spotify</motion.button>
          </motion.div>
          <img
            src={MusicSenseLogo}
            alt="logo"
            width={150}
            className="paddingBottom"
          />
        </motion.section>
      </>
    );
  }
  return null;
}
