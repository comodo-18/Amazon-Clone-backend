import React,{useState,useEffect} from 'react'
import protection from './protection.png'

const Right = ({items}) => {
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
    <div className='right_buy'>
    <img src={protection} alt="security" />
    <div className="cost_right">
        <p>Your order is eligible for free Delivery</p><br/>
        <span style={{color:"#565959"}}>Check this option at Checkout</span>
        <h3> ({items.length} {items.length===1?'item' : 'items'}): <strong style={{fontWeight:700,color:"#111"}}>₹{price}</strong></h3>
        <button className='rightbuy_btn'>Proceed to buy</button>
        <div className="emi">Emi available</div>   
    </div>
    </div>
  )
}

export default Right