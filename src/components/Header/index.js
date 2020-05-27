import React from "react";
import "./styles.scss";
import logo from "../../assets/logo.png";

export const Header = () => {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      </div>
    </header>
  );
};
