import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useTranslate from "../../hooks/useTranslate";
import { activeDirectorySliceActions } from "../../store/activeDirectory/activeDirectorySlice";
import AdTable from "./adTable/adTable";
import "./activeDirectory.scss";

const ActiveDirectory: React.FC = () => {
  const { t } = useTranslate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activeDirectorySliceActions.fetchAllUsers());
  }, []);

  return (
    <div className="active-directory">
      <h2 className="active-directory__title">{t("active_directory.title")}</h2>
      <AdTable />
    </div>
  );
};

export default ActiveDirectory;
