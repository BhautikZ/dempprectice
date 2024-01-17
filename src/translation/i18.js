// i18n.js
import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
// const backend = new Backend({
//   // path where resources get loaded from
//   loadPath: "../../public/locales/{{lng}}/{{ns}}.json",
// });

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for React as it escapes by default
    },
  });

export default i18n;
