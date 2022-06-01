import "./confirmation.scss";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import useTranslate from "../../hooks/useTranslate";
import { useDispatch, useSelector } from "react-redux";
import StoreType from "../../types/storeType";
import React from "react";
import { confirmationSliceActions } from "../../store/confirmation/confirmationSlice";
import NoticeType from "../../types/noticeType";
const Confirmation: React.FC = () => {
  const { t } = useTranslate();
  const notice: NoticeType | null = useSelector(
    (store: StoreType) => store.confirmation.notice
  );
  const dispatch = useDispatch();

  const confirmAction = (flag: boolean) => {
    if (flag) {
      dispatch(notice?.action);
    }
    dispatch(confirmationSliceActions.confirm(null));
  };
  return (
    <React.Fragment>
      {notice && (
        <div className="confirmation">
          <div className="confirmation__container">
            <h3 className="confirmation__title">{t("confirmation.title")}</h3>
            <div className="confirmation__text">{`${notice.decision} ${notice.data.login}`}</div>
            <div className="confirmation__wrap">
              <button
                onClick={() => {
                  confirmAction(true);
                }}
                className="confirmation__button confirmation__button-accept"
              >
                <CheckIcon></CheckIcon>
              </button>
              <button
                onClick={() => {
                  confirmAction(false);
                }}
                className="confirmation__button confirmation__button-decline"
              >
                <CloseIcon className=""></CloseIcon>
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Confirmation;
