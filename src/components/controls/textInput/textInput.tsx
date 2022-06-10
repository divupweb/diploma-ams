import "./textInput.scss";
import React from "react";

type PropsType = {
  id: string;
  children: JSX.Element;
  placeholder: string;
  action?: (value: string, field: string) => void;
  field?: string;
  type?: string;
};

const TextInput: React.FC<PropsType> = ({
  id,
  children,
  placeholder,
  action,
  field,
  type,
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
          action && field && action(event.target.value, field);
        }}
        autoComplete="new-password"
        type={type ? type : "text"}
      ></input>
    </div>
  );
};
export default TextInput;
