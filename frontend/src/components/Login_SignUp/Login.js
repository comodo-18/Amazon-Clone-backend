import React, { useState,useContext } from "react";
import "./sign.css";
import img from "./blacklogoamazon.png";
import { NavLink,useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const {  setAccount } = useContext(LoginContext);
  const navigate=useNavigate();

  const changeHandler = (e) => {
    setCredentials(() => {
      return {
        ...credentials,
        [e.target.name]: e.target.value,
      };
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    // console.log(data);
    if (res.status === 400) {
      // alert("No data");
      toast.error("Login failed",{
        position:"top-center",
        autoClose:"1000"
      })
    } else {
      // alert("Logged in");
      toast.success("Successfully Logged in",{
        position:"top-center",
        autoClose:"1000"
      })
      setAccount(data)
      navigate("/");
      setCredentials({
        email: "",
        password: "",
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
            <h1>Login</h1>
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
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={changeHandler}
                value={credentials.password}
              />
            </div>
            <button className="signin_btn" onClick={sendData}>
              Continue
            </button>
          </form>
        </div>
        <div className="create_accountinfo">
          <p>New to Amazon ?</p>
          <NavLink to="/signup">
            <button>Create a new account</button>
          </NavLink>
        </div>
      </div>
        <ToastContainer position="top-center" autoClose={1000} />
    </section>
  );
};

export default Login;
