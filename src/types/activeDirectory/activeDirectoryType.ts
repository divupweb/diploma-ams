import UserType from "./userType";

type ActiveDirectoryType = {
  users: UserType[];
  searchingUser: string;
  userGroups: { default: string[]; all: string[] };
  pcGroups: { default: string[]; all: string[] };
};

export default ActiveDirectoryType;
