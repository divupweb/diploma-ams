import "./preLoader.scss";
import React from "react";
import { ReactComponent as PreloaderIcon } from "../../../assets/images/preloader.svg";
import { useSelector } from "react-redux";
import StoreType from "../../../types/storeType";

const PreLoader: React.FC = () => {
  const preLoadingStatus: boolean = useSelector(
    (store: StoreType) => store.activeDirectory.preLoading
  );
  return (
    <div className={`preloader ` + (preLoadingStatus ? "preloader_show" : "")}>
      <PreloaderIcon className="preloader__svg"></PreloaderIcon>
    </div>
  );
};

export default PreLoader;
