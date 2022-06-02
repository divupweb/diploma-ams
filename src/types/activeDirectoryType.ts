import UserType from "./userType";

type ActiveDirectoryType = {
  loading: boolean;
  users: UserType[];
  preLoading: boolean;
  searchingUser: string;
};

export default ActiveDirectoryType;
