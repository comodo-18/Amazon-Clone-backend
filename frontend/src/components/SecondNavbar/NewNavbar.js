import React from "react";
import "./Newnav.css";
import nav from './nav.jpg'

const NewNavbar = () => {
  return (
    <div className="new_nav">
      <div className="nav_data">
        <div className="left_data">
          <p>All</p>
          <p>Mobile</p>
          <p>Best Seller</p>
          <p>Fashion</p>
          <p>Customer Services</p>
          <p>Electronics</p>
          <p>Prime</p>
          <p>Amazon Pay</p>
        </div>
        <div className="right_data">
            <img src={nav} alt="navdata"/>
        </div>
      </div>
    </div>
  );
};

export default NewNavbar;
