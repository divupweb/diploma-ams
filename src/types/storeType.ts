import ActiveDirectoryType from "./activeDirectory/activeDirectoryType";
import ConfirmationType from "./confirmation/confirmationType";
import NotificationsType from "./notifications/notificationsType";

type StoreType = {
  activeDirectory: ActiveDirectoryType;
  notifications: NotificationsType;
  confirmation: ConfirmationType;
};

export default StoreType;
