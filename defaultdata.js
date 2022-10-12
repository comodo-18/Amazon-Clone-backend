const Products=require('./models/productSchema')
const productsdata=require('./constant/productsdata')

const Defaultdata=async()=>{
    try {
        await Products.deleteMany({}) 
        const saveData=await Products.insertMany(productsdata)
        // console.log(saveData)
    } catch (error) {
        console.log(error.message);
    }
}

module.exports=Defaultdata;