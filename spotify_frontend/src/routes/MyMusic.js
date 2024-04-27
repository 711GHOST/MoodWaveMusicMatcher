import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import { useState, useEffect } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";

const songData = [
  {
    thumbnail:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Curtains",
    artist: "Ed Sheeran",
  },
];

const MyMusic = () => {
  const [songData, setSongData] = useState([]);

  useEffect(() => {
    // fetch-data
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
      setSongData(response.data);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer curActiveScreen="myMusic">
      <div className="text-white text-xl font-semibold pb-2 pl-2">My Songs</div>
      <div className="space-y-2 overflow-auto">
        {songData.map((item) => {
          return <SingleSongCard info={item} playSound={()=>{}} />;
        })}
      </div>
    </LoggedInContainer>
  );
};

export default MyMusic;
