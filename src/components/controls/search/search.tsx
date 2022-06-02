import "./search.scss";
import SearchIcon from "@mui/icons-material/Search";
import SearchType from "../../../types/searchType";
import searchUser from "../../../helpers/searchUser";
import { useDispatch } from "react-redux";
import { activeDirectorySliceActions } from "../../../store/activeDirectory/activeDirectorySlice";

const Search = (props: SearchType) => {
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
      ></input>
    </div>
  );
};

export default Search;
