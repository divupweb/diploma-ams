import React from "react";
import useTranslate from "../../hooks/useTranslate";
import "./activeDirectory.scss";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import GroupsIcon from "@mui/icons-material/Groups";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import { useDispatch } from "react-redux";
import { test } from "../../store/activeDirectory/activeDirectorySlice";

const ActiveDirectory: React.FC = () => {
  const { t } = useTranslate();
  const dispatch = useDispatch();

  return (
    <div className="active-directory">
      <h2 className="active-directory__title">{t("active_directory.title")}</h2>
      <table className="active-directory__table">
        <thead></thead>
        <tbody>
          <tr className="active-directory__table-row">
            <td className="active-directory__table-cell-main">
              <div className="active-directory__table-cell-main-container">
                <PersonIcon className="active-directory__table-icon"></PersonIcon>
                <span>{t("active_directory.table_title_login")}</span>
              </div>
            </td>
            <td className="active-directory__table-cell-main">
              <div className="active-directory__table-cell-main-container">
                <EmailIcon className="active-directory__table-icon"></EmailIcon>

                <span>{t("active_directory.table_title_email")}</span>
              </div>
            </td>
            <td className="active-directory__table-cell-main">
              <div className="active-directory__table-cell-main-container">
                <GroupsIcon className="active-directory__table-icon"></GroupsIcon>
                <span> {t("active_directory.table_title_groups")}</span>
              </div>
            </td>

            <td className="active-directory__table-cell-main">
              <div className="active-directory__table-cell-main-container">
                <AutorenewIcon className="active-directory__table-icon"></AutorenewIcon>
                <span> {t("active_directory.table_title_status")} </span>{" "}
              </div>
            </td>
            <td className="active-directory__table-cell-main">
              <div className="active-directory__table-cell-main-container">
                <GroupRemoveIcon className="active-directory__table-icon"></GroupRemoveIcon>
                <span> {t("active_directory.table_title_drop")}</span>
              </div>
            </td>
          </tr>

          <tr className="active-directory__table-row">
            <td className="active-directory__table-cell">
              3cx@parimatch.local
            </td>
            <td className="active-directory__table-cell">3cx@pm.by</td>
            <td className="active-directory__table-cell active-directory__table-cell-groups">
              <ul>
                <li> - Administrators</li>
                <li> - Users</li>
                <li> - Guests</li>
              </ul>
            </td>
            <td className="active-directory__table-cell">good</td>
            <td className="active-directory__table-cell">bad</td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
      <button
        onClick={() => {
          dispatch({ type: "zzz", payload: 777 });
        }}
      >
        text
      </button>
    </div>
  );
};

export default ActiveDirectory;
