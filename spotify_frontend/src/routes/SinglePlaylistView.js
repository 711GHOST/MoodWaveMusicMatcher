import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";

const SinglePlaylistView = () => {
  const [playlistDetails, setplaylistDetails] = useState(null);
  const { playlistId } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/playlist/get/playlist/" + playlistId
      );
      setplaylistDetails(response);
      console.log(response);
    };
    getData();
  }, []);

  if (!playlistDetails) {
    return <LoggedInContainer curActiveScreen={"library"}>Loading...</LoggedInContainer>;
  }

  return (
    <LoggedInContainer curActiveScreen={"library"}>
      {playlistDetails._id && (
        <div>
          <div className="text-2xl text-white font-bold">
            {playlistDetails.name} Playlist
          </div>
          <div className="pt-10 space-y-3">
            {playlistDetails.songs.map((item) => {
              return (
                <SingleSongCard
                  info={item}
                  key={JSON.stringify(item)}
                  playSound={() => {}}
                />
              );
            })}
          </div>
        </div>
      )}
    </LoggedInContainer>
  );
};

export default SinglePlaylistView;
