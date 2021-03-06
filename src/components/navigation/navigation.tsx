import "./navigation.scss";
import BadgeIcon from "@mui/icons-material/Badge";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import React from "react";
import useTranslate from "../../hooks/useTranslate";
import { NavLink } from "react-router-dom";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
const Navigation: React.FC = () => {
  const { t } = useTranslate();
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__list-item">
          <NavLink
            className={({ isActive }) =>
              "navigation__link" + (isActive ? " navigation__link_active" : "")
            }
            to="/active_directory"
          >
            <span>
              <BadgeIcon className="navigation__link-icon navigation__link-icon-ad"></BadgeIcon>
            </span>
            <span className="navigation__link-text">
              {t("navigation.active_directory")}
            </span>

            <span>
              <ArrowBackIosNewIcon className="navigation__link-icon navigation__link-icon-arrow"></ArrowBackIosNewIcon>
            </span>
          </NavLink>
        </li>
        <li className="navigation__list-item">
          <NavLink
            className={({ isActive }) =>
              "navigation__link" + (isActive ? " navigation__link_active" : "")
            }
            to="/user_creation"
          >
            <span>
              <PersonAddAltIcon className="navigation__link-icon navigation__link-icon-ad"></PersonAddAltIcon>
            </span>
            <span className="navigation__link-text">
              {t("user_create.link")}
            </span>

            <span>
              <ArrowBackIosNewIcon className="navigation__link-icon navigation__link-icon-arrow"></ArrowBackIosNewIcon>
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
