import spotify_logo from "../assets/moodwave-logo-white-transparent.png";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import { Icon } from "@iconify/react";
import {
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from "react";
import { Howl, Howler } from "howler";
import songContext from "../contexts/songContext";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import LanguageModel from "../modals/LanguageModel";
import CheckMood from "../components/CheckMood";
import { Link, Navigate } from "react-router-dom";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import "../App.css";

const songData = [
  {
    _id: "65dc9acc6b0374a225c500f6",
    name: "Bandeya Re Bandeya",
    thumbnail:
      "https://pagalnew.com/coverimages/Bandeya-Rey-Bandeya-Simmba-500-500.jpg",
    track:
      "https://res.cloudinary.com/dcqnxmaoj/video/upload/v1708956357/iogtikmu9gadalifecsw.mp3",
    artist: {
      _id: "65dae6e023b38b16eb35c174",
      firstName: "Arijit",
      lastName: "Singh",
      password: "$2b$10$imW4KatIUJ1IoO6pFe3/U.rGJhOs8yTwl8ujuEInan2fSUxZ89pz6",
      email: "arijitsingh234@gmail.com",
      userName: "arijit23",
      likedSongs: "",
      likedPlayLists: "",
      suscribeArtists: "",
      __v: 0,
    },
    __v: 0,
  },
  {
    _id: "65dc9aea6b0374a225c500f9",
    name: "Satranga",
    thumbnail: "https://pagalnew.com/coverimages/satranga-animal-500-500.jpg",
    track:
      "https://res.cloudinary.com/dcqnxmaoj/video/upload/v1708956390/qfg2qboxt9p4a6amdjfa.mp3",
    artist: {
      _id: "65dae6e023b38b16eb35c174",
      firstName: "Arijit",
      lastName: "Singh",
      password: "$2b$10$imW4KatIUJ1IoO6pFe3/U.rGJhOs8yTwl8ujuEInan2fSUxZ89pz6",
      email: "arijitsingh234@gmail.com",
      userName: "arijit23",
      likedSongs: "",
      likedPlayLists: "",
      suscribeArtists: "",
      __v: 0,
    },
    __v: 0,
  },
  {
    _id: "65dc9b5e6b0374a225c500ff",
    name: "O Maahi",
    thumbnail: "https://pagalnew.com/coverimages/o-maahi-dunki-500-500.jpg",
    track:
      "https://res.cloudinary.com/dcqnxmaoj/video/upload/v1708956503/jyjj3yodwazqqf2ppawz.mp3",
    artist: {
      _id: "65dae6e023b38b16eb35c174",
      firstName: "Arijit",
      lastName: "Singh",
      password: "$2b$10$imW4KatIUJ1IoO6pFe3/U.rGJhOs8yTwl8ujuEInan2fSUxZ89pz6",
      email: "arijitsingh234@gmail.com",
      userName: "arijit23",
      likedSongs: "",
      likedPlayLists: "",
      suscribeArtists: "",
      __v: 0,
    },
    __v: 0,
  },
];

const LoggedInContainer = ({ children, curActiveScreen }) => {
  const [createPlaylistModalOpen, setcreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setaddToPlaylistModalOpen] = useState(false);
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState(null);
  const [progress, setProgress] = useState(0);

  // Ye chiz isliye krni pdi because useState globally ni chlra tha properly but useContext globally chl jaaega
  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);

  const firstUpdate = useRef(true); // this thing contains the value of the first render.

  useLayoutEffect(() => {
    // The following if statement will prevent the useEffect from running on the first render.
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!currentSong) {
      return;
    }
    changeSong(currentSong.track);
  }, [currentSong && currentSong.track]);

  useEffect(() => {
    const updateProgressInterval = setInterval(() => {
      if (isPaused || !soundPlayed) return; // Don't update if paused or not playing

      const currentProgress =
        (soundPlayed.seek() / soundPlayed.duration()) * 100;
      setProgress(currentProgress); // Update progress state
    }, 1000); // Update every 1 second

    return () => clearInterval(updateProgressInterval); // Clean up interval
  }, [isPaused, soundPlayed]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const paddedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${paddedSeconds}`;
  }

  const progressBarRef = useRef(null); // Store a reference to the progress bar indicator

  useEffect(() => {
    const progressBarIndicator = progressBarRef.current;

    const handleMouseDown = (e) => {
      const initialX = e.clientX;
      const initialOffset = progressBarIndicator.offsetLeft;

      const handleMouseMove = (e) => {
        const track = progressBarIndicator.parentNode;
        const mouseDelta = e.clientX - initialX;
        let newProgress =
          ((initialOffset + mouseDelta) / track.offsetWidth) * 100;
        newProgress = Math.max(0, Math.min(newProgress, 100));
        progressBarIndicator.style.width = `${newProgress}%`;
      };

      const handleMouseUp = () => {
        if (soundPlayed) {
          const duration = soundPlayed.duration();
          soundPlayed.seek(
            duration *
              (progressBarIndicator.offsetWidth /
                progressBarIndicator.parentNode.offsetWidth)
          );
        }
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    if (progressBarIndicator) {
      progressBarIndicator.addEventListener("mousedown", handleMouseDown);
    }

    // Cleanup: Remove event listeners on unmount
    return () => {
      if (progressBarIndicator) {
        progressBarIndicator.removeEventListener("mousedown", handleMouseDown);
      }
    };
  }, [progressBarRef, soundPlayed]);

  const addSongToPlaylist = async (playListId) => {
    const songId = currentSong._id;

    const payload = { playListId: playListId, songId: songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      payload
    );
    if (response._id) {
      setaddToPlaylistModalOpen(false);
    }
  };

  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  // Function to play songs based on the src file. Used Howler.js instead of audio tag.
  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound(currentSong.track);
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  const skipBackward = () => {
    let index = songData.findIndex((song) => song._id === currentSong._id);
    if (index === 0) {
      setCurrentSong(songData[songData.length - 1]);
    } else {
      setCurrentSong(songData[index - 1]);
    }
  };

  const skipForward = () => {
    let index = songData.findIndex((song) => song._id === currentSong._id);
    if (index === songData.length - 1) {
      setCurrentSong(songData[0]);
    } else {
      setCurrentSong(songData[index + 1]);
    }
  };

  return (
    <div className="h-full w-full bg-app-black">
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeModal={() => {
            setcreatePlaylistModalOpen(false);
          }}
        />
      )}
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setaddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}
      {languageModalOpen && (
        <LanguageModel
          closeModal={() => {
            setLanguageModalOpen(false);
          }}
        />
      )}
      {/* This will be left sidebar */}
      <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>
        <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
          {/* This is for Logo */}
          <div>
            <div className="LogoDiv p-6 flex justify-center items-center">
              <img src={spotify_logo} alt="spotifyLogo" width={125} />
            </div>
            <div className="py-5">
              <IconText
                iconName={"octicon:home-fill-24"}
                displayText={"Home"}
                targetLink={"/home"}
                active={curActiveScreen === "home"}
              />
              <IconText
                iconName={"iconamoon:search-light"}
                displayText={"Search"}
                targetLink={"/search"}
                active={curActiveScreen === "search"}
              />
              <IconText
                iconName={"fluent:library-32-filled"}
                displayText={"Your Library"}
                active={curActiveScreen === "library"}
                targetLink={"/library"}
              />
              <IconText
                iconName={"ic:baseline-library-music"}
                displayText={"My Music"}
                targetLink={"/myMusic"}
                active={curActiveScreen === "myMusic"}
              />
            </div>
            <div className="pt-7">
              <IconText
                iconName={"ph:plus-fill"}
                displayText={"Create Playlist"}
                onClick={() => setcreatePlaylistModalOpen(true)}
              />
              <IconText
                iconName={"fluent-emoji-flat:heart-decoration"}
                displayText={"Liked Songs"}
              />
            </div>
          </div>
          <div className="pb-10">
            {/* <CheckMood setDetectedEmotion={setDetectedEmotion} /> */}
          </div>
          <div className="px-5">
            <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
              <Icon icon="tdesign-internet" />
              <div
                className="ml-2 text-sm font-semibold"
                onClick={() => setLanguageModalOpen(true)}
              >
                English
              </div>
            </div>
          </div>
        </div>
        {/* This will be right entire page */}
        {detectedEmotion ? (
          <Navigate to={`/library/playlist/${detectedEmotion}`} replace />
        ) : (
          <div className="h-full w-4/5 bg-app-black overflow-auto">
            <div className="navbar w-full flex h-1/10 bg-black bg-opacity-30">
              <div className="w-1/4 flex items-center justify-center">
                <Link to="/detectEmotion">
                  <div className="py-2 bg-white px-5 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                    Check Mood
                  </div>
                </Link>
              </div>
              <div className="w-3/4 flex items-center justify-end">
                <div className="w-2/3 flex h-full">
                  <div className="w-2/3 flex justify-around items-center">
                    <TextWithHover displayText={"Premium"} />
                    <TextWithHover displayText={"Support"} />
                    <TextWithHover displayText={"Download"} />
                    <div className="h-1/3 border border-white"></div>
                  </div>
                  <div className="w-1/3 flex justify-around h-full items-center">
                    <TextWithHover
                      displayText={"Upload Song"}
                      targetLink={"/uploadSong"}
                    />
                    <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                      AC
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content p-8 mt-10 overflow-auto">{children}</div>
          </div>
        )}
      </div>
      {/* This div is the current playing song */}
      {currentSong && (
        <div className="h-1/10 w-full bg-black bg-opacity-30 text-white flex items-center px-4">
          <div className="w-1/4 flex items-center">
            <img
              src={currentSong.thumbnail}
              alt="Current Song Thumbnail"
              className="h-14 w-14 rounded"
            />
            <div className="pl-4">
              <div className="text-sm hover:underline cursor-pointer">
                {currentSong.name}
              </div>
              <div className="text-xs text-gray-500 hover:underline cursor-pointer">
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist.lastName}
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center h-full flex-col items-center">
            <div className="flex w-1/3 justify-evenly items-center">
              {/* Controls for the playing song go here */}
              <Icon
                icon="ion:shuffle"
                fontSize={25}
                className="cursor-pointer text-gray-400 hover:text-white"
              />
              <Icon
                icon="mdi:skip-previous-outline"
                fontSize={27}
                className="cursor-pointer text-gray-400 hover:text-white"
                onClick={skipBackward}
              />
              <Icon
                icon={
                  isPaused
                    ? "ic:baseline-play-circle"
                    : "ic:baseline-pause-circle"
                }
                fontSize={40}
                className="cursor-pointer text-white"
                onClick={togglePlayPause}
              />
              <Icon
                icon="mdi:skip-next-outline"
                fontSize={27}
                className="cursor-pointer text-gray-400 hover:text-white"
                onClick={skipForward}
              />
              <Icon
                icon="iconoir:repeat"
                fontSize={25}
                className="cursor-pointer text-gray-400 hover:text-white"
              />
            </div>
            <div className="progress-bar-container relative w-2/3 h-1 bg-gray-200 bg-opacity-30 rounded-full overflow-hidden mt-1 cursor-pointer">
              <div
                ref={progressBarRef}
                className="absolute top-0 left-0 h-full bg-white rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="w-2/3 flex justify-between">
              {" "}
              {/* For displaying time */}
              {soundPlayed && (
                <>
                  <span className="text-xs text-gray-500">
                    {formatTime(soundPlayed.seek())}
                  </span>
                  <span className="text-xs text-gray-500">
                    {/* -{formatTime(soundPlayed.duration() - soundPlayed.seek())} */}
                    {formatTime(soundPlayed.duration())}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="w-1/4 flex justify-end pr-5 space-x-4 items-center">
            <Icon
              icon="ic:round-playlist-add"
              fontSize={27}
              className="cursor-pointer text-gray-500 hover:text-white"
              onClick={() => {
                setaddToPlaylistModalOpen(true);
              }}
            />
            <Icon
              icon="ph:heart-bold"
              fontSize={23}
              className="cursor-pointer text-gray-500 hover:text-white"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedInContainer;
