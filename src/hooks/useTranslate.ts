import { useEffect, useState } from "react";
import en from "../translations/en.json";
import ru from "../translations/ru.json";

type TranslateType = {
  [prop: string]: string;
};

type TranslationsType = {
  [prop: string]: TranslateType;
};

let language: string = localStorage.getItem("language") || "en";
const translations: TranslationsType = {
  en,
  ru,
};

let callbacks: Array<(lang: string) => void> = [];

const useTranslate = () => {
  const [languageState, setLanguageState] = useState<string>(language);

  const t = (id: string) => {
    return translations[languageState][id] ?? id;
  };

  const setLanguage = (_language: string) => {
    localStorage.setItem("language", _language);
    setLanguageState(_language);
    language = _language;
    callbacks.forEach((callback) => callback(_language));
  };

  useEffect(() => {
    callbacks.push(setLanguageState);

    return () => {
      callbacks = callbacks.filter((f) => f !== setLanguageState);
    };
  }, []);

  return {
    languageState,
    setLanguage,
    t,
  };
};
export default useTranslate;
