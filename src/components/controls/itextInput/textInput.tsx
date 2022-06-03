import "./textInput.scss";

import React from "react";
import TextInputType from "../../../types/textInputType";
const TextInput: React.FC<TextInputType> = ({
  id,
  children,
  placeholder,
  action,
  field,
}) => {
  return (
    <div className="text-input">
      <label htmlFor={id} className="text-input__label">
        {children}
      </label>
      <input
        id={id}
        className="text-input__input"
        placeholder={placeholder}
        onChange={(event) => {
          action(event.target.value, field);
        }}
      ></input>
    </div>
  );
};
export default TextInput;
