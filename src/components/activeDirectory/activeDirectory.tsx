import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTranslate from "../../hooks/useTranslate";
import { activeDirectorySliceActions } from "../../store/activeDirectory/activeDirectorySlice";
import StoreType from "../../types/storeType";
import Loader from "../controls/loader/loader";

import "./activeDirectory.scss";
import AdTable from "./adTable/adTable";

const ActiveDirectory: React.FC = () => {
  const { t } = useTranslate();
  const loadingStatus = useSelector(
    (store: StoreType) => store.activeDirectory.loading
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({ type: activeDirectorySliceActions.fetchAllUsers.type });
    };
  }, []);

  return (
    <div className="active-directory">
      <h2 className="active-directory__title">{t("active_directory.title")}</h2>
      {loadingStatus ? <Loader /> : <AdTable />}
    </div>
  );
};

export default ActiveDirectory;
