import React from "react";
import "./styles.scss";

export const Buttons = ({ children, ...otherProps }) => {
  return (
    <button className="btn" {...otherProps}>
      {children}
    </button>
  );
};
