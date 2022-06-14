import { useEffect, useState } from "react";
import useTranslate from "../../hooks/useTranslate";
import { useDispatch, useSelector } from "react-redux";
import { minLength } from "../../helpers/validators";
import { authSliceActions } from "../../store/auth/authSlice";

import Button from "../controls/button/button";
import TextInput from "../controls/textInput/textInput";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import KeyIcon from "@mui/icons-material/Key";
import authEnum from "../../enums/authEnum";

import "./auth.scss";
import StoreType from "../../types/storeType";
import { notificationsSliceAction } from "../../store/notifications/notificationsSlice";

const Auth: React.FC = () => {
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(authEnum.DEFAULT);
  const notifications = useSelector(
    (store: StoreType) => store.notifications.notifications
  );

  useEffect(() => {
    notifications.find(
      (notification) => notification.action === "auth.conntect-error"
    ) && setNotification(authEnum.ERROR);
  }, [notifications]);

  const submitHandler = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotification(authEnum.DEFAULT);
    dispatch(notificationsSliceAction.clear());

    const authLogin = event.target.auth_login.value;
    const authPassword = event.target.auth_password.value;

    if (minLength(authLogin, 3) || minLength(authPassword, 3)) {
      setTimeout(() => {
        setNotification(authEnum.VALIDATION);
      }, 0);
    } else {
      dispatch(
        authSliceActions.authQuery({
          login: authLogin,
          password: authPassword,
        })
      );
    }
  };

  return (
    <form className="auth" onSubmit={submitHandler}>
      <h3 className="auth__title">{t("auth.title")}</h3>
      <TextInput type="text" id="auth_login" placeholder={t("auth.login")}>
        <PersonIcon></PersonIcon>
      </TextInput>
      <TextInput
        type="password"
        id="auth_password"
        placeholder={t("auth.password")}
      >
        <LockIcon />
      </TextInput>
      <Button title={t("auth.sign")} icon={KeyIcon}></Button>
      <div>
        <span className="auth__notifications">
          {t("auth.notifications")} :{" "}
        </span>
        {notification === authEnum.VALIDATION && (
          <span className="auth__notification_error">
            {t("auth.validation")}
          </span>
        )}
        {notification === authEnum.ERROR && (
          <span className="auth__notification_error">{t("auth.error")}</span>
        )}
      </div>
    </form>
  );
};
export default Auth;
