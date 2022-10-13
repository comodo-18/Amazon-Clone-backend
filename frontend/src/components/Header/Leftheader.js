import React, { useContext } from "react";
import "./leftheader.css";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "../../context/ContextProvider";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
const Leftheader = ({onClose,logout}) => {
  const { account, setAccount } = useContext(LoginContext);
  return (
    <>
      <div className="leftheader">
        <div className="left_nav">
          {account ? (
            <Avatar className="avtar2">{account.name[0].toUpperCase()}</Avatar>
          ) : (
            <Avatar className="avtar" />
          )}
          {account ? <h3>Hello , {account.name[0].toUpperCase() + account.name.slice(1)}</h3> : ""}
        </div>
        <div className="nav_btn" onClick={()=>onClose()}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Shop by category</NavLink>
          <Divider style={{width:"100%" , marginLeft:"-20px"}}/>
          <NavLink>Today's Deals</NavLink>
          {account ? (
            <NavLink to="/buynow">Your orders</NavLink>
          ) : (
            <NavLink to="/login" />
          )}
          <Divider style={{width:"100%" , marginLeft:"-20px"}}/>
          <div className="flag">
            <NavLink to='/'>Settings</NavLink>
          </div>
          {account ? <div className="flag">
            <LogoutIcon style={{fontSize:"18px",marginRight:"10px"}}/>
            <h3 onClick={()=>logout()} style={{cursor:"pointer",fontWeight:500}}>Logout</h3>
          </div> : <NavLink to='/login'>Login</NavLink>}
        </div>
      </div>
    </>
  );
};

export default Leftheader;
