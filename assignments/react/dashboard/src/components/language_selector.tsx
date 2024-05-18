import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.body.dir = i18n.dir();
  };

  return (
    <div className="fixed top-2 left-1/2 transform -translate-x-1/2">
    <select
      onChange={(e) => changeLanguage(e.target.value)}
      className="bg-gray-600 text-white px-2 py-1 rounded"
    >
      <option value="en">English</option>
      <option value="he">יברעת</option>
      <option value="ru">Русский</option>
    </select>
  </div>
  );
};

export default LanguageSelector;
