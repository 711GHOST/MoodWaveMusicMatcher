import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";

const AddToPlaylistModal = ({ closeModal, addSongToPlaylist }) => {
  const [myPlaylists, setmyPlaylists] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      setmyPlaylists(response.data);
    };
    getData();
  }, []);
  return (
    <div
      className="absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center overflow-y-auto"
      onClick={closeModal}
      style={{ zIndex: 2 }}
    >
      <div
        className="bg-app-black w-1/3 rounded p-8"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="text-white font-bold text-lg mb-5 ">
          Select Playlist
        </div>
        <div className="space-y-4 flex flex-col justify-center items-center">
          {myPlaylists.map((item) => {
            return (
              <PlaylistComponent
                info={item}
                addSongToPlaylist={addSongToPlaylist}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const PlaylistComponent = ({ info, addSongToPlaylist }) => {
  return (
    <div
      className="bg-app-black w-full flex items-center space-x-4 hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer rounded-sm p-3"
      onClick={() => {
        addSongToPlaylist(info._id);
      }}
    >
      <div>
        <img
          src={info.thumbnail}
          alt="Thumbnail"
          className="w-10 h-10 rounded"
        />
      </div>
      <div className="text-white font-semibold text-sm ml-6">{info.name}</div>
    </div>
  );
};

export default AddToPlaylistModal;
