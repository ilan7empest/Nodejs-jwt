const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: false,
  },
});

//This is called a pre-hook, before the user information is saved in the database
//this function will be called, we'll get the plain text password, hash it and store it.
UserSchema.pre("save", async function (next) {
  //'this' refers to the current document about to be saved
  const user = this;
  //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
  //your application becomes.
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  //Replace the plain text password with the hash and then store it
  this.password = hash;
  //Indicates we're done and moves on to the next middleware
  next();
});

UserSchema.methods.isValidPassword = function (password) {
  user = this;
  const compare = bcrypt.compareSync(password, user.password);
  return compare;
};

UserSchema.statics.validateSignup = (body) => {
  return new Promise((resolve, reject) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      username: Joi.string().required(),
    });
    const { value, error } = schema.validate(body);
    if (error && error.details) {
      reject(error.details[0].message);
    }
    resolve(value);
  });
};

UserSchema.statics.validateLogin = async function (body) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { value, error } = schema.validate(body);
  if (error && error.details) {
    return error.details[0].message;
  }
  return value;
};

module.exports = User = mongoose.model("User", UserSchema);
