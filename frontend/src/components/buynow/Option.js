import React,{useContext} from "react";
import { LoginContext } from "../../context/ContextProvider";

const Option = ({ id,getCartItems }) => {
  const { account, setAccount } = useContext(LoginContext);
  const deleteData = async (id) => {
    const res=await fetch(`http://localhost:5000/deleteitems/${id}`,{
      method:"DELETE",
      headers:{
        Accept:'application/json',
        'Content-Type': 'application/json'
      },
      mode:'cors',
      credentials:'include',
      withCredentials:true
    })
    const data=await res.json();
    if(res.status!==201 || !data){
      console.log("Some error")
    }else{
      setAccount(data)
      getCartItems()
    }
  };

  return (
    <div className="add_remove_select">
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p style={{ cursor: "pointer" }} onClick={() => deleteData(id)}>
        Delete
      </p>
      <span>|</span>
      <p className="forremovemedia">Save for later</p>
      <span>|</span>
      <p className="forremovemedia">See more like this</p>
    </div>
  );
};

export default Option;
