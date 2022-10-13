import React, { useState } from "react";
import "./sign.css";
import img from "./blacklogoamazon.png";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    cpassword: "",
  });

  const changeHandler = (e) => {
    setCredentials(() => {
      return {
        ...credentials,
        [e.target.name]: e.target.value,
      };
    });
    // console.log({credentials})
  };
  const sendData = async (e) => {
    e.preventDefault();
    const { name, email, number, password, cpassword } = credentials;

    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, number, password, cpassword }),
    });

    // const data = await res.json();
    // console.log(data)
    if (res.status === 422) {
      // alert("No data");
      toast.error("Invalid details", {
        position: "top-center",
        autoClose: "1000",
      });
    } else {
      // alert("Data successfully added");
      toast.success("Account created", {
        position: "top-center",
        autoClose: "1000"
      });
      setCredentials({
        name: "",
        email: "",
        number: "",
        password: "",
        cpassword: "",
      });
    }
  };
  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src={img} alt="logo" />
        </div>
        <div className="sign_form">
          <form method="POST">
            <h1>Sign in</h1>
            <div className="form_data">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={changeHandler}
                value={credentials.name}
              />
            </div>
            <div className="form_data">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={changeHandler}
                value={credentials.email}
              />
            </div>
            <div className="form_data">
              <label htmlFor="number">Mobile Number</label>
              <input
                type="number"
                name="number"
                id="number"
                onChange={changeHandler}
                value={credentials.number}
              />
            </div>
            <div className="form_data">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={changeHandler}
                value={credentials.password}
              />
            </div>
            <div className="form_data">
              <label htmlFor="CPassword">Confirm Password</label>
              <input
                type="cpassword"
                name="cpassword"
                id="cpassword"
                onChange={changeHandler}
                value={credentials.cpassword}
              />
            </div>
            <button className="signin_btn" onClick={sendData}>
              Create account
            </button>
            <div className="signin_info">
              <p>Already a user ?</p>
              <NavLink to="/login">Login</NavLink>
            </div>
          </form>
        </div>
        <ToastContainer position="top-right" autoClose={1000} />
        
      </div>
    </section>
  );
};

export default Signup;
