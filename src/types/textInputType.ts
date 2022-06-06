import { Dispatch, SetStateAction } from "react";

type TextInputType = {
  id: string;
  children: JSX.Element;
  placeholder: string;
  action: (value: string, field: string) => void;
  field: string;
};

export default TextInputType;
