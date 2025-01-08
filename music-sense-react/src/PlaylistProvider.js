import React, { createContext, useContext, useState } from "react";

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [playlistId, setPlaylistId] = useState(null);

  const setAndLogPlaylist = (id) => {
    console.log("Setting Playlist ID:", id);
    setPlaylistId(id);
  };

  return (
    <PlaylistContext.Provider value={{ playlistId, setPlaylistId: setAndLogPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlaylistContext);