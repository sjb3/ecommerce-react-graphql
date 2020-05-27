import React from "react";
import ShopMens from "../../assets/shopMens.jpg";
import ShopWomens from "../../assets/shopWomens.jpg";
import "./styles.scss";

export const Directory = () => {
  return (
    <div className="directory">
      <div className="wrap">
        <div className="item" style={{ backgroundImage: `url(${ShopMens})` }}>
          <a>Shop Mens</a>
        </div>
        <div className="item" style={{ backgroundImage: `url(${ShopWomens})` }}>
          <a>Shop Womens</a>
        </div>
      </div>
    </div>
  );
};
