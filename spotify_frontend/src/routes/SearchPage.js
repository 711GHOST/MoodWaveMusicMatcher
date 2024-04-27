import React, { useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { Icon } from "@iconify/react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";

const SearchPage = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [songData, setSongData] = useState([]);

  const searchSong = async () => {
    // This function will call the search api
    const response = await makeAuthenticatedGETRequest(
      "/song/get/songname/" + searchText
    );
    setSongData(response.data);
  };

  return (
    <LoggedInContainer curActiveScreen="search">
      <div className="w-full">
        <div
          className={`w-1/3 p-3 text-sm rounded-full bg-card-color px-4 flex text-white space-x-3 items-center relative ${
            isInputFocused ? "border border-white" : ""
          }`}
        >
          <div>
            <Icon icon="iconamoon:search-light" className="text-lg" />
          </div>
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="w-full bg-card-color focus:outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => {
              setIsInputFocused(true);
            }}
            onBlur={() => {
              setIsInputFocused(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchSong();
              }
            }}
          />
        </div>
        {songData.length > 0 ? (
          <div className="pt-10 space-y-3">
            <div>
              <div className="text-white text-sm font-semibold">
                Showing Search Results for "
                <span className="text-lg font-bold">{searchText}</span>"
              </div>
            </div>
            {songData.map((item) => {
              return (
                <SingleSongCard
                  info={item}
                  key={JSON.stringify(item)}
                  playSound={() => {}}
                />
              );
            })}
          </div>
        ) : (
          <div className="pt-10">
            <div className="text-white text-sm font-semibold">
              Nothing to search here. Write something in the search bar.
            </div>
          </div>
        )}
      </div>
    </LoggedInContainer>
  );
};

export default SearchPage;
