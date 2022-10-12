const mongoose=require("mongoose");

const mongoUrl=process.env.DATABASE;


mongoose.connect(mongoUrl).then(()=>console.log("database connected")).catch((error)=>console.log("error" + error.message))

// const connectToMongo=()=>{
//     mongoose.connect(`${mongoUrl}/Amazonweb`,()=>{
//         console.log("Connected to mongo");
//     })
// }

// module.exports=connectToMongo; 