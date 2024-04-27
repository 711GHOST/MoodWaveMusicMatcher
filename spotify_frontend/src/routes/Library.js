import LoggedInContainer from "../containers/LoggedInContainer";
import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const [myPlaylists, setmyPlaylists] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      setmyPlaylists(response.data);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer curActiveScreen={"library"}>
      <div className="text-2xl text-white font-bold">MoodWave Playlists</div>
      <div className="py-5 grid gap-5 grid-cols-5">
        {myPlaylists.map((item) => {
          return (
            <Card
              title={item.name}
              description=""
              imgUrl={item.thumbnail}
              playlistId={item._id}
            />
          );
        })}
      </div>
    </LoggedInContainer>
  );
};

const Card = ({ title, description, imgUrl, playlistId }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card-color w-full p-4 rounded-lg mb-10 cursor-pointer" onClick={
      () => {
        navigate("/playlist/" + playlistId);
      }
    }>
      <div className="pb-4 pt-2">
        <img className="w-full rounded-md" src={imgUrl} alt="label" />
      </div>
      <div className="text-white text-sm font-semibold py-2">{title}</div>
      <div className="text-gray-500 text-xs font-semibold">{description}</div>
    </div>
  );
};

export default Library;
