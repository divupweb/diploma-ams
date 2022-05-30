import React from "react";
import "./notifications.scss";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import StoreType from "../../types/storeType";
import NotificationType from "../../types/notificationType";
import notificationEnum from "../../enums/notificationEnum";
import { notificationsSliceAction } from "../../store/notifications/notificationsSlice";
import useTranslate from "../../hooks/useTranslate";
import DoneIcon from "@mui/icons-material/Done";

const Notifications: React.FC = () => {
  const notifications = useSelector(
    (store: StoreType) => store.notifications.notifications
  );
  const dispatch = useDispatch();
  const { t } = useTranslate();

  return (
    <div className="notifications">
      {notifications.map((notification: NotificationType, index: number) => {
        const addStyleNotifications =
          notification.type === notificationEnum.ERROR
            ? "notifications__item_error"
            : notification.type === notificationEnum.SUCCESS
            ? "notifications__item_success"
            : "";
        return (
          <div
            key={index}
            className={`notifications__item ${addStyleNotifications}`}
          >
            <CloseIcon
              className="notifications__item-close"
              onClick={() => {
                dispatch(notificationsSliceAction.removeNotification(index));
              }}
            ></CloseIcon>
            <div className="notifications__item-wrapper">
              <div className="notifications__item-image">
                {notification.type === notificationEnum.ERROR ? (
                  <NewReleasesIcon />
                ) : notification.type === notificationEnum.SUCCESS ? (
                  <DoneIcon />
                ) : (
                  ""
                )}
              </div>
              <div className="notifications__item-content">
                <div className="notifications__item-title">
                  {t(`notifications.${notification.type}`)}
                </div>
                <div className="notifications__item-text">
                  {notification.message}
                </div>
              </div>
            </div>
            <div className="notifications__item-date">{notification.date}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;
