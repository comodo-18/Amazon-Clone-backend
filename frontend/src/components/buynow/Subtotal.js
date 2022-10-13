import React, { useState, useEffect } from "react";

const Subtotal = ({ items }) => {
  const [price, setPrice] = useState(0);
  const totalAmount = () => {
    let price = 0;
    items.map((item) => {
      return (price += item.price.cost);
    });
    setPrice(price);
  };

  useEffect(() => {
    totalAmount();
  }, [items]);

  return (
    <div className="sub_item">
      <h3>
        {" "}
        Subtotal ({items.length} {items.length===1?'item' : 'items'}):{" "}
        <strong style={{ fontWeight: 700, color: "#111" }}>₹{price}</strong>
      </h3>
    </div>
  );
};

export default Subtotal;
