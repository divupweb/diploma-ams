import {} from "./loader.scss";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__container">
        <div className="loader__container-circle"></div>
        <div className="loader__container-circle"></div>
        <div className="loader__container-circle"></div>
        <div className="loader__container-circle"></div>
      </div>
    </div>
  );
};

export default Loader;
