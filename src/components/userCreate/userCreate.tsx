import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextInput from "../controls/textInput/textInput";
import AddCardIcon from "@mui/icons-material/AddCard";
import useTranslate from "../../hooks/useTranslate";
import passwordGenerator from "../../helpers/passwordGenerator";
import { useDispatch, useSelector } from "react-redux";
import { activeDirectorySliceActions } from "../../store/activeDirectory/activeDirectorySlice";
import StoreType from "../../types/storeType";
import Loader from "../controls/loader/loader";
import SwitchList from "../controls/switchList/switchList";
import BadgeIcon from "@mui/icons-material/Badge";
import GoogleIcon from "@mui/icons-material/Google";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import Looks3Icon from "@mui/icons-material/Looks3";
import servicesEnum from "../../enums/servicesEnum";
import Button from "../controls/button/button";
import SendIcon from "@mui/icons-material/Send";
import { minLength } from "../../helpers/validators";
import { notificationsSliceAction } from "../../store/notifications/notificationsSlice";
import notificationEnum from "../../enums/notificationEnum";
import dateNow from "../../helpers/dateNow";
import UserAddType from "../../types/userCreate/userAddType";

import "./userCreate.scss";
import SwitchListItemsType from "../../types/switchListsItemsType";

const UserCreate: React.FC = () => {
  useEffect(() => {
    dispatch(activeDirectorySliceActions.fetchAllGroups());
  }, []);

  const { t } = useTranslate();

  const userGroups = useSelector(
    (store: StoreType) => store.activeDirectory.userGroups.default
  );
  const pcGroups = useSelector(
    (store: StoreType) => store.activeDirectory.pcGroups.default
  );

  const initialState: UserAddType = {
    firstName: "",
    lastName: "",
    email: "",
    login: "",
    isActive: true,
    password: "",
    userGroups,
    pcGroups,
  };

  const [user, setUser] = useState(initialState);

  useEffect(() => {
    setUser((prev) => {
      return { ...prev, userGroups };
    });
  }, [userGroups]);

  useEffect(() => {
    setUser((prev) => {
      return { ...prev, pcGroups };
    });
  }, [pcGroups]);

  const dispatch = useDispatch();

  const switchListItems: SwitchListItemsType[] = [
    { title: servicesEnum.ACTIVE_DIRECTORY, icon: BadgeIcon },
    { title: servicesEnum.GMAIL, icon: GoogleIcon },
    { title: servicesEnum.PRITUNL, icon: VpnLockIcon },
    { title: servicesEnum.CHECKPOINT, icon: LocalFireDepartmentIcon },
    { title: servicesEnum.CX, icon: Looks3Icon },
  ];

  const loadingStatus: boolean = useSelector(
    (store: StoreType) => store.activeDirectory.loading
  );

  const inputHandler = (value: string, field: string) => {
    setUser((prev) => {
      const currentObject = {
        ...prev,
        [field]: value.charAt(0).toUpperCase() + value.slice(1),
      };
      const email =
        currentObject.lastName.length != 0 &&
        currentObject.firstName.length != 0
          ? currentObject.lastName.toLowerCase() +
            "." +
            currentObject.firstName.toLowerCase() +
            "@gmail.com"
          : "";
      const login =
        currentObject.lastName.length != 0 &&
        currentObject.firstName.length != 0
          ? currentObject.lastName.toLowerCase() +
            "." +
            currentObject.firstName.toLowerCase().slice(0, 1) +
            "@test.local"
          : "";
      return {
        ...currentObject,
        email,
        login,
        password: passwordGenerator(10),
      };
    });
  };

  const postQuery = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (minLength(user.firstName, 2) || minLength(user.lastName, 2)) {
      dispatch(
        notificationsSliceAction.addNotification({
          type: notificationEnum.ERROR,
          message: "",
          action: "notifications.validation_error",
          date: dateNow(),
        })
      );
    } else {
      dispatch(activeDirectorySliceActions.addUser(user));
      setUser(initialState);
      event.target.reset();
    }
  };

  return (
    <div className="user-create">
      <h2 className="user-create__title">{t("user_create.title")}</h2>
      {loadingStatus ? (
        <Loader></Loader>
      ) : (
        <div className="user-create__container">
          <form className="user-create__wrap" onSubmit={postQuery}>
            <div className="user-create__profile">
              <AccountCircleIcon className="user-create__logotype"></AccountCircleIcon>
            </div>
            <TextInput
              id="user_create_surname"
              placeholder={t("text_input_placeholder_surname")}
              action={inputHandler}
              field="lastName"
            >
              <AddCardIcon></AddCardIcon>
            </TextInput>
            <TextInput
              id="user_create_name"
              placeholder={t("text_input_placeholder_name")}
              action={inputHandler}
              field="firstName"
            >
              <AddCardIcon></AddCardIcon>
            </TextInput>
            <div>
              <SwitchList switchListItems={switchListItems}></SwitchList>
            </div>
            <div>
              <Button title={t("button.send")} icon={SendIcon}></Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default UserCreate;
