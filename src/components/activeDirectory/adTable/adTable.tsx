import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import GroupsIcon from "@mui/icons-material/Groups";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import useTranslate from "../../../hooks/useTranslate";

import "./adTable.scss";
import { useEffect, useState } from "react";
import UserType from "../../../types/userType";

const AdTable = () => {
  const [adUsers, setAdUsers] = useState([]);
  const { t } = useTranslate();
  const users = useSelector((store: any) => store.activeDirectory.users);

  useEffect(() => {
    setAdUsers(users);
  }, []);

  return (
    <table className="ad-table">
      <thead></thead>
      <tbody>
        <tr className="ad-table__row ad-table__row-main">
          <td className="ad-table__cell-main">
            <div className="ad-table__cell-main-container">
              <PersonIcon className="ad-table__icon"></PersonIcon>
              <span>{t("active_directory.table_title_login")}</span>
            </div>
          </td>
          <td className="ad-table__cell-main">
            <div className="ad-table__cell-main-container">
              <EmailIcon className="ad-table__icon"></EmailIcon>

              <span>{t("active_directory.table_title_email")}</span>
            </div>
          </td>
          <td className="ad-table__cell-main">
            <div className="ad-table__cell-main-container">
              <GroupsIcon className="ad-table__icon"></GroupsIcon>
              <span> {t("active_directory.table_title_groups")}</span>
            </div>
          </td>

          <td className="ad-table__cell-main">
            <div className="ad-table__cell-main-container">
              <AutorenewIcon className="ad-table__icon"></AutorenewIcon>
              <span> {t("active_directory.table_title_status")} </span>{" "}
            </div>
          </td>
          <td className="ad-table__cell-main">
            <div className="ad-table__cell-main-container">
              <GroupRemoveIcon className="ad-table__icon"></GroupRemoveIcon>
              <span> {t("active_directory.table_title_drop")}</span>
            </div>
          </td>
        </tr>

        {adUsers.map((user: UserType) => {
          return (
            <tr key={user.login} className="ad-table__row">
              <td className="ad-table__cell">{user.login}</td>
              <td className="ad-table__cell">{user.email}</td>
              <td className="ad-table__cell ad-table__cell-groups">
                <ul>
                  {user.groups.map((group: string) => {
                    return <li key={`${user.login} - ${Math.random()}`}>- {group}</li>;
                  })}
                </ul>
              </td>
              <td className="ad-table__cell">{user.isActive ? "active" : "deactive"}</td>
              <td className="ad-table__cell">bad</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};
export default AdTable;
