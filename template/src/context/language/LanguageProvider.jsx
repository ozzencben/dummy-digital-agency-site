import { useState } from "react";
import en from "../../locale/en.json";
import tr from "../../locale/tr.json";
import LanguageContext from "./LanguageContext";

const languages = { en, tr };
const defaultLanguage = "en";

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("language");

    if (saved && languages[saved]) {
      return saved;
    }

    const browserLang = navigator.language?.split("-")[0];
    if (browserLang && languages[browserLang]) {
      localStorage.setItem("language", browserLang);
      return browserLang;
    }

    localStorage.setItem("language", defaultLanguage);
    return defaultLanguage;
  });

  const toggleLanguage = (lang) => {
    if (languages[lang]) {
      setLanguage(lang);
      localStorage.setItem("language", lang);
    }
  };

  const translation = languages[language];

  const t = (key) =>
    key.split(".").reduce((obj, k) => obj?.[k], translation) || key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
