import "App.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "motion/react";
import {
  faStar,
  faXmark,
  faUser,
  faMusic,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

export default function SignedInUserMenu({ onLogOut, onExit, menuClicked }) {
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
        <motion.div className="menuList" variants={menuVariants}>
          <motion.div
            className="alignCenter pointerCursor"
            variants={itemVariants}
          >
            <FontAwesomeIcon
              icon={faHome}
              className="hamburgerMenu paddingRight"
            />
            <br />
            <span>Home</span>
          </motion.div>
          <br />
          <motion.div
            className="alignCenter pointerCursor"
            variants={itemVariants}
          >
            <FontAwesomeIcon
              icon={faUser}
              className="hamburgerMenu paddingRight"
            />
            <br />
            <span>My profile</span>
          </motion.div>
          <br />
          <motion.div
            className="alignCenter pointerCursor"
            variants={itemVariants}
          >
            <FontAwesomeIcon
              icon={faMusic}
              className="hamburgerMenu paddingRight"
            />
            <br />
            <span>My playlists</span>
          </motion.div>
          <br />
          <motion.div
            className="alignCenter pointerCursor"
            variants={itemVariants}
          >
            <FontAwesomeIcon
              icon={faStar}
              className="hamburgerMenu paddingRight"
            />
            <br />
            <span>My favorites</span>
          </motion.div>
        </motion.div>
        <motion.div className="buttons paddingBottom" variants={itemVariants}>
          <button onClick={onLogOut}>Log out</button>
        </motion.div>
      </motion.section>
    );
  } else {
    return <></>;
  }
}
