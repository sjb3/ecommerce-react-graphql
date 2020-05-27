import React from "react";
import { Header } from "./../components/Header";
import { Footer } from "./../components/Footer";

export const HomePageLayout = ({ children }) => {
  return (
    <div className="full-height">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
