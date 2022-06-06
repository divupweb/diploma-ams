import UserType from "./activeDirectory/userType";

type SearchType = {
  id: string;
  placeholder: string;
  users: UserType[];
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
};

export default SearchType;
