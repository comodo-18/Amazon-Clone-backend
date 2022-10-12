require("dotenv").config();

const express=require('express');
const cookieParser=require('cookie-parser')
const cors=require('cors')

require('./db.js')
const Products=require('./models/productSchema')
const Defaultdata=require('./defaultdata');
const router=require('./routes/router.js')

const app=express();


const port=process.env.PORT||5000;

const corsOptions = {
    credentials: true,
    origin: true
    ///..other options
  };

app.use(express.json())
app.use(cookieParser(""))
app.use(cors(corsOptions))
app.use(router)



Defaultdata()

app.listen(port,()=>{
    console.log(`App is running on port ${port}`)
})