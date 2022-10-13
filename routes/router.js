const express = require("express");
const Products = require("../models/productSchema");
const Users = require("../models/userSchema");
const router = new express.Router();
// const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

// get prdoucts data from database api
router.get("/getproducts", async (req, res) => {
  try {
    const data = await Products.find();
    // console.log(data)
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
});


//get data of a single product
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const individualData = await Products.findOne({ id: id });
    // console.log(individualData)
    res.status(201).json(individualData);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//signup page
router.post("/signup", async (req, res) => {
  const { name, email, number, password, cpassword } = req.body;

  if (!name || !email || !number || !password || !cpassword) {
    res.status(422).json({ error: "Fill all fields" });
  }
  try {
    const preUser = await Users.findOne({ email });
    if (preUser) {
      res.status(422).json({ error: "A user with this email already exists" });
    } else if (cpassword !== password) {
      res.status(422).json({ error: "Passwords does not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    const finalUser = new Users({
      name,
      email,
      number,
      password: secPass,
      cpassword: secPass,
    });
    const storedData = await finalUser.save();
    // console.log(storedData); 

    res.status(201).json(storedData);
  } catch (error) {}
});

//login page
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password is required" });
  }

  try {
    const userLogin = await Users.findOne({ email });
    // console.log(userLogin)
    if (userLogin) {
     
      const comparePassword = await bcrypt.compare(
        password,
        userLogin.password
      );
      // console.log(comparePassword)
     

      if (!comparePassword) {
       return res.status(400).json({ error: "Invalid Password" });
        
      } else {
        const token = await userLogin.generateAuthtoken();
        console.log(token)
        res.cookie("ecommerce", token, {
          expires: new Date(Date.now() + 25890000),
          secure:ture,
          httpOnly: true,
        });
        return res.status(201).json(userLogin);
      }
    } else {
      return res.status(400).json({ error: "Invalid Email" });
      
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid credentials" });
  }
});


//adding items to cart api
router.post("/addcart/:id", authenticate, async(req, res) => {
  try {
    const { id } = req.params;
    const cart = await Products.findOne({ id: id });
    // console.log(cart);
    const userContact = await Users.findOne({ _id: req.UserId });
    // console.log(userContact);

    if (userContact) {
      const cartData = await userContact.addCartData(cart);
      // console.log(cartData);
      await userContact.save();
      res.status(201).json(userContact);
    } else {
      res.status(401).json({ error: "Invalid user" });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid user" });
  }
});


//showing cart items
router.get("/cartdata",authenticate,async(req,res)=>{
  try {
    const userCart=await Users.findOne({_id:req.UserId})
    // console.log(userCart)
    res.status(201).json(userCart)
  } catch (error) {
    console.log("error " + error)
  }
})
router.get("/validuser",authenticate,async(req,res)=>{
  try {
    const user=await Users.findOne({_id:req.UserId})
    // console.log(userCart)
    res.status(201).json(user)
  } catch (error) {
    console.log("error " + error)
  }
})

//deleting items from cart
router.delete("/deleteitems/:id",authenticate,async(req,res)=>{
  try {
    const {id}=req.params;
    req.rootUser.carts=req.rootUser.carts.filter((currItem)=>{
      return currItem.id!==id
    })
    req.rootUser.save();
    res.status(201).json(req.rootUser)
  } catch (error) {
    res.status(400).send(error)
  }
})


//logout
router.get("/logout",authenticate,async(req,res)=>{
  try {
    
    req.rootUser.tokens=req.rootUser.tokens.filter((currUser)=>{
      return currUser.token!==req.token
    })
    res.clearCookie("ecommerce",{path:"/"})
    req.rootUser.save();
    res.status(201).send(req.rootUser.tokens)
  } catch (error) {
    res.status(400).json({error})
  }
})

module.exports = router;
