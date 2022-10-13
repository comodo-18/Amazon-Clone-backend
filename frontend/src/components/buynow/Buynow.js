import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./buynow.css";
import icon from "./icon.png";

import Option from "./Option";
import Subtotal from "./Subtotal";
import Right from "./Right";

const Buynow = () => {
  const [cartData, setCartData] = useState("");

  const getCartBuyData = async () => {
    const res = await fetch("http://localhost:5000/cartdata", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode:'cors',
      credentials: "include",
      withCredentials:true
    });
    const data = await res.json();
    // console.log(data[0]);
    if (res.status !== 201) {
      console.log("Error");
    } else {
      setCartData(data.carts);
    }
  };
  // console.log(cartData);
  useEffect(() => {
    getCartBuyData();
  }, []);
  return (
    <>
      {cartData.length ? (
        <div className="buynow_section">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Shopping cart</h1>
              <p>Select all items</p>
              <span className="leftbuyprice">Price</span>
              <Divider />
              {cartData.map((e, k) => {
                return (
                  <>
                  <div className="item_containert">
                    <img src={e.url} alt="watch " />
                    <div className="item_details">
                      <h3>{e.title.shortTitle}</h3>
                      <h3>{e.title.longTitle}</h3>
                      <h3 className="diffrentprice">₹ {e.price.cost}</h3>
                      <p className="unusuall">Usually dispatched in 3 days</p>
                      <p>Eligible for free shipping</p>
                      <img src={icon} alt="icon" />
                      <Option id={e.id} getCartItems={getCartBuyData}/>
                    </div>
                    <h3 className="item_price">₹{e.price.cost}</h3>
                  </div>
                  <Divider />
                  </>
                );
              })}

              
              <Subtotal items={cartData} />
            </div>
            <Right items={cartData}/>
          </div>
        </div>
      ) : (
        "No item to show "
      )}
    </>
  );
};

export default Buynow;
