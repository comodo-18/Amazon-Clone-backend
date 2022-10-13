export const getProducts=()=>async(dispatch)=>{
try {
    const data=await fetch("http://localhost:5000/getproducts",{
        methodL:"GET",
        headers:{
            'Content-Type': 'applicaton/json'
        }
    })
    const res=await data.json();
    // console.log(res)
    dispatch({type:"SUCCESS",payload: res})
} catch (error) {
    dispatch({type:"FAILURE",payload: error.response})
}
}