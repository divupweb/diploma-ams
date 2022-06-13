import ActiveDirectoryType from "./activeDirectory/activeDirectoryType";
import AuthType from "./auth/auth";
import ConfirmationType from "./confirmation/confirmationType";
import LoadersType from "./loaders/loadersType";
import NotificationsType from "./notifications/notificationsType";

type StoreType = {
  activeDirectory: ActiveDirectoryType;
  notifications: NotificationsType;
  confirmation: ConfirmationType;
  auth: AuthType;
  loaders: LoadersType;
};

export default StoreType;
