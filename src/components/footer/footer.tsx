import "./footer.scss";
import pakageJson from "../../../package.json";
const Footer = () => {
  return (
    <footer className="footer">
      {`${pakageJson.name}:  app version: ${pakageJson.version}`}
    </footer>
  );
};

export default Footer;
