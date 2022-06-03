import { Dispatch, SetStateAction } from "react";
import UserAddType from "./userAddType";
import UserType from "./userType";

type TextInputType = {
  id: string;
  children: JSX.Element;
  placeholder: string;
  action: (value: string, field: string) => void;
  field: string;
};

export default TextInputType;
