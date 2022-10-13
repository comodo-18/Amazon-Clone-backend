import "./App.css";
import Navbar from "./components/Header/Navbar";
import NewNavbar from "./components/SecondNavbar/NewNavbar";
import MainComponent from "./components/Home/MainComponent";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login_SignUp/Login";
import Signup from "./components/Login_SignUp/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./components/cart/Cart";
import Buynow from "./components/buynow/Buynow";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <NewNavbar />
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/getproductsone/:id" element={<Cart />} />
          <Route path="/buynow" element={<Buynow />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
