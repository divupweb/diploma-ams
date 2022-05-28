import "./footer.scss";
import pakageJson from "../../../package.json";
import React from "react";
import useTranslate from "../../hooks/useTranslate";
const Footer: React.FC = () => {
  const { t } = useTranslate();

  return (
    <footer className="footer">
      {`${pakageJson.name} -  ${t("app.version")}: ${pakageJson.version}`}
    </footer>
  );
};

export default Footer;
