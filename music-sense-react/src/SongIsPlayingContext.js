import React, { createContext, useContext, useState } from "react";

const SongIsPlayingContext = createContext();

export const SongIsPlaying = ({ children }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <SongIsPlayingContext.Provider value={{ playing , setPlaying }}>
      {children}
    </SongIsPlayingContext.Provider>
  );
};

export const useSongIsPlaying = () => useContext(SongIsPlayingContext);
