const mongoose=require("mongoose");

const productsSchema=new mongoose.Schema({
    id:String,
    url:String,
    setailsUrl:String,
    title:Object,
    price:Object,
    description:String,
    discount:String,
    tagling:String
})

const Products=mongoose.model("product",productsSchema)

module.exports=Products