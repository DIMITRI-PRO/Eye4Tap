import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";

export const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="ninja btn-language-general">
      <Button
        name="language"
        type="link"
        onClick={() => handleChangeLanguage("en")}
      >
        Eng
      </Button>
      <Button
        name="language"
        type="link"
        onClick={() => handleChangeLanguage("fr")}
      >
        Fr
      </Button>
    </div>
  );
};
