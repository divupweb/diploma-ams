import React from "react";
import "./notifications.scss";

import { useDispatch, useSelector } from "react-redux";
import { notificationsSliceAction } from "../../store/notifications/notificationsSlice";
import useTranslate from "../../hooks/useTranslate";

import StoreType from "../../types/storeType";
import NotificationType from "../../types/notifications/notificationType";
import notificationEnum from "../../enums/notificationEnum";
import DoneIcon from "@mui/icons-material/Done";
import WarningIcon from "@mui/icons-material/Warning";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import CloseIcon from "@mui/icons-material/Close";

const Notifications: React.FC = () => {
  const notifications: NotificationType[] = useSelector(
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
            : notification.type === notificationEnum.WARNING
            ? "notifications__item_warning"
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
                ) : notification.type === notificationEnum.WARNING ? (
                  <WarningIcon />
                ) : (
                  ""
                )}
              </div>
              <div className="notifications__item-content">
                <div className="notifications__item-title">
                  {t(`notifications.${notification.type}`)}
                </div>
                <div className="notifications__item-text">
                  {t(notification.action)}: {notification.message}
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
