import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import GroupsIcon from "@mui/icons-material/Groups";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import useTranslate from "../../../hooks/useTranslate";

import "./adTable.scss";

const AdTable = () => {
  const { t } = useTranslate();
  return (
    <table className="ad-table">
      <thead></thead>
      <tbody>
        <tr className="ad-table__row">
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

        <tr className="ad-table__row">
          <td className="ad-table__cell">3cx@parimatch.local</td>
          <td className="ad-table__cell">3cx@pm.by</td>
          <td className="ad-table__cell ad-table__cell-groups">
            <ul>
              <li> - Administrators</li>
              <li> - Users</li>
              <li> - Guests</li>
            </ul>
          </td>
          <td className="ad-table__cell">good</td>
          <td className="ad-table__cell">bad</td>
        </tr>
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};
export default AdTable;