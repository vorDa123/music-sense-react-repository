import "App.css";
import { usePlaylist } from "../PlaylistProvider";
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  useSpring,
} from "motion/react";
import { useEffect, useState, useRef } from "react";

export default function Playlist({ playlistId, playlistName, playlistImage }) {
  const { setPlaylistId } = usePlaylist();
  const handleCardClick = () => {
    setPlaylistId(playlistId);
  };

  const xCoord = useMotionValue(0);
  const yCoord = useMotionValue(0);

  const mouseXSpring = useSpring(xCoord);
  const mouseYSpring = useSpring(yCoord);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );

  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  );

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPercentage = mouseX / width - 0.5;
    const yPercentage = mouseY / height - 0.5;

    xCoord.set(xPercentage);
    yCoord.set(yPercentage);
  };

  const handleMouseLeave = () => {
    xCoord.set(0);
    yCoord.set(0);
  };

  return (
    <motion.div
      className="playlist"
      key={playlistId}
      style={{
        rotateX,
        rotateY,
        backgroundImage: `url( ${playlistImage} )`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        cursor: "pointer",
      }}
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          height: "inherit",
          background:
            "linear-gradient(360deg, rgba(10,10,10,0.8) 50%, rgba(250,250,250,0) 100%)",
          borderRadius: "8px",
        }}
      >
        <span className="playlistName">{playlistName}</span>
      </div>
    </motion.div>
  );
}
