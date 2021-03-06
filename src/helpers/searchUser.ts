import UserType from "../types/activeDirectory/userType";

const searchUser = (users: UserType[], value: string) => {
  return users.filter((user) => {
    return user.login.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0;
  });
};

export default searchUser;
