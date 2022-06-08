import "./search.scss";
import SearchIcon from "@mui/icons-material/Search";
import searchUser from "../../../helpers/searchUser";
import { useDispatch } from "react-redux";
import { activeDirectorySliceActions } from "../../../store/activeDirectory/activeDirectorySlice";
import UserType from "../../../types/activeDirectory/userType";

type PropsType = {
  id: string;
  placeholder: string;
  users: UserType[];
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
};

const Search: React.FC<PropsType> = (props) => {
  const searchChangeHandler = (value: string) => {
    props.setUsers(searchUser(props.users, value));
    dispatch(activeDirectorySliceActions.setSearch(value));
  };
  const dispatch = useDispatch();
  return (
    <div className="search">
      <label htmlFor={props.id} className="search__label">
        <SearchIcon></SearchIcon>
      </label>
      <input
        id={props.id}
        type="text"
        className="search__input"
        placeholder={props.placeholder}
        onChange={(event) => {
          searchChangeHandler(event.target.value);
        }}
        autoComplete="off"
      ></input>
    </div>
  );
};

export default Search;
