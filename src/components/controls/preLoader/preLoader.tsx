import React from "react";
import { useSelector } from "react-redux";
import StoreType from "../../../types/storeType";

import { ReactComponent as PreloaderIcon } from "../../../assets/images/preloader.svg";
import "./preLoader.scss";

const PreLoader: React.FC = () => {
  const preLoadingStatus: boolean = useSelector(
    (store: StoreType) => store.loaders.preLoading
  );
  return (
    <div className={`preloader ` + (preLoadingStatus ? "preloader_show" : "")}>
      <PreloaderIcon className="preloader__svg"></PreloaderIcon>
    </div>
  );
};

export default PreLoader;
