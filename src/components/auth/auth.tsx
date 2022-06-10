import Button from "../controls/button/button";
import TextInput from "../controls/textInput/textInput";
import "./auth.scss";
import PersonIcon from "@mui/icons-material/Person";
import useTranslate from "../../hooks/useTranslate";
import LockIcon from "@mui/icons-material/Lock";
import KeyIcon from "@mui/icons-material/Key";
import { useDispatch, useSelector } from "react-redux";
import { minLength } from "../../helpers/validators";
import authEnum from "../../enums/authEnum";
import { useState } from "react";
import { authSliceActions } from "../../store/auth/authSlice";
import StoreType from "../../types/storeType";

const Auth: React.FC = () => {
  const { t } = useTranslate();
  const dispath = useDispatch();
  const [notification, setNotification] = useState(authEnum.DEFAULT);
  const isLogged: boolean = useSelector(
    (store: StoreType) => store.auth.isLogged
  );

  const submitHandler = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotification(authEnum.DEFAULT);
    const authLogin = event.target.auth_login.value;
    const authPassword = event.target.auth_password.value;

    if (minLength(authLogin, 3) || minLength(authPassword, 3)) {
      setNotification(authEnum.VALIDATION);
    } else {
      dispath(
        authSliceActions.authQuery({
          email: authLogin,
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
//fe19@front.end
//FE19-onl/Front End
