import React from "react";
import useTranslate from "../../hooks/useTranslate";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StoreType from "../../types/storeType";
import { authSliceActions } from "../../store/auth/authSlice";

import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SecurityIcon from "@mui/icons-material/Security";
import pakageJson from "../../../package.json";
import "./header.scss";
import { notificationsSliceAction } from "../../store/notifications/notificationsSlice";
const enum languagesEnum {
  EN = "en",
  RU = "ru",
}

const Header: React.FC = () => {
  const { languageState, setLanguage } = useTranslate();
  const isLogged = useSelector((store: StoreType) => store.auth.isLogged);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    dispatch(authSliceActions.setLogged(false));
    dispatch(notificationsSliceAction.clear());
  };

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
            onClick={() => {
              setLanguage(languagesEnum.RU);
            }}
          >
            ru
          </button>
          {isLogged && (
            <div className="header__leave" onClick={logoutHandler}>
              <MeetingRoomIcon></MeetingRoomIcon>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
