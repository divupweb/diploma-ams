import { activeDirectorySliceActions } from "../../store/activeDirectory/activeDirectorySlice";
import UserType from "../activeDirectory/userType";

type NoticeType = {
  action?: typeof activeDirectorySliceActions.dropUser;
  data?: UserType;
  decision?: string;
};

export default NoticeType;
