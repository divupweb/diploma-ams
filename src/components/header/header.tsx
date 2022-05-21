import React from "react";
import "./header.scss";
import pakageJson from "../../../package.json";
import SecurityIcon from "@mui/icons-material/Security";
import useTranslate from "../../hooks/useTranslate";

const Header: React.FC = () => {
  const { languageState, setLanguage } = useTranslate();

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__wrap">
          <SecurityIcon className="header__icon"></SecurityIcon>
          <h1 className="header__title">{pakageJson.name}</h1>
        </div>
        <div className="header__language">
          <a
            href="#"
            title="en"
            className={`header__language-link ${
              languageState === "en" && "header__language-link_active"
            }`}
            onClick={() => {
              setLanguage("en");
            }}
          >
            en
          </a>
          {<span className="header__language-link-separator">{" | "}</span>}
          <a
            href="#"
            title="ru"
            className={`header__language-link ${
              languageState === "ru" && "header__language-link_active"
            }`}
            onClick={() => {
              setLanguage("ru");
            }}
          >
            ru
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
