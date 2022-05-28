import React from "react";
import "./header.scss";
import pakageJson from "../../../package.json";
import SecurityIcon from "@mui/icons-material/Security";
import useTranslate from "../../hooks/useTranslate";
import { Link } from "react-router-dom";

const enum languagesEnum {
  EN = "en",
  RU = "ru",
}

const Header: React.FC = () => {
  const { languageState, setLanguage } = useTranslate();

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__wrap">
          <SecurityIcon className="header__icon"></SecurityIcon>
          <Link className="header__title" to="/">
            {pakageJson.name}
          </Link>
        </div>
        <div className="header__language">
          <button
            className={`header__language-link ${
              languageState === languagesEnum.EN &&
              "header__language-link_active"
            }`}
            onClick={() => {
              setLanguage(languagesEnum.EN);
            }}
          >
            en
          </button>
          {<span className="header__language-link-separator">{" | "}</span>}
          <button
            className={`header__language-link ${
              languageState === languagesEnum.RU &&
              "header__language-link_active"
            }`}
            onClick={(event) => {
              setLanguage(languagesEnum.RU);
            }}
          >
            ru
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
