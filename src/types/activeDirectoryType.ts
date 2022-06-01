import UserType from "./userType";

type ActiveDirectoryType = {
  loading: boolean;
  users: UserType[];
  preLoading: boolean;
};

export default ActiveDirectoryType;
