import React,{useEffect} from "react";
import Banner from "./Banner";
import "./home.css";
import Slide from "./Slide";
import offer from './offer.jpg'
import { getProducts } from "../redux/actions/action";
import { useSelector,useDispatch } from "react-redux";

const MainComponent = () => {
const {products}=useSelector(state=>state.getproductsdata)
// console.log(products)

const dispatch=useDispatch()

useEffect(() => {
  dispatch(getProducts())

  
}, [dispatch])


  return (
    <div className="home_section">
      <div className="banner_part">
        <Banner />
      </div>
      <div className="slide_part">
        <div className="left_slide">
          <Slide title="Deal of the day" products={products} />
        </div>
        <div className="right_slide">
            <h4>Festive Offers</h4>
            <img src={offer} alt=''/>
            <a href="#">See More</a>
        </div>
      </div>
          <Slide title="Today's Deal" products={products}/>
          <Slide title="Best Seller" products={products}/>
          <div className="center_img">
            <img src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg" alt="centre" />
          </div>
          <Slide title="80% off" products={products}/>
          
    </div>
  );
};

export default MainComponent;
