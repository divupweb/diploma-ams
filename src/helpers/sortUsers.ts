import UserType from "../types/userType";

const sortUsers = (users: UserType[], field: string, asc: boolean) => {
  const sortedUsers = [...users].sort(
    (
      a: { [keys: string]: string | boolean | string[] },
      b: { [keys: string]: string | boolean | string[] }
    ) => {
      return asc
        ? a[field] > b[field]
          ? 1
          : -1
        : a[field] > b[field]
        ? -1
        : 1;
    }
  );

  return sortedUsers;
};
export default sortUsers;
