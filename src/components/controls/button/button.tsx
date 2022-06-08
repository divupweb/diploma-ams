import React from "react";
import "./button.scss";

type PropsType = {
  icon: any;
  title: string;
};

const Button: React.FC<PropsType> = (props) => {
  return (
    <button type="submit" className="button">
      <props.icon />
      <span>{props.title}</span>
    </button>
  );
};
export default Button;
