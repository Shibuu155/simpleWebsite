const mongoose = require("mongoose");
const validator = require("validator");

// creating schema for getting data from user
const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email ID");
      }
    },
  },
  phoneNumber: {
    type: Number,
    min: 10,
    required: true,
  },
  message: {
    type: String,
    required: true,
    minLength: 3,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// creating mongoose.Collection
const User = new mongoose.model("User", userSchema);

module.exports = User;
