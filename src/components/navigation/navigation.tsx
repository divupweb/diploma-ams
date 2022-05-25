import "./navigation.scss";
import BadgeIcon from "@mui/icons-material/Badge";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import React from "react";
import useTranslate from "../../hooks/useTranslate";
import { NavLink } from "react-router-dom";
const Navigation: React.FC = () => {
  const { t } = useTranslate();
  return (
    <nav className="navigation">
      <ul>
        <li>
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
      </ul>
    </nav>
  );
};
export default Navigation;
