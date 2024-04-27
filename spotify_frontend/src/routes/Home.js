import spotify_logo from "../assets/moodwave-logo-white-transparent.png";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import { Icon } from "@iconify/react";

const spotifyPlaylistCardsData = [
  {
    title: "Rock Classics",
    description: "Rock legends & epic songs that continue to inspire generations.",
    imgUrl: "https://i.scdn.co/image/ab67706f0000000278b4745cb9ce8ffe32daaf7e"
  },
  {
    title: "Today's Top Hits",
    description: "Dua Lipa is on top of the Hottest 50!",
    imgUrl: "https://i.scdn.co/image/ab67706f00000002cef8ac8b3a702dfba2ae85a9",
  },
  {
    title: "All Out 80s",
    description: "The biggest songs of the 1980s. Cover: Michael Jackson.",
    imgUrl: "https://i.scdn.co/image/ab67706f000000027876fe166a29b8e6b8db14da",
  },
  {
    title: "All Out 2020s",
    description: "The biggest songs of the 2020s.",
    imgUrl: "https://i.scdn.co/image/ab67706f00000002d771dc645afe9b87978b1d3e",
  },
  {
    title: "Jazz in the Background",
    description: "Soft instrumental Jazz for all your activities.",
    imgUrl: "https://i.scdn.co/image/ab67706f00000002bdeb1c317ac2dd10f2397e4c",
  },
];

const focusCardData = [
  {
    title: "Peaceful Piano",
    description: "Peaceful piano to help you slow down, breathe, and relax.",
    imgUrl: "https://i.scdn.co/image/ab67706c0000da84411d41833f74a305492867ee",
  },
  {
    title: "Chill Hits",
    description: "Kick back to the best new and recent chill hits.",
    imgUrl: "https://i.scdn.co/image/ab67706f00000002f4d83a6cb7f51f6d9f6717de",
  },
  {
    title: "Stress Relief",
    description: "Calm your mind from anxiety with gentle piano and ambient music.",
    imgUrl: "https://i.scdn.co/image/ab67706f00000002468762ec9fd93a2dc3b167ee",
  },
  {
    title: "Chillout Lounge",
    description: "Just lean back and enjoy relaxed beats",
    imgUrl: "https://i.scdn.co/image/ab67706f00000002dec17246891b5b4eb97bdb0d",
  },
  {
    title: "Lofi Beats",
    description: "Chill beats, lofi vibes, new tracks every week...",
    imgUrl: "https://i.scdn.co/image/ab67706f0000000254473de875fea0fd19d39037",
  },
];

const randomData = [
  {
    title: "Coffee Breaks",
    description: "Perfect tunes for your coffee moments.",
    imgUrl: "https://i.scdn.co/image/ab67616d00001e02f929f4d2e121d46ef4a72935",
  },
  {
    title: "Uniquely Me",
    description: "Embrace your individuality with these tracks.",
    imgUrl: "https://i.scdn.co/image/ab67616d0000b273db66e4c3006f5cc2a0240582",
  },
  {
    title: "Get Creative",
    description: "Fuel your creativity with these beats.",
    imgUrl: "https://i.scdn.co/image/ab67656300005f1fbc6c5daa8b4bcb04162a0ab8",
  },
  {
    title: "A-List Songs",
    description: "Top-notch tracks for your playlist.",
    imgUrl: "https://i.scdn.co/image/ab67616d00001e0263a0498ea137bf196aa34b55",
  },
  {
    title: "Wrecking the Curve",
    description: "Break the norm with these tunes.",
    imgUrl: "https://i.scdn.co/image/ab6765630000ba8a166f90a2a046a7eced1edad3",
  },
];

const Home = () => {
  return (
    <div className="h-full w-full flex">
      {/* This will be left sidebar */}
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
              active
            />
            <IconText
              iconName={"iconamoon:search-light"}
              displayText={"Search"}
            />
            <IconText
              iconName={"fluent:library-32-filled"}
              displayText={"Your Library"}
            />
          </div>
          <div className="pt-7">
            <IconText
              iconName={"ph:plus-fill"}
              displayText={"Create Playlist"}
            />
            <IconText
              iconName={"fluent-emoji-flat:heart-decoration"}
              displayText={"Liked Songs"}
            />
          </div>
        </div>
        <div className="px-5">
          <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
            <Icon icon="tdesign-internet" />
            <div className="ml-2 text-sm font-semibold">English</div>
          </div>
        </div>
      </div>
      {/* This will be right entire page */}
      <div className="h-full w-4/5 bg-app-black overflow-auto">
        <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
          <div className="w-1/2 flex h-full">
            <div className="w-3/5 flex justify-around items-center">
              <TextWithHover displayText={"Premium"} />
              <TextWithHover displayText={"Support"} />
              <TextWithHover displayText={"Download"} />
              <div className="h-1/3 border border-white"></div>
            </div>
            <div className="w-2/5 flex justify-around h-full items-center">
              <TextWithHover displayText={"Sign Up"} />
              <div className="bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                Log In
              </div>
            </div>
          </div>
        </div>
        <div className="content p-8 mt-10 overflow-auto">
          <PlaylistView
            titleText="MoodWave Playlists"
            cardsData={spotifyPlaylistCardsData}
          />
          <PlaylistView
            titleText="Focus"
            cardsData={focusCardData}
          />
          <PlaylistView
            titleText="Randoms"
            cardsData={randomData}
          />
        </div>
      </div>
    </div>
  );
};

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div className="text-white">
      <div className="text-2xl font-bold mb-1">{titleText}</div>
      <div className="w-full flex justify-between space-x-5">
        {cardsData.map((item) => {
          return (
            <Card
              title={item.title}
              description={item.description}
              imgUrl={item.imgUrl}
            />
          );
        })}
        {/* <Card
          title="Lofi Beats"
          description="Chill beats, lofi vibes, new tracks every week..."
          imgUrl="https://i.scdn.co/image/ab67706f0000000254473de875fea0fd19d39037"
        />
        <Card
          title="Today's Top Hits"
          description="Dua Lipa is on top of the Hottest 50!"
          imgUrl="https://i.scdn.co/image/ab67706f00000002cef8ac8b3a702dfba2ae85a9"
        />
        <Card
          title="Chillout Lounge"
          description="Just lean back and enjoy relaxed beats"
          imgUrl="https://i.scdn.co/image/ab67706f00000002dec17246891b5b4eb97bdb0d"
        />
        <Card
          title="All Out 2020s"
          description="The biggest songs of the 2020s."
          imgUrl="https://i.scdn.co/image/ab67706f00000002d771dc645afe9b87978b1d3e"
        />
        <Card
          title="Jazz in the Background"
          description="Soft instrumental Jazz for all your activities."
          imgUrl="https://i.scdn.co/image/ab67706f00000002bdeb1c317ac2dd10f2397e4c"
        /> */}
      </div>
    </div>
  );
};

const Card = ({ title, description, imgUrl }) => {
  return (
    <div className="bg-card-color w-1/5 p-4 rounded-lg mb-10">
      <div className="pb-4 pt-2">
        <img className="w-full rounded-md" src={imgUrl} alt="label" />
      </div>
      <div className="text-white text-sm font-semibold py-2">{title}</div>
      <div className="text-gray-500 text-xs font-semibold">{description}</div>
    </div>
  );
};

export default Home;
