import "./navigation.scss";
import BadgeIcon from "@mui/icons-material/Badge";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import React from "react";
const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <a href="#" className="navigation__link">
            <span>
              <BadgeIcon className="navigation__link-icon navigation__link-icon-ad"></BadgeIcon>
            </span>
            <span className="navigation__link-text">active directory</span>

            <span>
              <ArrowBackIosNewIcon className="navigation__link-icon navigation__link-icon-arrow"></ArrowBackIosNewIcon>
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
