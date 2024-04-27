import { Icon } from "@iconify/react";

const languages = {
  English: "English",
  Afrikaans: "Afrikaans",
  Amharic: "አማርኛ",
  Arabic: "العَرَبِيَّة",
  "Arabic (Egypt)": "عربي مصري",
  "Arabic (Morocco)": "العَرَبِيَّة مغربي",
  "Arabic (Saudi Arabia)": "العربية السعودية",
  Azerbaijani: "Azərbaycanca",
  Bulgarian: "Български",
  Bhojpuri: "भोजपुरी",
  Bengali: "বাংলা",
  Bosnian: "Bosanski",
  Catalan: "Català",
  Czech: "Čeština",
  Danish: "Dansk",
  German: "Deutsch",
  Greek: "Eλληνικά",
  "United Kingdom": "English",
  "European Spanish": "Español de España",
  "Latin American Spanish": "Español de Latinoamérica",
  "Spanish (Argentina)": "Español (Argentina)",
  "Spanish (Mexico)": "Español (México)",
  Estonian: "Eesti",
  Basque: "Euskara",
  Persian: "فارسی",
  Finnish: "Suomeksi",
  Filipino: "Filipino",
  French: "Français",
  "Canadian French": "Français Canadien",
  Galician: "Galego",
  Gujarati: "ગુજરાતી",
  Hebrew: "עברית",
  Hindi: "हिन्दी",
  Croatian: "Hrvatski",
  Hungarian: "Magyar",
  Indonesian: "Bahasa Indonesia",
  Icelandic: "Íslenska",
  Italian: "Italiano",
  Japanese: "日本語",
  Kannada: "ಕನ್ನಡ",
  Korean: "한국어",
  Lithuanian: "Lietuvių",
  Latvian: "Latviešu",
  Macedonian: "Македонски",
  Malayalam: "മലയാളം",
  Marathi: "मराठी",
  Malay: "Melayu",
  Norwegian: "Norsk",
  Nepali: "नेपाली",
  Dutch: "Nederlands",
  Odia: "ଓଡ଼ିଆ",
  Punjabi: "ਪੰਜਾਬੀ",
  "Punjabi (Naskh)": "پنجابی",
  Polish: "Polski",
  "Brazilian Portuguese": "Português do Brasil",
  "European Portuguese": "Português",
  Romanian: "Română",
  Russian: "Русский",
  Slovak: "Slovenčina",
  Slovenian: "Slovenski",
  Serbian: "Srpski",
  Swedish: "Svenska",
  Swahili: "Kiswahili",
  Tamil: "தமிழ்",
  Telugu: "తెలుగు",
  Thai: "ภาษาไทย",
  Turkish: "Türkçe",
  Ukrainian: "Українська",
  Urdu: "اردو",
  Vietnamese: "Tiếng Việt",
  "Simplified Chinese": "简体中文",
  "Chinese (Traditional) Hong Kong": "繁體中文 (香港)",
  "Traditional Chinese": "中文",
  Zulu: "IsiZulu",
};

const languageEntries = Object.entries(languages);

const LanguageModel = ({ closeModal }) => {
  return (
    <div
      className="fixed bg-black w-screen h-screen bg-opacity-50 flex justify-center"
      onClick={closeModal}
      style={{ zIndex: 2 }}
    >
      <div
        className="bg-app-black w-3/5 rounded-lg p-8 mt-10 mb-10"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex">
          <div className="w-2/3">
            <div className="text-white font-bold text-xl pb-2">
              Choose a language
            </div>
            <div className="text-white font-medium text-sm pb-4">
              This updates what you read on open.spotify.com
            </div>
          </div>
          <div className="w-1/3 h-1/3 flex justify-end pr-2 pt-2">
            <div
              className="border rounded-full border-black bg-black p-1 cursor-pointer"
              onClick={closeModal}
            >
              <Icon
                icon="system-uicons:cross"
                width="1.2em"
                height="1.2em"
                className="text-white"
              />
            </div>
          </div>
        </div>
        <div className="w-full border border-t-0"></div>
        <div className="bg-app-black grid grid-cols-4 overflow-auto h-5/6 mt-5 cursor-pointer">
          {languageEntries.map((entry, index) => {
            const [key, value] = entry;
            return <Card key={index} title={key} description={value} />;
          })}
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, description }) => {
  return (
    <div className="p-2 hover:bg-card-color">
      <div className="text-white text-sm font-semibold py-2">{description}</div>
      <div className="text-gray-500 text-xs font-semibold">{title}</div>
    </div>
  );
};

export default LanguageModel;
