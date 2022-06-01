import ActiveDirectoryType from "./activeDirectoryType";
import ConfirmationType from "./confirmationType";
import NotificationsType from "./notificationsType";

type StoreType = {
  activeDirectory: ActiveDirectoryType;
  notifications: NotificationsType;
  confirmation: ConfirmationType;
};

export default StoreType;
