import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTranslate from "../../../hooks/useTranslate";
import { activeDirectorySliceActions } from "../../../store/activeDirectory/activeDirectorySlice";
import Loader from "../../controls/loader/loader";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import GroupIcon from "@mui/icons-material/Group";
import SignalCellularConnectedNoInternet1BarIcon from "@mui/icons-material/SignalCellularConnectedNoInternet1Bar";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import UserType from "../../../types/activeDirectory/userType";
import StoreType from "../../../types/storeType";
import { confirmationSliceActions } from "../../../store/confirmation/confirmationSlice";
import CloseIcon from "@mui/icons-material/Close";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Search from "../../controls/search/search";
import searchUser from "../../../helpers/searchUser";
import sortUsers from "../../../helpers/sortUsers";
import userFieldsEnum from "../../../enums/userFieldsEnum";

import "./adTable.scss";
import FieldStateType from "../../../types/activeDirectory/adTable/fieldStateType";

const AdTable: React.FC = () => {
  const { t } = useTranslate();
  const users: UserType[] = useSelector(
    (store: StoreType) => store.activeDirectory.users
  );

  const initialState: UserType[] = [];
  const [adUsers, setAdUsers] = useState(initialState);

  const initialFieldsState: FieldStateType = {
    login: { used: false, ascFlag: true },
    firstName: { used: false, ascFlag: true },
    lastName: { used: false, ascFlag: true },
    email: { used: false, ascFlag: true },
    isActive: { used: false, ascFlag: true },
  };

  const [fieldsSortAsc, setFieldSortAsc] = useState(initialFieldsState);

  const dispatch = useDispatch();
  const loadingStatus: boolean = useSelector(
    (store: StoreType) => store.activeDirectory.loading
  );
  const searchingUser: string = useSelector(
    (store: StoreType) => store.activeDirectory.searchingUser
  );

  useEffect(() => {
    let key: keyof FieldStateType;
    let userClone = users;

    for (key in fieldsSortAsc) {
      userClone = fieldsSortAsc[key]["used"]
        ? sortUsers(userClone, key, !fieldsSortAsc[key]["ascFlag"])
        : userClone;
    }

    searchingUser.length > 0
      ? setAdUsers(searchUser(userClone, searchingUser))
      : setAdUsers(userClone);
  }, [users]);

  useEffect(() => {
    dispatch(activeDirectorySliceActions.setSearch(""));
  }, []);

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

  const sortHandler = (users: UserType[], field: keyof FieldStateType) => {
    setAdUsers(sortUsers(users, field, fieldsSortAsc[field]["ascFlag"]));
    setFieldSortAsc((prev) => {
      const prevClone: FieldStateType = { ...prev };
      let key: keyof FieldStateType;
      for (key in prevClone) {
        if (key !== field) {
          prevClone[key]["ascFlag"] = false;
          prevClone[key]["used"] = false;
        } else {
          prevClone[key]["ascFlag"] = !prevClone[key]["ascFlag"];
          prevClone[key]["used"] = true;
        }
      }
      return { ...prevClone };
    });
  };

  return (
    <React.Fragment>
      <Search
        id="ad_table_search"
        placeholder={t("search.title")}
        users={users}
        setUsers={setAdUsers}
      ></Search>
      <table className="ad-table">
        <thead></thead>
        <tbody>
          <tr className="ad-table__row ad-table__row-main">
            <td
              onClick={() => {
                sortHandler(adUsers, userFieldsEnum.LOGIN);
              }}
              className="ad-table__cell-main"
            >
              <div className="ad-table__cell-main-container">
                <CreditCardIcon className="ad-table__icon"></CreditCardIcon>
                <span>{t("active_directory.table_title_login")}</span>
              </div>
            </td>

            <td
              className="ad-table__cell-main"
              onClick={() => {
                sortHandler(adUsers, userFieldsEnum.LASTNAME);
              }}
            >
              <div className="ad-table__cell-main-container">
                <PersonIcon className="ad-table__icon"></PersonIcon>
                <span>{t("active_directory.table_title_surname")}</span>
              </div>
            </td>

            <td
              className="ad-table__cell-main"
              onClick={() => {
                sortHandler(adUsers, userFieldsEnum.FIRSTNAME);
              }}
            >
              <div className="ad-table__cell-main-container">
                <PersonIcon className="ad-table__icon"></PersonIcon>
                <span>{t("active_directory.table_title_firstname")}</span>
              </div>
            </td>

            <td
              className="ad-table__cell-main"
              onClick={() => {
                sortHandler(adUsers, userFieldsEnum.EMAIL);
              }}
            >
              <div className="ad-table__cell-main-container">
                <EmailIcon className="ad-table__icon"></EmailIcon>

                <span>{t("active_directory.table_title_email")}</span>
              </div>
            </td>
            <td className="ad-table__cell-main ad-table__cell-main-email">
              <div className="ad-table__cell-main-container">
                <GroupIcon className="ad-table__icon"></GroupIcon>
                <span> {t("active_directory.table_title_groups")}</span>
              </div>
            </td>

            <td
              className="ad-table__cell-main"
              onClick={() => {
                sortHandler(adUsers, userFieldsEnum.ISACTIVE);
              }}
            >
              <div className="ad-table__cell-main-container">
                <SignalCellularConnectedNoInternet1BarIcon className="ad-table__icon"></SignalCellularConnectedNoInternet1BarIcon>
                <span> {t("active_directory.table_title_status")} </span>{" "}
              </div>
            </td>
            <td className="ad-table__cell-main ad-table__cell-main-remove">
              <div className="ad-table__cell-main-container">
                <PersonRemoveIcon className="ad-table__icon"></PersonRemoveIcon>
                <span> {t("active_directory.table_title_drop")}</span>
              </div>
            </td>
          </tr>

          {!loadingStatus &&
            adUsers.map((user: UserType) => {
              return (
                <tr key={user.login} className="ad-table__row">
                  <td className="ad-table__cell">{user.login}</td>
                  <td className="ad-table__cell">{user.lastName}</td>
                  <td className="ad-table__cell">{user.firstName}</td>
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
