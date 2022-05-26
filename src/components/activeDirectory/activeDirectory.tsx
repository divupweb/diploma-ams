import React from "react";
import { useSelector } from "react-redux";
import useTranslate from "../../hooks/useTranslate";
import Loader from "../controls/loader/loader";
import "./activeDirectory.scss";
import AdTable from "./adTable/adTable";

const ActiveDirectory: React.FC = () => {
  const { t } = useTranslate();
  const loadingStatus = useSelector((store: any) => store.activeDirectory);

  return (
    <div className="active-directory">
      <h2 className="active-directory__title">{t("active_directory.title")}</h2>
      {!loadingStatus ? <Loader /> : <AdTable />}
    </div>
  );
};

export default ActiveDirectory;
