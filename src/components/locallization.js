// LanguageSelector.js
import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="button-container">
      <select className="language-dropdown" onChange={(e) => changeLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Hindi</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
