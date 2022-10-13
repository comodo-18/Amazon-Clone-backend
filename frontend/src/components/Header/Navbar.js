import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/ContextProvider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Leftheader from "./Leftheader";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import ListItem from "@mui/material/ListItem";
import { List } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext);
  const [drawerToggle, setDrawerToggle] = useState(false);
  const [text, setText] = useState("");
  const [listOpen, setListOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const { products } = useSelector((state) => state.getproductsdata);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getValidUser = async () => {
    const res = await fetch("http://localhost:5000/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (res.status !== 201) {
      console.log("error");
    } else {
      setAccount(data);
    }
  };

  const logoutUser = async () => {
    const res = await fetch("https://amazon-api-xxig.onrender.com/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode:'cors',
      credentials: "include",
      withCredentials:true
    });
    // const data = await res.json();
    if (res.status !== 201) {
      toast.error("Some error happened",{
        position:"top-center",
        autoClose:1000
      })
      console.log("Some error occured in logout");
    } else {
      // alert("logout");
      toast.success("Logged out",{
        position:"top-center",
        autoClose:1000
      })
      setAccount("");
      navigate("/");
    }
  };

  const handleBarClose = () => {
    setDrawerToggle(false);
  };

  const handleBarOpen = () => {
    setDrawerToggle(true);
  };

  const getProducts = (items) => {
    setText(items);
    setListOpen(false);
  };

  useEffect(() => {
    getValidUser();
  }, []);

  return (
    <header>
      <nav>
        <IconButton className="hamburgur" onClick={handleBarOpen}>
          <MenuIcon style={{ color: "white" }} />
        </IconButton>
        <Drawer open={drawerToggle}>
          <Leftheader onClose={handleBarClose} logout={logoutUser} />
        </Drawer>
        <div className="left">
          <div className="navlogo">
            <NavLink to="/">
              <img
                src="http://www.userlogos.org/files/logos/ArkAngel06/Amazon.png"
                alt=""
              />
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input
              type="text"
              id=""
              placeholder="Search for Products"
              onChange={(e) => getProducts(e.target.value)}
            />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>
            {text && (
              <List className="extrasearch" hidden={listOpen}>
                {products
                  .filter((product) =>
                    product.title.longTitle
                      .toLowerCase()
                      .includes(text.toLowerCase())
                  )
                  .map((product) => (
                    <ListItem>
                      <NavLink
                        to={`/getproductsone/${product.id}`}
                        onClick={() => setListOpen(true)}
                      >
                        {product.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))}
              </List>
            )}
          </div>
        </div>
        <div className="right">
          {!account ? (
            <div className="nav_btn">
              <NavLink to="/login">Login</NavLink>
            </div>
          ) : (
            <div className="logout" onClick={logoutUser}>
              Logout
            </div>
          )}
          <div className="cart_btn">
            {account ? (
              <NavLink to="/buynow">
                <Badge badgeContent={account.carts.length} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            )}
            <p>Cart</p>
          </div>
          {account ? (
            <Avatar
              className="avtar2"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {account.name[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              className="avtar"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />
          )}

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {account ? (
              <MenuItem onClick={handleClose}>
                <LogoutIcon
                  style={{ fontSize: "20px", marginRight: "5px" }}
                  onClick={logoutUser}
                />
                Logout
              </MenuItem>
            ) : (
              ""
            )}
          </Menu>
        </div>
      </nav>
      <ToastContainer position="top-center" autoClose={1000}/>
    </header>
  );
};

export default Navbar;
