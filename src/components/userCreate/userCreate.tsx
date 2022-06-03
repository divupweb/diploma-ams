import React, { useEffect, useState } from "react";
import "./userCreate.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextInput from "../controls/itextInput/textInput";
import AddCardIcon from "@mui/icons-material/AddCard";
import useTranslate from "../../hooks/useTranslate";
import passwordGenerator from "../../helpers/passwordGenerator";
import { useDispatch, useSelector } from "react-redux";
import { activeDirectorySliceActions } from "../../store/activeDirectory/activeDirectorySlice";
import StoreType from "../../types/storeType";
import Loader from "../controls/loader/loader";
import SwitchList from "../controls/switchList/switchList";

const UserCreate: React.FC = () => {
  const { t } = useTranslate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    login: "",
    isActive: true,
  });

  const dispatch = useDispatch();

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
      };
    });
  };
  useEffect(() => {
    dispatch(activeDirectorySliceActions.fetchAllGroups());
  }, []);

  return (
    <div className="user-create">
      <h2 className="user-create__title">{t("user_create.title")}</h2>
      {loadingStatus ? (
        <Loader></Loader>
      ) : (
        <div className="user-create__container">
          <div className="user-create__profile">
            <AccountCircleIcon className="user-create__logotype"></AccountCircleIcon>
          </div>
          <div className="user-create__inputs">
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
          </div>
          <div className="user-create__data">
            <h3>{t("user_create.generated_data")}</h3>
            <div>
              {t("user_create.generated_surname")}: {user.lastName}
            </div>
            <div>
              {t("user_create.generated_name")}: {user.firstName}
            </div>

            <div>
              {t("user_create.generated_email")}: {user.email}
            </div>
            <div>
              {t("user_create.generated_login")}: {user.login}
            </div>
            <div>
              {t("user_create.generated_password")}:
              {user.email && user.login && passwordGenerator(10)}
            </div>
          </div>
          <div>
            <SwitchList></SwitchList>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserCreate;
