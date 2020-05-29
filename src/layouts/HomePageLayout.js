import React from "react";
import { Header } from "./../components/Header";
import { Footer } from "./../components/Footer";

export const HomePageLayout = (props) => {
  return (
    <div className="full-height">
      <Header {...props} />
      {props.children}
      <Footer />
    </div>
  );
};
