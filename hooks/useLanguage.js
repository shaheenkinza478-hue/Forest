'use client';
import { createContext, useContext, useState } from 'react';
import en from '@/i18n/en.json';
import ur from '@/i18n/ur.json';
import hi from '@/i18n/hi.json';
import fr from '@/i18n/fr.json';
import zh from '@/i18n/zh.json';

const translations = { en, ur, hi, fr, zh };
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return key;
      }
    }
    return value;
  };

  const changeLanguage = (l) => {
    if (translations[l]) setLang(l);
  };

  return (
    <LanguageContext.Provider value={{ lang, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);