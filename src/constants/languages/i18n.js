import { initReactI18next } from 'react-i18next';
import english from "./english.json";
import arabic from "./arabic.json";
import france from "./france.json";
import i18n from 'i18next';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {
      translation: english,
    },
    ar: {
      translation: arabic,
    },
    fr: {
      translation: france,
    },
  },
  interpolation: {
    escapeValue: false,
  },
  lng: 'en',
  fallbackLng: 'en',
});

export default i18n;
