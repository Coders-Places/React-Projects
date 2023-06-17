import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchAPI } from "../Utiles/FetchThroughAPI";
import Context from "./Context";

const APIState = ({ children }) => {
  // * Videos-State
  const [Videos, setVideos] = useState(null);

  // * Video-Content-Category-State
  const [SelectedCategory, setSelectedCategory] = useState("Dear Sir");

  // * When-Ever The State Changes, Re-Call The API And Get Updated-Data
  useEffect(() => {
    (async () => {
      const data = await FetchAPI(
        `search?part=snippet&q=${SelectedCategory}&maxResults=${"50"}`
      );
      setVideos(data);
    })();
  }, [SelectedCategory]);

  // * Changing The Main State "Videos" On Searching The String
  const Search = async ({ current:{value} }) => {
    const data = await FetchAPI(
      `search?part=snippet&q=${value}&maxResults=${"30"}`
    );
       
    setVideos(data);

  };

  
  return (
    <Context.Provider
      value={{
        Videos,
        setVideos,
        SelectedCategory,
        setSelectedCategory,
        Search,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default APIState;
