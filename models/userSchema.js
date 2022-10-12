const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const secretKey = process.env.KEY;

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not a valid Email Address");
      }
    },
  },
  number: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  carts: Array,
});

usersSchema.methods.generateAuthtoken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, secretKey);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

usersSchema.methods.addCartData=async function(cart){
  try {
    this.carts=this.carts.concat(cart);
    await this.save();
    return this.carts

  } catch (error) {
    console.log(error);
  }
}

const Users = mongoose.model("user", usersSchema);

module.exports = Users;
