import UserType from "./userType";

type ActiveDirectoryType = {
  loading: boolean;
  users: UserType[];
  preLoading: boolean;
  searchingUser: string;
  userGroups: string[];
  pcGroups: string[];
};

export default ActiveDirectoryType;
