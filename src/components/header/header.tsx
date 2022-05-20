import React from "react";
import "./header.scss";
import pakageJson from "../../../package.json";
import SecurityIcon from "@mui/icons-material/Security";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__wrap">
        <SecurityIcon className="header__icon"></SecurityIcon>
        <h1 className="header__title">{pakageJson.name}</h1>
      </div>
    </header>
  );
};

export default Header;
