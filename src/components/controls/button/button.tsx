import React from "react";
import "./button.scss";

type PropsType = {
  icon: any;
  title: string;
  handler: any;
};

const Button: React.FC<PropsType> = (props) => {
  return (
    <button
      type="submit"
      className="button"
      onClick={(event) => {
        event.preventDefault();
        props.handler();
      }}
    >
      <props.icon />
      <span>{props.title}</span>
    </button>
  );
};
export default Button;
