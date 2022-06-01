import { useDispatch, useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import GroupIcon from "@mui/icons-material/Group";
import SignalCellularConnectedNoInternet1BarIcon from "@mui/icons-material/SignalCellularConnectedNoInternet1Bar";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import useTranslate from "../../../hooks/useTranslate";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import "./adTable.scss";
import React from "react";
import UserType from "../../../types/userType";
import { activeDirectorySliceActions } from "../../../store/activeDirectory/activeDirectorySlice";
import StoreType from "../../../types/storeType";
import Loader from "../../controls/loader/loader";
import { confirmationSliceActions } from "../../../store/confirmation/confirmationSlice";
import CloseIcon from "@mui/icons-material/Close";

const AdTable = () => {
  const { t } = useTranslate();
  const users: UserType[] = useSelector(
    (store: any) => store.activeDirectory.users
  );
  const dispatch = useDispatch();
  const loadingStatus: boolean = useSelector(
    (store: StoreType) => store.activeDirectory.loading
  );

  const dropUser = (user: UserType) => {
    dispatch(
      confirmationSliceActions.confirm({
        decision: t("confirmation.user_drop"),
        data: user,
        action: activeDirectorySliceActions.dropUser(user),
      })
    );
  };

  const changeUserStatus = (user: UserType, flag: boolean) => {
    dispatch(
      activeDirectorySliceActions.changeStatus({
        user,
        flag,
      })
    );
  };

  return (
    <React.Fragment>
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
                <GroupIcon className="ad-table__icon"></GroupIcon>
                <span> {t("active_directory.table_title_groups")}</span>
              </div>
            </td>

            <td className="ad-table__cell-main">
              <div className="ad-table__cell-main-container">
                <SignalCellularConnectedNoInternet1BarIcon className="ad-table__icon"></SignalCellularConnectedNoInternet1BarIcon>
                <span> {t("active_directory.table_title_status")} </span>{" "}
              </div>
            </td>
            <td className="ad-table__cell-main">
              <div className="ad-table__cell-main-container">
                <PersonRemoveIcon className="ad-table__icon"></PersonRemoveIcon>
                <span> {t("active_directory.table_title_drop")}</span>
              </div>
            </td>
          </tr>

          {!loadingStatus &&
            users.map((user: UserType) => {
              return (
                <tr key={user.login} className="ad-table__row">
                  <td className="ad-table__cell">{user.login}</td>
                  <td className="ad-table__cell">{user.email}</td>
                  <td className="ad-table__cell ad-table__cell-groups">
                    <ul>
                      {user.groups.map((group: string) => {
                        return (
                          <li key={`${user.login} - ${Math.random()}`}>
                            - {group}
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                  <td className="ad-table__cell ad-table__cell_align">
                    {user.isActive ? (
                      <CheckIcon
                        onClick={() => {
                          changeUserStatus(user, false);
                        }}
                        className="ad-table__status-check"
                      />
                    ) : (
                      <CloseIcon
                        onClick={() => {
                          changeUserStatus(user, true);
                        }}
                        className="ad-table__status-close"
                      />
                    )}
                  </td>
                  <td className="ad-table__cell ad-table__cell_align">
                    <DeleteIcon
                      onClick={() => {
                        dropUser(user);
                      }}
                      className="ad-table__drop"
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>

        <tfoot></tfoot>
      </table>
      {loadingStatus && <Loader></Loader>}
    </React.Fragment>
  );
};
export default AdTable;
