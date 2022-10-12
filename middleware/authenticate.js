const jwt = require("jsonwebtoken");
const Users = require("../models/userSchema");
const secretKey = process.env.KEY;

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.ecommerce;

    const verifyToken = jwt.verify(token, secretKey);
    // console.log(verifyToken);

    const rootUser = await Users.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    // console.log(rootUser)

    if (!rootUser) {
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.UserId = rootUser._id;
 
    next();
  } catch (error) {
    res.status(401).send("Unauthorized: No token provided")
  }
};

module.exports=authenticate