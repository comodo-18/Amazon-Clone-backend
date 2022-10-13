import { Divider } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./cart.css";

import { LoginContext } from "../../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { id } = useParams("");
  // console.log(id)
  const [individualData, setIndividualData] = useState([]);
  const { account, setAccount } = useContext(LoginContext);
  const navigate = useNavigate();
  // console.log(account)

  const getIndividualData = async () => {
    const res = await fetch(`http://localhost:5000/getproductsone/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data)

    if (res.status !== 201) {
      console.log("No data available");
    } else {
      setIndividualData(data);
      // console.log(individualData)
    }
  };

  // console.log(individualData);

  useEffect(() => {
    getIndividualData();
  }, [id]);

  const addToCart = async (id) => {
    // console.log(id);
    const res = await fetch(`http://localhost:5000/addcart/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ individualData }),
      credentials: "include",
      withCredentials:true,
      mode:'cors'
    });
    const data = await res.json();
    // console.log(data);
    if (res.status === 401 || !data) {
      console.log("invalid user");
      // alert("user invalid ");
      toast.error("Couldn't add item to cart",{
        position:"top-center",
        autoClose:1000
      } )
    } else {
      // alert("Item added in cart");
      toast.success("Item added in cart",{
        position:"top-center",
        autoClose:1000
      });
      setAccount(data);
    }
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  const buyPage=()=>{
    navigate("/buynow")
  }

  const addAndBuy=()=>{

    addToCart(id)
    buyPage()
    
  }

  return (
    <div className="cart_section">
      {individualData && Object.keys(individualData).length && (
        <div className="cart_container">
          <div className="left_cart">
            <img src={individualData.url} alt="img" />
            <div className="cart_btn">
              {account ? (
                <button
                  className="cart_btn1"
                  onClick={() => addToCart(individualData.id)}
                >
                  Add to Cart
                </button>
              ) : (
                <button className="cart_btn1" onClick={redirectToLogin}>
                  Add to Cart
                </button>
              )}
              {account ?<button className="cart_btn2" onClick={addAndBuy}>Buy Now</button> : <button className="cart_btn2" onClick={redirectToLogin}>Buy Now</button>}
            </div>
          </div>
          <div className="right_cart">
            <h3>{individualData.title.shortTitle}</h3>
            <h4>{individualData.title.longTitle}</h4>
            <Divider />
            <p className="mrp" style={{textDecoration:"line-through"}}>MRP : ₹{individualData.price.mrp}</p>
            <p>
              Deal of the Day :<span style={{ color: "#B12704" }}>₹{individualData.price.cost}</span>
            </p>
            <p>
              You Save :₹
              <span style={{ color: "#B12704" }}>
                {individualData.price.mrp-individualData.price.cost} (
                {individualData.price.discount})
              </span>
            </p>
            <div className="discount_box">
              <h5>
                Discount:{" "}
                <span style={{ color: "#111" }}>{individualData.discount}</span>
              </h5>
              <h4>
                Free Delivery:&nbsp;
                <span style={{ color: "#111", fontWeight: 600 }}>
                  {" "}
                  Oct 8-11 &nbsp;
                </span>
                Details
              </h4>
              <p>
                Fastest Delivery:
                <span style={{ color: "#111", fontWeight: 600 }}>
                  Tomorrow 11 am
                </span>
              </p>
            </div>
            <p className="description">
              About the item:
              <span
                style={{
                  color: "#565959",
                  fontSize: "18px",
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                }}
              >
                {individualData.description}
              </span>
            </p>
          </div>
        </div>
      )}
        <ToastContainer />
    </div>
  );
};

export default Cart;
