import { useState } from "react";
import UserType from "../types/activeDirectory/userType";

const usePagination = (data: UserType[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const getCurrentData = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  };

  function jump(page: number) {
    setCurrentPage(page);
  }
  return { jump, getCurrentData };
};
export default usePagination;
