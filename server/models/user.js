const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    default: "",
  },
  fullName: {
    type: String,
    required: true,
    default: "",
  },
  email: {
    type: String,
    required: true,
    default: "",
    unique: true,
  },
  password: {
    type: String,
    required: true,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);
