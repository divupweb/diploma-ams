import UserType from "./activeDirectory/userType";

type ActiveDirectoryType = {
  loading: boolean;
  users: UserType[];
  preLoading: boolean;
  searchingUser: string;
  userGroups: { default: string[]; all: string[] };
  pcGroups: { default: string[]; all: string[] };
};

export default ActiveDirectoryType;
